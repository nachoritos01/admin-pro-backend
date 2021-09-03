const { response } = require('express');
const path = require('path');
const fs = require('fs');

const Usuario = require('../models/usuario');

const { v4: uuidV4} = require('uuid');
const { actualizaImagen } = require('../helpers/actualizarImagen');



const fileUpload = async(req, res = response) => {
    const {tipo, id} = req.params;
    console.log(tipo, id);

    //Validar tipo

    const tiposValidos = [ 'hospitales', 'medicos', 'usuarios'];

    if ( !tiposValidos.includes(tipo)){
        return  res.json({
            ok: false,
            msj: 'No es un medico, usuario u hospital'
        });
    }
    //Validar que exista un archivo

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json(
            {
                ok: false,
                msj: 'No hay ningun archivo'
            }
        );
    }
    
    //Procesar la imagen

    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[ nombreCortado.length -1];

    //Validar extension

    const extencionesValidas = [ 'png', 'jpg', 'jpeg'];

    if( !extencionesValidas.includes(extensionArchivo)) {

        return res.status(400).json({
            ok: false,
            msj: 'Extension no valida'
        });

    }

    //Generar uuid

    const nombreArchivo = `${ uuidV4()}.${extensionArchivo}`;

    // Path para guardar la imagen

    const path = `./uploads/${tipo}/${nombreArchivo}`;

    file.mv( path, (err)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                msj: 'Error al mover la imagen'
            });

        }

        //Actualizar la base de datos

        actualizaImagen( tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msj: 'file Upload',
            nombreArchivo
        });
    });





}


const retornaImagen = ( req, res )=>{
    const {tipo, foto} = req.params;

    console.log( tipo, foto);

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    // Imagen por defecto

    if (fs.existsSync( pathImg)) {
        
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-imagen.jpg`);
         res.sendFile(pathImg);

    }




}

module.exports = {
    fileUpload,
    retornaImagen
    
}