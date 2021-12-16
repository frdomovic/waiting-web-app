import classes from "../css/timecard.module.css";
import React from "react";

function ItemCardAvgTime(props) {
  if(props.odjeltitle === ""){
    return (
      <div></div>
    );
  }
  return (
      <div className={classes.cardItem}>
        <span className={classes.odjelTitle}>{props.odjeltitle}</span>
        <span className={classes.odjelTime}>{props.odjeltime}</span>
      </div>
  );
}

export default ItemCardAvgTime;
