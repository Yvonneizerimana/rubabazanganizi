import mongoose from 'mongoose';
const bookModel=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    book:{
        type:String,
        required:true
    }
})

export default mongoose.model('Books',bookModel);