import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import { CompetitiponSearch } from "./CompetitiponSearch";
import { CustomTable } from "../../components/Table/Table";

const styles = {
	section: {
		padding: "40px 0",
		textAlign: "center",
		color: "black",
		minHeight: "49vh",
	},
};

const columns = [
	{ id: "name", label: "Nazwa", minWidth: 180 },
	{ id: "location", label: "Lokalizacja", minWidth: 170 },
	{
		id: "start_date",
		label: "Temin zawodów",
		minWidth: 130,
		align: "center",
		format: (value) => Date.parse(value.toLocaleString()),
	},
	{
		id: "url",
		label: "Link",
		minWidth: 100,
		align: "center",
		format: (value) => value.toLocaleString(),
	},
	{
		id: "distances",
		label: "Dystanse",
		minWidth: 170,
		align: "right",
	},
];

const useStyles = makeStyles(styles);

const CompetitionList = () => {
	const classes = useStyles();

	const [competitions, setCompetitions] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(async () => {
		setLoading(true);

		const response = await fetch("http://127.0.0.1:8000/api/competitions");
		const data = await response.json();

		setCompetitions(data);
		setLoading(false);
	}, []);

	const searchCompetitions = (value) => {
		console.log(value);
	};

	return (
		<section className={classes.section}>
			<CompetitiponSearch searchCompetitions={searchCompetitions} />
			{loading ? (
				<CircularProgress color='secondary' />
			) : (
				<CustomTable
					tableHeaderColor='primary'
					tableHead={columns}
					tableData={competitions}
				/>
			)}
		</section>
	);
};

export { CompetitionList };
