const User_repository = require('../../../../src/user/user_repository')
const User = require('../../../../src/user/user').User
const signup = require('../../../../src/login/user_login/user_signup/user_signup').signup
const crypto = require('crypto')

describe("signup service test", () => {

    test("sign up with non existing email", async () =>{
        user_params = {
            name: "Roberto Carlos",
            email: "rc@gmail.com",
            password: "testpassword123"
        }
        await User.sync()

        await signup(user_params)

        const retrieved_user = await User_repository.find_by_email(user_params.email)
        password_hash = crypto.createHash('sha1')
                                .update(user_params.password)
                                .digest('hex')
        expect(retrieved_user.password).toBe(password_hash)

        await User.destroy({
            where: {
                email: "rc@gmail.com"
            }
        })
    })
})