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
  const handleLogout = async () => {
    setError("");
    const requestOptions = {
        method: "POST",
        headers: { "Authorization": `Bearer ${getToken()}`},
    };
  
    await fetch(
        "/djelatnik/odjava",
        requestOptions
      )
    .then(() =>{
      removeUserSession();
      props.history.push("/login");
    }).catch((error)=> {
      setError("Failed to logout! error type:",error);
    });
  }

  useEffect(() => {
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
        setAvgTime(Object.entries(JSON.parse(fetchdata)));
      })
      .catch((err) => {
        console.log("Critical server error[ODJELI]:", err);
      });

    fetch("/djelatnik/dohvatiSalter", requestOptions)
      .then((res) => {
        return res.text();
      })
      .then((res2) => {
        let a = JSON.parse(res2);
        let b = a.oznProzor;
        console.log(b);
        setSalter(b);
      })
      .catch((error) => {
        console.log("Critical server error[Salter]", error);
        setError("Error:", error);
      });
    fetch("/djelatnik/dohvatiRed", requestOptions)
      .then((res)=>{
        return res.text();
      }).then((res)=> {
          setInline(JSON.parse(res));
         
      }).catch((err)=>{
        console.log("critical server error",err);
      })
    setLoaded(true);
  }, []);

  const handlenext = async() =>{
    console.log("tu sam");
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
      <span className={classes.usernameWorker}>DJELATNIK: {user}</span>
      <Button className={classes.btnExit} onClick={handleLogout}>
        <span className={classes.btnExitTxt}>IZLAZ</span>
      </Button>
      <div className={classes.name}></div>
      <div className={classes.odjelContainers}></div>
      <span className={classes.salterTxt}>VAŠ ŠALTER:</span>
      <span className={classes.runningSalter}>{salter}</span>
      <span className={classes.lineTxt}>U REDU</span>
      <span className={classes.currentlyServing}>POSLUŽUJEM</span>
      <div className={classes.name}></div>
      <div className={classes.name}></div>
      <div className={classes.allOdjelContainer}>
        <div className={classes.listGridContainer}>
          <ul className={classes.listagrid}>
            {loaded &&
              avgtime.map(([key, value]) => {
                return (
                  <li className={classes.listItemContainer} key={key}>
                    <ItemCardAvgTime
                      key={key}
                      odjeltitle={("odjel "+key)}
                      odjeltime={value === null ? "0 MIN" : { value }}
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
            if(inline.indexOf(i) !== 0){
              if(inline.length > 0){
                return (
                  <li className={classes.listItemContainer2}>A{i}<br /></li>
                );

              }
             
            }
           
          })}
        </ul>
      </span>
      <span className={classes.servedUser}>A{inline[0]}</span>
      <span className={classes.servingTimeTxt}>
        PROSJEĆNO VRIJEME POSLUŽIVANJA
      </span>
    </div>
  );
}

export default WorkerStartPage;

