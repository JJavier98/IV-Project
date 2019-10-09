// Bibliotecas
const { Router } = require('express');
const router = Router();

// Routes
router.get('/', (req, res) => {
    var data = {
        "name": "Jota",
        "age": 21
    };
    res.json(data);
});

// Export
module.exports = router;