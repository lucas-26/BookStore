const app = require('./src/config/custom-express');
const port = 3001;
const mongoose = require('mongoose');
const url =  "mongodb+srv://lucas:987654321@studingluc-kveao.gcp.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
                            .then(() => console.log('conectou'))
                                .catch(() => console.log('nao conectou! '));

app.listen(port, () => {
    console.log('Servidor rodando na porta:' + port + '')     
});

module.exports = app;