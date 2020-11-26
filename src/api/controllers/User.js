const UserModel = require('./models/User');
const { buildRespondeRegisterUser } = require('../presenter/Presenter');

class User{

    async RegisterUser(req, res){
        const Userbody = req.body || res.send('Nenhum usuario foi enviado');
        const nomeparam = Userbody.nome || res.send('nome é obrigatorio');
        const sobrenomeparam = Userbody.sobrenome || res.send('sobrenome é obrigatorio');
        const rgparam = Userbody.rg || res.send('rg é obrigatorio');
        const usernameparam = Userbody.username || res.send('username é obrigatorio');
        const passwordparam = Userbody.password || res.send('password é obrigatorio');

        try{
            await UserModel.findOne({
                   nome: nomeparam,
                   sobrenome: sobrenomeparam, 
                   rg: rgparam,
                   username: usernameparam,
                   password: passwordparam},(err,docs) => {
                   if(err){
                            buildRespondeRegisterUser(null, 2, res, err) 
                            
                   }
                   else if(docs != null){
                            buildRespondeRegisterUser(docs, 3, res, null)
                        
                   }
                })
                
            await UserModel.findOne({
                   rg: rgparam}, (err,docs)=>{
                   if(err){
                            buildRespondeRegisterUser(null, 4, res, err)
                   }
                   else{
                       if(docs != null){
                            buildRespondeRegisterUser(null, 5, res, err) 
                       }
                 }
            })

            await UserModel.insertMany({
                  nome: nomeparam,
                  sobrenome: sobrenomeparam, 
                  rg: rgparam,
                  username: usernameparam,
                  password: passwordparam}, (err, docs) => {
                  if(err){
                        buildRespondeRegisterUser(docs[0],0,res,err);
                  }
                  else {
                        buildRespondeRegisterUser(docs[0],1,res,null);}
             })
        }catch(e){
            buildRespondeRegisterUser(null,11,res,e);
        }
    }
    async ListAllUse(req, res){
        await UserModel.find((err, docs)=>{
            if(err){
                    buildRespondeRegisterUser(null, 4, res, err)
            }
            else {
                    buildRespondeRegisterUser(docs, 6, res, null)  
                
            }
        })
    }

    async ListUserByRg(req, res){
        const myrg = req.headers.rg;
        await UserModel.findOne({rg: myrg}, (err,docs)=>{
            if(err){
                    buildRespondeRegisterUser(null, 4, res, err)
            }
            else{
                if(docs != null){
                    buildRespondeRegisterUser(docs, 6, res, null)
                }
            }
        })

    }

    async DeleteUserByRg(req, res){
         
        let dados = {}
        const rgparam = req.body.rg;
       await UserModel.findOne({rg: rgparam }, (err, docs)=> {
            if(err){
                return err;
            }
            else{
               return dados = docs;
            }
        })
        
        await UserModel.findOneAndDelete({rg: rgparam}, (err, docs) =>{
            if(err){
                    buildRespondeRegisterUser(null, 7, res, err);
            }
            else
            {
                buildRespondeRegisterUser(dados, 8, res, null);
            }
        })
    }

    async AlterDataUser(req, res){
        const rgparam = req.body.rg;
        const body = req.body;
        let update = {};
        if(body != undefined)
        {
            update = 
            { 
                nome: body.nome, 
                sobrenome: body.sobrenome,
                rg: body.rg,
                username: body.username,
                password: body.password
            }

        }
        
        await UserModel.findOneAndUpdate({rg: rgparam}, update ,(err, docs) =>
        {
            if(err){
                    buildRespondeRegisterUser(null, 9, res, err);
            }
            else if(docs != null){
                    buildRespondeRegisterUser(docs,10, res, null); 
            }
        })
    }

}

module.exports = new User();





