// Bibliotecas
const { Router } = require('express');
const router = Router();

// Routes
router.get('/', (req, res) => {
    res.render(__dirname+'/../views/index.ejs', {
        title: 'GCE-API'
    })
});


// Export
module.exports = router;