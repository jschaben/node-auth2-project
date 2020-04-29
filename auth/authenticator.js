
const jwt = require('jsonwebtoken');


const secrets = require('../api/secrects.js');


module.exports = (req, res, next) => {
   
    const token = req.headers.authorization.split(" ")[1];

   
    const secret = secrets.jwtSecret;

  
    if(token) {
        
        jwt.verify(token, secret, (error, decodedToken) => {
            
            if (error) {
                res.status(401).json({ message: 'Invalid token'})
            } else {
                
                req.decodedToken = decodedToken;
                next();
            }
        });
    
    } else {
        res.status(400).json({errorMessage: 'Please provide credentials.'});
    }
};