import React, { useState } from "react";

const apiURL = "http://127.0.0.1:8000";

const CompetitionAdd = () => {
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

	return (
		<div>
			<button onClick={addCompetitions}>test</button>
		</div>
	);
};

export { CompetitionAdd };
