import jwt  from "jsonwebtoken";
import bcrypt  from "bcryptjs";
import  { prisma }   from "../db.js";

const registro = async(req,res,next) => {
    try{
        const { nombre, email, password, rol } = req.body;

        const usuarioExistente = await prisma.usuario.findUnique({
            where: {email}
        });

        if(usuarioExistente)
            return res.status(400).json({error: "El email ya está en uso"});

        const passwordHash = await bcrypt.hash(password, 10);

        const usuario = await prisma.usuario.create({
            data:{
                nombre,
                email,
                password: passwordHash,
                rol : rol || "user"
            }
        });
        res.status(201).json(usuario);

    }catch(error){
        next(error);
    }
}


const login = async(req,res,next) => {
    try{

        const { email, password } = req.body;

        const usuario = await prisma.usuario.findUnique({
            where: {email}
        });

        if(!usuario){
            return res.status(400).json({error: "Credenciales invalidas"});
        }

        const passwordValido = await bcrypt.compare(password, usuario.password);

        if(!passwordValido){
            return res.status(400).json({error: "Credenciales invalidas"});
        }

        const token = jwt.sign({id: usuario.id, rol: usuario.rol}, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.json({token});

    }catch(error){
        next(error);
    }
}