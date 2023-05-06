import { Box, Button, Container, Divider } from "@mui/material";
import { useTheme } from "@mui/material";
import { Typography } from '@mui/material';
import Image from 'mui-image';
import GitHubIcon from '@mui/icons-material/GitHub';
import styled from 'styled-components';

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
		bgcolor: '#007873',
		display: 'flex',
		justifyContent: 'center'
	}}>
		<Container maxWidth="xl">
			<Box sx={{height: '20em', display:'flex', flexDirection: 'column'}}>
				<Box sx={{
							pt: '2em',
							pr: '2em',
							pl: '2em',
							pb: '2em',
							height: '80%',
							// bgcolor: 'red',
							display: 'flex',
							justifyContent: 'center',
							gap: '10em'
						}}>
						<Box sx={{
							width: '35%',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							height: '90%'
							}}>
							<Typography variant="h5" color="#F6AE4A">TECH USED</Typography>
								<Box sx={{
									mt: '2em',
									height: '30%',
									width:'100%',
									display: 'flex',
									justifyContent: 'space-between'
								}}>
									<Box
									component="img"
									sx={{
										height: "100%",
									}}
									alt="react"
									src={"/react.svg"}
									/>
									<Box
									component="img"
									sx={{
										ml: '-0.5em',
										height: "100%",
									}}
									alt="typescript"
									src={"/typescript.svg"}
									/>

									<Box
									component="img"
									sx={{
										height: "100%",
									}}
									alt="the-graph"
									src={"/the-graph.svg"}
									/>
									<Box
									component="img"
									sx={{
										mt: '-0.3em',
										ml: '-2em',
										height: "120%"
									}}
									alt="solidity"
									src={"/solidity.svg"}
									/>
								</Box>
							</Box>
						<Box sx={{width: '15%',display: 'flex', flexDirection: 'column'}}>
							<Typography variant="h5" color="#F6AE4A">INFORMATIONS</Typography>
							<Box sx={{ mt: '2.2em', height: '15%', display: 'flex', justifyContent: 'flex-start'}}>
								<GitHubIcon fontSize="large" sx={{ color: 'white'}}/>
								<a style={{textDecoration: 'none'}}href="https://github.com/orgs/TrustMeLab/repositories" target="_blank" rel="noreferrer">
									<Box sx={{mt: '-0.45em', ml: '0.5em'}}><HoverText>Our GitHub</HoverText></Box>
								</a>
							</Box>
						</Box>
					</Box>
				<Divider/>
				<Box sx={{
					mt: '1.2em',
					fontSize: '0.8em',
					display: 'flex',
					justifyContent: 'center'
				}}>
				2022 Trust.Me Project - Coded by The Outsiders - Made with ❤️
				</Box>
			</Box>
		</Container>
	</Box>
  )
}

