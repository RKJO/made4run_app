import React, { useState } from "react";
// react plugin for creating date-time-picker
import DateFnsUtils from "@date-io/date-fns";
import plLocale from "date-fns/locale/pl";

import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from "@material-ui/pickers";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import {
	FormControl,
	FormHelperText,
	Input,
	InputLabel,
	OutlinedInput,
} from "@material-ui/core";

// custom components
import RegularButton from "../../../components/CustomButtons/Button";
import { GridContainer } from "../../../components/Grid/GridContainer";
import { GridItem } from "../../../components/Grid/GridItem";
import { CompetitionDistancesAdd } from "./CompetitionDistancesAdd";

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

// const baseDistancesObject = {
// 	name: "",
// 	distance_km: null,
// 	ascent: null,
// 	descent: null,
// 	ITRA_points: null,
// 	mountain_level: null,
// };

const useStyles = makeStyles(styles);
const apiURL = "http://127.0.0.1:8000";

const CompetitionAdd = () => {
	const classes = useStyles();
	const [newCompetition, setNewCompetition] = useState({
		no: null,
		name: "test1",
		location: "jakieś tam miejsce gdzieś tam",
		start_date: "2020-01-01",
		end_date: null,
		description: "",
		url: "http://www.onet.pl",
		text: "",
		slug: "",
		distances: [
			{
				name: "",
				distance_km: 42.1,
				ascent: 940,
				descent: 940,
				ITRA_points: null,
				mountain_level: null,
			},
			{
				name: "",
				distance_km: 21,
				ascent: 470,
				descent: 470,
				ITRA_points: null,
				mountain_level: null,
			},
			{
				name: "",
				distance_km: 10,
				ascent: 250,
				descent: 250,
				ITRA_points: null,
				mountain_level: null,
			},
		],
	});
	const [distances, setDistances] = useState([
		{
			name: "",
			distance_km: null,
			ascent: null,
			descent: null,
			ITRA_points: null,
			mountain_level: null,
		},
	]);

	const addCompetitions = async () => {
		try {
			const addData = await fetch(`${apiURL}/api/competitions/`, {
				method: "POST",
				body: JSON.stringify(newCompetition),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const data = await addData.json();
			console.log(data);
		} catch (e) {
			console.log(JSON.stringify(newCompetition), "error: ", e);
		}
	};

	const handleDistancesFormNumber = (inputValue) => {
		const numberOfDistancesForms = [...Array(parseInt(inputValue)).keys()];
		setDistances((prevState) => {
			let prevDistances = [...prevState];

			if (prevDistances.length < parseInt(inputValue)) {
				const distancesKeysToAdd = numberOfDistancesForms.filter(
					(item) => !prevDistances[item]
				);

				distancesKeysToAdd.map(() =>
					prevDistances.push({
						name: "",
						distance_km: null,
						ascent: null,
						descent: null,
						ITRA_points: null,
						mountain_level: null,
					})
				);
			} else if (prevDistances.length > parseInt(inputValue)) {
				prevDistances = numberOfDistancesForms.map(
					(item) => prevDistances[item]
				);
			}
			return prevDistances;
		});
	};

	const handleDistancesChange = (value, id) => {
		const index = id.split("-")[1];
		const fieldname = id.split("-")[2];

		setDistances((prevState) => {
			const distanceNewValue = [...prevState];
			distanceNewValue[index][fieldname] = value;
			return distanceNewValue;
		});
	};

	const handleSubmit = () => {
		console.log("submit");
	};

	return (
		<section className={classes.section}>
			<form onSubmit={handleSubmit}>
				<GridContainer>
					<GridItem xs={12} sm={12} md={2}>
						<br />
						<FormControl className={classes.formControl} fullWidth>
							<InputLabel
								className={classes.labelRoot}
								htmlFor='competition-no'
							>
								Edycja Zawodów
							</InputLabel>
							<Input
								type='number'
								id='competition-no'
								value={null}
								onChange={(e) => console.log(e.target.value)}
							/>
						</FormControl>
					</GridItem>
					<GridItem xs={12} sm={12} md={10}>
						<br />
						<FormControl className={classes.formControl} fullWidth>
							<InputLabel
								className={classes.labelRoot}
								htmlFor='competition-name'
							>
								Nazwa zawodów
							</InputLabel>
							<Input
								type='text'
								id='competition-name'
								value={null}
								onChange={(e) => console.log(e.target.value)}
							/>
						</FormControl>
					</GridItem>
					<GridItem xs={12} sm={12} md={6}>
						<br />
						<FormControl className={classes.formControl} fullWidth>
							<InputLabel
								className={classes.labelRoot}
								htmlFor='competition-location'
							>
								Lokalizacja
							</InputLabel>
							<Input
								type='text'
								id='competition-location'
								value={null}
								onChange={(e) => console.log(e.target.value)}
							/>
						</FormControl>
					</GridItem>
					<GridItem xs={12} sm={12} md={6}>
						<br />
						<FormControl className={classes.formControl} fullWidth>
							<InputLabel
								className={classes.labelRoot}
								htmlFor='competition-url'
							>
								URL{" "}
							</InputLabel>
							<Input
								type='text'
								id='competition-url'
								value={null}
								onChange={(e) => console.log(e.target.value)}
							/>
						</FormControl>
					</GridItem>
					<GridItem xs={12} sm={12} md={6}>
						<br />
						<FormControl className={classes.formControl} fullWidth>
							<MuiPickersUtilsProvider
								utils={DateFnsUtils}
								locale={plLocale}
							>
								<KeyboardDatePicker
									autoOk
									variant='inline'
									// inputVariant='outlined'
									label='Data rozpoczecia zawodów:'
									format='yyyy-MM-dd'
									value={null}
									InputAdornmentProps={{ position: "start" }}
									onChange={(date) => {
										console.log(date);
									}}
								/>
							</MuiPickersUtilsProvider>
						</FormControl>
					</GridItem>
					<GridItem xs={12} sm={12} md={6}>
						<br />
						<FormControl className={classes.formControl} fullWidth>
							<MuiPickersUtilsProvider
								utils={DateFnsUtils}
								locale={plLocale}
							>
								<KeyboardDatePicker
									autoOk
									variant='inline'
									// inputVariant='outlined'
									label='Data zakończenia zawodów:'
									format='yyyy-MM-dd'
									value={null}
									InputAdornmentProps={{ position: "start" }}
									onChange={(date) => {
										console.log(date);
									}}
								/>
							</MuiPickersUtilsProvider>
						</FormControl>
					</GridItem>
					<GridItem>
						<br />
						<FormControl className={classes.formControl} fullWidth>
							<InputLabel
								className={classes.labelRoot}
								htmlFor='competition-description'
							>
								Opis
							</InputLabel>
							<Input
								type='text'
								id='competition-description'
								value={null}
								onChange={(e) => console.log(e.target.value)}
							/>
						</FormControl>
					</GridItem>
				</GridContainer>
				<GridContainer>
					<GridItem xs={10} sm={10} md={8}>
						<h4 className={classes.subtitle}>
							Wybierz liczbę dystansów w których mogą wystartować
							zawodnicy
						</h4>
					</GridItem>
					<GridItem xs={2}>
						<br />
						<FormControl className={classes.formControl} fullWidth>
							<OutlinedInput
								type='number'
								id='dictances-no'
								inputVariant='outlined'
								value={distances.length}
								onChange={(e) => {
									handleDistancesFormNumber(e.target.value);
								}}
							/>
						</FormControl>
					</GridItem>
				</GridContainer>
				<CompetitionDistancesAdd
					distances={distances}
					handleDistancesChange={handleDistancesChange}
				/>
				<GridContainer
					direction='row'
					justify='flex-end'
					alignItems='center'
				>
					<GridItem xs={12} sm={12} md={2}>
						<RegularButton
							type='submit'
							fullWidth
							size='sm'
							// color='success'
						>
							Dodaj Zawody
						</RegularButton>
					</GridItem>
				</GridContainer>
			</form>
		</section>
	);
};

export { CompetitionAdd };
