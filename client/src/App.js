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
import Login from "./views/Login";
import { Provider } from "react-redux";
import store from "./store";
import ConnectionData from "./components/connectionData";




// Componente principal de la aplicación.
const App = () => {
  const [token, setToken] = useState("");

  // const [showModal, setShowModal] = useState(false);
  // const openModal = () => setShowModal(true);
  // const closeModal = () => setShowModal(false);

  if (localStorage.getItem("token") != "" && token == ""){
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
  console.log("*** en App. token: "+token+". Ahora: "+ahora.getHours()+":"+ahora.getMinutes()+":"+ahora.getSeconds()+"."+ahora.getMilliseconds());

  return (
    <Provider store={store}>
      <Token.Provider value={{current: token, update: setToken}}>
        <Router>
        <Layout title="APLICACION DE GESTION DE TAREAS ">
            <nav className="secondary">
              <NavLink exact activeClassName="active" to="/">
                Inicio
              </NavLink>{" "}
              <NavLink activeClassName="active" to="/register">
                Crear cuenta
              </NavLink>{" "}
              <NavLink activeClassName="active" to="/login">
                Conectarme
              </NavLink>{" "}
              <NavLink activeClassName="active" to="/queryTodos">
                Consultar mis tareas
              </NavLink>{" "}
              <NavLink activeClassName="active" to="/newTodo">
                Nueva tarea
              </NavLink>{" "}
              <NavLink activeClassName="active" to="/logout">
                Desconectarme
              </NavLink>{" "}
              <NavLink activeClassName="active" to="/connection">
                Datos conexion
              </NavLink>
            </nav>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              {/* <Route path="/newTodo">
                {token.current ? <NewTodo /> : <Forbiden functionality="crear una nueva tarea" />}
              </Route> */}
              <PrivateRoute path="/newTodo">
                <NewTodo />
              </PrivateRoute>            
              <Route path="/queryTodos">
                <QueryTodos />
              </Route>
              <Route path="/logout">
                <Logout />
              </Route>
              <Route path="/connection">
                <ConnectionData />
              </Route>
              <h3>{"token en estado: " + token}</h3>
              <h3>{"token en localStorage: " + localStorage.getItem('token')}</h3>
          </Layout>
        </Router>
        {/* <Modal show={showModal} onClose={closeModal}>
          <h3>¿Estás seguro de que deseas eliminar esta tarea? (tras eliminarla, debes reconsultar para ver refrescada la lista)</h3>
          <button>Aceptar</button>
          <button>Cancelar</button>
        </Modal> */}
      </Token.Provider> 
    </Provider>
);

};

export default App;
