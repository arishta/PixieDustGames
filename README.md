# PixieDustGames

A decentralized betting game application

## Why PixieDustGames?
Centralized online betting games cannot be trusted. Decentralized online games provide a lot of advantages over them:
1. **Censorship**: In many countries like India, it is only permitted to bet on a game of skill and not a game of chance. Online gambling platforms are banned in these countries. 
However,blockchain is decentralized so the players cannot be censored from playing the gambling games.

2. **Safety and security**: There is no guarantee that these online platforms are completely safe and secure. They could steal your money, tamper with your account balance or leak your information to an unapproved outsider. 
In case of dapps, by utilizing complex cryptographical principles, it can be guaranteed that all withdrawals and transactions are protected. Every exchange is secure and it is outlandish for any unapproved outsider to steal your information.

3. **Random Number Generation**:The authenticity of the RNGs cannot be established in a centralized system. Random Number Generation in Solidity must be done by sending a seed to an off-chain resource like an oracle, which must then return the generated random number and verifiable proof back to the smart contract. This ensures that the RNG is authentic and can be trusted.

## Core Features and functionality

1. **Betting tokens**:
The player needs to bet some tokens to play the game. There is a max limit on the number of tokens a player can bet. If the site has the available tokens and the player bets tokens within the max cap limit, then the betting game begins. Once the user bets the tokens, the smart contract holds it until the winner is decided. 

2. **Wallet feature**:
Every player has a wallet that contains tokens. Tokens are required for playing the game. Players can get tokens in exchange for Ethers.

3. **Random number generator**:
The betting game used here is coin flip that results in either head or tail. We use ChainLink to generate a random number.

4. **Global Stats**:
We show the global stats of the total number of heads and tails count in all the games ever played.

5. **Player Stats**:
We show the player stats of the number of wins and losses by the player since his first game. 


## Smart Contracts

1. **Game Smart Contract**: 

This smart contract handles the game logic:

* Checking if the game and the player have sufficient tokens
* Player buying PixieDust Tokens(PXD) using Ethers.
* Generating a random number
* Holding the tokens until the winner is decided
* Transferring tokens to the winning party

2. **PixieDustTokens Smart Contract**:

* It handles the ERC20 based token: PixieDustTokens
(Name: PixieDust, Symbol:PXD). 
A player purchases these tokens to bet on the application.
* Initially 1000 tokens are minted.



## Setup

### Deploy faucet contract - Local

1. Run local hardhat node 

    `npx hardhat node`

2. Run the following command to deploy faucet on localhost

    `npx hardhat run scripts/deploy.js --network localhost`

3. Copy the contract address printed to console and replace the already existing address in `src/constants.js` with it.


### Deploy faucet contract - Testnet (Rinkeby)

1. Create a file by name `.env` inside the root directory of this project. Paste the following lines inside this .env file

```
ALCHEMY_API_KEY = 'YOUR_ALCHEMY_API_KEY"
WALLET_PRIVATE_KEY = 'YOUR_WALLET_PRIVATE_KEY'
```

2. Replace `YOUR_ALCHEMY_API_KEY` with API key created using Alchemy

3. Replace `YOUR_WALLET_PRIVATE_KEY` with private key obtained by following these steps
    
    1. Click on metamask plugin icon in the browser
    2. Select `Account details`
    3. Click `Export Private Key` button and confirm your password

4. Run the following command to deploy faucet on rinkeby network

    `npx hardhat run scripts/deploy.js --network rinkeby`

5. Copy the contract address printed to console and replace the already existing address in `src/constants.js` with it.

**Note:** You can skip the contract deployment steps and by default the setup would use an already deployed contract.

### Run Project

1. Install dependencies

    `npm install`

2. Run app

    `npm start`

### Common hardhat console commands (If using local network to deploy)

1. Connect to the appropriate network using Hardhat console command
   
   `npx hardhat console --network rinkeby`
    
2. Get balance
    ```bash
    $ let bal = await ethers.provider.getBalance("CONTRACT_ADDR");
    $ bal
    ```
3. Convert balance to ethers
    ```bash
    $ ethers.utils.formatEther(bal);
    ```

## Dapp link
https://gateway.pinata.cloud/ipfs/QmXNE9A5qfwFrijn8zQHggzbna6w5Lk6LQivpav3mQyVxG/

