import React,{useState} from "react";
import classes from "../css/inlinedone.module.css";
import {Link, useLocation, useHistory} from "react-router-dom";


export default function InLineDone() {
  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  
  const handleIzlaz = async() =>{
    setLoading(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: location.state.clientId,
    };
    await fetch("/klijent/dosaoNaRed",requestOptions)
    .then((res)=>{
      return res.text();
    }).then((res)=>{
    }).catch((err) =>{
      console.log("Critical server error",err);
    })
    history.push("/");
  };
  return (
    <body>
      <div className={classes.v20_156}>
        <div className={classes.v20_157}></div>
        <div className={classes.v20_158}></div>
        <div className={classes.v20_159}></div>
        
        
        <div className={classes.v20_188}></div>
        <span className={classes.v20_189}>NA REDU STE!</span>
        <button className={classes.v20_191}onClick={handleIzlaz}>
        <div className={classes.v20_190}>IZLAZ</div>
        </button>
        
      </div>
    </body>
  );
}
