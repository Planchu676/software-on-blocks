const Business_user_repository = require('../../src/business_user/business_user_repository')
const Business_user = require('../../src/business_user/business_user').Business_user

describe("User repository tests", () => {
    beforeEach( async () =>{
        user_params = {
            name: "Roberto Carlos",
            email: "rc@gmail.com",
            password: "testpassword123"
        }
        await Business_user.sync()
    })

    afterEach( async () =>{
        await Business_user.destroy({
            where: {
                email: "rc@gmail.com"
            }
        })
    })
    
    test("creating a valid user", async () =>{
        const created_user = await Business_user_repository.create(user_params)
        const retrieved_user = await Business_user.findOne({
            where: {
                name: "Roberto Carlos",
                email: "rc@gmail.com",
                password: "testpassword123"
            }
        })
        expect(created_user.toJSON()).toStrictEqual(retrieved_user.toJSON())
    })

    test("finding an existing user by id", async () =>{
        const created_user = await Business_user.create(user_params)
        const retrieved_user = await Business_user_repository.find_by_id(created_user.id)
        expect(retrieved_user.toJSON()).toStrictEqual(created_user.toJSON())
    })

    test("finding an existing user by email", async () =>{
        const created_user = await Business_user.create(user_params)
        const retrieved_user = await Business_user_repository.find_by_email(created_user.email)
        expect(retrieved_user.toJSON()).toStrictEqual(created_user.toJSON())
    })
})