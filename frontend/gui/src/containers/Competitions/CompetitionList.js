import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { CustomTable } from "../../components/Table/Table";

const styles = {
  section: {
    padding: "70px 0",
    textAlign: "center",
    color: "black",
    minHeight: "100vh",
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
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

const useStyles = makeStyles(styles);

const CompetitionList = () => {
  const classes = useStyles();

  const [competitions, setCompetitions] = useState([]);

  useEffect(async () => {
    await fetch("http://127.0.0.1:8000/api/competitions")
      .then((response) => response.json())
      .then(setCompetitions);
  }, []);

  return (
    <>
      <div className={classes.section}>
        <CustomTable
          tableHeaderColor='primary'
          tableHead={columns}
          tableData={competitions}
        />
      </div>
    </>
  );
};

export { CompetitionList };
