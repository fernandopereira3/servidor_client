const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/', auth, (req, res) => {
    console.log(res.locals.auth.data); 
    return res.send({message:'Tudo certo com o GET da rota da raiz'});
});

router.post('/', (req, res) => {
    return res.send({message:'Tudo certo com o POST da rota da raiz'});
});

module.exports = router;