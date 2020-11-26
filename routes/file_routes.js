const Book = require('../model/Book');
const Autentication = require('../model/Autentication');
const User = require('../model/User')

module.exports = (app) => {

    app.post('/RegisterBook', Autentication.verifyJwt ,Book.RegisterBook); //ok

    app.get('/GetBook' , Autentication.verifyJwt   , Book.ListBooks);//ok 

    app.delete('/Deletebook', Autentication.verifyJwt , Book.deleteBook); 

    app.put('/ChangeBook', Autentication.verifyJwt , Book.changeBook);

    app.get('/Login', Autentication.authenticateUser);

    app.post('/UserRegistration', User.RegisterUser);//ok

    app.get('/UserListAll', User.ListAllUse); //ok

    app.get('/ListUserByRg', User.ListUserByRg); //ok

    app.delete('/DeleteUserByRg', User.DeleteUserByRg); //ok

    app.put('/alterDataUser', User.AlterDataUser); //ok
}

