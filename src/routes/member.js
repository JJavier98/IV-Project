module.exports = (app) => {
    // Bibliotecas
    const Miembro     = require('../miembro.js');
    const bodyParser  = require('body-parser');
    const dbFunc      = require('../functions.js');

    var urlencodedParser = bodyParser.urlencoded({extended:true})
    app.locals.miembros = dbFunc.db.get('miembros').value()
    app.locals.ders = dbFunc.db.get('der').value()
    app.locals.comunidades = dbFunc.db.get('comunidades').value()

    /* DE MOMENTO QUEDA INUTILIZADO
    /**
     * @ swagger
     * /member:
     *      get:
     *          description: Obtiene HTML que muestra los miembros registrados y da
     *                     la opción de registrar nuevos
     *          summary: GET and POST members
     *          operationId: GETmemberHTML
     *          responses:
     *              '200':
     *                  description: Success. Muestra la página correctamente.  
     *
     * 
    app.get('/member', (req, res) => {
        res.render(__dirname+'/../views/members.ejs', {
            title: 'Miembros'
        })
    });
    */

    /**
     * @ swagger
     * /member:
     *      post:
     *          description: Intenta crear un nuevo miembro con los datos introducidos en el 
     *                          cuerpo del 'request'
     *          summary: Crea un nuevo miembro
     *          operationId: POSTMembersHTML
     *          parameters:
     *            - in: body
     *              name: miembro
     *              description: miembro a crear
     *              schema:
     *                  type: object
     *                  required:
     *                      - DNI
     *                      - LetraDNI
     *                      - nombre
     *                      - Apellido
     *                      - DER
     *                      - Comunidad
     *                  properties:
     *                      DNI:
     *                          type: integer
     *                          description: número de dni sin letra
     *                          example: 74764195
     *                      LetraDNI:
     *                          type: string
     *                          description: letra del dni
     *                          minimum: 1
     *                          maximum: 1
     *                          example: W
     *                      nombre:
     *                          type: string
     *                          example: Paco
     *                      Apellido:
     *                          type: string
     *                          description: Si aportamos como apellido 'null' o 'undefined' se
     *                              registrará el usuario sin el apellido
     *                          example: García
     *                      DER:
     *                          type: string
     *                          description: Nombre del dispositivo energético que posee el miembro.
     *                              Debe existir en la base de datos.
     *                          example: DER_1
     *                      Comunidad:
     *                          type: string
     *                          description: Nombre de la comunidad a la que pertenece el miembro.
     *                              Debe existir en la base de datos.
     *                          example: Com_1
     *          responses:
     *              '200':
     *                  description: Success. Consigue crear el nuevo miembro
     *              '201':
     *                  description: Success. Consigue crear el nuevo miembro
     *              '404':
     *                  description: Error. La comunidad o el DER asignado al miembro
     *                              no existen en la base de datos.
     *              '409':
     *                  description: Error. Ya existe un miembro en la DB con el DNI
     *                              proporcionado.
     *              '400':
     *                  description: Error. Algunos atributos de miembro no son válidos.
     */

    /* DE MOMENTO QUEDA INUTILIZADO
    app.post('/member', urlencodedParser, (req, res) => {
        var data = req.body;
        var apellido;
        var dni = (data.DNI).toString() + (data.LetraDNI).toUpperCase();        

        if (data.Apellido == '') {
            apellido = undefined;
        }
        else {
            apellido = data.Apellido;
        }

        var nuevo_miembro = new Miembro(dni, data.nombre, apellido, data.DER, data.Comunidad);
        var resultado = dbFunc.insertDB(nuevo_miembro);
        

        res.status(resultado[1]).redirect('/member');
    });
    */

    /**
     * @swagger
     * /api/members:
     *  get:
     *      description: Obtiene una lista con todos los miembros en formato JSON
     *      summary: Obtiene todos los miembros
     *      operationId: GETMembers
     *      responses:
     *          "200":
     *              description: Success. Obtiene la lista de miembros de la base
     *                          de datos y la devuelve.
     *              schema:
     *                  type: object
     *                  properties:
     *                      error:
     *                          type: boolean
     *                          example: false
     *                      codigo:
     *                          type: number
     *                          example: 200
     *                      mensaje:
     *                          type: object
     *                          example: [
     *                                      {
                                                "dni": "12345678W",
                                                "name": "Pepe",
                                                "last_name": "'Apellido no aportado'",
                                                "DER_name": "DER_1",
                                                "community_name": "Com_1",
                                                "gestor": false
                                            }
                                        ]
     */
    app.get('/api/members', (req, res) => {
        var dato = app.locals.miembros;
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: dato
        }
        res.send(respuesta);
    });
    
    /**
     * @swagger
     * /api/member/{dni}:
     *  get:
     *      description: Obtiene el miembro en específico cuyo DNI coincide con el
     *                  dni pasado como parámetro.
     *      summary: Obtiene un miembro en específico
     *      operationId: GETMemberID
     *      parameters:
     *        - in: path
     *          name: dni
     *          required: true
     *          type: string
     *          example: 12345678W
     *      responses:
     *          "200":
     *              description: Success. Obtiene el miembro de la base
     *                          de datos y lo devuelve.
     *              schema:
     *                  type: object
     *                  properties:
     *                      error:
     *                          type: boolean
     *                          example: false
     *                      codigo:
     *                          type: number
     *                          example: 200
     *                      mensaje:
     *                          type: object
     *                          example: {
                                            "dni": "12345678W",
                                            "name": "Pepe",
                                            "last_name": "'Apellido no aportado'",
                                            "DER_name": "DER_1",
                                            "community_name": "Com_1",
                                            "gestor": false
                                        }
     *          "404":
     *              description: Error. No existe ningún miembro con el DNI
     *                          especificado.
     */
    app.get('/api/member/:dni', (req, res, next) => {
        var dato = dbFunc.db.get('miembros').find({dni: req.params.dni}).value();
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: dato
        }

        if(dato != undefined) {
            res.status(200).send(respuesta);
        }
        else {
            respuesta = {
                error: true,
                codigo: 404,
                mensaje: 'Miembro no encontrado'
            }
            res.status(404).send(respuesta)
        }
    });

    /**
     * @swagger
     * /api/member/{dni}:
     *  post:
     *      description: Intenta crear un nuevo miembro con los parámetros introducidos
     *      summary: Crea un nuevo miembro
     *      operationId: POSTMembersURL
     *      parameters:
     *        - in: path
     *          name: dni
     *          required: true
     *          type: string
     *          example: 87654321W
     *        - in: body
     *          name: miembro
     *          description: Member to create
     *          schema:
     *              type: object
     *              required:
     *                  - nombre
     *                  - apellido
     *                  - der
     *                  - comunidad
     *              example: {
                                "nombre": "Pepe",
                                "apellido": "'Apellido no aportado'",
                                "der": "DER_1",
                                "comunidad": "Com_1"
                            }
     *          properties:
     *              nombre:
     *                  type: string
     *                  example: Pepe
     *              apellido:
     *                  type: string
     *                  description: Si aportamos como apellido "null" o "undefined" se
     *                      registrará el usuario sin el apellido
     *                  example: López
     *              der:
     *                  type: string
     *                  description: Dispositivo energético que posee el miembro
     *                  example: DER_1
     *              comunidad:
     *                  type: string
     *                  description: Comunidad a la que pertenece el miembro
     *                  example: Com_1
     *      responses:
     *          "201":
     *              description: Success. Consigue crear el nuevo miembro
     *              schema:
     *                  type: object
     *                  properties:
     *                      error:
     *                          type: boolean
     *                          example: false
     *                      codigo:
     *                          type: number
     *                          example: 200
     *                      mensaje:
     *                          type: object
     *                          example: {
                                            "dni": "12345678W",
                                            "name": "Pepe",
                                            "last_name": "'Apellido no aportado'",
                                            "DER_name": "DER_1",
                                            "community_name": "Com_1",
                                            "gestor": false
                                        }
     *          "404":
     *              description: Error. La comunidad o el DER asignado al miembro
     *                          no existen en la base de datos.
     *          "409":
     *              description: Error. Ya existe un miembro en la DB con el DNI
     *                          proporcionado.
     *          "400":
     *              description: Error. Algunos atributos de miembro no son válidos.
     */
    app.post('/api/member/:dni', (req, res) => {
        var parametros = req.body;
        var apellido = 'Apellido no aportado'

        if (parametros.apellido != 'null' && parametros.apellido != 'undefined') {
            apellido = parametros.apellido
        }
        var nuevo_miembro = new Miembro(req.params.dni, parametros.nombre, apellido,
            parametros.der, parametros.comunidad);
        var resultado = dbFunc.insertDB(nuevo_miembro);
        respuesta = {
            error: resultado[0],
            codigo: resultado[1],
            mensaje: resultado[2]
        }

        res.status(resultado[1]).send(respuesta);
    });
}