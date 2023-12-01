const express = require('express');
const router = express.Router();
const Users = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');



const createUserToken= (userId) => {
    return jwt.sign({ id: userId }, config.jwt_password, {expiresIn: '7d'});
}
 


router.get('/', async(req, res) => {
    try{
        const users = await Users.find({});
        return res.send(users);
    }
    catch{
        return res.status(500).send({error: "Erro na consulta do usuario"})
    }  
});

router.post('/create', async(req, res) => {
    const {nome, cpf, password} = req.body;
    if(!cpf || !nome) return res.send({error: 'Dados Insuficientes!'});
    if (password == " ") return res.send({error: 'Senha nao pode ser vazio'});
    try{
        if (await Users.findOne({cpf})) return res.send({error: 'Usuario ja possui conta'});
        const  user = await Users.create(req.body);
        user.password = undefined;
        return res.status(201).send({user, token: createUserToken(user.id)});
    }

    catch (err){ 
        return res.status(500).send({error: 'Erro ao criar o usuario...'});
    }

});// CRIA OS USUARIOS COM CPF E NOME

router.post('/delete', async(req, res) => {
    const {cpf} = req.body;
    if(!cpf) return res.send({error: 'CPF nao consta'});
    try{
        if (await Users.findOne({cpf})) return res.send({error: 'Usuario Encontrado'});
        const  user = await Users.delete(req.body);
        return res.send("Usuario apagado...")
    }

    catch (err){ 
        return res.status(400).send({error: 'Erro ao APAGAR o usuario...'});
    }

});// EXCLUI OS USUARIOS COM CPF

//AUTENTICACAO DOS USUARIOS, PODE SER USADO PARA COMPARAR SENHA...
router.post('/auth', async (res, req)=>{
    const {cpf, nome, password} = req.body;
    if(!cpf || !password) return res.send({erro: "Dados Insuficientes"});
    try{
        const user = await Users.findOne({cpf}).select('+password');
        if (!user)return res.send({error: "Erro ao autenticar o usuario"});
        const pass_ok = await bcrypt.compare(password, user.password);
        if (!pass_ok)return res.send({error: "Erro ao autenticar o usuario"});
        user.password = undefined;
        return res.send({user, token: createUserToken(user.id)})

    }
    catch (err){
        return res.send({error: "Erro ao autenticar o usuario"})
    }
});//AUTENTICACAO DOS USUARIOS, PODE SER USADO PARA COMPARAR SENHA...


module.exports = router;