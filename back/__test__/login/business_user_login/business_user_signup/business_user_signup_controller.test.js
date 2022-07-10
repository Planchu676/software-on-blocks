const request = require('supertest')
const app = require('../../../../index').app
const Business_user = require('../../../../src/business_user/business_user').Business_user

describe('business user signup api test', () => {
    beforeEach(async () =>{
        await Business_user.sync()
    })

    afterEach( async () =>{
        await Business_user.destroy({
            where: {
                email: "jjs@gmail.com"
            }
        })
    })

    test('non existing user', async () => {
        const response = await request(app)
                                .post('/business/signup')
                                .send({
                                    email: 'jjs@gmail.com',
                                    name: 'Matías Ríos',
                                    password: "contraseñasegura123"
                                })

        expect(response.body.isSuccess).toBe(true)

        retrieved_user = await Business_user.findOne({
            where: {
                email: "jjs@gmail.com"
            }
        })
        expect(retrieved_user).not.toBe(null)
    })

    test('existing user', async () => {
        try{
        await Business_user.create({
            email: 'jjs@gmail.com',
            name: 'Matías Ríos',
            password: "contraseñasegura123"
        })
    }
        catch(e){
            console.log(e)
        }
        const response = await request(app)
                                .post('/business/signup')
                                .send({
                                    email: 'jjs@gmail.com',
                                    name: 'Matías Ríos',
                                    password: "contraseñasegura123"
                                })

        expect(response.body.isSuccess).toBe(false)
    })                                   
})