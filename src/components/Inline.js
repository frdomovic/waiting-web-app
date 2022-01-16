import React, { useState, useEffect } from "react";
import classes from "../css/inline.module.css";
import { useLocation, useHistory } from "react-router-dom";

export default function Inline() {

  const [ntime, setTime] = useState("");
  const [loadedtime, setLoadedtime] = useState(false);

  const [nline, setLine] = useState("");
  const [loadedline, setLoadedline] = useState(false);

  const [alerted, setAlerted] = useState(false);
  const location = useLocation();
  const history = useHistory();

  const MINUTE_MS = 3000;
  
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
      });
      
      fetch("/klijent/sinkronizacijaReda",requestOptions)
      .then((res)=>{
        return res.text();
      }).then((res)=>{
        setLine(res.toString());
        setLoadedline(true);

      }).catch((err) =>{
        console.log("Critical server error",err);
      });

      async function putInLine(){
        setLoadedline(true);
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: location.state.clientId,
        };
        await fetch("/klijent/dosaoNaRed",requestOptions)  
          .catch((err) =>{
            console.log("Critical error stavljanje u red",err);
        });
        history.push("/inlinex");
  };
      if(parseInt(nline) === 1){
        putInLine();
      }
      console.log("SELECTED:",parseInt(location.state.notifme));
      if(parseInt(nline) <= parseInt(location.state.notifme)){
        if(!alerted){
          setAlerted(true);
          alert(`DOLAZITE NA RED ZA MANJE OD ${location.state.notifme} MINUTE`);
        }
        
      }

    }, MINUTE_MS);
    return () => clearInterval(interval);
  }, [ntime,nline,location.state.clientId,history,loadedtime,location.state.notifme,alerted]);
  

  return (
    
      <div className={classes.v17_122}>
        <div className={classes.v17_124}></div>
        <div className={classes.v17_126}></div>
        <div className={classes.v17_125}></div>
        <div className={classes.v19_136}></div>
        <span className={classes.v20_137}>VAŠ BROJ: </span>
        <span className={classes.v20_138}>{location.state.ozn}{location.state.clientId}</span>
        <span className={classes.v20_139}>ŠALTER:</span>
        <span className={classes.v20_140}>{location.state.salter}</span>
        <div className={classes.v20_141}></div>
        
        <span className={classes.v23_2}>POZICIJA U REDU:</span>
        {loadedline && <span className={classes.v23_3}>{nline}</span>}
        {!loadedline && <span className={classes.v23_3}>{location.state.redniBroj}</span>}

        <span className={classes.v20_142}>Procjena do dolska na red:</span>
        {loadedtime && <span className={classes.v20_143}>{ntime} MIN</span>}
        {!loadedtime && <span className={classes.v20_143}>{Math.round(location.state.vrijeme/60)}MIN</span>}
        <div className={classes.name}></div>
        <div className={classes.name}></div>
      </div>
  );

}

