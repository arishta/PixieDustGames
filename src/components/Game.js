import React from "react"
import { Typography, Grid, Button } from "@material-ui/core";
import { Wallet } from "./Main"

const Game = ({betTokens, playerTokenBalance}) => {
	const [playerChoice, setPlayerChoice] = React.useState("");
  return (
		<>
			<Grid item container justifyContent="space-around">
				<Grid item>
					<Typography>Global Stats</Typography>
				</Grid>
				<Grid item>
					<Typography>Pool Amount: {betTokens * 2}</Typography>
				</Grid>
				<Grid item>
					<Wallet tokens={playerTokenBalance}/>
				</Grid>
			</Grid>
			<Grid item container justifyContent="center">
				Coin Here
			</Grid>
			<Grid item container justifyContent="center">
				<Grid item>
					<Button onClick={() => setPlayerChoice("heads")} variant={playerChoice === "heads" ? "contained" : "outlined"}>Heads</Button>
				</Grid>
				<Grid item>
					<Button onClick={() => setPlayerChoice("heads")} variant={playerChoice === "tails" ? "contained" : "outlined"}>Tails</Button>
				</Grid>
			</Grid>
		</>
	)
}

export default Game;