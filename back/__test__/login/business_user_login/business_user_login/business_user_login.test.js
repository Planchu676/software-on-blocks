const Business_user = require('../../../../src/business_user/business_user').Business_user
const business_user_repository = require('../../../../src/business_user/business_user_repository')
const login = require('../../../../src/login/business_user_login/business_user_login/business_user_login').login
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const signup = require('../../../../src/login/business_user_login/business_user_signup/business_user_signup').signup

describe("login service test", () => {

    test("log in with existing user data", async () =>{
        user_params = {
            name: "Roberto Carlos",
            email: "rc@gmail.com",
            password: "testpassword123"
        }
        await Business_user.sync()
        dotenv.config()
        await signup(user_params)

        token = await login(user_params.email, user_params.password)
        created_user = await business_user_repository.find_by_email("rc@gmail.com")

        decoded_token = jwt.verify(token, process.env.TOKEN_SECRET)
        expect(decoded_token.business_user_id).toStrictEqual(created_user.id)

        await Business_user.destroy({
            where: {
                email: "rc@gmail.com"
            }
        })
    })
})