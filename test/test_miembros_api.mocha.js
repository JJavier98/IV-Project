/*const app = require('../src/index')
const supertest = require('supertest')
const request = supertest(app.app)
var exec = require('child_process').exec;

var miembro =   {
    "nombre": "Pepe",
    "apellido": "López",
    "der": "DER_1",
    "comunidad": "Com_1"
};

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

describe('POST /api/member/dni', () => {
    it('should insert a new member in the db', async () => {
        await execShellCommand('cat db/default.json > db/energy.json')

        request.post('/api/member/456')
        .set('Accept', /json/)
        .send(miembro)
        .then( response => {
            expect(response.statusCode).toBe(201);
            expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
        }).catch(error => {console.error(error)});
    })
    app.server.close();
})

describe('GET /api/members', () => {
    it('should get all members of the db', async done => {

        request.get('/api/members')
        .then( response => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
        }).catch(error => {console.error(error)});
        done();
    })
    app.server.close()
})

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
            expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
            expect(response.body).toEqual(miembro);
        }).catch(error => {console.error(error)});
        done()
    })
    app.server.close()
})


execShellCommand('cat db/default.json > db/energy.json')*/