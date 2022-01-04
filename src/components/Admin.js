import React, { useState, useEffect } from "react";
import classes from "../css/admindash.module.css";
import { Form, Button} from "react-bootstrap";
import { removeUserSession, getUser, getToken } from "../Utils/Common";

export default function Admin(props) {
  const [selected, setSelected] = useState(false);
  const user = getUser().substring(0, getUser().lastIndexOf("@"));
  const [addscreen, setAddscreen] = useState(false);
  const [delscreen, setDelscreen] = useState(false);
  const [nodjel, setNodjelscreen] = useState(false);
  const [dodjeliscreen, setDodjeliscreen] = useState(false);
  const [dostatus, setDostatus] = useState("");
  const [error, setError] = useState("");
  const [odjel, setOdjel] = useState("");
  const [email, setEmail] = useState("");
  const [djelatnici, setDjelatnici] = useState([]);
  const [loading, setLoading] = useState(false);


  const [xnaziv, setXnaziv] = useState("");
  const [xopis, setXopis] = useState("");
  const [xdugiopis, setXdugiopis] = useState("");
  const [ximgsrc, setXimgsrc] = useState("");
  const [xjedozn, setXjedozn] = useState("");


  useEffect(() => {
    getOdjelList();
  }, []);

  const getOdjelList = async () => {
    setError("");
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${getToken()}` },
    };

    await fetch("/admin-page/svi-djelatnici", requestOptions)
      .then((res) => {
        return res.text();
      })
      .then((values) => {
        setDjelatnici(JSON.parse(values));
      })
      .catch((error) => {
        setError("Failed to logout! error type:", error);
      });
  };

  const handlebackbutton = () => {
    setSelected(false);
    setAddscreen(false);
    setDelscreen(false);
    setNodjelscreen(false);
    setDodjeliscreen(false);
    setDostatus("");
  };
  const addUsers = () => {
    if (!selected) {
      setSelected(true);
      setAddscreen(true);
    }
  };
  const delUsers = () => {
    if (!selected) {
      setSelected(true);
      setDelscreen(true);
    }
  };
  const dodajOdjel = () => {
    if (!selected) {
      setSelected(true);
      setNodjelscreen(true);
    }
  };
  const dodjeliodjele = () => {
    if (!selected) {
      setSelected(true);
      setDodjeliscreen(true);
    }
  };

  const handleAddingUser = async (e) => {
    e.preventDefault();
    setDostatus("");
    setLoading(true);
    setError("");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}` },
      body: email
    };

    await fetch("/admin-page/dodaj-djelatnika", requestOptions)
    .then((res) => {
      return res.text();
    }).then((response) =>{
      if(response){
        setDostatus("USPJEŠNO DODANO!");
      }else{
        setDostatus("DOŠLO JE DO POGREŠKE!");
      }
    })
    .catch((error) => {
      setError("Failed to logout! error type:", error);
    });

    setLoading(false);


  };

  const handleDeletingUser = async (e) => {
    e.preventDefault();
    setDostatus("");
    setLoading(true);
    setError("");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}` },
      body: email
    };

    await fetch("/admin-page/ukloni-djelatnika", requestOptions)
    .then((res) => {
      return res.text();
    }).then((response) =>{
      if(response){
        setDostatus("USPJEŠNO DODANO!");
      }else{
        setDostatus("DOŠLO JE DO POGREŠKE!");
      }
    })
    .catch((error) => {
      setError("Failed to logout! error type:", error);
    });

    setLoading(false);
  };

  const handleAddNOdjela = async (e) => {
    e.preventDefault();
    setDostatus("");
    setLoading(true);
    setError("");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}` },
      body: JSON.stringify({
        naziv: xnaziv,
        opis: xopis.toString(),
        dugiOpis: xdugiopis.toString(),
        imgSrc: ximgsrc,
        jedOzn: xjedozn 
      }),
    };

    await fetch("/admin-page/stvori-odjel", requestOptions)
    .then((res) => {
      return res.text();
    }).then((response) =>{
      if(response){
        setDostatus("USPJEŠNO DODANO!");
      }else{
        setDostatus("DOŠLO JE DO POGREŠKE!");
      }
    })
    .catch((error) => {
      setError("Failed to logout! error type:", error);
    });

    setLoading(false);
  };



  const handleDodjela = async (e) => {
    setDostatus("");
    
    setLoading(true);
    setError("");
    
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json",
      "Authorization": `Bearer ${getToken()}` },
      body: JSON.stringify({
        username: email,
        jedOzn: odjel 
      }),
    };

    await fetch("/admin-page/dodaj-odjel-djelatniku", requestOptions)
      .then((res) => {
        return res.text();
      }).then((response) =>{
        if(response){
          setDostatus("USPJEŠNO DODANO!");
        }else{
          setDostatus("DOŠLO JE DO POGREŠKE!");
        }
      })
      .catch((error) => {
        setError("Failed to logout! error type:", error);
      });

    setLoading(false);
    setEmail("");
    setOdjel("");
  };


  const handleLogout = async () => {
    setError("");
    const requestOptions = {
      method: "GET",
      headers: { Authorization: `Bearer ${getToken()}` },
    };

    await fetch("/djelatnik/odjava", requestOptions)
      .then((res) => {
        removeUserSession();
        props.history.push("/login");
      })
      .catch((error) => {
        setError("Failed to logout! error type:", error);
      });
  };

  return (
    <div className={classes.pageContainer}>
      <span className={classes.usernameWorker}>ADMIN: {user}</span>
      <Button className={classes.btnExit}>
        <span className={classes.btnExitTxt} onClick={handleLogout}>
          IZLAZ
        </span>
      </Button>
      <div className={classes.name}></div>
      {selected && addscreen && (
        <div>
          <div className={classes.workerboard2}></div>
          <div className={classes.backbtn} onClick={handlebackbutton}>
            <span>X</span>
          </div>
          <span className={classes.addusertext}>DODAJ NOVOG DJELATNIKA</span>

          <Form onSubmit={handleAddingUser}>
            <Form.Group id="email">
              <Form.Control
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                className={classes.titleemail}
                autoComplete="false"
                placeholder="email"
                required
              />
            </Form.Group>
            <div className={classes.underline2}></div>
            <div className={classes.submitAdd}>
              <Button
                disabeled={loading.toString()}
                className={classes.btnsend}
                type="submit"
              >
                {loading ? "Loading..." : "DODAJ"}
              </Button>
            </div>
          </Form>
          {dostatus && <div className={classes.dotext}>{dostatus}</div>}
        </div>
      )}

      {selected && delscreen && (
        <div>
          <div className={classes.workerboard2}></div>
          <div className={classes.backbtn} onClick={handlebackbutton}>
            <span>X</span>
          </div>
          <span className={classes.addusertext}>OBRIŠI DJELATNIKA</span>

          <Form onSubmit={handleDeletingUser}>
            <Form.Group id="email">
              <Form.Control
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                className={classes.titleemail}
                autoComplete="false"
                placeholder="email"
                required
              />
            </Form.Group>
            <div className={classes.underline2}></div>
            <div className={classes.submitAdd}>
              <Button
                disabeled={loading.toString()}
                className={classes.btnsend}
                type="submit"
              >
                {loading ? "Loading..." : "OBRIŠI"}
              </Button>
            </div>
          </Form>
          {dostatus && <div className={classes.dotext}>{dostatus}</div>}
        </div>
      )}


      {selected && nodjel && (
        <div>
          <div className={classes.workerboard2}></div>
          <div className={classes.backbtn} onClick={handlebackbutton}>
            <span>X</span>
          </div>
          <span className={classes.addusertext}>DODAJ NOVI ODJEL</span>

          <Form onSubmit={handleAddNOdjela}>
            <Form.Group id="naziv">
              <Form.Control
                type="text"
                onChange={(e) => setXnaziv(e.target.value)}
                className={classes.titlenaziv}
                autoComplete="false"
                placeholder="naziv"
                required
              />
            </Form.Group>
            <div className={classes.underline20}></div>

            <Form.Group id="opis">
              <Form.Control
                type="text"
                onChange={(e) => setXopis(e.target.value)}
                className={classes.titleopis}
                autoComplete="false"
                placeholder="opis"
                required
              />
            </Form.Group>
            <div className={classes.underline21}></div>

            <Form.Group id="dugiOpis">
              <Form.Control
                type="text"
                onChange={(e) => setXdugiopis(e.target.value)}
                className={classes.titledopis}
                autoComplete="false"
                placeholder="dugi opis"
                required
              />
            </Form.Group>
            <div className={classes.underline22}></div>
            <Form.Group id="imgSrc">
              <Form.Control
                type="text"
                onChange={(e) => setXimgsrc(e.target.value)}
                className={classes.titleimgsrc}
                autoComplete="false"
                placeholder="image url"

              />
            </Form.Group>
            <div className={classes.underline23}></div>
            <Form.Group id="jedOzn">
              <Form.Control
                type="text"
                onChange={(e) => setXjedozn(e.target.value)}
                className={classes.titleoznaka}
                autoComplete="false"
                placeholder="jedinstvena oznaka"
                required
              />
            </Form.Group>
            <div className={classes.underline24}></div>

            <div className={classes.submitAdd2}>
              <Button
                disabeled={loading.toString()}
                className={classes.btnsend}
                type="submit"
              >
                {loading ? "Loading..." : "DODAJ"}
              </Button>
            </div>
          </Form>
          {error && <div>Neuspješna dodjela!</div>}
          {dostatus && <div className={classes.dotext2}>{dostatus}</div>}
        </div>
      )}




      {selected && dodjeliscreen && (
        <div>
          <div className={classes.workerboard2}></div>
          <div className={classes.backbtn} onClick={handlebackbutton}>
            <span>X</span>
          </div>
          <span className={classes.addusertext}>DODJELI ODJEL DJELATNIKU</span>

          <Form onSubmit={handleDodjela}>
            <Form.Group id="email">
              <Form.Control
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className={classes.titleemail}
                autoComplete="false"
                placeholder="email"
                required
              />
            </Form.Group>
            <Form.Group id="odjel">
              <Form.Control
                type="text"
                onChange={(e) => setOdjel(e.target.value)}
                className={classes.titleodjel}
                autoComplete="false"
                placeholder="odjel"
                required
              />
            </Form.Group>
            <div className={classes.underline1}></div>
            <div className={classes.underline2}></div>
            <div className={classes.submitAdd2}>
              <Button
                disabeled={loading.toString()}
                className={classes.btnsend}
                type="submit"
              >
                {loading ? "Loading..." : "POSTAVI"}
              </Button>
            </div>
          </Form>
          {error && <div>Neuspješna dodjela!</div>}
          {dostatus && <div className={classes.dotext}>{dostatus}</div>}
        </div>
      )}

      <div className={classes.workerboard}></div>
      <span className={classes.boardtxt}>DJELATNICI</span>
      <button className={classes.btnadd} onClick={addUsers}>
        DODAJ
      </button>
      <button className={classes.btndel} onClick={delUsers}>
        OBRIŠI
      </button>
      <div className={classes.listGridContainer}>
        <ul className={classes.listagrid}>
          {djelatnici.map((i) => (
            <li className={classes.listItemContainer} key={i.iddjelatnik}>
              <span className={classes.workerlist}>{i.username}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={classes.addboard}></div>
      <span className={classes.addtxt}>DODJELI ODJEL</span>
      <button className={classes.btndodjeli} onClick={dodjeliodjele}>
        DODJELI
      </button>

      <div className={classes.resetboard}></div>
      <span className={classes.resettxt}>DODAJ ODJEL</span>
      <button className={classes.btnreset} onClick={dodajOdjel}>
        DODAJ
      </button>

      <div className={classes.listGridContainer2}>
        <span className={classes.dodjelitext}>
          Dodavanje novog odjela zahtjeva upisivanje: naziva, opisa, dugog
          opisa, url za sliku odjela te jedinstvenu oznaku
        </span>
      </div>

      <div className={classes.circle1}></div>
      <div className={classes.circle2}></div>
      <div className={classes.circle3}></div>
    </div>
  );
}
