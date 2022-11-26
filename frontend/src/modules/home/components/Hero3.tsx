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
				justifyContent: 'center',
				alignItems: 'center',
				width: '50%'
			}}>
			<Box sx={{
					mb: '1em',
					fontSize: '1.5em',
					textAlign: 'center'
			}}>Are you a Professional? Use our SDK to integrate our service
			</Box>
			<Box
				component="img"
				sx={{
					height: "80%",
					mb: '-2.6em'
				}}
				alt="fusee"
				src={"/fusee.jpg"}
			/>
	
		</Box>
	</Box>
  )
}

