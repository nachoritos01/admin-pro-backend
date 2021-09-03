const { response } = require('express');
const bcrypt = require('bcryptjs');

const Hospital = require('../models/hospital');
const { generarJWT } = require('../helpers/jwt');


const getHospitales = async(req, res = response) => {

    const hospitales = await Hospital.find().populate('usuario', 'nombre img')

    res.json({
        ok: true,
        hospitales
    });

}

const crearHospital = async(req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }


}


const actualizarHospital = async (req, res = response) => {

    // TODO: Validar token y comprobar si es el Hospital correcto

    const uid = req.params.id;


    try {

        res.json({
            ok: true,
            msg: 'actualizar Hospital'
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}


const borrarHospital = async(req, res = response ) => {

    const uid = req.params.id;

    try {

        
        res.json({
            ok: true,
            msg: 'Hospital eliminado'
        });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }


}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}