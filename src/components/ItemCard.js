import React from "react";
import classes from "../css/itemcard.module.css";
import { Link ,useHistory} from "react-router-dom";
export default function ItemCard(props) {
  const history = useHistory();

  const handleRequest = async() => {
    history.push("/odjeldesc");
  }


  if(props.odjeltitle === ""){
    return (
      <div>
      </div>
    );
  }else{
    return (
      <div className={classes.cardItem} onClick={handleRequest}>
        <img src={props.odjelpng}
         alt="icon" width="60px" height="60px"className={classes.odjelIcon}/>
        <span className={classes.odjelTitle}>{props.odjeltitle}</span>
        <span className={classes.odjelDesc}>{props.odjeldesc}</span>
        <Link to="/InLine">
          <button className={classes.btnUred}>STANI U RED</button>
        </Link>
      </div>
    );
  }
  
}

