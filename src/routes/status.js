// Bibliotecas
const { Router } = require('express');
const router = Router();

// Routes
router.get('/', (req, res) => {
    res
    .status(200)
    .send(
            {
            "status": "OK",
            "ejemplo": { 
                            "ruta": "/api/members",
                            "valor":{
                                        "error": false,
                                        "codigo": 200,
                                        "mensaje": [
                                            {
                                            "dni": "12345678W",
                                            "name": "Pepe",
                                            "last_name": "'Apellido no aportado'",
                                            "DER_name": "DER_1",
                                            "community_name": "Com_1",
                                            "gestor": false
                                            }
                                        ]
                                    }
                        }
            }
        )
});


// Export
module.exports = router;