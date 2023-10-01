const jwt = require('jsonwebtoken')

 function verifyToken( req, res, next )  {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
   
    if(!token) return res.status(401).json({message: "Unauthentication0"});

    jwt.verify(token, process.env.SECRET_JWT_KEY, (error, user)=>{
        if(error) return res.status(401).json({message: "Unauthentication1"});
        req.user = user.data
        next(); 
    })

}
module.exports =verifyToken
