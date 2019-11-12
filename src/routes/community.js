module.exports = async (app) => {
    // Bibliotecas
    const bodyParser  = require('body-parser');
    const dbFunc      = require('../functions.js');
    const Comunidad     = require('../comunidad');

    var urlencodedParser = bodyParser.urlencoded({extended:true});
    app.locals.miembros = await dbFunc.db.get('miembros').value();
    app.locals.ders = await dbFunc.db.get('der').value();
    app.locals.comunidades = await dbFunc.db.get('comunidades').value();

    // Routes
    /* DE MOMENTO QUEDA INUTILIZADO
    /**
     * @ swagger
     * /community:
     *      get:
     *          description: Obtiene HTML que muestra las comunidades registradas y da
     *                     la opción de registrar nuevas y borrar o actualizar las existentes
     *          summary: GET and POST communities
     *          operationId: getCommunitiesHTML
     *          responses:
     *              '200':
     *                  description: Success. Muestra la página correctamente.  
     *
    app.get('/community', (req, res) => {
        res.render(__dirname+'/../views/communities.ejs', {
            title: 'Comunidades'
        })
    });
    */
    
    /**
     * @swagger
     * /api/communities:
     *  get:
     *      description: Obtiene una lista con todos las comunidades en formato JSON
     *      summary: Obtiene todos las comunidades
     *      operationId: GETCommunities
     *      responses:
     *          "200":
     *              description: Success. Obtiene la lista de comunidades de la base
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
     *                          example: {
                                            "name": "Com_1",
                                            "desc": "Comunidad número 1",
                                            "latitud": 90,
                                            "longitud": 85,
                                            "gestor_dni": "00000000Y",
                                            "miembros": {
                                                "12345678W": {
                                                "dni": "12345678W",
                                                "name": "Pepe",
                                                "last_name": "'Apellido no aportado'",
                                                "DER_name": "DER_1",
                                                "community_name": "Com_1",
                                                "gestor": false
                                                },
                                                "00000000X": {
                                                    "dni": "00000000X",
                                                    "name": "Pepe",
                                                    "last_name": "López",
                                                    "DER_name": "DER_1",
                                                    "community_name": "Com_1",
                                                    "gestor": false
                                                }
                                            }
                                        }
     */
    app.get('/api/communities', async (req, res) => {
        var dato = app.locals.comunidades;
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: dato
        }
        res.send(respuesta);
    });

    /**
     * @swagger
     * /api/community/{name}:
     *  get:
     *      description: Obtiene la comunidad cuyo nombre corresponde con el pasado como parámetro.
     *      summary: Obtiene una comunidad en específico
     *      operationId: getComunidadID
     *      parameters:
     *        - in: path
     *          name: name
     *          required: true
     *          type: string
     *          example: Com_1
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
                                    "name": "Com_2",
                                    "desc": "Comunidad número 2",
                                    "latitud": 100,
                                    "longitud": 85,
                                    "gestor_dni": "00000000X",
                                    "miembros": {}
                                }
     *          "404":
     *              description: Error. No existe ningún miembro con el DNI
     *                          especificado.
     */
    app.get('/api/community/:name', async (req, res, next) => {
        var dato = await dbFunc.db.get('comunidades').find({name: req.params.name}).value();
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
                mensaje: 'Comunidad no encontrado'
            }
            res.status(404).send(respuesta)
        }
    });

    /**
     * @swagger
     * /api/community/{name}:
     *  post:
     *      description: Intenta crear una nueva comunidad con los parámetros introducidos
     *                  comprobando que no hay conflictos con las ya existentes
     *      summary: Crea una nueva comunidad
     *      operationId: postCommunityURL
     *      parameters:
     *        - in: path
     *          name: name
     *          required: true
     *          type: string
     *          example: Com_1
     *        - in: body
     *          name: comunidad
     *          description: comunidad a crear
     *          schema:
     *              type: object
     *              required:
     *                  - desc
     *                  - latitud
     *                  - nombre
     *                  - longitud
     *                  - gestor_dni
     *              properties:
     *                  desc:
     *                      type: string
     *                      description: breve descripción de la comunidad
     *                      example: Esta comunidad se dedica principalmente a la generación
     *                              de energía eléctrica por medio de placas solares.
     *                  latitud:
     *                      type: float
     *                      description: latitud geográfica a la que se encuentra la comunidad
     *                      example: 50
     *                  longitud:
     *                      type: float
     *                      description: longitud geográfica a la que se encuentra la comunidad
     *                      example: 40
     *                  gestor_dni:
     *                      type: string
     *                      description: DNI del gestor encargado de la comunidad
     *                      example: 00000000X
     *      responses:
     *          "201":
     *              description: Success. Consigue crear la nueva comunidad
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
                                            "name": "Com_2",
                                            "desc": "Comunidad número 2",
                                            "latitud": 100,
                                            "longitud": 85,
                                            "gestor_dni": "00000000X",
                                            "miembros": {}
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
    app.post('/api/community/:name', async (req, res) => {
        var parametros = req.body;
        var nueva_comunidad = new Comunidad(req.params.name, parametros.desc, parametros.latitud,
            parametros.longitud, parametros.gestor_dni);
        var resultado = await dbFunc.insertDB(nueva_comunidad);
        respuesta = {
            error: resultado[0],
            codigo: resultado[1],
            mensaje: resultado[2]
        }

        res.status(resultado[1]).send(respuesta);
    });

    /**
     * @swagger
     * /api/community/{name}/add-member/{dni}:
     *  put:
     *      description: Añade un miembro existente en la base de datos a una comunidad tambien 
     *                      existente
     *      summary: Añade un miembro a una comounidad
     *      operationId: addMemberToCommunity
     *      parameters:
     *        - in: path
     *          name: name
     *          required: true
     *          type: string
     *          example: Com_1
     *          description: nombre de la comunidad en la que se inserta el miembro
     *        - in: path
     *          name: dni
     *          required: true
     *          type: string
     *          example: 12345678W
     *          description: DNI del miembro a insertar
     *      responses:
     *          "201":
     *              description: Success. El miembro se une a la comunidad
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
                                            "name": "Com_1",
                                            "desc": "Comunidad número 1",
                                            "latitud": 90,
                                            "longitud": 85,
                                            "gestor_dni": "00000000Y",
                                            "miembros": {
                                                "12345678W": {
                                                "dni": "12345678W",
                                                "name": "Pepe",
                                                "last_name": "'Apellido no aportado'",
                                                "DER_name": "DER_1",
                                                "community_name": "Com_1",
                                                "gestor": false
                                                }
                                            }
                                        }
     *          "404":
     *              description: Error. La comunidad o el miembro no existen en la base de datos.
     */
    app.put('/api/community/:name/add-member/:dni', async (req, res) => {
        var comunidad = await dbFunc.db.get('comunidades').find({name: req.params.name}).value();
        var miembro = await dbFunc.db.get('miembros').find({dni: req.params.dni}).value();
        var nuevos_miembros = comunidad.miembros;
        nuevos_miembros[miembro.dni] = miembro;

        var nueva_comunidad = new Comunidad(comunidad.name, comunidad.desc, comunidad.latitud,
                                comunidad.longitud, comunidad.gestor_dni, nuevos_miembros);
        
        var resultado = await dbFunc.updateDB(nueva_comunidad);

        res.status(resultado[1]).send(resultado[2]);
    });

    /**
     * @swagger
     * /api/community/{name}:
     *  delete:
     *      description: Elimina una comunidad existente
     *      summary: Elimina una comunidad existente
     *      operationId: deleteCommunity
     *      parameters:
     *        - in: path
     *          name: name
     *          required: true
     *          type: string
     *          example: Com_1
     *          description: nombre de la comunidad que se va a eliminar
     *      responses:
     *          "200":
     *              description: Success. La comunidad se ha eliminado
     *          "404":
     *              description: Error. La comunidad no existe en la base de datos.
     */
    app.delete('/api/community/:name', async (req, res) => {
        var comunidad = await dbFunc.db.get('comunidades').find({name: req.params.name}).value();
        var nueva_comunidad = new Comunidad(comunidad.name, comunidad.desc, comunidad.latitud,
                                comunidad.longitud, comunidad.gestor_dni, comunidad.miembros);
        
        var resultado = await dbFunc.deleteXfromDB(nueva_comunidad);

        res.status(resultado[1]).send(resultado[2]);
    });
}