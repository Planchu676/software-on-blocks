const product_finder = require('./product_finder')

exports.get = async (req, res, next) => {
    let list = null
    try {
        console.log(req.query)
        if (req.query.number_of_elements == null)
            number_of_elements = 10
        else
            number_of_elements = req.query.number_of_elements

        if(req.query.product_id != null){
            list = await product_finder.find_by_id_in_lists_of_x_elements(number_of_elements, req.query.product_id)
        }
        else if (req.query.product_name != null)
            list = await product_finder.find_by_name_in_lists_of_x_elements(number_of_elements, req.query.product_name)

        else if (req.query.business_user_id != null)
            list = await product_finder.find_all_for_business_id(number_of_elements, req.query.business_user_id)
            
        else    
            list = await product_finder.find_all_in_lists_of_x_elements(number_of_elements)

        res.send({list: list})
    }
    catch(err) {
        console.error(`Error while loging in`, err.message)
        next(err)
    }
}