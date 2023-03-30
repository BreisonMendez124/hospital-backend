const { Schema, model } = require('mongoose');

const MedicoSchema = Schema({

    nombre:{
        type: String,
        required: true
    },
    img:{
        type: String
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    hospital:{
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    },

}, { collection: 'Medicos' });

//
MedicoSchema.method('toJSON',function(){
    const { __v , ...object } = this.toObject();
    return object;
})

//Mongose le coloca el plurar a la nombre del modelo , por defecto se basa en el idioma ingles like user -> users
module.exports = model('Medico', MedicoSchema);