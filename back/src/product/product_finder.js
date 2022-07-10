product_repository = require('./product_repository')

exports.find_all_in_lists_of_x_elements = async (elements_per_list) => {
    products = await product_repository.find_all()
    return reformat_in_lists_of_x_elements(products, elements_per_list)
}

exports.find_by_id_in_lists_of_x_elements = async (elements_per_list, id) => {
    products = await product_repository.find_by_id(id)
    return reformat_in_lists_of_x_elements(products, elements_per_list)
}

exports.find_by_name_in_lists_of_x_elements = async (elements_per_list, name) => {
    products = await product_repository.find_by_name(name)
    return reformat_in_lists_of_x_elements(products, elements_per_list)
}

exports.find_all_for_business_id = async (elements_per_list, business_id) => {
    products = await product_repository.find_by_business_id(business_id)
    console.log(products)
    return reformat_in_lists_of_x_elements(products, elements_per_list)
}

reformat_in_lists_of_x_elements = (list, elements_per_list) => {
    number_of_sublists = ~~(list.length/elements_per_list)

    if (number_of_sublists != elements_per_list){
        number_of_sublists = number_of_sublists + 1
    }

    list = new Array(number_of_sublists)
    for (let i = 0; i < number_of_sublists; i++) {
        list[i] = []

        for (let j = 0; j < elements_per_list; j++){
            list[i].push(products.shift())
        }
      }
      return list
}