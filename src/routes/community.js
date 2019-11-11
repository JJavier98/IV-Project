module.exports = (app) => {
    // Bibliotecas
    const bodyParser  = require('body-parser');
    const dbFunc      = require('../functions.js');
    const Comunidad     = require('../comunidad');

    var urlencodedParser = bodyParser.urlencoded({extended:true});
    app.locals.miembros = dbFunc.db.get('miembros').value();
    app.locals.ders = dbFunc.db.get('der').value();
    app.locals.comunidades = dbFunc.db.get('comunidades').value();

    // Routes
    /**
     * @swagger
     * /community:
     *      get:
     *          description: Obtiene HTML que muestra las comunidades registradas y da
     *                     la opción de registrar nuevas y borrar o actualizar las existentes
     *          summary: GET and POST communities
     *          operationId: getCommunitiesHTML
     *          responses:
     *              '200':
     *                  description: Success. Muestra la página correctamente.  
     */
    app.get('/community', (req, res) => {
        res.render(__dirname+'/../views/communities.ejs', {
            title: 'Comunidades'
        })
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
    app.get('/api/community', (req, res) => {
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
     * /api/community/name/{name}:
     *  get:
     *      description: Obtiene la comunidad cuyo nombre corresponde con el pasado como parámetro.
     *      summary: Obtiene una comunidad en específico
     *      operationId: getComunidadID
     *      parameters:
     *        - in: path
     *          name: name
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
    app.get('/api/community/name/:name', (req, res, next) => {
        var dato = dbFunc.db.get('comunidades').find({name: req.params.name}).value();
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
     * /api/community/{name}/{desc}/{latitud}/{longitud}/{gestor_dni}:
     *  post:
     *      description: Intenta crear una nueva comunidad con los parámetros introducidos comprobando que no hay conflictos con las ya existentes
     *      summary: Crea una nueva comunidad
     *      operationId: postCommunityURL
     *      parameters:
     *        - in: path
     *          name: name
     *          required: true
     *          type: string
     *        - in: path
     *          name: desc
     *          required: true
     *          type: string
     *        - in: path
     *          name: latitud
     *          required: true
     *          type: number
     *        - in: path
     *          name: longitud
     *          required: true
     *          type: number
     *        - in: path
     *          name: gestor_dni
     *          required: true
     *          type: string
     *          description: DNI del gestor a cargo de la comunidad. Debe existir en la DB.
     *      responses:
     *          "201":
     *              description: Success. Consigue crear la nueva comunidad
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
    app.post('/api/community/:name/:desc/:latitud/:longitud/:gestor_dni', (req, res) => {
        var parametros = req.params;
        var nueva_comunidad = new Comunidad(parametros.name, parametros.desc, parametros.latitud, parametros.longitud, parametros.gestor_dni);
        var resultado = dbFunc.insertDB(nueva_comunidad);
        respuesta = {
            error: resultado[0],
            codigo: resultado[1],
            mensaje: resultado[2]
        }

        res.status(resultado[1]).send(respuesta);
    });

    app.post('/api/community/:name/add-member/:dni', (req, res, next) => {
        var comunidad = dbFunc.db.get('comunidades').find({name: req.params.name}).value();
        var miembro = dbFunc.db.get('miembros').find({dni: req.params.dni}).value();
        var nuevos_miembros = comunidad.miembros;
        nuevos_miembros[miembro.dni] = miembro;

        var nueva_com = new Comunidad(comunidad.name, comunidad.desc, comunidad.latitud, comunidad.longitud, comunidad.gestor_dni, nuevos_miembros);
        updateDB(nueva_comunidad);

        next()
    });
}