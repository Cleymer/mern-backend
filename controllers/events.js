const Event = require('../models/Event');

const getEvents = async (req, res) => {

    //const eventos = await Event.find({user: req.uid }).populate('user', 'name');
    const eventos = await Event.find().populate('user', 'name');

    res.status(200).json({
        ok: true,
        eventos
    })

}

const newEvent = async (req, res) => {

    const evento = new Event( req.body );

    try {
        
        evento.user = req.uid;

        const saveEvent = await evento.save();
        
        res.status(201).json({
            ok: true,
            evento: saveEvent
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }

    

}

const updateEvent = async (req, res) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        
        const evento = await Event.findById(eventoId);

        if(!evento){

            return res.status(404).json({
                ok:false,
                msg: 'No se ha encontrado el evento'
            });
        }

        if(evento.user.toString()!==uid){

            return res.status(401).json({
                ok:false,
                msg: 'No tiene permiso para realizar esa acción'
            });

        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updateEvent = await Event.findByIdAndUpdate(eventoId, newEvent, {new: true});

        res.status(200).json({
            ok: true,
            evento: updateEvent
        })

    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: 'No se pudo realizar'
        })
    }

    

}

const deleteEvent = async (req, res) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        
        const evento = await Event.findById(eventoId);

        if(!evento){

            return res.status(404).json({
                ok:false,
                msg: 'No se ha encontrado el evento'
            });
        }

        if(evento.user.toString()!==uid){

            return res.status(401).json({
                ok:false,
                msg: 'No tiene permiso para realizar esa acción'
            });

        }

        await Event.findByIdAndDelete(eventoId);

        res.status(200).json({
            ok: true,
            msg: 'Se ha eliminado'
        })

    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: 'No se pudo eliminar'
        })
    }

}

module.exports = {
    getEvents,
    newEvent,
    updateEvent,
    deleteEvent
}