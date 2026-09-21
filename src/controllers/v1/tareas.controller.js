import  prisma  from "../../db.js";



const getTareas = async(req,res, next) => {
    try{
        const tareas = await prisma.tarea.findMany();
        res.json(tareas);
    }catch(error){
        next(error);
    }
}

const createTarea = async(req,res, next) => {
    const { titulo, UsuarioID } = req.body;

    try{
        const tarea = await prisma.tarea.create({
        data:{
            titulo,
            usuarioID
        }
    })
    res.status(201).json(tarea)

    }catch(error){
        next(error);
    }

}
