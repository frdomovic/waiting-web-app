import React,{useState} from "react";
import classes from "../css/notificationpop.module.css";
import { Form, Button, Alert, FormGroup } from "react-bootstrap";
import { useHistory} from "react-router-dom";


export default function NotificationPop() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [minvalue, setMinvalue] = useState("");
  const [activeradio, setActiveradio] = useState(true);
  let current = "";
  const handleNotification = async(e) => {
    e.preventDefault();
    history.push("/InLine")
  };


  const handleChange =(e) => {
      if(activeradio){
        console.log(e);
        current=e;
        console.log("CURENT:",current);
        setMinvalue(e);
        if(minvalue){
          //console.log(minvalue);
        }
      }else if(e.id === "time" && activeradio){
        setMinvalue(e.value);
        console.log("CURENT:",current);
        console.log(e.value);
      }
  };


  const handleActivRadio = () =>{
    if(activeradio){
      setActiveradio(false);
    }else{
      setActiveradio(true);
    }
  }

  return (
    <div className={classes.pageContainer}>
      <div className={classes.decorationC1}></div>
      <div className={classes.decorationC2}></div>
      <div className={classes.decorationC3}></div>
      <div className={classes.formContainer}></div>
      <span className={classes.formtitle}>OBAVIJEST O DOLASKU NA RED</span>
      
      
      <Form onSubmit={handleNotification} className={classes.form}>
        <Form.Group>
          <Form.Check type="radio" name="notif" id="r1" value="30" onChange={(e) => handleChange(e.target.value)} className={classes.r1check}></Form.Check>
          <span className={classes.r1text}>30 min prije</span>

          <Form.Check type="radio" name="notif" id="r2" value="15" onChange={(e) => handleChange(e.target.value)} className={classes.r2check}></Form.Check>
          <span className={classes.r2text}>15 min prije</span>

          <Form.Check type="radio" name="notif" id="r3" value="10" onChange={(e) => handleChange(e.target.value)} className={classes.r3check}></Form.Check>
          <span className={classes.r3text}>10 min prije</span>

          <Form.Check name="notif" type="checkbox" id="c1" className={classes.c1check} onChange={handleActivRadio}></Form.Check>
          <Form.Control type="input" placeholder="vlastito vrijeme" id="time"
            className={classes.minutetext} onChange={(e) => handleChange(e.target)}/>
        </Form.Group>
        <div className={classes.btnLogindiv}>
          <Button
            disabeled={loading.toString()}
            className={classes.loginbtn}
            type="submit"
          >
            {loading ? "Loading..." : "DALJE"}
          </Button>
        </div>
       
      </Form>
    </div>
  );
}

/**
 * <div className={classes.v20_170}></div>
      <div className={classes.v20_178}></div>
      <div className={classes.v20_171}></div>
      <div className={classes.v20_172}></div>
      <div className={classes.v20_173}></div>
      <span className={classes.v20_174}>30 min prije</span>
      <span className={classes.v20_175}>15 min prije</span>
      <span className={classes.v20_176}>10 min prije</span>
      <span className={classes.v20_177}>bez obavijesti</span>
      <div className={classes.v20_179}></div>
      <span className={classes.v20_181}>vlastiti unos u minutama</span>
      <div className={classes.name}></div>
      <div className={classes.v20_183}></div>


      div className={classes.v20_184}></div>
      <span className={classes.v20_185}>POTVRDI</span>
 */