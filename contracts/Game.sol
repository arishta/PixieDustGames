// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "./PixieDustTokens.sol";

contract Game{
    
    uint maxTokensAllowed;
    PixieDustTokens token;

    constructor(uint _maxTokensAllowed, address _tokenAddress) {
        maxTokensAllowed = _maxTokensAllowed; 
        token = PixieDustTokens(_tokenAddress);
    }
    
    //generates random number for the coin toss
    function generateRandomNumber() public view returns (uint _randomNum){
        return (block.timestamp)%2;
    }
    
    //contains the core logic of the game
    function executeGame(uint _bettingAmount, uint8 _choice) payable public {

        uint gameBalance = token.balanceOf(address(this));
        //check if player has enough balance
        require(gameBalance >= _bettingAmount,"Sorry! We don't have sufficient tokens!");
        
        //deposit the balance to this address
        token.transferFrom(msg.sender, address(this), _bettingAmount);

        //generate a random number (head/tail)        
        uint rand = generateRandomNumber();
        
        //player wins
        if (_choice == rand){
            //amount is transferred to the player
            token.approve(address(this), 2*_bettingAmount);
            token.transferFrom(address(this), msg.sender, 2*_bettingAmount);
        }
    }
}
