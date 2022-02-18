const jwt = require('jsonwebtoken');

const generarToken = (uid, name) => {

    return new Promise((resolve, reject) => {

        const payload = {
            uid,
            name
        }

        jwt.sign(payload, process.env.JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {

            if (err) {
                console.log(first);
                reject(err);
            }

            resolve(token);

        })

    })

}

module.exports = {
    generarToken
}