import React, { useState, useEffect } from "react";
import classes from "../css/inline.module.css";
import { useLocation, useHistory } from "react-router-dom";

export default function InLine() {
  const [notificationstatus, setNotificationstatus] = useState(true);

  const [ntime, setTime] = useState("");
  const [loadedtime, setLoadedtime] = useState(false);

  const [nline, setLine] = useState("");
  const [loadedline, setLoadedline] = useState(false);

  const [numin, setNumin] = useState("");
  const [redi, setRedi] = useState(false);

  const location = useLocation();
  const history = useHistory();

  const MINUTE_MS = 1000;
  const LINE_MS = 10000;

  
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

        setTime(Math.round(res/60));
        setLoadedtime(true);

      }).catch((err) =>{
        console.log("Critical server error",err);
      })
     
      fetch("/klijent/sinkronizacijaReda",requestOptions)
      .then((res)=>{
        return res.text();
      }).then((res)=>{

        setLine(res);
        setLoadedline(true);

      }).catch((err) =>{
        console.log("Critical server error",err);
      })


      fetch("/klijent/sinkronizacijaReda",requestOptions)
      .then((res)=>{
        return res.text();
      }).then((res)=>{
          setNumin(res);
          putInLine();
      }).catch((err) =>{
        console.log("Critical error sinkronizacija vremena",err);
      })

    }, MINUTE_MS);


    
  }, []);

  const putInLine = async () =>{
    if(!loadedline){
      if(numin === 1){
        setLoadedline(true);
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: location.state.clientId,
        };
        console.log("TUUU SAMMM");
        await fetch("/klijent/dosaoNaRed",requestOptions)  
          .catch((err) =>{
            console.log("Critical error stavljanje u red",err);
        })

      }
    }  

  };

  /*
    return () => clearInterval(interval);
  var checkLine = setInterval(() =>{
    if(location.state.redniBroj == 1){
      history.push({
        pathname: '/inlinex',
        state: {
        redniBroj: location.state.redniBroj,
        salter: location.state.salter,
        vrijeme: location.state.vrijeme,
        clientId: location.state.clientId
      }});
    }
      
  }, LINE_MS);*/


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
        {!loadedline && <span className={classes.v23_3}>{nline}</span>}
        {loadedline && <span className={classes.v23_3}>{location.state.redniBroj}</span>}

        <span className={classes.v20_142}>Procjena do dolska na red:</span>
        {loadedtime && <span className={classes.v20_143}>{ntime} MIN</span>}
        {!loadedtime && <span className={classes.v20_143}>{location.state.vrijeme } MIN</span>}
        <div className={classes.name}></div>
        <div className={classes.name}></div>
      </div>
    </body>
  );

}

