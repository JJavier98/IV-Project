// Bibliotecas
const { Router } = require('express');
const router = Router();

// Routes
router.get('/', (req, res) => {
    res.json({"Title": "Hello World"});
});

router.get('/test', (req, res) => {
    var data = {
        "name": "Jota",
        "age": 21
    };
    res.json(data);
});

// Export
module.exports = router;