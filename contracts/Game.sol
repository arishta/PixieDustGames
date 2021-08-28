// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "./PixieDustTokens.sol";

contract Game{
    
    uint maxTokensAllowed;
    PixieDustTokens token;
    uint headCount;
    uint tailCount;

    constructor(uint _maxTokensAllowed, address _tokenAddress) {
        maxTokensAllowed = _maxTokensAllowed; 
        token = PixieDustTokens(_tokenAddress);
    }
    
    //player bets some tokens
    function betTokens(uint _bettingAmount) public{
        //token transferred to the game contract address
        token.transferFrom(msg.sender, address(this), _bettingAmount);
    }
    
    //checks if the game has enough balance or not
    function hasEnoughBalance(uint _bettingAmount) view public{
        uint gameBalance = token.balanceOf(address(this));
        require(gameBalance >= _bettingAmount,"Sorry! We don't have sufficient tokens!");
    }
    
    //fetches the total head and tail count across all games
    function getCount() public view returns (uint, uint){
        return (headCount, tailCount);
    }

    //generates random number for the coin toss
    //HEAD:0, TAIL:1
    function generateRandomNumber() public returns (uint){
        uint rand = (block.timestamp)%2;
        if (rand==0){
            headCount++;
        }
        else{
            tailCount++;
        }
        return rand;
    }
    
    //transfers winning amount to the player in case he wins
    function transferToPlayer(uint _bettingAmount) payable public {
        //amount is transferred to the player
        token.approve(address(this), 2*_bettingAmount);
        token.transferFrom(address(this), msg.sender, 2*_bettingAmount);
    }
    
}
