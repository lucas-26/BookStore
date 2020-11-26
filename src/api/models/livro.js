const mongoose = require('mongoose');

const livro = new mongoose.Schema(
    {
      titulo: {
          type: String
        }, 
        preco: {
             type: Number
        },
        descricao: {
             type: String
        }
        });
module.exports = mongoose.model('livros', livro);