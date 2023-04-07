const asyncHandler=require("express-async-handler");
const bcrypt=require("bcrypt");
const User=require("../models/usermodel");
const jwt= require("jsonwebtoken");
//@desc register a user
//@route POST /api/users/register
//@access public

const registeruser=asyncHandler(async (req,res)=>
{
    const {username,email,password}=req.body;
    if(!username||!email||!password){
        res.status(400);
        throw new Error("All fields are required");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("user already registered");
    }
    //Hash password
    const hashedpassword= await bcrypt.hash(password,10);
    console.log(hashedpassword);
    const user=await User.create({
        username,email,password:hashedpassword,
    });
    console.log(`User created ${user}`);
    if(user){
        res.status(201).json({_id:user.id,email:user.email});
    }
    else
    {
        res.status(400);
        throw new Error("user data is not valid");
    }


    res.json({message:"Register the user"});

});


//@desc login user
//@route POST /api/users/login
//@access public

const loginuser=asyncHandler(async (req,res)=>
{
    const{email,password}=req.body;
    if(!email||!password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user=await User.findOne({email});
    //compare password with hashedpassword
    if(user&& (await bcrypt.compare(password,user.password))){
        const accessToken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
            },
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"});
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("email or password is not valid");
    }
    
});

//@desc current user info
//@route POST /api/users/current
//@access private
const currentuser=asyncHandler(async (req,res)=>
{
    res.json(req.user);

});

module.exports={registeruser,loginuser,currentuser}