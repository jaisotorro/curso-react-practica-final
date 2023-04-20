import { useState, useContext, useEffect } from "react"
import { DEFAULT_STATE } from "../constants/form";
import "../styles/Form.css";
import useApi from "../hooks/useApi";
import Token from "../contexts/token";
import { Result } from "./Result";

const Register = () => {
  const token = useContext(Token);
  const [formState, setFormState] = useState(DEFAULT_STATE);
    const [resultMsg, setResultMsg] = useState(null);
  // const [result, setResult] = useState(null);

  const onChange = (key) => {
    return (e) => setFormState({
      ...formState,
      [key]: e.target.value
    });
  }

  const registerRequest = useApi();

  const signIn = (e) => {
    e.preventDefault();
    registerRequest.updateRequest({ url: "/api/register", method: "POST", body: { username: formState.username, password: formState.password }, headers: { contentType: "application/json" } });
  };

  useEffect(() => {
    if (registerRequest) {
      if (registerRequest.data && registerRequest.data.token && token.current == "") {
        token.update(registerRequest.data.token);
        localStorage.setItem('token', registerRequest.data.token);
        setResultMsg("La operación de registro y conexión se ha realizado correctamente. Ya puedes gestionar tus tareas");
        // setResult({
        //   ok: true,
        //   msg: "Te has registrado y conectado correctamente. Ya puedes gestionar tus tareas"
        // });
      }
      if (registerRequest.error != null && registerRequest.error != "") {
        setResultMsg("Ups. " + registerRequest.error);
        // setResult({
        //   ok: false,
        //   msg: "Oops. " + registerRequest.error
        // });
      }
    } 
  }, [registerRequest]
  );




  // return <div className="row">
  //   <div className="col-6">
  //     {result == null &&
  //     <form onSubmit={signIn}>
  //       <br /><br />
  //       <h1>
  //         <label htmlFor="username">Usuario: </label>
  //         <input id="username" type="text" value={formState.username} onChange={onChange("username")} />
  //       </h1>
  //       <br/>
  //       <h1>
  //         <label htmlFor="password">Contraseña: </label>
  //         <input id="password" type="password" value={formState.password} onChange={onChange("password")} />
  //       </h1>
  //       <br />
  //       <input type="submit" value="Crear cuenta" />
  //     </form>
  //     }
  //     {token.current && token.current != "" ? <h2>Con token</h2> : <h2>Sin token</h2>}
  //     {result != null && <Result msg = {result.msg} />}
  //   </div>
  // </div>


  return <div className="row">
    <div className="col-6">
      <form onSubmit={signIn}>
        <br /><br />
        <h1>
          <label htmlFor="username">Usuario: </label>
          <input id="username" type="text" value={formState.username} onChange={onChange("username")} />
        </h1>
        <br/>
        <h1>
          <label htmlFor="password">Contraseña: </label>
          <input id="password" type="password" value={formState.password} onChange={onChange("password")} />
        </h1>
        <br />
        <input type="submit" value="Crear cuenta" />
      </form>
      {token.current && token.current != "" ? <h2>Con token</h2> : <h2>Sin token</h2>}
      {resultMsg != null && <Result msg = {resultMsg} />}
    </div>
  </div>
}
export default Register;