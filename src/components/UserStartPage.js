import React, { useState, useEffect } from "react";
import classes from "../css/userStartPage.module.css";
import ItemCard from "./ItemCard";
import { Link, useLocation,useHistory } from "react-router-dom";
import { setID,getID} from "../Utils/Common";
export default function UserStartPage() {
  const [jsondata, setjsonData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const [clientId, setClientId] = useState("");
  useEffect(() => {
    setLoaded(false);
    fetch("/odjel")
      .then((res) => {
        return res.text();
      })
      .then((fetchdata) => {
        setjsonData(JSON.parse(fetchdata))
       
      })
      .catch((err) => {
        console.log("Critical server error:", err);
      });
    setLoaded(true);
  }, []);
  const handleexit = ()=>{
    history.push("/");
  }

  return (
    <div className={classes.pageContainer}>
      <span className={classes.appTitle}>RED U RED </span>
      <button className={classes.btnExit} onClick={handleexit}>IZLAZ</button>
      
      <div className={classes.cardsContainer}>
        <span className={classes.odjelcontainertitle}>Popis odjela</span>

        <div className={classes.listGridContainer}>
          <ul className={classes.listagrid}>
            {loaded && jsondata.map((i) => {
              return (
                <li className={classes.listItemContainer} key={i.id}>
                <ItemCard
                  key={i.idOdjel}
                  id={i.idOdjel}
                  odjeltitle={i.naziv}
                  odjeldesc={i.opis}
                  odjellong={i.dugiOpis}
                  odjelpng=""
                  clientId={getID()}
                />
              </li>
            )})}
          </ul>
        </div>
      </div>
    </div>
  );
}

