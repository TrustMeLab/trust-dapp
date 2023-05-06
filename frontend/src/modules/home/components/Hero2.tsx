import { Box, Button } from "@mui/material";
import { useTheme } from "@mui/material";
import Image from 'mui-image';

export default function Hero2 () {
	const theme = useTheme();

  return (
    <Box sx={{
			height: '40em',
			bgcolor: '#FFFFFF',
			display: 'flex',
			justifyContent: 'center',
		}}>
		<Box sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				width: '50%'
			}}>
			<Box sx={{ mb: '1em', textAlign: 'center', fontSize: '3em'}}>Certify your reputation through blockchain</Box>
			<Image src="/blockchain_user.png"
            height="40%"
            width="40%"
            fit="contain"/>
            {/* <Box sx={{mb: '0.4em'}}>L O G O</Box> */}
			<Box sx={{
					mt: '1em',
					mb: '1em',
					fontSize: '1.2em',
					textAlign: 'center'
			}}>A Dapp providing a fair track record of all the tenants payment </Box>
			<Box sx={{mb: '0.4em', fontSize: '1em'}}>Helping both tenant and owner to trust each other</Box>
		</Box>
	</Box>
  )
}

