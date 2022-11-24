import { Box, Button } from "@mui/material";
import Image from 'mui-image';

export default function Hero4 () {
  return (
    <Box sx={{
			mt: '3em', // a voir selon préférences
			height: '28em',
			bgcolor: '#FAFAFC',
			display: 'flex',
			alignItems: 'center',
			flexDirection: 'column'
		}}>
		<Box sx={{mt: '1.5em', mb: '1.6em', fontSize: '3em'}}>Powered by</Box>
		<Box sx={{
			display: 'flex',
			justifyContent: 'space-around',
			width: '80%'}}>
			<Box
				component="img"
				sx={{
				padding: "10px",
				height: "14%",
				}}
				alt="Your logo."
				src={"../public/starton.png"}
			/>
			<Box
				component="img"
				sx={{
				mt: '-1.5em',
				padding: "10px",
				height: "25%",
				}}
				alt="Your logo."
				src={"../public/iExec.png"}
			/>
			<Box
				component="img"
				sx={{
				padding: "10px",
				height: "15%",
				}}
				alt="Your logo."
				src={"../public/nodereal.png"}
			/>
			<Box
				component="img"
				sx={{
				padding: "10px",
				height: "15%",
				}}
				alt="Your logo."
				src={"../public/ledger.png"}
			/>
		</Box>
	</Box>
  )
}

