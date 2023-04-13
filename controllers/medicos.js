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

const actualizarMedico = async( req, res ) => {

    const id = req.params.id;
    const uid = req.uid;

    
    try {
        const medico = Medico.findById( id );
        if( !medico ){

            return res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado por id'
            });

        }

    
    const cambiosMedicos = {
        ...req.body,
        usuario: uid
    };

    
    const medicoActualizado = await Medico.findByIdAndUpdate( id , cambiosMedicos , { new: true });


    return res.json({
        ok:true,
        msg: 'Medico actualizado',
        medico: medicoActualizado
    })
        
    } catch (error) {
        console.log( error )
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }




    
}

const borrarMedico = async( req, res ) => {
    const id = req.params.id;

    try {
        
        const medico = await Medico.findById( id );

        if( !medico ){
            return res.status(404).json({
                ok:true,
                msg: 'Medico no encontrado por id'
            })                
        }

        await Medico.findByIdAndDelete( id )

        return res.json({
            ok:true,
            msg: 'Medico eliminado'
        })
        
    } catch (error) {
        console.log( error )
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}