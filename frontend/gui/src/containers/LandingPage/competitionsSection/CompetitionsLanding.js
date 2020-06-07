import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { CustomTable } from "../../../components/Table/Table";

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
const apiURL = process.env.REACT_APP_API_URL;

const CompetitionsLanding = () => {
	const classes = useStyles();

	const [competitions, setCompetitions] = useState([]);
	const [loading, setLoading] = useState(false);

	const getDate = () => {
		const date = new Date();
		const firstDay = new Date(date.getFullYear(), date.getMonth(), 2)
			.toISOString()
			.slice(0, 10);
		const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1)
			.toISOString()
			.slice(0, 10);
		return `/?min_date=${firstDay}&max_date=${lastDay}`;
	};

	const [queryDate, setQueryDate] = useState(getDate());

	const feachData = async (queryParams = "/") => {
		setLoading(true);

		try {
			const response = await fetch(
				`${apiURL}/api/competitions${queryParams}`
			);
			const data = await response.json();
			setCompetitions(data);
		} catch (e) {
			console.log("error", e);
		}

		setLoading(false);
	};

	useEffect(() => {
		feachData(queryDate);
	}, []);

	return (
		<section className={classes.section}>
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

export { CompetitionsLanding };
