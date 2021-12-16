import React from "react";
import classes from "../css/userStartPage.module.css";
import ItemCard from "./ItemCard";
import { Link } from "react-router-dom";
const DUMMY_DATA = [
  {
    id: "OA1",
    odjelpng: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Windows_Settings_app_icon.png/1024px-Windows_Settings_app_icon.png",
    odjeltitle: "Odjel A",
    odjeldesc: "Uhljebništvo",
    odjellong: "Dugi opis odjela, gdje se nalazi , čime se bavi , što se treba donesti za odjel , kako se zovu radini , koliko se čeka"

  },
  {
    id: "OA2",
    odjelpng: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Windows_Settings_app_icon.png/1024px-Windows_Settings_app_icon.png",
    odjeltitle: "Odjel B",
    odjeldesc: "Tajništvo",
    odjellong: "Dugi opis odjela, gdje se nalazi , čime se bavi , što se treba donesti za odjel , kako se zovu radini , koliko se čeka"

  },
  {
    id: "OA3",
    odjelpng: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Windows_Settings_app_icon.png/1024px-Windows_Settings_app_icon.png",
    odjeltitle: "Odjel C",
    odjeldesc: "Tajništvo",
    odjellong: "Dugi opis odjela, gdje se nalazi , čime se bavi , što se treba donesti za odjel , kako se zovu radini , koliko se čeka"

  },
  {
    id: "OA4",
    odjelpng: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Windows_Settings_app_icon.png/1024px-Windows_Settings_app_icon.png",
    odjeltitle: "Odjel D",
    odjeldesc: "Tajništvo",
    odjellong: "Dugi opis odjela, gdje se nalazi , čime se bavi , što se treba donesti za odjel , kako se zovu radini , koliko se čeka"

  },
  {
    id: "OA5",
    odjelpng: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Windows_Settings_app_icon.png/1024px-Windows_Settings_app_icon.png",
    odjeltitle: "Odjel E",
    odjeldesc: "Kratki opis",
    odjellong: "Dugi opis odjela, gdje se nalazi , čime se bavi , što se treba donesti za odjel , kako se zovu radini , koliko se čeka"
  },
  {
    id: "OA6",
    odjelpng: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Windows_Settings_app_icon.png/1024px-Windows_Settings_app_icon.png",
    odjeltitle: "Odjel F",
    odjeldesc: "Kratki opis",
    odjellong: "Dugi opis odjela, gdje se nalazi , čime se bavi , što se treba donesti za odjel , kako se zovu radini , koliko se čeka"
  },
  {
    id: "OA7",
    odjelpng: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Windows_Settings_app_icon.png/1024px-Windows_Settings_app_icon.png",
    odjeltitle: "Odjel G",
    odjeldesc: "Kratki opis",
    odjellong: "Dugi opis odjela, gdje se nalazi , čime se bavi , što se treba donesti za odjel , kako se zovu radini , koliko se čeka"
  },
  {
    id: "OA8",
    odjelpng: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Windows_Settings_app_icon.png/1024px-Windows_Settings_app_icon.png",
    odjeltitle: "Odjel H",
    odjeldesc: "Kratki opis",
    odjellong: "Dugi opis odjela, gdje se nalazi , čime se bavi , što se treba donesti za odjel , kako se zovu radini , koliko se čeka"
  },
  {
    id: "OA9",
    odjelpng: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Windows_Settings_app_icon.png/1024px-Windows_Settings_app_icon.png",
    odjeltitle: "Odjel I",
    odjeldesc: "Kratki opis",
    odjellong: "Dugi opis odjela, gdje se nalazi , čime se bavi , što se treba donesti za odjel , kako se zovu radini , koliko se čeka"
  },
];
if (DUMMY_DATA.length % 2 !== 0){
  var n = 0;
  while(DUMMY_DATA.length % 2 !== 0){
    DUMMY_DATA.push({
      id: `${n}X99`,
      odjeltitle: "",
      odjeldesc: "",
      odjelpng: "",
      odjellong: "",
    })
    n++;
  }
  
}
const DumData = DUMMY_DATA.map((i) => (
    <li className={classes.listItemContainer} key={i.id}>
    <ItemCard
      key={i.id}
      id={i.id}
      odjeltitle={i.odjeltitle}
      odjeldesc={i.odjeldesc}
      odjellong={i.odjellong}
      odjelpng={i.odjelpng}
    />
  </li>
));

  //let fetchedSections = [];

  /*async function fetchFunc(){
    try{
      let res = await fetch("https://stormy-reef-35557.herokuapp.com/odjel");
      console.log(res);
      let data = await res.json();
      fetchedSections = data;
    }catch (error) {
      console.log("Unable to fetch from backend");
      console.log(error);
    }
  }
  
  fetchFunc();*/

  function UserStartPage() {
    return (
      <div className={classes.pageContainer}>
        <span className={classes.appTitle}>RED U RED </span>
        <Link to="/">
        <button className={classes.btnExit}>IZLAZ</button></Link>
        <div className={classes.cardsContainer}>
          <span className={classes.odjelcontainertitle}>Popis odjela</span>
  
          <div className={classes.listGridContainer}>
            <ul className={classes.listagrid}>
              {DumData}
            </ul>
          </div>
        </div>
      </div>
    );
  }
  
  export default UserStartPage;
