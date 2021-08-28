// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract PixieDustTokens is ERC20{
    using SafeMath for uint;
    
    address owner;
    bool called;
    
    constructor() ERC20("PixieDust", "PXD") {
        owner = msg.sender;
    }
    
    //exchanging tokens for ether
    function mint() external payable{
        _mint(msg.sender, msg.value.mul(10));    
    }
    
    //_contractAddress: Address of Game.sol
    //this assigns 1000 tokens to Game contract
    // maybe move to constructor??
    function mintFromOwner(address _contractAddress) public{
        require(msg.sender==owner, "The sender is not authorized");
        require(called==false, "The mint function can only be called once");
        _mint(_contractAddress, 1000);
        _mint(msg.sender, 20);
        called=true;
    }
}