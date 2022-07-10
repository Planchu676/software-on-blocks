const User = require('../../../../src/user/user').User
const user_repository = require('../../../../src/user/user_repository')
const login = require('../../../../src/login/user_login/user_login/user_login').login
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const signup = require('../../../../src/login/user_login/user_signup/user_signup').signup

describe("login service test", () => {

    test("log in with existing user data", async () =>{
        user_params = {
            name: "Roberto Carlos",
            email: "rc@gmail.com",
            password: "testpassword123"
        }
        await User.sync()
        dotenv.config()
        await signup(user_params)

        created_user = await user_repository.find_by_email("rc@gmail.com")
        token = await login(user_params.email, user_params.password)

        decoded_token = jwt.verify(token, process.env.TOKEN_SECRET)
        expect(decoded_token.id).toStrictEqual(created_user.id)

        await User.destroy({
            where: {
                email: "rc@gmail.com"
            }
        })
    })
})