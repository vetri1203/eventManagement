import { UserSchema } from "../Models/LoginSchema.js";
import bcrypt from 'bcrypt';
 

 
export const Signup = async(req,res)=>{

    const{FirstName,LastName,PhoneNumber,Email,Password}=req.body;

    if(!FirstName || !LastName|| !PhoneNumber || !Email || !Password){
        return res.status(500).send("Enter all details");
    } 
 
    try{
        const checkUser = await UserSchema.findOne({Email:Email});

        if(checkUser){
           return res.send("user already exist..");
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
                    return res.send("Signup successful");
                }
                else{
                    return res.send("unable to add user")
                }
            }
            catch(e){
                return res.send("Error",e);
            }     
        }
    }
    catch(e){
        res.send("Check your Network Connection...");
    }


    
}