import { Box, Button, Container } from "@mui/material";
import { useTheme } from "@mui/material";
import { Typography } from '@mui/material';
import Image from 'mui-image';
import GitHubIcon from '@mui/icons-material/GitHub';
import styled   from 'styled-components';

export default function Footer () {
	const theme = useTheme();
	const HoverText = styled.p`
	color: #FFFFFF;
	:hover{
		color: #F6AE4A;
		cursor: pointer;
	}
`

  return (
	<Box sx={{
		color: theme.palette.common.white,
		height: '20em',
		bgcolor: '#002321',
		display: 'flex',
		justifyContent: 'center'
	}}>
		<Container maxWidth="xl" >
			<Box sx={{
					pt: '2em',
					pr: '2em',
					pl: '2em',
					pb: '2em',
					height: '20em',
					// bgcolor: 'red',
					display: 'flex',
					justifyContent: 'space-between'
				}}>
				<Box sx={{width: '15%',display: 'flex', flexDirection: 'column'}}>
					<Typography variant="h6" color="#F6AE4A">TECH USED</Typography>
					<Box sx={{
						height: '100%', 
						display: 'flex',
						flexDirection: 'column',
						flexWrap: 'wrap'
					}}>
						<Box sx={{
							height: '30%',
							width: '80%',
							display: 'flex',
							justifyContent: 'space-between'
						}}>
							<Box
							component="img"
							sx={{
								padding: "10px",
								height: "100%",
							}}
							alt="react"
							src={"/react.svg"}
							/>
							<Box
							component="img"
							sx={{
								ml: '-0.5em',
								height: "100%"
							}}
							alt="solidity"
							src={"/solidity.svg"}
							/>
						</Box>
						<Box sx={{
							height: '25%',
							width: '80%',
							display: 'flex',
							justifyContent: 'space-between'
						}}>
							<Box
							component="img"
							sx={{
								padding: "10px",
								height: "100%",
							}}
							alt="the-graph"
							src={"/the-graph.svg"}
							/>
							<Box
							component="img"
							sx={{
								padding: "10px",
								height: "100%",
							}}
							alt="typescript"
							src={"/typescript.svg"}
							/>
						</Box>
					</Box>
				</Box>
				<Box sx={{width: '15%',display: 'flex', flexDirection: 'column'}}>
					<Typography variant="h6" color="#F6AE4A">INFORMATIONS</Typography>
					<Box sx={{ mt: '1em', height: '15%', display: 'flex', justifyContent: 'flex-start'}}>
						<GitHubIcon fontSize="large" sx={{ color: 'white'}}/>
						<a style={{textDecoration: 'none'}}href="https://github.com/orgs/TheOutsidersLab/repositories" target="_blank" rel="noreferrer">
							<Box sx={{mt: '-0.45em', ml: '0.5em'}}><HoverText>Our GitHub</HoverText></Box>
						</a>
					</Box>
				</Box>
			</Box>
		</Container>
	</Box>
  )
}

