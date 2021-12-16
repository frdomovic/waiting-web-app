import React from "react";
import classes from "../css/inlinedone.module.css";
import {Link} from "react-router-dom";

export default function InLineDone() {
  return (
    <body>
      <div className={classes.v20_156}>
        <div className={classes.v20_157}></div>
        <div className={classes.v20_158}></div>
        <div className={classes.v20_159}></div>
        <div className={classes.v20_197}></div>
        <span className={classes.v20_198}>VAŠ BROJ : </span>
        <span className={classes.v20_199}>A142</span>
        <span className={classes.v20_200}>ŠALTER:</span>
        <span className={classes.v20_201}>S3</span>
        <div className={classes.v20_202}></div>
        <span className={classes.v20_203}>PROSJEČNO VRIJEME ČEKANJA:</span>
        <span className={classes.v20_204}>10 MIN</span>
        <div className={classes.v20_188}></div>
        <span className={classes.v20_189}>NA REDU STE!</span>
        <div className={classes.v20_191}></div>
        <Link to="/UserStartPage" className={classes.v20_190}>IZLAZ</Link>
      </div>
    </body>
  );
}
