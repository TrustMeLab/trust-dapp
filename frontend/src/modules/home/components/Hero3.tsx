import { Box, Button } from "@mui/material";
import { useTheme } from "@mui/material";
import Image from 'mui-image';

export default function Hero3 () {
	const theme = useTheme();

  return (
    <Box sx={{
			mt: '3em', // a voir selon préférences
			height: '32em',
			bgcolor: '#BCD5CF',
			display: 'flex',
			justifyContent: 'center'
		}}>
		<Box sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				alignItems: 'center',
				width: '70%'
			}}>
			<Box sx={{
					mt: '1.5em',
					fontSize: '1.5em',
					textAlign: 'center'
			}}>Are you a Professional?</Box>
			<Box sx={{
				textAlign: 'center',
				width: '50%'
			}}>
				Use our SDK to integrate our service simple solution that allows you to use trust protocole with your web2 website
			</Box>
			
			<Box
				component="img"
				sx={{
					height: "70%",
				}}
				alt="fusee"
				src={"/fusee.jpg"}
			/>
	
		</Box>
	</Box>
  )
}

