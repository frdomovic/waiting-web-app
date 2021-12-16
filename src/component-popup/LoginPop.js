import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import classes from "../css/loginpop.module.css";

export default function LoginPop(props) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRecovery = async()=>{
        /*setError("");
        setLoading(true);

        console.log("ok")
        setLoading(false);*/

  };
  function refreshingPage(){
    window.location.reload(false);
  }
  return props.trigger ? (
    <div>
        <Button className={classes.exitbtn} onClick={refreshingPage}>
          <span className={classes.exittxt}>X</span>
        </Button>
      <d3 className={classes.desctxt}>
        Pošaljite administratoru zahtjev za ponovno postavljanje lozinke!
      </d3>
      <Form onSubmit={handleRecovery}>
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
        <div className={classes.btnLogindiv}>
          <Button
            disabeled={loading.toString()}
            className={classes.loginbtn}
            type="submit"
          >
            {loading ? "Loading..." : "POŠALJI"}
          </Button>
        </div>
      </Form>
      <div className={classes.errorMsg}>
        {error && (
          <Alert className={classes.errTxt} variant="danger">
            {error}
          </Alert>
        )}
      </div>
      <div className={classes.popup}></div>
    </div>
  ) : (
    ""
  );
}
