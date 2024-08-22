import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userModel=new mongoose.Schema(
    {
    names:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true,
        unique:true,
        minlength:10,
        maxlength:13,
        validate:{
            validator:function(v){
                return /^[0-9]+$/.test(v);
            },
            message:'Phone number must be'
        },
    },
        email:{
            type:String,
            required:true,
            unique:true,
            isEmail:true,
        },
password:{
    type:String,
    required:true,
    minlength:8,
    
},
confirmPassword:{
    type:String,
    required:true,
},

otp:{
    type:Number,
    default:null
},
otpExpires:{
    type:Date,
    default:null
}
    }
)

userModel.pre('save', async function(next) {
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,12);
        const confirm=this.confirmPassword=this.password;
        if(!confirm){
            return next(new Error('Please password should match'))
        }
    }
    next();
})

export default mongoose.model('User',userModel);