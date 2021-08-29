import { requestAccount, getContract } from "./common";

async function buyPXDTokens(contractAddr, artifact, tokensToBuy){
    if (typeof window.ethereum != undefined) {
        console.log("Buy Tokens called");
        await requestAccount();
        
        const PixieDustTokenContract = getContract(contractAddr, artifact);
        try {
            console.log(`PixieDustToken Contract Address: ${contractAddr}`);
            console.log(`Tokens to buy: ${tokensToBuy}`);

            let transaction = await PixieDustTokenContract.mint({value: tokensToBuy});

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

async function generateRandomNumber(contractAddr, artifact, setOutcome, bettingAmount, choice){
    if (typeof window.ethereum != undefined) {
        console.log("Generate Random Number called");
        await requestAccount();

        const GameContract = getContract(contractAddr, artifact);
        try {
            // console.log(`Game Contract Address: ${contractAddr}`);
            if(choice === "heads") choice = 0;
            else choice = 1;
            let transaction = await GameContract.executeGame(bettingAmount, choice, {gasLimit: 10000000});

            let receipt = await transaction.wait();
            console.log(receipt);
            let result = receipt.events[receipt.events.length - 1].args[0].toString();
            console.log(result);
            if(result === "0"){
                setOutcome("heads");
            }
            else{
                setOutcome("tails");
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

async function playerBetTokens(contractAddr, pxdContractAddr, artifact, artifact1, tokensToBet) {
    if (typeof window.ethereum != undefined) {
        await requestAccount();

        const GameContract = getContract(contractAddr, artifact);
        const PXDContract = getContract(pxdContractAddr, artifact1);
        try {
            //approve here
            let approvetransaction = await PXDContract.approve(contractAddr, tokensToBet);
            let approveReceipt = await approvetransaction.wait();
            console.log(approveReceipt);
            // console.log("Approved");
            // console.log(await PXDContract.balanceOf("0x90F79bf6EB2c4f870365E785982E1f101E93b906"));
            // let transaction = await GameContract.betTokens(tokensToBet);
            // let receipt = await transaction.wait();
            // console.log(receipt);
            // console.log("Transaction done");
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
