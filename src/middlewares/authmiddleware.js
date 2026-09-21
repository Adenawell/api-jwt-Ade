import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {

    try{
        const header = req.headers['authorization'];
        if(!header){
            return res.status(401).json({error: "Token no proporcionado"});
        }

        const token = header.split(' ')[1];
        if(!token){
            return res.status(401).json({error: "Token no proporcionado"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded;
        next();

    }catch(error){
        next(error);
    }
}

export const soloAdmin = (req, res, next) => {
    try{
        const { rol } = req.usuario;

        if(rol !== "admin"){
            return res.status(403).json({error: "Acceso denegado, solo administradores"});
        }
        next();

    }catch(error){
        next(error);
    }
}
