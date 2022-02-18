const bcrypt = require('bcryptjs');
const { generarToken } = require('../helpers/jwt');

const Usuario = require('../models/Users');

const addUser = async (req, res) => {

    const { email, password } = req.body;

    try {
        
        let usuario = await Usuario.findOne({ email });

        if(usuario){

            return res.status(400).json({
                ok: false,
                msg: 'El usuario con el email ya existe'
            });

        }

        usuario = new Usuario(req.body);

        //Encriptado de contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );
    
        await usuario.save();

        const token = await generarToken(usuario.id, usuario.name);
    
        res.status(201).json({
            ok: true,
            email: usuario.email,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin'
        });
        
    }

}

const loginUser = async (req, res) => {

    const { email, password } = req.body;

    try {
        
        const usuario = await Usuario.findOne({ email });
        
        if(!usuario){
            return res.status(400).json({
                ok:false,
                msg: 'El usuario no existe'
            })
        }

        const validPass = bcrypt.compareSync( password, usuario.password );

        if(!validPass){
            return res.status(400).json({
                ok:false,
                msg: 'El password es incorrecto'
            })
        }

        //Generar token
        const token = await generarToken(usuario.id, usuario.name);


        res.status(200).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el admin'
        })
    }

}

const renewToken = async(req, res) => {

    const { uid, name } = req;

    const token = await generarToken(uid, name);

    res.status(200).json({
        ok: 'renew',
        token
    })
}

module.exports = {
    addUser,
    loginUser,
    renewToken
}