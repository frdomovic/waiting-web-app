import React, { useState } from "react";
import classes from "../css/itemcard.module.css";
import { Link, useHistory } from "react-router-dom";

export default function ItemCard(props) {
  const history = useHistory();
  const handleRequest = () => {
    history.push({
      pathname: "/odjeldesc",
      state: {
        id: props.id,
        title: props.odjeltitle,
        desc: props.odjeldesc,
        ldesc: props.odjellong,
        ico: props.odjelpng,
      },
    });
  };
  const handleSubmit = () => {
    history.push("/notificationpop");
  };

  if (props.odjeltitle === "") {
    return <div></div>;
  } else {
    return (
      <div>
        <div className={classes.cardItem}>
          <img
            src={props.odjelpng}
            alt="icon"
            width="60px"
            height="60px"
            className={classes.odjelIcon}
            onClick={handleRequest}
          />
          <span className={classes.odjelTitle} onClick={handleRequest}>
            {props.odjeltitle}
          </span>
          <span className={classes.odjelDesc} onClick={handleRequest}>
            {props.odjeldesc}
          </span>
          
            <button className={classes.btnUred} onClick={handleSubmit}>
              STANI U RED
            </button>
          
        </div>
      </div>
    );
  }
}
