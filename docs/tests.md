## :ballot_box_with_check: Tests referentes a las historias de usuario
Los archivos donde se encuentran todos los tests referentes a las historias son [test de comunidades](https://github.com/JJavier98/IV-Project/blob/master/test/test_comunidades_api.mocha.js) y [test de miembros](https://github.com/JJavier98/IV-Project/blob/master/test/test_miembros_api.mocha.js). Los tests son realizados con [mocha](https://mochajs.org/) y la herramienta [supertest](https://www.npmjs.com/package/supertest) sobre express.

## Respecto a las comunidades
**Historia de usuario:** Poder crear nuevas comunidades eléctricas.
**Ruta:** POST /api/community/name
'_name_' hará referencia a la clave privada del objeto en la DB y en el cuerpo del mensaje nos encontraremos los demás parámetros como: _descripción, latitud, longitud, el dni de su gestor y la lista de miembros_.
```node
describe('POST /api/community/name', () => {
    it('should insert a new community in the db', async () => {
        request.post('/api/community/Com_5')
        .send(comunidad)
        .set('Accept', 'application/json')
        .then( response => {
            expect(response.statusCode).toBe(201);
            expect(response.headers['content-type'])
            .toBe('application/json; charset=utf-8');
        }).catch(error => {console.error(error)})
        app.server.close();
    })
})
```
**Historia de usuario:** Consultar todas comunidades eléctricas.
**Ruta:** GET /api/communities
```node
describe('GET /api/communities', () => {
    it('should get all communities of the db', async () => {
        request.get('/api/communities')
        .then( response => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type'])
            .toBe('application/json; charset=utf-8');
        }).catch(error => {console.error(error)})
        app.server.close();
    })
})
```
**Historia de usuario:** Consultar una única comunidad eléctrica.
**Ruta:** GET /api/communities/name
_'name'_ hace referencia a la comunidad que queremos consultar. Comprueba que al pedir la comunidad _'Com\_4'_ coincide con los datos de la variable comunidad declarada en el test.
```node
describe('GET /api/community/name', () => {
    var comunidad =   { "error": false,
                        "codigo": 200,
                        "mensaje": {
                            "name": "Com_4",
                            "desc": "Comunidad número 4",
                            "latitud": 100,
                            "longitud": 85,
                            "gestor_dni": "00000000X",
                            "miembros": {}
                          }
                    };

    it('should get a specific community of the db', async done => {
        request.get('/api/community/Com_4').then( response => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type'])
            .toBe('application/json; charset=utf-8');
            expect(response.body).toEqual(comunidad);
        }).catch(error => {console.error(error)})
        done()
    })
    app.server.close()
})
```
**Historia de usuario:** Actualizar una comunidad eléctrica añadiendo un nuevo miembro.
**Ruta:** PUT /api/community/name/add-member/dni
_'name'_ hace referencia a la comunidad que queremos modificar y _'dni'_ al miembro que vamos a añadir.
```node
describe('PUT /api/community/name/add-member/dni', () => {
    it('should insert a new community in the db', async () => {
        request.put('/api/community/Com_2/add-member/12345678W')
        .then( response => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type'])
            .toBe('application/json; charset=utf-8');
        }).catch(error => {console.error(error)})
    })
    app.server.close();
})
```
**Historia de usuario:** Eliminar una comunidad eléctrica.
**Ruta:** DELETE /api/community/name
_'name'_ hace referencia a la comunidad que queremos eliminar.
```node
describe('DELETE /api/community/name', () => {
    it('should delete a community of the db', async () => {
        request.delete('/api/community/Com_5')
        .then( response => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
        }).catch(error => {console.error(error)})
    })
    app.server.close();
})
```

## Respecto a los miembros

**Historia de usuario:** Crea un nuevo miembro y lo añade a la comunidad indicada en el body.
**Ruta:** POST /api/member/dni
_'dni'_ hace referencia al miembro que vamos a añadir.
```node
describe('POST /api/member/dni', () => {
    it('should insert a new member in the db', async () => {
        await execShellCommand('cat db/default.json > db/energy.json')

        request.post('/api/member/456')
        .set('Accept', /json/)
        .send(miembro)
        .then( response => {
            expect(response.statusCode).toBe(201);
            expect(response.headers['content-type'])
            .toBe('application/json; charset=utf-8');
        }).catch(error => {console.error(error)});
    })
    app.server.close();
})
```
**Historia de usuario:** Consultar todos los miembros.
**Ruta:** GTE /api/members
```node
describe('GET /api/members', () => {
    it('should get all members of the db', async done => {

        request.get('/api/members')
        .then( response => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type'])
            .toBe('application/json; charset=utf-8');
        }).catch(error => {console.error(error)});
        done();
    })
    app.server.close()
})
```
**Historia de usuario:** Consultar un miembro en específico.
**Ruta:** GTE /api/member/dni
_'dni'_ hace referencia al miembro que vamos a consultar. Comprueba que al pedir el miembro con dni _'12345678W'_ coincide con los datos de la variable miembro declarada en el test.
```node
describe('GET /api/member/dni', () => {
    var miembro =   {   "codigo": 200,
                        "error": false,
                        "mensaje": {
                            "dni": "12345678W",
                            "name": "Pepe",
                            "last_name": "'Apellido no aportado'",
                            "DER_name": "DER_1",
                            "community_name": "Com_1",
                            "gestor": false
                        }
                    };

    it('should get a specific member of the db', async done => {

        request.get('/api/member/12345678W')
        .then( response => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type'])
            .toBe('application/json; charset=utf-8');
            expect(response.body).toEqual(miembro);
        }).catch(error => {console.error(error)});
        done()
    })
    app.server.close()
})
```