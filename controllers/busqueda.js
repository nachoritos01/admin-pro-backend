const { response } = require('express');

const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medicos');
const { generarJWT } = require('../helpers/jwt');


const getTodo = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i')

    
   const [usuarios,hospitales, medicos] = await Promise.all([
        Usuario.find({ nombre: regex}),
        Hospital.find({ nombre: regex}),
        Medico.find({ nombre: regex}),

    ]);


    res.json({
        ok: true,
        usuarios,
        hospitales,
        medicos
    });

}

const getDocumentosColecction = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;
    const regex = new RegExp( busqueda, 'i')

    let data = [];

    
  /*  const [usuarios,hospitales, medicos] = await Promise.all([
        Usuario.find({ nombre: regex}),
        Hospital.find({ nombre: regex}),
        Medico.find({ nombre: regex}),

    ]);
 */
    switch(tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regex})
                         .populate('usuario', 'nombre img')
                         .populate('hospital', 'nombre img')
        break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regex});
        break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regex});
        break;
        default:
            return res.status(400).json({
                ok: false,
                msj: 'La tabla debe de ser medicos|hospitales| usuarios'
            });

        break;
    }

    res.json({
        ok: true,
        response: data
    });

}

module.exports = {
     getTodo,
     getDocumentosColecction
    
}