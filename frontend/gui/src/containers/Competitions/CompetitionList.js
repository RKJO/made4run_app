import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

// custom components
import RegularButton from "../../components/CustomButtons/Button";
import { GridContainer } from "../../components/Grid/GridContainer";
import { GridItem } from "../../components/Grid/GridItem";
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
const apiURL = process.env.REACT_APP_API_URL;

const CompetitionList = () => {
  const classes = useStyles();

  const [competitions, setCompetitions] = useState([]);
  const [loading, setLoading] = useState(false);

  const feachData = async (queryParams = "/") => {
    setLoading(true);

    try {
      const response = await fetch(`${apiURL}/api/competitions${queryParams}`);
      const data = await response.json();
      setCompetitions(data);
    } catch (e) {
      console.log("error", e);
    }

    setLoading(false);
  };

  useEffect(() => {
    feachData();
  }, []);

  const searchCompetitions = async (formData) => {
    const kaysArr = Object.keys(formData).filter(
      (item) => formData[item].length > 0
    );

    const query = kaysArr.map((item) => `${item}=${formData[item]}`).join("&");

    const searchApiQuery = `/?${query}`;

    feachData(searchApiQuery);
  };

  return (
    <section className={classes.section}>
      <GridContainer direction='row' justify='flex-end' alignItems='center'>
        <GridItem xs={12} sm={12} md={2}>
          <Link to='competitions/add'>
            <RegularButton round fullWidth color='success'>
              Dodaj Zawody
            </RegularButton>
          </Link>
        </GridItem>
      </GridContainer>
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
