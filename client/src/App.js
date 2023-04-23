import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, NavLink, Routes } from "react-router-dom";
import Status from "./components/Status";
import Layout from "./components/Layout";
import Home from "./views/Home";
import Register from "./views/Register";
import NewTodo from "./views/NewTodo";
import QueryTodos from "./views/QueryTodos";
import "./styles/Layout.css";
import Token from "./contexts/token";
import Logout from "./components/Logout";
import Forbiden from "./views/Forbiden";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./views/Login"; // comentado provis para provocar error
import { Provider } from "react-redux";
import store from "./store";
import ConnectionData from "./components/connectionData";
import ErrorBoundary from "./components/ErrorBoundary";
import { PATHS } from "./constants/paths";




// Componente principal de la aplicación.
const App = () => {
  const [token, setToken] = useState("");
  const [provocarError, setprovocarError] = useState(true);
  // const [showModal, setShowModal] = useState(false);
  // const openModal = () => setShowModal(true);
  // const closeModal = () => setShowModal(false);
  // const [home,setHome] = useState(false);

  if (localStorage.getItem("token") != "" && token == "") {
    setToken(localStorage.getItem("token"));
  }

  // useEffect(
  //   () => {
  //     console.log("*** En App-useEffect. token en estado: "+token);
  //     localStorage.setItem('token', token);
  //     console.log("*** En App-useEffect. token en localStorage: "+localStorage.getItem('token'));
  //   }, [token]
  // );

  const ahora = new Date();
  console.log("*** en App. token: " + token + ". Ahora: " + ahora.getHours() + ":" + ahora.getMinutes() + ":" + ahora.getSeconds() + "." + ahora.getMilliseconds());

  // const provocarError = () => {
  //   const char = "a";
  //   const num = 5/char;
  //   let dummy = "dummy";
  // }

  const onReset = () => {
    // setHome(true);
  };


  return (
    // <ErrorBoundary message="Algo ha salido mal!" onReset={onReset}>
    <ErrorBoundary 
      message="Se ha producido un error inesperado en la aplicación" 
      // home = {home} 
      onReset={onReset}
    >
      <Provider store={store}>
        <Token.Provider value={{ current: token, update: setToken }}>
          <Router>
              <nav className="secondary">
                <NavLink exact activeClassName="active" to={ROOTPATH}>
                  Inicio
                </NavLink>{" "}
                <NavLink activeClassName="active" to={ROOTPATH + PATHS.register}>
                  Crear cuenta
                </NavLink>{" "}
                <NavLink activeClassName="active" to={ROOTPATH + PATHS.login}>
                  Conectarme
                </NavLink>{" "}
                <NavLink activeClassName="active" to={ROOTPATH + PATHS.private}>
                  Mis notas
                </NavLink>{" "}
                <NavLink activeClassName="active" to={ROOTPATH + PATHS.logout}>
                  Desconectarme
                </NavLink>{" "}
                <NavLink activeClassName="active" to={ROOTPATH + PATHS.connectionData}>
                  Datos conexion
                </NavLink>{" "}
              </nav>
              <Route path={ROOTPATH} exact>              
              <Layout title="GESTION DE NOTAS ">
                <Home />
                </Layout>
              </Route>
              <Route path={ROOTPATH +  PATHS.register}>
                <Register />
              </Route>
              <Route path={ROOTPATH + PATHS.login}>
                <Login />
              </Route>
              <ErrorBoundary message="Se ha producido un error inesperado en la gestión de notas" onReset={onReset}>
                <PrivateRoute path={ROOTPATH + PATHS.private}>
                  <QueryTodos />
                </PrivateRoute>
                {/* <Route path={ROOTPATH + PATHS.manageTodos}>
                  <QueryTodos />
                </Route> */}
              </ErrorBoundary>
              <Route path={ROOTPATH + PATHS.logout}>
                <Logout />
              </Route>
              <Route path={ROOTPATH + PATHS.connectionData}>
                <ConnectionData />
              </Route>
              <h3>{"token en estado: " + token}</h3>
              <h3>{"token en localStorage: " + localStorage.getItem('token')}</h3>
          </Router>
        </Token.Provider>
      </Provider>
    </ErrorBoundary>
  );

};

export default App;
