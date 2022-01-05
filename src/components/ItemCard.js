import React, { useState } from "react";
import classes from "../css/itemcard.module.css";
import { useHistory } from "react-router-dom";

export default function ItemCard(props) {
  const [loading, setLoading] = useState(false);
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
        clientId: props.clientId
      },
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let data;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        klijentId: props.clientId,
        odjelId: props.id,
      }),
    };

    await fetch("/klijent/odaberiOdjel", requestOptions)
      .then((res) => {
        return res.text();
      })
      .then((res) => {
        data = JSON.parse(res);
      })
      .catch((err) => {
        console.log("Critical server error", err);
      });
    if (data) {
      history.push({
        pathname: "/notificationpop",
        state: {
          redniBroj: data.redniBroj,
          salter: data.salter,
          vrijeme: data.vrijemeCekanja / 60,
          clientId: props.clientId
        },
      });
    }
  };

  if (props.odjeltitle === "") {
    return <div></div>;
  } else {
    return (
      <div>
        {loading && <div>Loading...{loading}</div>}
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
