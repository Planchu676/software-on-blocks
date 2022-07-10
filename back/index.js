const express = require('express');
const helmet = require('helmet');
const cors = require('cors')
const morgan = require('morgan');
const body_parser = require('body-parser')
const dotenv = require('dotenv')

const User = require('./src/user/user').User
const Business_user = require('./src/business_user/business_user').Business_user
const Product = require('./src/product/product').Product

const user_login_router = require('./src/routes/login/user_login/user_login_route')
const user_signup_router = require('./src/routes/login/user_login/user_signup_route')

const business_user_login_router = require('./src/routes/login/business_user_login/business_user_login_route')
const business_user_signup_router = require('./src/routes/login/business_user_login/business_user_signup_route')

const create_product_router = require('./src/routes/product/create_product_router')
const get_product_by_business_router = require('./src/routes/product/get_product_by_business_router')
const catalog_router = require('./src/routes/catalog/catalog_router')

var corsOptions = {
  origin: "http://localhost:8081"
};


async function set_up_database(){
  await User.sync()
  await Business_user.sync()
  await Product.sync()
}
set_up_database()

dotenv.config()

const app = express();
app.use(cors(corsOptions))
app.use(express.urlencoded())
app.use(body_parser())
app.use(morgan('combined'));
app.use(helmet())

app.get('/', (req, res) => {
  res.send({"msg":"hallo"});
});

app.use('/login', user_login_router)
app.use('/signup', user_signup_router)
app.use('/business/login', business_user_login_router)
app.use('/business/signup', business_user_signup_router)
app.use('/product/create', create_product_router)
app.use('/product/business', get_product_by_business_router)
app.use('/catalog', catalog_router)
app.use('/static', express.static('public'))

exports.app = app