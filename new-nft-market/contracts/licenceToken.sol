// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;


import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract licenceToken is ERC721Enumerable{
  using Counters for Counters.Counter;

  Counters.Counter private _tokenIds;
  address public marketplace;

  struct Licence {
    uint256 id;
    address owner;
    uint256 user_id;
    uint256 product_id;
  }

  mapping(uint256 => Licence) public Licences;

  constructor () ERC721("licenceToken", "LCTK") {}

  function mint(uint256 productId, uint256 userId) public returns (uint256){
    _tokenIds.increment();
    uint256 newLicenceId = _tokenIds.current();
    _safeMint(msg.sender, newLicenceId);
    approve(marketplace, newLicenceId);

    Licences[newLicenceId] = Licence({
      id: newLicenceId, 
      owner: msg.sender,
      user_id: userId,
      product_id: productId
    });

    return newLicenceId;
  }

  function setMarketplace(address market) public {
    marketplace = market;
  }

  function setLicenceOwner(uint256 id, address owner_address) public {
    Licences[id].owner = owner_address;
  }
}