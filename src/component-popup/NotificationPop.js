import React,{useState} from "react";
import classes from "../css/notificationpop.module.css";
import { Form, Button} from "react-bootstrap";
import { useHistory, useLocation} from "react-router-dom";


export default function NotificationPop(props) {
  const history = useHistory();
  const location = useLocation();
  const [activeradio, setActiveradio] = useState(true);
  const [notiftime, setNotiftime] = useState(0);
  const [owntime, setOwntime] = useState(0);

  const handleNotification = async() => {
      if(!activeradio){
        history.push({
          pathname: "/InLine",
          state: {
            redniBroj: location.state.redniBroj,
            salter: location.state.salter,
            vrijeme: location.state.vrijeme,
            clientId: location.state.clientId,
            notifme: owntime
          }});
      }else{
        history.push({
          pathname: "/InLine",
          state: {
            redniBroj: location.state.redniBroj,
            salter: location.state.salter,
            vrijeme: location.state.vrijeme,
            clientId: location.state.clientId,
            notifme: notiftime
          }});
      }
  };

  const handleVlastito = () =>{
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
          <Form.Check type="radio" name="notif" id="r1" value="30" onChange={(e) => setNotiftime(e.target.value)} className={classes.r1check}></Form.Check>
          <span className={classes.r1text}>30 min prije</span>

          <Form.Check type="radio" name="notif" id="r2" value="15" onChange={(e) => setNotiftime(e.target.value)}  className={classes.r2check}></Form.Check>
          <span className={classes.r2text}>15 min prije</span>

          <Form.Check type="radio" name="notif" id="r3" value="10" onChange={(e) => setNotiftime(e.target.value)} className={classes.r3check}></Form.Check>
          <span className={classes.r3text}>10 min prije</span>

          <Form.Check name="notif" type="checkbox" id="c1" className={classes.c1check} onChange={handleVlastito}></Form.Check>
          <Form.Control type="input" placeholder="vlastito vrijeme" id="time" 
            className={classes.minutetext} onChange={(e) => setOwntime(e.target.value)}/>
        </Form.Group>
        <div className={classes.btnLogindiv}>
          <Button
            className={classes.loginbtn}
            type="submit"
          >
            DALJE
          </Button>
        </div>
       
      </Form>
    </div>
  );
}
