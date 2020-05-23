import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import {
	FormControl,
	// FormHelperText,
	Input,
	InputLabel,
} from "@material-ui/core";

// custom components
import RegularButton from "../../../components/CustomButtons/Button";
import { GridContainer } from "../../../components/Grid/GridContainer";
import { GridItem } from "../../../components/Grid/GridItem";

const styles = {
	labelRoot: {
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
		color: "#AAAAAA !important",
		fontWeight: "400",
		fontSize: "14px",
		lineHeight: "1.42857",
		top: "10px",
		letterSpacing: "unset",
		"& + $underline": {
			marginTop: "0px",
		},
	},
	section: {
		padding: "10px 0",
		textAlign: "center",
		color: "black",
		minHeight: "49vh",
	},
	formControl: {
		margin: "0 0 2px 0",
		paddingTop: "15px",
		position: "relative",
		"& svg,& .fab,& .far,& .fal,& .fas,& .material-icons": {
			color: "#495057",
		},
	},
	subtitle: {
		fontSize: "1.313rem",
		// maxWidth: "500px",
		margin: "40px auto 0",
	},
};

const useStyles = makeStyles(styles);

const CompetitionDistancesAdd = ({ distances }) => {
	const classes = useStyles();
	// const [distances, setDistances] = useState([]);
	console.log(distances);

	return (
		<>
			{distances.map((item, idx) => (
				<GridContainer key={idx}>
					<GridItem xs={12}>
						<h5 className={classes.subtitle}>
							Dystans no. {idx + 1}
						</h5>
					</GridItem>
					<GridItem xs={12} sm={12} md={8}>
						<FormControl className={classes.formControl} fullWidth>
							<InputLabel
								className={classes.labelRoot}
								htmlFor={`distance-${idx}-name`}
							>
								Nazwa dystansu
							</InputLabel>
							<Input
								type='text'
								id={`distance-${idx}-name`}
								value={item.name}
								onChange={(e) => console.log(e.target.value)}
							/>
						</FormControl>
					</GridItem>
					<GridItem xs={12} sm={12} md={4}>
						<FormControl className={classes.formControl} fullWidth>
							<InputLabel
								className={classes.labelRoot}
								htmlFor={`distance-${idx}-km`}
							>
								`Dystans (km)`
							</InputLabel>
							<Input
								type='number'
								id={`distance-${idx}-km`}
								value={item.distance_km}
								onChange={(e) => console.log(e.target.value)}
							/>
						</FormControl>
					</GridItem>
					<GridItem xs={6} sm={6} md={3}>
						<FormControl className={classes.formControl} fullWidth>
							<InputLabel
								className={classes.labelRoot}
								htmlFor={`distance-${idx}-ascent`}
							>
								Przewyższenie
							</InputLabel>
							<Input
								type='number'
								id={`distance-${idx}-ascent`}
								value={item.ascent}
								onChange={(e) => console.log(e.target.value)}
							/>
						</FormControl>
					</GridItem>
					<GridItem xs={6} sm={6} md={3}>
						<FormControl className={classes.formControl} fullWidth>
							<InputLabel
								className={classes.labelRoot}
								htmlFor={`distance-${idx}-descent`}
							>
								Deniwelacja
							</InputLabel>
							<Input
								type='number'
								id={`distance-${idx}-descent`}
								value={item.descent}
								onChange={(e) => console.log(e.target.value)}
							/>
						</FormControl>
					</GridItem>
					<GridItem xs={6} sm={6} md={3}>
						<FormControl className={classes.formControl} fullWidth>
							<InputLabel
								className={classes.labelRoot}
								htmlFor={`distance-${idx}-ITRA-points`}
							>
								ITRA
							</InputLabel>
							<Input
								type='number'
								id={`distance-${idx}-ITRA-points`}
								value={item.ITRA_points}
								onChange={(e) => console.log(e.target.value)}
							/>
						</FormControl>
					</GridItem>
					<GridItem xs={6} sm={6} md={3}>
						<FormControl className={classes.formControl} fullWidth>
							<InputLabel
								className={classes.labelRoot}
								htmlFor={`distance-${idx}-moutain-level`}
							>
								Charakter górski
							</InputLabel>
							<Input
								type='number'
								id={`distance-${idx}-moutain-level`}
								value={item.mountain_level}
								onChange={(e) => console.log(e.target.value)}
							/>
						</FormControl>
					</GridItem>
				</GridContainer>
			))}
		</>
	);
};

export { CompetitionDistancesAdd };
