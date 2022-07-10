const request = require('supertest')
const app = require('../../../../index').app
const Business_user = require('../../../../src/business_user/business_user').Business_user

describe('business user login api test', () => {
    beforeEach(async () => {
        buser_params = {
            email: 'jjs@gmail.com',
            name: 'Matías Ríos',
            password: 'contraseñasegura123'
        }
        await Business_user.sync()

    })

    test('non existing user', async () => {
        const response = await request(app)
                                .post('/business/login')
                                .send({
                                    email: 'jjs@gmail.com',
                                    password: "contraseñasegura123"
                                })

        expect(response.body.error).not.toBe(null)
    })

    test('existing user', async () => {
        business_user = await Business_user.create(buser_params)
        
        const response = await request(app)
                                .post('/business/login')
                                .send({
                                    email: 'jjs@gmail.com',
                                    password: "contraseñasegura123"
                                })

        expect(response.body.jwt).not.toBe(null)
        await Business_user.destroy({
            where: {
                email: "jjs@gmail.com"
            }
        })
    })                                
})