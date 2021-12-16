import React, { useState } from "react";
import {Button} from "react-bootstrap";
import ItemCardAvgTime from "./ItemCardAvgTime";
import classes from "../css/workerStartPage.module.css";
import { removeUserSession, getUser} from '../Utils/Common';
const DUMMY_DATA = [
  {
    id: "OA8",
    odjelTitle: "Odjel A",
    odjelTime: "13MIN",
  },
  {
    id: "OA1",
    odjelTitle: "Odjel B",
    odjelTime: "13MIN",
  },
  {
    id: "OA2",
    odjelTitle: "Odjel C",
    odjelTime: "13MIN",
  },
  {
    id: "OA3",
    odjelTitle: "Odjel D",
    odjelTime: "13MIN",
  },
  {
    id: "OA4",
    odjelTitle: "Odjel E",
    odjelTime: "13MIN",
  },
  {
    id: "OA5",
    odjelTitle: "Odjel F",
    odjelTime: "13MIN",
  },
  {
    id: "OA6",
    odjelTitle: "Odjel G",
    odjelTime: "13MIN",
  },
  {
    id: "OA7",
    odjelTitle: "Odjel H",
    odjelTime: "13MIN",
  },
  {
    id: "1A8",
    odjelTitle: "Odjel I",
    odjelTime: "13MIN",
  },
  {
    id: "1A1",
    odjelTitle: "Odjel J",
    odjelTime: "13MIN",
  },
  {
    id: "1A2",
    odjelTitle: "Odjel K",
    odjelTime: "13MIN",
  },
  {
    id: "1A3",
    odjelTitle: "Odjel L",
    odjelTime: "13MIN",
  },
  {
    id: "1A4",
    odjelTitle: "Odjel H1",
    odjelTime: "13MIN",
  },
  {
    id: "1A5",
    odjelTitle: "Odjel A2",
    odjelTime: "13MIN",
  },
  {
    id: "1A6",
    odjelTitle: "Odjel A3",
    odjelTime: "13MIN",
  }, 
  {
    id: "1A6",
    odjelTitle: "Odjel A3",
    odjelTime: "13MIN",
  },  
];
if (DUMMY_DATA.length % 3 !== 0){
  var n = 0;
  while(DUMMY_DATA.length % 3 !== 0){
    DUMMY_DATA.push({
      id: `${n}X99`,
      odjelTitle: "",
      odjelTime: ""
    })
    n++;
  }
  
}
const DumData = DUMMY_DATA.map((i) => (
  <li className={classes.listItemContainer} key={i.id}>
    <ItemCardAvgTime
      key={i.id}
      odjeltitle={i.odjelTitle}
      odjeltime={i.odjelTime}
    />
  </li>
));

function WorkerStartPage(props) {

  const [error, setError] = useState("");
  const user = getUser().replace("@fer.hr","");

  const handleLogout = async() =>{
    setError("");
    try{
      removeUserSession();
      props.history.push("/login");
    }catch(error){
      
      setError("Failed to logout!\n error type:",error);
    } 
    
    if(error){
      alert(error);
    }
    
  }
  
  return (
    <div className={classes.pageContainer}>
      <span className={classes.usernameWorker}>DJELATNIK: {user}</span>
      <Button className={classes.btnExit} onClick={handleLogout}>
        <span className={classes.btnExitTxt}>IZLAZ</span>
      </Button>
      <div className={classes.name}></div>
      <div className={classes.odjelContainers}></div>
      <span className={classes.salterTxt}>VAŠ ŠALTER : </span>
      <span className={classes.runningSalter}>S2</span>
      <span className={classes.lineTxt}>U REDU</span>
      <span className={classes.currentlyServing}>POSLUŽUJEM</span>
      <div className={classes.name}></div>
      <div className={classes.name}></div>
      <div className={classes.allOdjelContainer}>
        <div className={classes.listGridContainer}>
          <ul className={classes.listagrid}>
            {DumData}
          </ul>
        </div>


      </div>

      <div className={classes.inLineContainer}></div>
      <div className={classes.currentServingContainer}></div>

      <button className={classes.btnNext}>DALJE</button>

      <span className={classes.usersInLine}>A153 <br />A512<br />A157<br />A34<br />A87</span>
      <span className={classes.servedUser}>A105</span>
      <span className={classes.servingTimeTxt}>PROSJEĆNO VRIJEME POSLUŽIVANJA</span>
      
    </div>
  );
}

export default WorkerStartPage;