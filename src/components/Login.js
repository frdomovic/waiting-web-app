import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { setToken,getToken, setUser, setUserSession } from "../Utils/Common";
import * as ReactBootStrap from 'react-bootstrap';
import classes from "../css/workerLP.module.css";
import showlogo from "../media/showlogo.png";
import LoginPop from "../component-popup/LoginPop";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [account, setAccount] = useState(false);
  const [recovery, setRecovery] = useState(false);
  const recoverypopup = () => {
    setRecovery(true);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setAccount(false);
    setError(null);
    setLoading(true);
    if(!password){
      setAccount(true);
      setPassword("passHash");
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password 
      }),
    };
    let stats;
    await fetch(
      "/prijava/djelatnik",
      requestOptions
    )
      .then((res) => {
        stats = res.status
        if (res.status === 200) {
          setLoading(false);
        } else if (res.status === 401) {
          setLoading(false);
          setError("Failed to log in! ");
          console.log("failed auth");
        }
        return res.text();
      })
      .then((tokenstr) =>{
          if(stats ===200){
            setLoading(false);
            if(account){
              setUserSession(tokenstr, username);
              props.history.push("/Signup");
            }else{
                setUserSession(tokenstr, username);
                props.history.push("/WorkerStartPage");
                console.log("ok");
            }
          }    
      })
      .catch((err) => {
        setLoading(false);
        setError("Server Error!");
        console.log("Critical Error:", err);
      });
    setLoading(false);
  };
  return (
    <div className={classes.containerPage}>
      {recovery && <LoginPop trigger={true}>
        </LoginPop>}
      {loading && <ReactBootStrap.Spinner animation="border" variant="info" className={classes.spinner}/>}
      <span className={classes.titlePrijava}>Prijava za djelatnike </span>

      <div className={classes.circle1}></div>
      <div className={classes.circle2}></div>
      <div className={classes.circle3}></div>
      <Link to="/">
        <div className={classes.exitbtn}>
          <span className={classes.extitxt}>X</span>
        </div>
      </Link>
      <div className={classes.name}></div>
      <div className={classes.name}></div>

      <div className={classes.errorMsg}>
        {error && (
          <Alert className={classes.errTxt} variant="danger">
            {error}
          </Alert>
        )}
      </div>
      <Form onSubmit={handleLogin}>
        <Form.Group id="email">
          <Form.Control
            type="email"
            onChange={(e) => setUsername(e.target.value)}
            className={classes.titleKorisnickoime}
            placeholder="Korisničko ime"
            autoComplete="false"
            required
          />
        </Form.Group>
        <div className={classes.underline}></div>

        <Form.Group id="password">
          <Form.Control
            type={show ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            className={classes.titlepass}
            autoComplete="false"
            placeholder="Lozinka"
          />
        </Form.Group>
        <div className={classes.underline2}></div>

        <div className={classes.containerPW}>
          <img
            src={showlogo}
            alt="show password"
            onClick={() => setShow(!show)}
          ></img>
        </div>
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
      <div className={classes.containerbottom}>
        <div className={classes.recoverydiv}>
          <span className={classes.txtForgot}>Zaboravljena </span>
          <a href="#" className={classes.txtRecover} onClick={recoverypopup}>
            lozinka?
          </a>
        </div>
      </div>
    </div>
  );
}
