const request = require('supertest')
const app = require('../../../../index').app
const User = require('../../../../src/user/user').User

describe('user login api test', () => {
    beforeEach(async () =>{
        user_params = {
            email: 'jjs@gmail.com',
            name: 'Matías Ríos',
            password: 'contraseñasegura123'
        }
        await User.sync()
    })

    afterEach(async () =>{
        await User.destroy({
            where: {
                email: "jjs@gmail.com"
            }
        })
    })

    test('non existing user', async () => {
        const response = await request(app)
                                .post('/login')
                                .send({
                                    email: user_params.email,
                                    password: user_params.password
                                })

        expect(response.body.error).not.toBe(null)
    })

    test('existing user', async () => {
        await User.create(user_params)
        const response = await request(app)
                                .post('/login')
                                .send({
                                    email: user_params.email,
                                    password: user_params.password
                                })

        expect(response.body.jwt).not.toBe(null)
    })
})