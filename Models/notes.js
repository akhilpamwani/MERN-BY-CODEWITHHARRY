const mongoose =require('mongoose')
const Schema=mongoose.Schema;
const notesSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
       default:"General"
    },
    tags:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports=Notes=mongoose.model('notes',notesSchema)
