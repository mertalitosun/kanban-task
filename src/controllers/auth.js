const Users = require("../models/users");
const bcrypt = require ("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const {APIError} = require("../middlewares/errorHandler")

exports.post_register = async (req,res) =>{
   const {firstName, lastName, email, password} = req.body;

   const schema  = new Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required().required(),
    password:  Joi.string().min(6).max(30).required(), 
   })
   const { error } = schema.validate(req.body);

    if (error) {
        throw new APIError(error.message,400)
    }

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
    const {email, password} = req.body;

    //validations
    const schema  = new Joi.object({
        email: Joi.string().email().required(),
        password:  Joi.string().min(6).max(30).required(), 
    })

    const { error } = schema.validate(req.body);
    if (error) {
        throw new APIError(error.message,400)
    }

    const user = await Users.findOne({email})
    if(!user){
        throw new APIError("Girilen maile ait kullanıcı bulunamadı.",401) //kullanıcı kontrolü
    }

    const match = await bcrypt.compare(password,user.password);
    
    if(!match){
        throw new APIError("Hatalı Parola",401) //şifre kontrolü
    }

    const token = jwt.sign({ id: user._id }, "kanbanTaskJwtToken", { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
    
    res.status(200).json({
        success:true,
        message:"Giriş Başarılı",
    })
}

exports.get_logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        success:true,
        message:"Çıkış Başarılı",
    })
};