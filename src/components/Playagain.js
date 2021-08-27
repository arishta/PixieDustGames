import React from "react"
import { Typography, Grid, Button } from "@material-ui/core";
import { APP_STATES } from "./Main";

const Playagain = ({setAppState}) => {
	return (
		<>
			<Grid item container justifyContent="center">
				<Grid item>
					<Typography variant="caption">Play again?</Typography>
				</Grid>
			</Grid>
			<Grid item container justifyContent="center">
				<Grid item>
					<Button onClick={() => setAppState(APP_STATES.BET_TOKENS)}>Yes</Button>
				</Grid>
				<Grid item>
					<Button onClick={() => setAppState(APP_STATES.HOME)}>No</Button>
				</Grid>
			</Grid>
		</>
	)
}

export default Playagain;