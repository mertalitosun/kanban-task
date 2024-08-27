const jwt = require("jsonwebtoken");
const {APIError} = require("../middlewares/errorHandler")

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token; 
    // const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ success: false, message: "Yetkili Değilsiniz" });
    }

    jwt.verify(token, 'kanbanTaskJwtToken', (err, decoded) => {
        if (err) {
            throw new APIError("Yetkili Değilsiniz",401)
        }
        req.user = decoded;
        next();
    });
};

module.exports = {authMiddleware};