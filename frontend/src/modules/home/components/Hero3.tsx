import { Box, Button } from "@mui/material";
import Image from 'mui-image';

export default function Hero3 () {
  return (
    <Box sx={{
			mt: '3em', // a voir selon préférences
			height: '28em',
			bgcolor: '#e7ca36',
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
			}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</Box>
			<Box sx={{
				display: 'flex'
			}}>
				<Box sx={{mr: '6em'}}><Button variant="outlined" size="large">Tenant</Button></Box>
				<Box><Button variant="outlined" size="large">Owner</Button></Box>
			</Box>
		</Box>
	</Box>
  )
}

