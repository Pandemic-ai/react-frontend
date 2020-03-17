import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import * as ReactLeaflet from "react-leaflet";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";

const { Popup } = ReactLeaflet;

const useStyles = makeStyles({
  card: {
    maxWidth: 505,
    backgroundColor: "#545051"
  },
  media: {
    height: 150
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default function MarkerPopup({ open, setOpen, detail }) {
  const classes = useStyles();

  function handleClose() {
    setOpen(false);
  }
  return (
    <Popup autoPan={false}>
      <Modal
        className={classes.modal}
        open={open}
        classes={{ root: classes.root }}
        onClose={setOpen}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 0,
          invisible: true
        }}
      >
        <Card className={classes.card}>
          <button className="don btn" onClick={setOpen}>
            X
          </button>
          <CardMedia
            className={classes.media}
            image="https://www.dwf.law/-/media/DWF/Images/Locations-Assets/Warsaw/Warsaw-700-x-388.ashx"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Place : {detail.location}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Details
            </Button>
            <Button size="small" color="primary">
              Donate
            </Button>
          </CardActions>
        </Card>
      </Modal>
    </Popup>
  );
}
