import React from "react";
import { Grid, Button, TextField } from "@material-ui/core";
import { APP_STATES, Wallet } from "./Main";

const Bettokens = ({tokens, betTokens, setBetTokens, setAppState}) => {
	return (
		<>
			<Grid item container justifyContent="flex-end">
				<Wallet tokens={tokens}/>
			</Grid>
			<Grid item container direction="column" justifyContent="center">
				<Grid item>
					<TextField value={betTokens} onChange={(e) => setBetTokens(e.target.value)}/>
				</Grid>
				<Grid item>
					<Button onClick={() => setAppState(APP_STATES.GAME)}>Go!</Button>
				</Grid>
			</Grid>
		</>
	)
}

export default Bettokens;