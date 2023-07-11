// Importando as dependências
const express = require('express');
const app = express();

// Configurando as rotas
const routes = require('./routes');
app.use('/', routes);

// Iniciando o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000!');
});

// Configurando o model
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/meu-banco-de-dados', { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
  nome: String,
  email: String,
  senha: String
});

const User = mongoose.model('User', userSchema);

// Configurando o controller
const UserController = {
  index: (req, res) => {
    User.find({}, (err, users) => {
      if (err) {
        console.log(err);
      } else {
        res.json(users);
      }
    });
  },
  create: (req, res) => {
    const { nome, email, senha } = req.body;
    const user = new User({ nome, email, senha });
    user.save((err) => {
      if (err) {
        console.log(err);
      } else {
        res.json(user);
      }
    });
  }
};

module.exports = UserController;

// Configurando a view
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/users', UserController.index);

app.post('/users', UserController.create);
