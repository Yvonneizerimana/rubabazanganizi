import mongoose from 'mongoose';
const contactModel=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    country:{
        type:Number,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    message:{
        type:String,
        
    }
})

export default mongoose.model('Contacts',contactModel);