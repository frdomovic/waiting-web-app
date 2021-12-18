import React,{ useState} from "react";
import classes from "../css/inline.module.css";

export default function InLine() {
  const [notificationstatus, setNotificationstatus] = useState(true); 
  return (
    <body>
      <div className={classes.v17_122}>
        <div className={classes.v17_124}></div>
        <div className={classes.v17_126}></div>
        <div className={classes.v17_125}></div>
        <div className={classes.v19_136}></div>
        <span className={classes.v20_137}>VAŠ BROJ : </span>
        <span className={classes.v20_138}>A142</span>
        <span className={classes.v20_139}>ŠALTER:</span>
        <span className={classes.v20_140}>S3</span>
        <div className={classes.v20_141}></div>
        <span className={classes.v20_142}>
          Procjena do dolska na red:
        </span>
        <span className={classes.v20_143}>32 MIN</span>
        <span className={classes.v23_2}>POZICIJA U REDU:</span>
        <span className={classes.v23_3}>6</span>
        <div className={classes.name}></div>
        <div className={classes.name}></div>
      </div>
    </body>
  );
}
