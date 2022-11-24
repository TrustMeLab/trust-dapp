import { Box, Button } from "@mui/material";
import Image from 'mui-image';

export default function Hero3 () {
  return (
    <Box sx={{
			mt: '3em', // a voir selon préférences
			height: '28em',
			bgcolor: '#FFFFFF',
			display: 'flex',
			justifyContent: 'center'
		}}>
		<Box sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				width: '50%'
			}}>
			<Box sx={{mb: '1em', fontSize: '3em'}}>Trust.Me</Box>
            <Box sx={{mb: '0.4em'}}>L O G O</Box>
			<Box sx={{mb: '0.4em', fontSize: '1.5em'}}>Outil de gestion de location</Box>
			<Box sx={{
					mb: '1em',
					fontSize: '1.2em',
					textAlign: 'center'
			}}>Are you Professional use our SDK to integrate the service
			</Box>
			<Box sx={{
				display: 'flex'
			}}>
			</Box>
		</Box>
	</Box>
  )
}

