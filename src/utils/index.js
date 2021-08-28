import { requestAccount, getContract } from "./common";

async function buyPXDTokens(contractAddr, artifact, tokensToBuy){
    if (typeof window.ethereum != undefined) {
        console.log("Buy Tokens called");
        await requestAccount();
        
        const PixieDustTokenContract = getContract(contractAddr, artifact);
        try {
            console.log(`PixieDustToken Contract Address: ${contractAddr}`);
            console.log(`Tokens to buy: ${tokensToBuy}`);

            let transaction = await PixieDustTokenContract.mint();

            let receipt = await transaction.wait();
            console.log(receipt);
        }
        catch (err) {
            console.log(err);
        }
    }
    else{
        alert("Couldn't find wallet");
    }
}

async function generateRandomNumber(contractAddr, artifact, setOutcome){
    if (typeof window.ethereum != undefined) {
        console.log("Generate Random Number called");
        await requestAccount();

        const GameContract = getContract(contractAddr, artifact);
        try {
            // console.log(`Game Contract Address: ${contractAddr}`);

            let transaction = await GameContract.generateRandomNumber();

            let receipt = await transaction.wait();
            console.log(receipt);
            let result = "0";
            if(result === "0"){
                setOutcome("heads");
            }
            else{
                setOutcome("tails")
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    else{
        alert("Couldn't find wallet");
    }
}

async function playerBetTokens(contractAddr, artifact, tokensToBet) {
    if (typeof window.ethereum != undefined) {
        console.log("Bet Tokens called");
        await requestAccount();

        const GameContract = getContract(contractAddr, artifact);
        try {
            let transaction = await GameContract.betTokens(tokensToBet);

            let receipt = await transaction.wait();
            console.log(receipt);
        }
        catch (err) {
            console.log(err);
        }
    }
    else{
        alert("Couldn't find wallet");
    }
}

async function getGlobalStats(contractAddr, artifact, setHeadsCount, setTailsCount) {
    if (typeof window.ethereum != undefined) {
        console.log("Global Stats called");
        await requestAccount();

        const GameContract = getContract(contractAddr, artifact);
        try {
            // console.log(`Game Contract Address: ${contractAddr}`);

            let transaction = await GameContract.getCount();

            let receipt = await transaction.wait();
            console.log(receipt);
            setHeadsCount(0);
            setTailsCount(0);
        }
        catch (err) {
            console.log(err);
        }
    }
    else{
        alert("Couldn't find wallet");
    }
}

async function transferToPlayer(contractAddr, artifact, tokensToTransfer) {
    if (typeof window.ethereum != undefined) {
        console.log("Transfer to player called");
        await requestAccount();

        const GameContract = getContract(contractAddr, artifact);
        try {
            // console.log(`Game Contract Address: ${contractAddr}`);

            let transaction = await GameContract.transferToPlayer(tokensToTransfer);

            let receipt = await transaction.wait();
            console.log(receipt);
        }
        catch (err) {
            console.log(err);
        }
    }
    else{
        alert("Couldn't find wallet");
    }
}

async function getGameBalance(contractAddr, artifact) {
    if (typeof window.ethereum != undefined) {
        console.log("Get game balance called");
        await requestAccount();

        const GameContract = getContract(contractAddr, artifact);
        try {
            // console.log(`Game Contract Address: ${contractAddr}`);

            let transaction = await GameContract.hasEnoughBalance();

            let receipt = await transaction.wait();
            console.log(receipt);
        }
        catch (err) {
            console.log(err);
        }
    }
    else{
        alert("Couldn't find wallet");
    }
}

export {buyPXDTokens, generateRandomNumber, playerBetTokens, getGlobalStats, transferToPlayer, getGameBalance}
