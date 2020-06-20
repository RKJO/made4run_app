import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { MapDisplayGPX } from "../../containers/Events/MapDisplayGPX";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    // paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  headerSubtitleIcons: {
    padding: "10px",
  },
}));

const CustomCard = ({ data }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label='zobacz szczegóły'>
            <MoreVertIcon />
          </IconButton>
        }
        title={data.name}
        titleTypographyProps={{ variant: "subtitle1" }}
        subheader={
          <>
            <span className={classes.headerSubtitleIcons}>
              <i class='far fa-calendar-alt'> {data.start_date}</i>
            </span>
            <span className={classes.headerSubtitleIcons} s>
              <i class='fas fa-stopwatch'> {data.start_time}</i>
            </span>
          </>
        }
      />
      <MapDisplayGPX mapSM />
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          <ArrowRightAltIcon />{" "}
          <Typography component='p'>{data.distance_km} km</Typography>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <Typography paragraph>{data.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export { CustomCard };
