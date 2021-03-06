import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import ItemCardAvgTime from "./ItemCardAvgTime";
import classes from "../css/workerStartPage.module.css";
import { removeUserSession, getUser, getToken } from "../Utils/Common";

function WorkerStartPage(props) {
  const user = getUser().substring(0,getUser().lastIndexOf("@"));
  const [error, setError] = useState("");

  const [avgtime, setAvgTime] = useState([]);

  const [loaded, setLoaded] = useState(false);
  const [salter, setSalter] = useState("");
  const [inline, setInline] = useState([]);
  const [xload, setXload] = useState(false);
  const MINUTE_MS = 1000;


  const handleLogout = async () => {
    setError("");
    const requestOptions = {
        method: "GET",
        headers: { "Authorization": `Bearer ${getToken()}`},
    };
  
    await fetch(
        "/djelatnik/odjava",
        requestOptions
      )
    .then((res) =>{
      removeUserSession();
      props.history.push("/login");
    }).catch((error)=> {
      setError("Failed to logout! error type:",error);
    });
  }

  useEffect(() => {
    setXload(false);
    setLoaded(false);
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${getToken()}` },
    };


    fetch("/djelatnik/dohvatiProsjecnaVremena", requestOptions)
      .then((res) => {
        return res.text();
      })
      .then((fetchdata) => {
        setAvgTime(JSON.parse(fetchdata));
        setXload(true);
      })
      .catch((err) => {
        console.log("Critical server error[ODJELI]:", err);
      });
    const interval = setInterval(() =>{
      fetch("/djelatnik/dohvatiRed", requestOptions)
      .then((res)=>{
        return res.text();
      }).then((res)=> {
        setInline(JSON.parse(res));
        
      }).catch((err)=>{
        console.log("critical server error",err);
      })
    },MINUTE_MS);
    setLoaded(true);
    return () => clearInterval(interval);
    
  }, []);

  const getSalter = async() => {
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${getToken()}` },
    };
    fetch("/djelatnik/dohvatiSalter", requestOptions)
    .then((res) => {
      return res.text();
    })
    .then((res2) => {
      let a = JSON.parse(res2);
      let b = a.oznProzor;
      setSalter(b);
    })
    .catch((error) => {
      console.log("Critical server error[Salter]", error);
      setError("Error:", error);
    });
  }
  getSalter();

  const handlenext = async() =>{
    setLoaded(false);
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${getToken()}` },
    };
    await fetch("/djelatnik/krajObrade", requestOptions)
    .then((res)=>{
      if(res.status === 200){
        console.log("ok");
      }else{
        console.log("error");
      }
    }).catch((err)=>{
      console.log("critical server error",err);
    })

    setLoaded(true);
    window.location.reload(false);
  };
 
  return (
    <div className={classes.pageContainer}>
      {!error && <span className={classes.usernameWorker}>DJELATNIK: {user}</span>}
      {error && <span className={classes.usernameWorker}>err:{error}</span>}
      <Button className={classes.btnExit} onClick={handleLogout}>
        <span className={classes.btnExitTxt}>IZLAZ</span>
      </Button>
      <div className={classes.name}></div>
      <div className={classes.odjelContainers}></div>
      <span className={classes.salterTxt}>VA?? ??ALTER:</span>
      <span className={classes.runningSalter}>{salter}</span>
      <span className={classes.lineTxt}>U REDU</span>
      <span className={classes.currentlyServing}>POSLU??UJEM</span>
      <div className={classes.name}></div>
      <div className={classes.name}></div>
      <div className={classes.allOdjelContainer}>
        <div className={classes.listGridContainer}>
          <ul className={classes.listagrid}>
          {xload && avgtime.map((i) => {
                return (
                  <li className={classes.listItemContainer} key={i.id}>
                    <ItemCardAvgTime
                      key={i.id}
                      odjeltitle={("odjel "+i.id)}
                      odjeltime={i.vrijeme === null ? "0 MIN" : `${Math.round(i.vrijeme/60)} MIN`}
                    />
                  </li>
                );
              })}    
          </ul>
        </div>
      </div>
      <div className={classes.inLineContainer}></div>
      <div className={classes.currentServingContainer}></div>
      <button className={classes.btnNext} onClick={handlenext}>DALJE</button>
      <span className={classes.usersInLine}>
        <ul>
          {loaded && inline.map((i) =>{
            return inline.indexOf(i) !== 0 ? <li className={classes.listItemContainer2} key={i.klijentId}>{i.jedOzn}{i.klijentId}<br /></li>
                : ""
           
          })}
        </ul>
      </span>
      <span className={classes.servedUser}>{inline[0] && <div>{inline[0].jedOzn}{inline[0].klijentId}</div>}</span>
      <span className={classes.servingTimeTxt}>
        PROSJE??NO VRIJEME POSLU??IVANJA
      </span>
    </div>
  );
}

export default WorkerStartPage;