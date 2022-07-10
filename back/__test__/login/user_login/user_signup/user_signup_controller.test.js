const request = require('supertest')
const app = require('../../../../index').app
const User = require('../../../../src/user/user').User

describe('user signup api test', () => {
    beforeEach(async () =>{
        await User.sync()
    })
    
    afterEach( async () =>{
        await User.destroy({
            where: {
                email: "jjs@gmail.com"
            }
        })
    })

    test('non existing user', async () => {
        const response = await request(app)
                                .post('/signup')
                                .send({
                                    email: 'jjs@gmail.com',
                                    name: 'Matías Ríos',
                                    password: "contraseñasegura123"
                                })

        expect(response.body.isSuccess).toBe(true)

        retrieved_user = User.findOne({
            where: {
                email: "jjs@gmail.com"
            }
        })
        expect(retrieved_user).not.toBe(null)
    })

    test('existing user', async () => {
        await User.create({
            email: 'jjs@gmail.com',
            name: 'Matías Ríos',
            password: "contraseñasegura123"
        })
        
        const response = await request(app)
                                .post('/signup')
                                .send({
                                    email: 'jjs@gmail.com',
                                    name: 'Matías Ríos',
                                    password: "contraseñasegura123"
                                })

        expect(response.body.isSuccess).toBe(false)
    })                                   
})