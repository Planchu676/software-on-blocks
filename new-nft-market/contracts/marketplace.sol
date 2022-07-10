// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "../contracts/licenceToken.sol";

contract marketplace {
  licenceToken private token;

  struct LicenceForSale {
    uint256 id;
    uint256 tokenId;
    address payable seller;
    uint256 price;
    bool isSold;
  }

  LicenceForSale[] public _LicenceForSale;
  mapping(uint256 => bool) public activeLicences; 
  uint256 public _licenceForSaleLength = 0;

  event LicenceAddedForSale(uint256 id, uint256 tokenId, uint256 price);
  event LicenceSold(uint256 id, address buyer, uint256 price);

  constructor(licenceToken _token) {
      token = _token;
  }

  modifier OnlyLicenceOwner(uint256 tokenId){
    require(token.ownerOf(tokenId) == msg.sender, "Not the owner of the licence");
    _;
  }

  //modifier HasTransferApproval(uint256 tokenId){
    //require(token.getApproved(tokenId) == address(this), "Market not approved");
    //_;
  //}

  modifier LicenceExist(uint256 id){
    require(id < _LicenceForSale.length && _LicenceForSale[id].id == id, "Licence does not exist");
    _;
  }

  modifier IsForSale(uint256 id){
    require(!_LicenceForSale[id].isSold, "Licence is already sold or it is not for sale");
    _;
  }

  function SaleLicence(uint tokenId, uint price) 
    OnlyLicenceOwner(tokenId) 
   // HasTransferApproval(tokenId) 
    external 
    returns (uint256){
      
      require(!activeLicences[tokenId], "Licence is already up for sale");

      uint256 newLicenceId = _LicenceForSale.length;
      _LicenceForSale.push(LicenceForSale({
        id: newLicenceId,
        tokenId: tokenId,
        seller: payable(msg.sender),
        price: price,
        isSold: false
      }));
      _licenceForSaleLength = _LicenceForSale.length;
      activeLicences[tokenId] = true;


      assert(_LicenceForSale[newLicenceId].id == newLicenceId);
      emit LicenceAddedForSale(newLicenceId, tokenId, price);
      return newLicenceId;
  }

  function BuyLicence(uint256 id) 
    LicenceExist(id)
    IsForSale(id)
   // HasTransferApproval(_LicenceForSale[id].tokenId)
    payable 
    external {
      require(msg.value >= _LicenceForSale[id].price, "Not enough funds sent");
      require(msg.sender != _LicenceForSale[id].seller, "Hola");

      _LicenceForSale[id].isSold = true;
      activeLicences[_LicenceForSale[id].tokenId] = false;
      token.safeTransferFrom(_LicenceForSale[id].seller, msg.sender, _LicenceForSale[id].tokenId);
      token.setLicenceOwner(_LicenceForSale[id].tokenId, msg.sender);
      _LicenceForSale[id].seller.transfer(msg.value);

      emit LicenceSold(id, msg.sender, _LicenceForSale[id].price);
    }

    function get_LicenceForSale() public view
      returns(LicenceForSale[] memory){
        return _LicenceForSale;
      }
    
    function getLength() public view returns (uint256) {
      return _LicenceForSale.length;
}

}
