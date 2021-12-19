import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { getID, setID } from "../Utils/Common";
import classes from "../css/StartingPage.module.css";

export default function StartingPage(props) {
  const history = useHistory();
  const [clientId, setClientId] = useState("");
  const [loading, setLoading] = useState(false);
  const [errror, setError] = useState("");
  const handleClient = async (e) => {
      e.preventDefault();
      setError("");
      setLoading(true);
      let idNumber;

      await fetch("/klijent/registriraj")
      .then((res) =>{
        return res.text();
      }).then((res) => {
        idNumber = JSON.parse(res);
      }).catch((err) =>{
        setError("Server error");
        console.log("Critical Server Error! ",err);
      })
      setID(idNumber);
      history.push({
        pathname: "/UserStartPage",
        state: {
          id: idNumber
        },
      });
      setLoading(false);
  };


  return (
    <div className={classes.mainContainer}>
      <button className={classes.btnKlijent} onClick={handleClient}>
        <span className={classes.txtKlijent}>ulaz klijent</span>
      </button>

      <Link to="/login">
        <button className={classes.btnLogin}>
          <span className={classes.txtLogin}>prijava djelatnici</span>
        </button>
      </Link>
      <div className={classes.cloudShape}>
        <div className={classes.cs1}></div>
        <div className={classes.cs2}></div>
        <div className={classes.cs3}></div>
        <span className={classes.txtCloud}>Red u Red</span>
      </div>
    </div>
  );
}
