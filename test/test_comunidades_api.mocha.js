const app = require('../src/index')
const supertest = require('supertest')
const request = supertest(app.app)
const encodings = require('iconv-lite/encodings')

var comunidad = {
    "desc": "Comunidad número 5",
    "latitud": 100,
    "longitud": 85,
    "gestor_dni": "00000000X"
}

function execShellCommand(cmd) {
    const exec = require('child_process').exec;
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.warn(error);
            }
            resolve(stdout? stdout : stderr);
        });
    });
}
execShellCommand('cat db/default.json > db/energy.json')

describe('POST /api/community/name', () => {
    it('should insert a new community in the db', async () => {
        //execShellCommand('cat db/default.json > db/energy.json')
        //.then(
        request.post('/api/community/Com_5')
        .send(comunidad)
        .set('Accept', 'application/json')
        .then( response => {
            expect(response.statusCode).toBe(201);
            expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
        }).catch(error => {console.error(error)})//.then(execShellCommand('cat db/default.json > db/energy.json'));
        app.server.close();
    })
})

describe('GET /api/communities', () => {
    it('should get all communities of the db', async () => {
        //execShellCommand('cat db/default.json > db/energy.json').then(
        request.get('/api/communities')
        .then( response => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
        }).catch(error => {console.error(error)})//.then(execShellCommand('cat db/default.json > db/energy.json'));
        app.server.close();
    })
})

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
        //execShellCommand('cat db/default.json > db/energy.json').then(
        request.get('/api/community/Com_4').then( response => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
            expect(response.body).toEqual(comunidad);
        }).catch(error => {console.error(error)})//.then(execShellCommand('cat db/default.json > db/energy.json'));
        done()
    })
    app.server.close()
})

describe('PUT /api/community/name/add-member/dni', () => {
    it('should insert a new community in the db', async () => {
        //execShellCommand('cat db/default.json > db/energy.json').then(
        request.put('/api/community/Com_2/add-member/12345678W')
        .then( response => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
        }).catch(error => {console.error(error)})//.then(execShellCommand('cat db/default.json > db/energy.json'));
    })
    app.server.close();
})

describe('DELETE /api/community/name', () => {
    it('should delete a community of the db', async () => {
        //execShellCommand('cat db/default.json > db/energy.json').then(
        request.delete('/api/community/Com_5')
        .then( response => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
        }).catch(error => {console.error(error)})//.then(execShellCommand('cat db/default.json > db/energy.json'));
    })
    app.server.close();
})