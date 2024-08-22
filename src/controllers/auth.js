const Users = require("../models/users");
const bcrypt = require ("bcrypt");
const {APIError} = require("../middlewares/errorHandler")

exports.post_register = async (req,res) =>{
   const {firstName, lastName, email, password} = req.body;

   const existingUsers = await Users.findOne({email})

   if(existingUsers){
    throw new APIError("Girmiş olduğunuz mail kullanılıyor.",401)
   }
   const hashedPassword = await bcrypt.hash(password,10);

   try{
    const user = new Users({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    });
    const response = await user.save();
    res.status(201).json({
        success: true,
        data: response,
        message: "Kayıt Başarılı",
    });
   }catch(err){
    console.log(err)
    res.status(500).json({ message: err.message });
   }
}

exports.post_login = async (req,res) =>{
    console.log(req.body)
    res.json(req.body)
}