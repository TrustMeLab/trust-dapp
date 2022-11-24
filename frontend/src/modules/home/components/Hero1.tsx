import { Box, Button } from "@mui/material";
import Image from 'mui-image';

export default function Hero1 () {
  return (
    <Box sx={{
			color: '#ffffff',
			height: '42em',
			bgcolor: '#5C48D3',
			boxShadow: 3,
			display: 'flex',
			justifyContent: 'center'
		}}>
		<Box sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				width: '40%'
			}}>
			<Box sx={{mt: '-1em', mb: '-1em', fontSize: '3em'}}><h2>Trust.Me</h2></Box>
			<Image src="/tenant_owner.png" 
            height="30%"
            fit="contain"/>
			<Box sx={{fontSize: '1.5em'}}><h3>Rental management tool</h3></Box>
			<Box sx={{
					mb: '1em',
					fontSize: '1.2em',
					textAlign: 'center'
			}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</Box>
			<Box sx={{
				display: 'flex'
			}}>
				<Box sx={{mr: '6em'}}><Button variant="outlined" size="large">Owner</Button></Box>
				<Box><Button variant="outlined" size="large">Tenant</Button></Box>
			</Box>
		</Box>
	</Box>
  )
}

