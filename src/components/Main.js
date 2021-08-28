import {
	makeStyles,
	Grid,
	Typography,
	Button,
	TextField,
	InputAdornment
 } from "@material-ui/core";
import { AccountBalanceWallet } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles(theme => ({
	main: {
		overflow: "hidden",
		height: "100vh"
	},
}))

const APP_STATES = {
	HOME: "home",
	GAME: "game",
	BET_TOKENS: "bet_tokens",
	BUY_TOKENS: "buy_tokens",
	PLAY_AGAIN: "play_again",
}

const Wallet = ({tokens}) => {
	return (
		<Grid container>
			<Grid item><AccountBalanceWallet /></Grid>
			<Grid item>PXD Tokens: {tokens}</Grid>
		</Grid>
	)
}

const Playagain = ({setAppState, playerTokenBalance}) => {
	return (
		<>
			<Grid item container justifyContent="center">
				<Grid item>
					<Typography variant="h5">Play again?</Typography>
				</Grid>
			</Grid>
			<Grid item container justifyContent="center" style={{marginTop: 20}} spacing={2}>
				<Grid item>
					<Button color="primary" variant="outlined" onClick={() => playerTokenBalance > 0 ? setAppState(APP_STATES.BET_TOKENS) : setAppState(APP_STATES.BUY_TOKENS)}>Yes</Button>
				</Grid>
				<Grid item>
					<Button color="primary" variant="outlined" onClick={() => setAppState(APP_STATES.HOME)}>No</Button>
				</Grid>
			</Grid>
		</>
	)
}

const Main = () => {
	const classes = useStyles();
	const [appState, setAppState] = React.useState(APP_STATES.HOME);
	const [playerTokenBalance, setPlayerTokenBalance] = React.useState(0);
	const [betTokens, setBetTokens] = React.useState(0);

	const [buyTokens, setBuyTokens] = React.useState(0);
	const handleBuyTokens = () => {
		if(isNaN(buyTokens)){
			return;
		}
		setAppState(APP_STATES.GAME)
	}

	const [playerChoice, setPlayerChoice] = React.useState("");
	const [outcome, setOutcome] = React.useState("");
	const [coinFlipping, setCoinFlipping] = React.useState(false);
	const [endGame, setEndGame] = React.useState(false);

	const handleCoinToss = () => {
		if(playerChoice === ""){
			return;
		}
		let flipResult = Math.random();
		let coin = document.getElementById("coin");
		coin.className = "";
		setCoinFlipping(true);
		setTimeout(function(){
			if(flipResult <= 0.5){
				coin.classList.add("heads");
			}
			else{
				coin.classList.add("tails");
			}
		}, 100);
		setTimeout(function(){
			if(flipResult <= 0.5){
				setOutcome("heads");
			}
			else{
				setOutcome("tails");
			}
			setCoinFlipping(false);
			setEndGame(true);
		}, 3500);
	}

	const handleBetTokens = () => {
		if(!isNaN(betTokens) || betTokens <= 0){
			return;
		}
		setAppState(APP_STATES.GAME)
	}


	React.useEffect(() => {
		if(appState !== APP_STATES.GAME){
			setBetTokens(0);
			setBuyTokens(0);
			setPlayerChoice("");
			setOutcome("");
			setCoinFlipping(false);
			setEndGame(false);
		}
	}, [appState])

	return (
		<div className={classes.main}>
			{appState === APP_STATES.HOME && (
				<>
					<Grid item container justifyContent="center" style={{marginTop: 50}}>
						<Grid item>
							<Typography variant="h4">Welcome to PixieDustGames!</Typography>
						</Grid>
					</Grid>
					<Grid item container justifyContent="center" style={{marginTop: 50}}>
						<Grid item>
							<Button color="primary" variant="contained" onClick={() => playerTokenBalance === 0 ? setAppState(APP_STATES.BUY_TOKENS) : setAppState(APP_STATES.BET_TOKENS)}>Begin the Coin toss!</Button>
						</Grid>
					</Grid>
				</>
			)}
			{appState === APP_STATES.BET_TOKENS && (
				<>
					<Grid container justifyContent="space-around">
						<Grid item></Grid>
						<Grid item></Grid>
						<Grid item style={{marginTop: 30}}>
							<Wallet tokens={playerTokenBalance}/>
						</Grid>
					</Grid>
					<Grid item container direction="column" alignItems="center" style={{marginTop: 50}}>
						<Grid item>
							<TextField value={betTokens} onChange={(e) => setBetTokens(e.target.value)} label="Enter tokens to bet" variant="outlined"/>
						</Grid>
						<Grid item style={{marginTop: 20}}>
							<Button color="primary" variant="contained" onClick={handleBetTokens}>Go!</Button>
						</Grid>
					</Grid>
				</>
			)}
			{appState === APP_STATES.BUY_TOKENS && (
				<Grid item container direction="column" alignItems="center">
					<Grid item style={{marginTop: 50}}>
						<Typography variant="h5">Buy PXD Tokens</Typography>
					</Grid>
					<Grid item style={{marginTop: 50}}>
						<TextField
							variant="outlined"
							value={buyTokens}
							onChange={(e) => setBuyTokens(e.target.value)}
							InputProps={{
								startAdornment: <InputAdornment position="start">PXD</InputAdornment>,
								endAdornment: <InputAdornment position="end">{buyTokens/1000000} ETH</InputAdornment>,
							}}
						/>
					</Grid>
					<Grid item style={{marginTop: 20}}>
						<Button color="primary" variant="contained" onClick={handleBuyTokens}>Buy</Button>
					</Grid>
				</Grid>
			)}
			{appState === APP_STATES.GAME && (
				<Grid container direction="column" spacing={3}>
					<Grid item container justifyContent="space-around" alignItems="center" style={{marginLeft: 150}}>
						<Grid item xs container direction="column">
							<Grid item><Typography>Global Stats</Typography></Grid>
							<Grid item>Heads: </Grid>
							<Grid item>Tails: </Grid>
						</Grid>
						<Grid xs item>
							<Typography>Pool Tokens: {betTokens * 2}</Typography>
						</Grid>
						<Grid xs item>
							<Wallet tokens={playerTokenBalance}/>
						</Grid>
					</Grid>
					{endGame === false && (
						<Grid item container justifyContent="center">
							<div id="coin" onClick={handleCoinToss}>
									<div class="head-side"></div>
									<div class="tail-side"></div>
							</div>
						</Grid>
					)}
					{endGame === false && (
						<Grid item container justifyContent="center" spacing={2}>
							<Grid item>
								<Button color="primary" onClick={() => setPlayerChoice("heads")} variant={playerChoice === "heads" ? "contained" : "outlined"} disabled={coinFlipping}>Heads</Button>
							</Grid>
							<Grid item>
								<Button color="primary" onClick={() => setPlayerChoice("tails")} variant={playerChoice === "tails" ? "contained" : "outlined"} disabled={coinFlipping}>Tails</Button>
							</Grid>
						</Grid>
					)}
					{endGame && (
						<Grid item container alignItems="center" direction="column">
							{(playerChoice !== "" && outcome === playerChoice) ? (
								<>
									<Grid item >Congratulations! You won {betTokens} PXD</Grid>
									<Grid item style={{marginTop: 50}}>
										<Playagain setAppState={setAppState} playerTokenBalance={playerTokenBalance}/>
									</Grid>
								</>
							) : (
								<>
									<Grid item>Better Luck next time! You lost {betTokens} PXD</Grid>
									<Grid item style={{marginTop: 50}}>
										<Playagain setAppState={setAppState} playerTokenBalance={playerTokenBalance}/>
									</Grid>
								</>
							)}
						</Grid>
					)}
				</Grid>
			)}
		</div>
	)
}

export default Main;