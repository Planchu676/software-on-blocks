const User_repository = require('../../src/user/user_repository')
const User = require('../../src/user/user').User

describe("User repository tests", () => {
    beforeEach( async () =>{
        user_params = {
            name: "Roberto Carlos",
            email: "rc@gmail.com",
            password: "testpassword123"
        }
        await User.sync()
    })

    afterEach( async () =>{
        await User.destroy({
            where: {
                email: "rc@gmail.com"
            }
        })
    })
    
    test("creating a valid user", async () =>{
        const created_user = await User_repository.create(user_params)
        const retrieved_user = await User.findOne({
            where: {
                email: "rc@gmail.com",
            }
        })
        expect(created_user.toJSON()).toStrictEqual(retrieved_user.toJSON())
    })

    test("finding an existing user by id", async () =>{
        const created_user = await User.create(user_params)
        const retrieved_user = await User_repository.find_by_id(created_user.id)
        expect(retrieved_user.toJSON()).toStrictEqual(created_user.toJSON())
    })

    test("finding an existing user by email", async () =>{
        const created_user = await User.create(user_params)
        const retrieved_user = await User_repository.find_by_email(created_user.email)
        expect(retrieved_user.toJSON()).toStrictEqual(created_user.toJSON())
    })
})