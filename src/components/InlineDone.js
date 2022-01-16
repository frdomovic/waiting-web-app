import React from "react";
import classes from "../css/inlinedone.module.css";
import {useHistory} from "react-router-dom";


export default function InlineDone() {
 
  const history = useHistory();
  
  
  const handleIzlaz = () =>{
    history.push("/");
  };
  return (
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
  );
}
