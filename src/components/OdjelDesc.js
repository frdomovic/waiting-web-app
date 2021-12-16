import React from "react";
import classes from "../css/odjeldesc.module.css";
import { Link } from "react-router-dom";

export default function OdjelDesc(props) {
    console.log(props);
  return (
    <div className={classes.pageContainer}>
      <span className={classes.appTitle}>RED U RED </span>
      <Link to="/UserStartPage">
        <button className={classes.btnExit}>NAZAD</button>
      </Link>
     

      <div className={classes.cardsContainer}>
      <div className={classes.shortdesc}>Detaljnije o</div>
      </div>
    </div>
  );
}
