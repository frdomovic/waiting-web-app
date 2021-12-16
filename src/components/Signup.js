import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, useHistory} from "react-router-dom";
import * as ReactBootStrap from 'react-bootstrap';
import {getToken, getUser, removeUserSession} from "../Utils/Common";

import classes from "../css/signup.module.css";
import showlogo from "../media/showlogo.png";

export default function Signup(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passconfirm, setPassconfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const history = useHistory();
  const useEffect = () => {
    return () => {
      if(history.action === "POP"){
        history.replace("/WorkerStartPage", null, "/login");
      } 
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if(password !== passconfirm){
      setLoading(false);
      setError("Loznike se ne podudaraju!");
    }else{
      const requestOptions = {
        method: "POST",
        headers: { "Authorization": `Bearer ${getToken()}`},
        body: JSON.stringify({
          password: password,
        }),
      };
  
      await fetch(
        "https://stormy-reef-35557.herokuapp.com/djelatnik/postaviLozinku",
        requestOptions
      )
        .then((res) => {
          if (res.status === 200) {
            setLoading(false);
            removeUserSession();
            props.history.push("/Login");
            console.log("ok");
          } else if (res.status === 401) {
            setLoading(false);
            setError("Failed to signup");
            console.log("failed signup");
          }
        })
        .catch((err) => {
          setLoading(false);
          setError("Server Error!");
          console.log("Critical Error:", err);
        });
      setLoading(false);
    }
  };
  const handleExit = () => {
      removeUserSession();
  };
  
  return (
    <div className={classes.containerPage}>
      <span className={classes.titlePrijava}>Postavljanje šifre djelatnika </span>
      <div className={classes.circle1}></div>
      <div className={classes.circle2}></div>
      <div className={classes.circle3}></div>
      <Link to="/login">
        <div className={classes.exitbtn} onClick={handleExit}>
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
            value = {getUser()}
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
            required
          />
        </Form.Group>
        <div className={classes.underline2}></div>
        <Form.Group id="passconfirm">
          <Form.Control
            type={show ? "text" : "password"}
            onChange={(e) => setPassconfirm(e.target.value)}
            className={classes.confirmpass}
            autoComplete="false"
            placeholder="Lozinka"
            required
          />
          <div className={classes.underline3}></div>
        </Form.Group>

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
            {loading ? "Loading..." : "POSTAVI"}
          </Button>
          {loading && <ReactBootStrap.Spinner animation="border" variant="info" className={classes.spinner}/>}
        </div>
      </Form>
    </div>
  );
}
