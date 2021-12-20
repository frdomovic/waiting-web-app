import React, { useState, useEffect } from "react";
import classes from "../css/inline.module.css";
import { useLocation, useHistory } from "react-router-dom";

export default function InLine() {
  const [notificationstatus, setNotificationstatus] = useState(true);
  const [ntime, setTime] = useState("");
  const location = useLocation();
  const MINUTE_MS = 1000;
  const LINE_MS = 10000;
  const history = useHistory();
  const [flag2, setflag2] = useState(true);
  let vrijeme;
  const [flag,setflag] = useState(true);
  useEffect(() => {
    const interval = setInterval(() =>{
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: location.state.clientId,
      };
      fetch("/klijent/sinkronizirajVrijeme",requestOptions)
      .then((res)=>{
        return res.text();
      }).then((res)=>{
        setTime(res/60);
      }).catch((err) =>{
        console.log("Critical server error",err);
      })

    }, MINUTE_MS);
    return () => clearInterval(interval);
  }, []);
  
  var checkLine = setInterval(() =>{
    if(location.state.redniBroj == 1){
      setflag(false);
      
    }
      
  }, LINE_MS);

  if(!flag && !flag2){
    setflag2(false);
    clearInterval(checkLine);
    history.push({
      pathname: '/inlinex',
      state: {
      redniBroj: location.state.redniBroj,
      salter: location.state.salter,
      vrijeme: location.state.vrijeme,
      clientId: location.state.clientId
      }});
  }
  

  return (
    <body>
      <div className={classes.v17_122}>
        <div className={classes.v17_124}></div>
        <div className={classes.v17_126}></div>
        <div className={classes.v17_125}></div>
        <div className={classes.v19_136}></div>
        <span className={classes.v20_137}>VAŠ BROJ : </span>
        <span className={classes.v20_138}>  A{location.state.clientId}</span>
        <span className={classes.v20_139}>ŠALTER:</span>
        <span className={classes.v20_140}>{location.state.salter}</span>
        <div className={classes.v20_141}></div>
        
        <span className={classes.v23_2}>POZICIJA U REDU:</span>
        <span className={classes.v23_3}>{location.state.redniBroj}</span>

        <span className={classes.v20_142}>Procjena do dolska na red:</span>
        <span className={classes.v20_143}>{Math.round(ntime)} MIN</span>
        <div className={classes.name}></div>
        <div className={classes.name}></div>
      </div>
    </body>
  );
}
