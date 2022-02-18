const { Router } = require('express');
const { check } = require('express-validator');    

const router = Router();
const { addUser, loginUser, renewToken } = require('../controllers/auth');
const validarCampos = require('../middlewares/validar-campos');
const { validarToken } = require('../middlewares/validar-jwt');

router.post(
    '/new', 
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El passwotd es obligatorio').isLength({min: 6}),
        validarCampos
    ], 
    addUser
);

router.post(
    '/', 
    [   
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El passwotd es obligatorio').isLength({min: 6}),
        validarCampos
    ], 
    loginUser
);

router.get('/renew', validarToken, renewToken);

module.exports = router;