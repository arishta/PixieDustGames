// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";
import "github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";

contract PixieDustTokens is ERC20{
    using SafeMath for uint;
    
    address owner;
    bool called;
    
    constructor() ERC20("PixieDust", "PXD") {
        owner = msg.sender;
    }
    
    //buy PXD tokens using ETH
    function mint() external payable{
        _mint(msg.sender, msg.value.mul(10));    
    }
    
    //Mints 1000 initial tokens in the game contract address
    function mintFromOwner(address _contractAddress) public{
        require(msg.sender == owner, "The sender is not authorized");
        require(called == false, "The mint function can only be called once");
        _mint(_contractAddress, 1000);
        called = true;
    }
}
