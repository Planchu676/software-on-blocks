const { assert, expect } = require('chai')
const { contracts_build_directory } = require('../truffle-config');

const LicenceToken = artifacts.require('./licenceToken')
const MarketPlace = artifacts.require('./marketplace')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('marketplace', (accounts) => {
  let licenceToken, marketPlace

  before( async () => {
    licenceToken = await LicenceToken.new()
    marketPlace = await MarketPlace.new(licenceToken.address)
  })

  describe('deployment', async () => {
      it('has a name', async () => {
        const name = await licenceToken.name()
        assert.equal(name, 'licenceToken')
      })

      it('has a symbol', async () => {
        const symbol = await licenceToken.symbol()
        assert.equal(symbol, 'LCTK')
      })
  })

  describe('minting', async() => {
    it('creates a new token', async() => {
      const result = await licenceToken.mint(1,1)

      const event = result.logs[0].args
      const tokenId = event.tokenId.toNumber()
      const totalSupply = await licenceToken.totalSupply()
      await licenceToken.Licences(tokenId)
      await licenceToken.ownerOf(tokenId)
      const approvedAddress = await licenceToken.getApproved(tokenId)
      console.log(approvedAddress)
      console.log(event.tokenId.toNumber())

      assert.equal(tokenId, totalSupply, 'id is correct')
      assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
      assert.equal(event.to, accounts[0], 'to is correact')
    })
  })

  describe('marketplace', async() => {
    it('sale licence', async() => {
      const result = await licenceToken.mint(1,1)
      const event = result.logs[0].args
      const tokenId = event.tokenId.toNumber()
      console.log(event.tokenId.toNumber())
      const sale = await marketPlace.SaleLicence(tokenId, 1)
      console.log( await marketPlace.get_LicenceForSale())
      const list = await marketPlace.get_LicenceForSale()
      assert.equal( list[0].id, 0, 'sale created succsesfully')
    })
    
    const buyer = accounts[1]

    it('buy licence', async() =>{
      const result = await licenceToken.mint(1,1)
      const event = result.logs[0].args
      const tokenId = event.tokenId.toNumber()
      await licenceToken.approve(marketPlace.address, tokenId, {from: accounts[0]})
      await marketPlace.SaleLicence(tokenId, 1)
      const list = await marketPlace.get_LicenceForSale()
      await marketPlace.BuyLicence(list[1].id, {
        from: buyer,
        value: 1
      })
      assert.equal( await licenceToken.ownerOf(tokenId), buyer, 'bougth')

    })
  })
})
    
