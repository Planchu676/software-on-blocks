import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@fortawesome/fontawesome-free/js/all'
import './main.css'
import { ethers } from "ethers"
import MarketPlace from "./contractsData/marketPlace.json"
import MarketPlaceAdress from "./contractsData/marketPlace-address.json"
import LicenceToken from "./contractsData/licenceToken.json"
import LicenceTokenAdress from "./contractsData/licenceToken-address"

const app = createApp(App)
app.use(router).mount('#app');

(async () => {app.config.globalProperties.account = await window.ethereum.request({ method: 'eth_requestAccounts' })})()
app.config.globalProperties.provider = new ethers.providers.Web3Provider(window.ethereum)
app.config.globalProperties.signer = app.config.globalProperties.provider.getSigner()

const licenceToken = new ethers.Contract(LicenceTokenAdress.address, LicenceToken.abi, app.config.globalProperties.signer)
app.config.globalProperties.licenceToken = licenceToken
const marketPlace = new ethers.Contract(MarketPlaceAdress.address, MarketPlace.abi, app.config.globalProperties.signer)
app.config.globalProperties.marketPlace = marketPlace