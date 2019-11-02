// Bibliotecas
//var nano = require('nano')('http:localhost:5984');
const { check, validationResult } = require('express-validator');
const { Router } = require('express');

const router = Router();


// Routes
router.get('/', (req, res) => {
    console.log(req)
    var data = {
        "name": "Comunidad #1",
        "descripción": "Comunidad de paneles solares"
    };
    res.json(data);
});

router.put('/',[
    check('name', 'A community must have a name form by, at least, 5 characters').not().isEmpty().isString().isLength({min: 5}),
    check('desc', 'The community must have a description').not().isEmpty().isString(),
    ],
    (req, res) => {
        const errors = validationResult(req);

        //console.log(req.body);

        if(!errors.isEmpty())
        {
            return res.status(422).json(errors.array());
        }
        else
        {
            res.send('received');
        }
});

// Export
module.exports = router;