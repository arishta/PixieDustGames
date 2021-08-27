import { makeStyles, Grid } from "@material-ui/core";
import React from "react";
import Homepage from "./Homepage";
import Bettokens from "./Bettokens";
import Buytokens from "./Buytokens";
import Game from "./Game";
import Playagain from "./Playagain";

const useStyles = makeStyles(theme => ({
	main: {
		overflow: "hidden",
		backgroundColor: "#2977c4",
		height: "100vh"
	},
}))

export const APP_STATES = {
	HOME: "home",
	GAME: "game",
	BET_TOKENS: "bet_tokens",
	BUY_TOKENS: "buy_tokens",
	PLAY_AGAIN: "play_again",
}

export const Wallet = ({tokens}) => {
	return (
		<Grid container>
			<Grid item>PXD Tokens: {tokens}</Grid>
		</Grid>
	)
}

const Main = () => {
	const classes = useStyles();
	const [appState, setAppState] = React.useState(APP_STATES.HOME);
	const [playerTokenBalance, setPlayerTokenBalance] = React.useState(0);
	const [betTokens, setBetTokens] = React.useState(0);

	return (
		<div className={classes.main}>
			<Grid container direction="column">
				{appState === APP_STATES.HOME && (
					<Homepage setAppState={setAppState}/>
				)}
				{appState === APP_STATES.BET_TOKENS && (
					<Bettokens tokens={playerTokenBalance} betTokens={betTokens} setBetTokens={setBetTokens} setAppState={setAppState}/>
				)}
				{appState === APP_STATES.BUY_TOKENS && (
					<Buytokens setAppState={setAppState}/>
				)}
				{appState === APP_STATES.GAME && (
					<Game betTokens={betTokens} playerTokenBalance={playerTokenBalance}/>
				)}
				{appState === APP_STATES.PLAY_AGAIN && (
					<Playagain betTokens={betTokens} playerTokenBalance={playerTokenBalance}/>
				)}
			</Grid>
		</div>
	)
}

export default Main;