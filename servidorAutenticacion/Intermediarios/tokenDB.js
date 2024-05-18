const jwt = require('jsonwebtoken');
const secretKey = 'Bootcamp';
const Usuario = require('../modelos/modeloMDB');


const envioTokenDB = (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }
    if (!req.user) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }
    
    // Accediendo a las propiedades de usuario
    const username = req.user.username;
    const rol = req.user.rol;
    const payload = { rol: rol, username: username };
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    res.json({ token, username: req.user.username, rol: req.user.rol });
};


//funcion para enviar el token como cookie
const envioTokenCookie = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [userName, password] = credentials.split(':');

    // Generar un token JWT con información del usuario autenticado
    const token = jwt.sign({ username: userName }, secretKey, { expiresIn: '1h' });
    res.cookie('tokenCookie', token, { httpOnly: true, maxAge: 3600000 });
    req.user = userName;
    next();
}

const verificacionTokenDB = (req, res, next) => {
    const tokenrecibido = req.headers['authorization'];
    const token = tokenrecibido.replace(/^Bearer\s/, '');
    if (!token) {
        return res.status(401).json({ message: 'Se requiere token de autenticación' });
    }

    jwt.verify(token, secretKey, (err, decodedToken) => {
        if (err) {
            console.error('Error de verificación de token:', err);
            return res.status(403).json({ message: 'Token no válido' });
        }

        // Extraer nombre de usuario y rol del payload decodificado
        console.log(decodedToken);
        const username = decodedToken.username;
        const rol = decodedToken.rol;

        // Pasar el nombre de usuario y el rol a la siguiente función
        req.user = { username, rol }; // o asigna los datos que necesites

        next();
    });
};

const verificacionTokenCookie = (req, res, next) => {
    const tokenrecibido = req.headers.cookie;
    const cookieParts = tokenrecibido.split('=');
    token = cookieParts[1];
    console.log("token:" + token);
    if (!token) {
        return res.status(401).json({ message: 'Se requiere token de autenticación' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        console.log(user);
        if (err) {
            console.error('Error de verificación de token:', err);
            return res.status(403).json({ message: 'Token no válido' });
        }

        req.user = user;
        next();
    });
};

module.exports = {
    envioTokenDB,
    envioTokenCookie,
    verificacionTokenDB,
    verificacionTokenCookie
}