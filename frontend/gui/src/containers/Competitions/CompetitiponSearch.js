import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, FormHelperText, Input } from "@material-ui/core";
import RegularButton from "../../components/CustomButtons/Button";

// import FormControl from "@material-ui/core/FormControl";
// import Input  from "@material-ui/core/Input";

// import TextField from "@material-ui/core/TextField";

const styles = {
	section: {
		padding: "70px 0 0 0",
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

	const handleSubmit = (e) => {
		e.preventDefault();
		props.searchCompetitions(competitionName);
	};

	return (
		<section className={classes.section}>
			<form onSubmit={handleSubmit}>
				<FormControl fullWidth>
					<Input
						type='text'
						id='competition-name'
						aria-describedby='competition-name-helper-text'
						value={competitionName}
						onChange={(e) => setCompetitionName(e.target.value)}
					/>
					<FormHelperText id='competition-name-helper-text'>
						Nazwa zawodów
					</FormHelperText>
				</FormControl>
				<RegularButton
					type='submit'
					fullWidth
					size='sm'
					color='success'
				>
					Wyszykaj
				</RegularButton>
			</form>
		</section>
	);
};

export { CompetitiponSearch };
