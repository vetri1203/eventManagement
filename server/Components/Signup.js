import { UserSchema } from "../Models/LoginSchema.js";
import bcrypt from 'bcrypt';



export const Signup = async(req,res)=>{

    const{FirstName,LastName,PhoneNumber,Email,Password}=req.body;

    if(!FirstName || !LastName|| !PhoneNumber || !Email || !Password){
        return res.send("enter all details");
    }

    try{
        const checkUser = await UserSchema.findOne({Email:Email});

        if(checkUser){
           return res.send({messgae:"user already exist.."});
        }

        else{
            const salt = bcrypt.genSaltSync(10);
            const hashpassword = bcrypt.hashSync(Password,salt)
            const adduser = await new UserSchema({
                    FirstName:FirstName,
                    LastName:LastName,
                    Email:Email,
                    PhoneNumber:PhoneNumber,
                    Password:hashpassword
            });

            try{
                await adduser.save();
                if(adduser){
                    console.log(adduser);
                    return res.send(adduser);
                }
                else{
                    return res.send("unable to add user")
                }
            }
            catch(e){
                return res.send("e",e);
            }
        }
    }
    catch(e){
        res.send("eror while check the user");
    }


    
}