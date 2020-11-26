const Livros = require('./models/livro')        
const { buildRespondeRegisterBook } = require('../presenter/Presenter');
class Book {
       async ListBooks(req, res){
            
            await Livros.find((err, docs) => {
                    if(err)
                    {
                        return buildRespondeRegisterBook(null, 2, res, err);
                    }
                    else
                    {
                        return buildRespondeRegisterBook(docs, 3, res, null); 
                    }    
                });
         
    }
        async RegisterBook(req, res){
            
              const novoLivro = new Livros();
              
              novoLivro.titulo = req.body.titulo;
              novoLivro.preco = req.body.preco;
              novoLivro.descricao = req.body.descricao;
             
               await novoLivro.save();
               await Livros.findOne(
                   { 
                       titulo: novoLivro.titulo,
                       descricao: novoLivro.descricao 
                    },(err, docs) => 
                    {
                        if(err)
                           {
                              return  buildRespondeRegisterBook(null, 0, res, err);
                           }
                           else
                           {
                              return buildRespondeRegisterBook(docs, 1, res, null);
                           }
                    }
                );
        }

        async deleteBook(req, res){
            const livroDeletar = new Livros();
            let docs = {};

            livroDeletar.titulo = req.body.titulo;
            livroDeletar.preco = req.body.preco;
            livroDeletar.descricao = req.body.descricao;

            docs = {
                titulo: livroDeletar.titulo,
                preco: livroDeletar.preco,
                descricao: livroDeletar.descricao
            }

            livroDeletar.deleteOne({ 
                filter: {
                    titulo: livroDeletar.titulo, 
                    preco: livroDeletar.preco, 
                    descricao: livroDeletar.descricao
                }}, (err) => {
                if(err)
                {
                    return buildRespondeRegisterBook(null, 4, res, err);
                }
                else 
                {
                    return buildRespondeRegisterBook(docs, 5, res, null);
                }

            })
        }

        async changeBook(req, res){
            
            let namelivroUpdate = {};
           
            namelivroUpdate = req.body.name;
            
            const livroUpdate = new Livros();
            
            livroUpdate.titulo = req.body.titulo;
            livroUpdate.preco = req.body.preco;
            livroUpdate.descricao = req.body.descricao;
            const docEdicao = livroUpdate.findAndModify({
                    query: { titulo: namelivroUpdate },
                    sort: { cno: 1 },
                    update: { $inc: {titulo: livroUpdate.titulo },
                              $inc: {preco: livroUpdate.preco},
                              $inc: {descricao: livroUpdate.descricao} 
                            },
                            upsert: true,
                            new: true
                        })

               if (!docEdicao) 
                {
                    return buildRespondeRegisterBook(null, 6, res, err); 
                }
                else
                {
                    return buildRespondeRegisterBook(docs, 7, res, null);
                }
        }
        
    }

module.exports = new Book;
