import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, NavLink, Routes } from "react-router-dom";
import Status from "./components/Status";
import Layout from "./components/Layout";
import Home from "./views/Home";
import Register from "./views/Register";
import "./styles/Layout.css";

// Componente principal de la aplicación.
const App = () => {
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  // Cargamos el estado del servidor
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setStatus(data.status === "ok"))
      .finally(() => setLoading(false));
  }, []);

  // Mostramos la aplicación
  // return (
  //   <main>
  //     <h1>Curso de React de TRAINING-IT</h1>
  //     <p>
  //       Estado del servidor:
  //       {loading ? " Cargando..." : <Status status={status} />}
  //     </p>
  //   </main>
  // );

  // return (<Layout title="APLICACION DE GESTION DE TAREAS ">
  //   <Register />
  // </Layout>
  // );

  return (
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
);

};

export default App;
