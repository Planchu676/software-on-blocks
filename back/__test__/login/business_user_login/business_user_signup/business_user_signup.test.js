const Business_user_repository = require('../../../../src/business_user/business_user_repository')
const Business_user = require('../../../../src/business_user/business_user').Business_user
const signup = require('../../../../src/login/business_user_login/business_user_signup/business_user_signup').signup
const crypto = require('crypto')

describe("signup service test", () => {

    test("sign up with non existing email", async () =>{
        user_params = {
            name: "Incibe",
            email: "b2b@incibe.com",
            password: "k2z45TfG3"
        }
        await Business_user.sync()

        await signup(user_params)

        const retrieved_business_user = await Business_user_repository.find_by_email(user_params.email)
        password_hash = crypto.createHash('sha1')
                                .update(user_params.password)
                                .digest('hex')
        expect(retrieved_business_user.password).toBe(password_hash)

        await Business_user.destroy({
            where: {
                email: "b2b@incibe.com"
            }
        })
    })
})