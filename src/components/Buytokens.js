import React from "react"
import { Typography, Grid, Button, TextField, InputAdornment } from "@material-ui/core";
import { APP_STATES } from "./Main";

const Buytokens = ({setAppState}) => {
	const [buyTokens, setBuyTokens] = React.useState(0);
	return (
		<Grid item container direction="column">
			<Grid item>
				<Typography variant="caption">Buy PXD Tokens</Typography>
			</Grid>
			<Grid item>
				<TextField
					value={buyTokens}
					onChange={(e) => setBuyTokens(e.target.value)}
					InputProps={{
						startAdornment: <InputAdornment position="start">PXD</InputAdornment>,
						endAdornment: <InputAdornment position="end">{buyTokens/1000000} ETH</InputAdornment>,
					}}
				/>
			</Grid>
			<Grid item>
				<Button onClick={() => setAppState(APP_STATES.GAME)}>Buy</Button>
			</Grid>
		</Grid>
	)
}

export default Buytokens;