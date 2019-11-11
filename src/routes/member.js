module.exports = (app) => {
    // Bibliotecas
    const Miembro     = require('../miembro.js');
    const bodyParser  = require('body-parser');
    const dbFunc      = require('../functions.js');

    var urlencodedParser = bodyParser.urlencoded({extended:true})
    app.locals.miembros = dbFunc.db.get('miembros').value()
    app.locals.ders = dbFunc.db.get('der').value()
    app.locals.comunidades = dbFunc.db.get('comunidades').value()

    /**
     * @swagger
     * /member:
     *      get:
     *          description: Obtiene HTML que muestra los miembros registrados y da
     *                     la opción de registrar nuevos
     *          summary: GET and POST members
     *          operationId: GETmemberHTML
     *          responses:
     *              '200':
     *                  description: Success. Muestra la página correctamente.  
     */
    app.get('/member', (req, res) => {
        res.render(__dirname+'/../views/members.ejs', {
            title: 'Miembros'
        })
    });

    /**
     * @swagger
     * /member:
     *      post:
     *          description: Intenta crear un nuevo miembro con los datos introducidos
     *                      en el formulario
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
     *                      LetraDNI:
     *                          type: string
     *                          description: letra del dni
     *                          minimum: 1
     *                          maximum: 1
     *                      nombre:
     *                          type: string
     *                      Apellido:
     *                          type: string
     *                          description: Si aportamos como apellido 'null' o 'undefined' se
     *                              registrará el usuario sin el apellido
     *                      DER:
     *                          type: string
     *                          description: Nombre del dispositivo energético que posee el miembro.
     *                              Debe existir en la base de datos.
     *                      Comunidad:
     *                          type: string
     *                          description: Nombre de la comunidad a la que pertenece el miembro.
     *                              Debe existir en la base de datos.
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

    /**
     * @swagger
     * /api/member:
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
     *                      codigo:
     *                          type: number
     *                      mensaje:
     *                          type: object
     */
    app.get('/api/member', (req, res) => {
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
     *      responses:
     *          "200":
     *              description: Success. Obtiene el miembro de la base
     *                          de datos y lo devuelve.
     *              schema:
     *                  type: object
     *                  properties:
     *                      error:
     *                          type: boolean
     *                      codigo:
     *                          type: number
     *                      mensaje:
     *                          type: object
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
     * /api/member/{dni}/{nombre}/{apellido}/{der}/{comunidad}:
     *  post:
     *      description: Intenta crear un nuevo miembro con los parámetros introducidos
     *      summary: Crea un nuevo miembro
     *      operationId: POSTMembersURL
     *      parameters:
     *        - in: path
     *          name: dni
     *          required: true
     *          type: string
     *        - in: path
     *          name: nombre
     *          required: true
     *          type: string
     *        - in: path
     *          name: apellido
     *          required: true
     *          type: string
     *          description: Si aportamos como apellido "null" o "undefined" se
     *                      registrará el usuario sin el apellido
     *        - in: path
     *          name: der
     *          required: true
     *          type: string
     *          description: Dispositivo energético que posee el miembro
     *        - in: path
     *          name: comunidad
     *          required: true
     *          type: string
     *          description: Comunidad a la que pertenece el miembro
     *      responses:
     *          "201":
     *              description: Success. Consigue crear el nuevo miembro
     *              schema:
     *                  type: object
     *                  properties:
     *                      error:
     *                          type: boolean
     *                      codigo:
     *                          type: number
     *                      mensaje:
     *                          type: object
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
        var nuevo_miembro = new Miembro(req.params.dni, parametros.nombre, apellido, parametros.der, parametros.comunidad);
        var resultado = dbFunc.insertDB(nuevo_miembro);
        respuesta = {
            error: resultado[0],
            codigo: resultado[1],
            mensaje: resultado[2]
        }

        res.status(resultado[1]).send(respuesta);
    });
}