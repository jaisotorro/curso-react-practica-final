import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, NavLink, Routes } from "react-router-dom";
import Status from "./components/Status";
import Layout from "./components/Layout";
import Home from "./views/Home";
import Register from "./views/Register";
import "./styles/Layout.css";
import Token from "./contexts/token";

// Componente principal de la aplicación.
const App = () => {

  const [token, setToken] = useState("");
  
  const ahora = new Date();
  console.log("*** en App. token: "+token+". Ahora: "+ahora.getHours()+":"+ahora.getMinutes()+":"+ahora.getSeconds()+"."+ahora.getMilliseconds());

  return (
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
            <NavLink activeClassName="active" to="/consultaTodos">
              Consultar mis tareas
            </NavLink>{" "}
            <NavLink activeClassName="active" to="/newTodo">
              Nueva tarea
            </NavLink>{" "}
            <NavLink activeClassName="active" to="/logout">
              Desconectarme
            </NavLink>
          </nav>
          {/* <Routes> */}
            {/* <Route path="/" exact element={<Home/>} />
            <Route path="/register" element={<Register/>} /> */}
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
          {/* </Routes> */}
        </Layout>
      </Router>
    </Token.Provider> 
);

};

export default App;
