const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");


const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    console.log("JWT_SECRET:", JWT_SECRET);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ message: "Authorization header missing or invalid" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
            req.userId = decoded.userId;
            next();
      } catch(err) {
        return res.status(403).json({msg: "Invalid or expired token"})
          }      
}

module.exports = ({
    authMiddleware
})
