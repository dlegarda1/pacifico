 let users = [ 
    { id: 1, userName: 'Carlos', password: '123456' },
    { id: 2, userName: 'Maria', password: '246802' },
     ];

//funcion para autenticacion de password
const autenticar = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Se requiere autenticación' });
    }
    const base64Credentials = authHeader.split(' ')[1];    
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [userName, password] = credentials.split(':');    
    console.log(req.body);
    console.log('Usuario:', userName);
    console.log('Password:',password);
    const user = users.find(user => user.userName === userName);
    if (!user) {
        res.status(404).json({ message: `Usuario ${userName} no encontrado` });
    } else {
        if (user.password === password) {
            req.user = user;
            console.log("user"+req.user);
            next();
        } else {
            res.status(401).json({ message: `Contraseña incorrecta` });
        }
    }
};



module.exports = autenticar;