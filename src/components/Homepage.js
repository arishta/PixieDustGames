import React from "react"
import { makeStyles, Typography, Grid, Button } from "@material-ui/core";
import { APP_STATES } from "./Main";

const useStyles = makeStyles(theme => ({
	title: {
		color: "#fff",
		fontWeight: "bold"
	}
}))

const Homepage = ({setAppState}) => {
	const classes = useStyles();
	return (
		<>
			<Grid item container justifyContent="center">
				<Grid item>
					<Typography className={classes.title} variant="h3">Welcome to PixieDustGames!</Typography>
				</Grid>
			</Grid>
			<Grid item container justifyContent="center">
				<Grid item>
					<Button onClick={() => setAppState(APP_STATES.BET_TOKENS)}>Begin the Coin toss!</Button>
				</Grid>
			</Grid>
		</>
	)
}

export default Homepage;