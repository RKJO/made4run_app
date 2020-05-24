// import "date-fns";

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
	// InputLabel,
} from "@material-ui/core";
// custom components
import RegularButton from "../../components/CustomButtons/Button";
import { GridContainer } from "../../components/Grid/GridContainer";
import { GridItem } from "../../components/Grid/GridItem";

const styles = {
	section: {
		// padding: "20px 0 0 0",
		textAlign: "center",
		color: "black",
		// minHeight: "49vh",
	},
};

const useStyles = makeStyles(styles);

const CompetitiponSearch = (props) => {
	const classes = useStyles();
	// const { inputProps } = props;
	const [competitionName, setCompetitionName] = useState("");
	const [minDate, setMinDate] = useState("");
	const [maxDate, setMaxDate] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = {
			name: competitionName,
			min_date: minDate,
			max_date: maxDate,
		};
		props.searchCompetitions(formData);
	};

	return (
		<section className={classes.section}>
			<form onSubmit={handleSubmit}>
				<GridContainer>
					<GridItem xs={12} sm={12} md={12}>
						<br />
						<FormControl fullWidth>
							<Input
								type='text'
								id='competition-name'
								aria-describedby='competition-name-helper-text'
								value={competitionName}
								onChange={(e) =>
									setCompetitionName(e.target.value)
								}
							/>
							<FormHelperText id='competition-name-helper-text'>
								Nazwa zawodów
							</FormHelperText>
						</FormControl>
					</GridItem>
					<GridItem xs={12} sm={12} md={6}>
						<br />
						<FormControl fullWidth>
							<MuiPickersUtilsProvider
								utils={DateFnsUtils}
								locale={plLocale}
							>
								<KeyboardDatePicker
									autoOk
									variant='inline'
									inputVariant='outlined'
									label='Data od:'
									format='yyyy-MM-dd'
									value={minDate.length > 0 ? minDate : null}
									InputAdornmentProps={{ position: "start" }}
									onChange={(date) => {
										setMinDate(
											date.toISOString().slice(0, 10)
										);
									}}
								/>
							</MuiPickersUtilsProvider>
						</FormControl>
					</GridItem>
					<GridItem xs={12} sm={12} md={6}>
						<br />
						<FormControl fullWidth>
							<MuiPickersUtilsProvider
								utils={DateFnsUtils}
								locale={plLocale}
							>
								<KeyboardDatePicker
									autoOk
									variant='inline'
									inputVariant='outlined'
									label='Data do:'
									format='yyyy-MM-dd'
									value={maxDate.length > 0 ? maxDate : null}
									InputAdornmentProps={{ position: "start" }}
									onChange={(date) => {
										setMaxDate(
											date.toISOString().slice(0, 10)
										);
									}}
								/>
							</MuiPickersUtilsProvider>
						</FormControl>
					</GridItem>
				</GridContainer>
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
							Wyszykaj
						</RegularButton>
					</GridItem>
				</GridContainer>
			</form>
		</section>
	);
};

export { CompetitiponSearch };
