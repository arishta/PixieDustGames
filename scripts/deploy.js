const hre = require("hardhat");
const fs = require("fs");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    const PixieDustTokens = await hre.ethers.getContractFactory("PixieDustTokens");
    const Game = await hre.ethers.getContractFactory("Game");
    const PXDContract = await PixieDustTokens.deploy();
    await PXDContract.deployed();
    
    const GameContract = await Game.deploy(10, PXDContract.address);
    await GameContract.deployed();
    console.log(`PXD Contract deployed to address: ${PXDContract.address}`);
    console.log(`Game Contract deployed to address: ${GameContract.address}`);
    
    let txn = await PXDContract.mintFromOwner(GameContract.address);
    await txn.wait();

    updateEnvWithDeployedAddress(PXDContract.address, "PXDC");
    updateEnvWithDeployedAddress(GameContract.address, "GameC");
    // We also save the contract's artifacts and address in the proper directory
    saveFrontendFiles(PXDContract.address);
    saveFrontendFiles(GameContract.address);
}

function saveFrontendFiles(faucet) {
    const contractsDir = __dirname + "/../src/abis";
  
    if (!fs.existsSync(contractsDir)) {
      fs.mkdirSync(contractsDir);
    }
  
    const PXD = artifacts.readArtifactSync("PixieDustTokens");
    const Game = artifacts.readArtifactSync("Game");

    fs.writeFileSync(
      contractsDir + "/PXDContract.json",
      JSON.stringify(PXD, null, 2)
    );
    fs.writeFileSync(
      contractsDir + "/GameContract.json",
      JSON.stringify(Game, null, 2)
    );
}

function updateEnvWithDeployedAddress(deployedAddress, contractType) {
	const result = require('dotenv').config()
	if (result.error) {
		throw result.error
	}
  if(contractType == "PXDC"){
    result.parsed.PIXIEDUSTTOKENS_DEPLOYED_ADDRESS = deployedAddress;
  }
  else{
    result.parsed.GAME_DEPLOYED_ADDRESS = deployedAddress;
  }
	fs.writeFileSync('./.env', stringify(result.parsed)) 
}

function stringify(obj) {
	let result = ''
	for (const [key, value] of Object.entries(obj)) {
		if (key) {
			const line = `${key}=${String(value)}`
			result += line + '\n'
		}
	}
	return result
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.log(error);
        process.exit(1);
    });