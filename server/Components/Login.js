import { UserSchema } from "../Models/LoginSchema.js";
import bcrypt from 'bcrypt';
export const Login = async(req,res)=>{

    const {Email,Password} = req.body;

    if(!Email || !Password)
    {
        res.send({message:"Enter all details"});

    }
    else{
        const checkUser = await UserSchema.findOne({Email:Email});

        try{
            if(checkUser)
            {
                const vaildatePassword =await bcrypt.compare(Password,checkUser.Password)
                if(vaildatePassword){
                    res.send("ok Login")
                }
                else{
                    res.send({message:"enter correct password.."})
                }
            }
            else{
                res.send("No user Found")
            }
        }
        catch(e){
            res.send("error",e);
        }
    }
}

