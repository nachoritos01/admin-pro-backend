const { Schema, model } = require('mongoose');


const HospitalSchema = Schema({

    nombre: {
        type: String,
        required: true
    },
   
    img: {
        type: String,
    },

    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, {collection: 'hospitales'});


HospitalSchema.method('toJSON', function() {
    // separa el valor de id y de v y los demas valores en object
    const { _id, __v , ...object } = this.toObject();
    //Creamos una nueva variable de retorno con el valor almacenadoi en _id
    object.uid = _id;
    /* {
        usuario: 61297c58b8ca0f2134648efd,
        nombre: 'hospital Merida',
        uid: 6129981641ec3a07bc4b4553
    } */
    return object;
})



module.exports = model( 'Hospital', HospitalSchema );
