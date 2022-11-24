import { Box, Button } from "@mui/material";
import Image from 'mui-image';

export default function Hero2 () {
  return (
    <Box sx={{
			mt: '3em', // a
			boxShadow: 3,
			height: '50em',
			bgcolor: '#ef8251',
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
			<Box sx={{ textAlign: 'center', fontSize: '3em'}}>Certify your reputation through blockchain</Box>
			<Image src="/blockchain_user.png" 
            height="40%"
            width="40%"
            fit="contain"/>
            {/* <Box sx={{mb: '0.4em'}}>L O G O</Box> */}
			<Box sx={{
					mb: '1em',
					fontSize: '1.2em',
					textAlign: 'center'
			}}>A Daap providing a fair track record of all the tenants payment </Box>
			<Box sx={{mb: '0.4em', fontSize: '1em'}}>Helping both tenant and owner to trust each other</Box>
			<Box sx={{
				display: 'flex'
			}}>
			</Box>
		</Box>
	</Box>
  )
}

