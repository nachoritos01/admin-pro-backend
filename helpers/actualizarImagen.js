const fs = require('fs');
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medicos');

const borrrarImagen =(pathViejo)=>{
    if (fs.existsSync( pathViejo)) {
        fs.unlinkSync( pathViejo);
    }
}

const actualizaImagen = async ( tipo, id, nombreArchivo) => {
    let pathViejo;

    switch(tipo){
        case 'medicos':

                const medico  =  await Medico.findById(id);

                if (!medico) {
                    console.log('No es un medico por id');
                    return false;
                }

                pathViejo = `./uploads/${tipo}/${medico.img}`;

                borrrarImagen(pathViejo);

                medico.img = nombreArchivo;
                await medico.save();

                return true;

            break;
        case 'hospitales':

                hospital  =  await Hospital.findById(id);

                if (!hospital) {
                    console.log('No es un hospital por id');
                    return false;
                }

                pathViejo = `./uploads/${tipo}/${hospital.img}`;

                borrrarImagen(pathViejo);

                hospital.img = nombreArchivo;
                await hospital.save();

                return true;
            break;
        case 'usuarios':
                
                const usuario  =  await Usuario.findById(id);
                console.log('usuario ',usuario);

                if (!usuario) {
                    console.log('No es un usuario por id');
                    return false;
                }

                pathViejo = `./uploads/${tipo}/${usuario.img}`;

                borrrarImagen(pathViejo);

                usuario.img = nombreArchivo;
                await usuario.save();

                return true;
            break;
    }

}

module.exports = {
    actualizaImagen
}