import { useState, useContext, useEffect } from "react"
import { DEFAULT_STATE } from "../constants/form";
import "../styles/Form.css";
import useApi from "../hooks/useApi";
import Token from "../contexts/token";

const Register = () => {
    const token = useContext(Token);
console.log("en Register");
    const [formState, setFormState] = useState(DEFAULT_STATE);

    // Devolvemos una funcion para modificar una parte del estado! (pendiente revisar comentario)
  const onChange = (key) => {
    return (e) => setFormState({
      ...formState,
      [key]: e.target.value
    });
  }

    const registerRequest = useApi();    

    const signIn = () => {
console.log("*** en Register-signIn-ini");
      registerRequest.updateRequest({url: "/api/register", method: "POST", body: {username: formState.username, password: formState.password}});

    // registerRequest.updateParams("/api/register", "POST", {username: formState.username, password: formState.password});
    // registerRequest.updateParams("/api/register", "POST", "", JSON.stringify({username: formState.username, password: formState.password}));
    // registerRequest.updateParams("/api/register", "POST", "", JSON.stringify({username: "Usu", password: "123"}));

    };

  useEffect( () => {
    if (registerRequest.data && token.current == ""){
      console.log("*** en Register-con datos de respuesta. token en data: "+registerRequest.data.token);
      token.update(registerRequest.data.token);
      console.log("*** en Register-con datos de respuesta. token.current: "+token.current);
    }
  },[registerRequest]
  );


    

  return <div className="row">
    <div className="col-6">
      <form onSubmit={signIn}>
      {/* <form onSubmit={signIn()}> */}
      {/* <form onSubmit={onSubmit}> */}
        <br/><br/>
        <h1>
        <label htmlFor="username">Usuario: </label>
        <input id="username" type="text" value={formState.username} onChange={onChange("username")} />
        </h1>
        <br/>
        <h1>
        <label htmlFor="password">Contraseña: </label>
        <input id="password" type="password" value={formState.password} onChange={onChange("password")} />
        </h1>
        <br/>
        <input type="submit" value="Crear cuenta" />
        {/* <button onClick={signIn}>Crear cuenta</button> */}
        {/* <button>Crear cuenta</button> */}
      </form>
    </div>
  </div>


}
export default Register;