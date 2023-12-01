const http = require('http');
const config = require('./config/config');
const express = require('express');
const app = express();
const indexRoute = require('./Routes/index');
const usersRoute = require('./Routes/users');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const url = config.db_string;

const options = {reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true, useUnifiedTopology: true};

mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);
mongoose.connection.on('error', (err) => console.log('Erro de conexao com o banco' + err ));
mongoose.connection.on('disconnection', () => console.log('Deu merda...sem conexao com  banco' + err));
mongoose.connection.on('connected', () => console.log('Conectado ao Banco de Dados!'));


//body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', indexRoute);
app.use('/users', usersRoute);

function normalizePort(val){
	const port = parseInt(val, 10);
	if (isNaN(port)){
		return val;
	}
	if (port >=0)
	{
		return port;
	}
	return false;
}

const port = normalizePort(process.env.PORT || '3000');
app.listen(3000);
module.exports = app;






/*
200 - OK
201 - created
202 - Accepted

400 - bad request
401 - Unauthorized
403 - Forbiden
404 - not found

500 - erro
501 - nao implementado 
504 - servico indisponivel
*/