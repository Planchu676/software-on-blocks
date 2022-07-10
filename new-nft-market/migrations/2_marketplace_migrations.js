const licenceToken = artifacts.require("licenceToken");
const marketplace = artifacts.require("marketplace");

module.exports = async function(deployer) {
  await deployer.deploy(licenceToken);

  const token = await licenceToken.deployed()

  await deployer.deploy(marketplace, token.address)

  const market = await marketplace.deployed()

  await token.setMarketplace(market.address)

};
