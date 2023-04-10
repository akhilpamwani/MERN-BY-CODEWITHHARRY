const express = require('express');
const router = express.Router();
const { Signup,Login, GetUser } = require('../Controllers/auth');

const { body} = require("express-validator");
const fetchuser = require('../Middleware/fetchuser');
const UserModel = require('../Models/auth');

router.post('/signup',[
    body("name", "Name must be 6 character long").isLength({ min: 6 }),
    body("email", "Email must be 6 character long").isLength({ min: 6 }),
    body("email","Please Enter a Valid Email").isEmail(),
    body("name","Name is Required").not().isEmpty(),
    body("email","Email is Required").not().isEmpty(),
    body("password","Password is Required").not().isEmpty(),
    body("password", "Password must be 6 character long").isLength({ min: 6 }),
   
  ], Signup);

router.post('/login',[
   
    body("email", "Email must be 6 character long").isLength({ min: 6 }),
    body("email","Please Enter a Valid Email").isEmail(),
    
    body("email","Email is Required").not().isEmpty(),
    body("password","Password is Required").not().isEmpty(),
    body("password", "Password must be 6 character long").isLength({ min: 6 }),
   
  ], Login)


// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser,  async (req, res) => {

    try {
      
      userId = req.user.id;
      const user = await UserModel.findById(userId).select("-password")
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  })
module.exports = router;