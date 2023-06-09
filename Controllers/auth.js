const UserModel = require("../Models/auth");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {  validationResult } = require("express-validator");

// ROUTE 1: Create a User using: POST "/api/auth/signup". 

exports.Signup = async (req, res) => {

  // Checking Validation
  let success=false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }
  try {
    
    // Request Body

    const { name, email, password } = req.body;

    
    //  Checking User Exist or Not

    let user = await UserModel.findOne({ email: req.body.email });

    if (user) {
      success= false;
       res.status(400).json({success, msg: "User Already Exist" });
    }

    // Hashing Password

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Creating User

    user = await UserModel.create({
      name: name,
      email: email,
      password: hashPassword,
    });

    // Creating Payload

    const data = {
      user: {
        id: user.id,
      },
    };
    // Creating JWT Token

    const authtoken = jwt.sign(data, process.env.JWT_SECRET);

    // Success Response


    success= true;

    // Sending Response

    res.status(200).json({success, msg: "User Created Successfully", authtoken });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
};

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". 

exports.Login = async (req, res) => {
 
  // Checking Validation
  let success=false;
    
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }
  try {
    // Request Body

    const { email, password } = req.body;

    //  Checking User Exist or Not

    let user = await UserModel.findOne({ email: email });

 
    if (!user) {
    success= false;
      return res.status(412).json({success, msg: "Invalid Email or Passwords" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
     success= false;
      return res.status(413).json({success, msg: "Invalid Email or Passwords" });
    }

    // Creating Payload

    const data = {
      user: {
        id: user.id,
      },
    };

    // Creating JWT Token

    const authtoken = jwt.sign(data, process.env.JWT_SECRET);

    // Success Response

    success= true;

    // Sending Response

    return res
      .status(201)
      .json({success, msg: "User Loged In Successfully", authtoken });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
};


exports.GetUser = async (req, res) => {
try {
 userId=req.user._id;
  const user=await UserModel.findById(userId).select("-password");
  res.send(user);
} catch (error) {
  console.log(error.message);
    res.status(500).send("Internal Server Error");
  
}



}