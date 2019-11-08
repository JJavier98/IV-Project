const app = require('../src/index')
const supertest = require('supertest')
const request = supertest(app.app)

describe('GET /api/members', () => {
    it('should get all members of the db', (done) => {
        request.get('/api/members')
        .expect('content-type',/json/)
        .expect(200, done)
    })
})

describe('GET/POST /api/member/dni', () => {
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

    test('should get a specific member of the db', async done => {
        request.get('/api/member/12345678W').then( response => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
            expect(response.body).toEqual(miembro);
        }).catch(error => {console.error(error)});
        done()
    })
    app.server.close()
})
/*
describe('POST /api/member/dni', () => {
    var miembro = {nombre: 'Pepe',apellido: 'López',der: 'DER_1',comunidad: 'Com_1'};

    test('should insert a new member in the db', async () => {
        request.post('/api/member/11111111W')
        .type('form')
        .send({nombre: "Pepe",apellido: "López",der: "DER_1",comunidad: "Com_1"})
        .then( response => {
            expect(response.statusCode).toBe(201);
            expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
        }).catch(error => {console.error(error)});
        app.server.close();
    })
})
*/