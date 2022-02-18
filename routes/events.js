const { Router } = require('express');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');
const { getEvents, newEvent, updateEvent, deleteEvent } = require('../controllers/events');
const validarCampos = require('../middlewares/validar-campos');
const { validarToken } = require('../middlewares/validar-jwt');


router = Router();
router.use(validarToken);

router.get('/', getEvents);

router.post('/new', 
    [
        check('title', 'El title es obligatorio').not().isEmpty(),
        check('start', 'El startDate es obligatorio').custom( isDate ),
        check('end', 'El endDate es obligatorio').custom( isDate ),
        validarCampos
    ],
    newEvent
);

router.put('/:id', 
    [
        check('title', 'El title es obligatorio').not().isEmpty(),
        check('start', 'El startDate es obligatorio').custom( isDate ),
        check('end', 'El endDate es obligatorio').custom( isDate ),
        validarCampos
    ],    
    updateEvent
);

router.delete('/:id', deleteEvent);

module.exports = router;