const Medico = require("../models/Medico");
const getMedicos = async( req, res ) => {

    const medicos = await Medico.find()
                                  .populate( 'usuario' , 'nombre img')
                                  .populate( 'hospital' , 'nombre');
    try {
        res.json({
            ok:true,
            medicos
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })

    }
}

const crearMedico = async( req, res ) => {
    const uid = req.uid;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {

        const medicoDB = await medico.save();
        res.status(200).json({
            ok: true,
            msg: medicoDB
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrados'
        })
    }
}

const actualizarMedico = ( req, res ) => {
    res.json({
        ok:true,
        msg: 'actualizarMedico'
    })
}

const borrarMedico = ( req, res ) => {
    res.json({
        ok:true,
        msg: 'borrarMedico'
    })
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}