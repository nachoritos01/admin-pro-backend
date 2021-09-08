const { response } = require('express');
const bcrypt = require('bcryptjs');

const Medico = require('../models/medicos');
const { generarJWT } = require('../helpers/jwt');


const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find()
    .populate('usuario', 'nombre img')
    .populate('hospital', 'nombre img');
    
    
    res.json({
        ok: true,
        medicos
    });
    
}

const crearMedico = async(req, res = response) => {
    
    console.log(req.body);
    const uid = req.uid;

    const medico = new Medico({
        usuario: uid,
        ... req.body
    });

    try {

        const medicoDB = await medico.save(); 

        res.json({
            ok: true,
            medico: medicoDB
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }


}


const actualizarMedico = async (req, res = response) => {

    // TODO: Validar token y comprobar si es el Medico correcto

    const id = req.params.id;
    const uid = req.uid;    

    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontro medico por id'
            });
        }

        const cambiosMedico = {
            ... req.body,
            usuario: uid
        };

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, {new: true});

        res.json({
            ok: true,
            msg: 'actualizar Medico',
            medico: medicoActualizado,
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}


const borrarMedico = async(req, res = response ) => {

    const id = req.params.id;

    try {

        const medico = await Medico.findById(id);

        if (!medico) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontro medico por id'
            });
        }

        await Medico.findByIdAndDelete(id);

        
        res.json({
            ok: true,
            msg: 'Medico eliminado'
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
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}