import React, {useEffect} from "react";
import classes from "../css/odjeldesc.module.css";
import { Link, useLocation } from "react-router-dom";

export default function OdjelDesc(props) {
  const location = useLocation();
  return (
    <div className={classes.pageContainer}>
      <span className={classes.appTitle}>RED U RED </span>
      <Link to="/UserStartPage">
        <button className={classes.btnExit}>NAZAD</button>
      </Link>
      

      <div className={classes.cardsContainer}>
        <img src={location.state.ico} alt="icon" width="160px" height="160px"className={classes.odjelIcon}/>
        <div className={classes.underline}></div>
        <span className={classes.odjelTitle}>VIŠE O ODJELU: {location.state.title}</span>
        <span className={classes.odjelDesc}>{location.state.ldesc}</span>
      </div>
    </div>
  );
}
