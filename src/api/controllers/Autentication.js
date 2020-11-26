var jwt = require('jsonwebtoken');
const User = require('./models/User')
require("dotenv-safe").config();
const { buildResponseForJasonWebbToken } = require('../presenter/Presenter')


class Autentication {
    async authenticateUser(req, res) {
        const userBody = req.headers;
        const usernameparam = userBody.username;
        const userpassword = userBody.password;  

        await User.findOne({username: usernameparam, password: userpassword},(err, docs) => {
          if(err || docs === null){
            return buildResponseForJasonWebbToken(null, docs, 0, res, err)
          }
          else
          {
        if(usernameparam === docs.username && userpassword === docs.password){

                const id = docs.id;
                const tokenValid = jwt.sign({ id }, process.env.SECRET, {
                expiresIn: 300});
                buildResponseForJasonWebbToken(tokenValid, docs, 1, res, null)
               }
            }
          })
       }
    
    retirarToken(req, res) {
      buildResponseForJasonWebbToken(null, 2, res, null)
    }

    verifyJwt(req, res, next){
      const token = req.headers['x-access-token'];
        if(!token){
          buildResponseForJasonWebbToken(null, 3, res, null)
        }else{

            jwt.verify(token, process.env.SECRET, (err, decoded) => {
              if(err){
                buildResponseForJasonWebbToken(null, 4, res, null)
              }
              else {
                req.useId = decoded.id;
                next();
              }
            })
          }
    }
}

module.exports = new Autentication()
