import { UserSchema } from "../Models/LoginSchema.js";
import bcrypt from 'bcrypt';
import jsonToken from 'jsonwebtoken';

export const Login = async(req,res)=>{


    const token = `wertyuikjhgfdsawtyjkk876542345678ikjnbvdwyuiolmnbj123`
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
                    const webtoken = jsonToken.sign({userId:checkUser.id,Email:Email},token,{expiresIn:'10s'});
                    res.status(200).json({ webtoken });   
                }
                else{
                    res.send("enter correct password..")
                }
            } 
            else{
                res.send("No User Found")
            }
        }
        catch(e){
            res.send("error",e);
        }
    }
}

