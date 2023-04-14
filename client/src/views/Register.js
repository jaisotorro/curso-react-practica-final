import { useState, useContext, useEffect } from "react"
import { DEFAULT_STATE } from "../constants/form";
import "../styles/Form.css";
import useApi from "../hooks/useApi";
import Token from "../contexts/token";

const Register = () => {
    const token = useContext(Token);
    const [formState, setFormState] = useState(DEFAULT_STATE);

  const onChange = (key) => {
    return (e) => setFormState({
      ...formState,
      [key]: e.target.value
    });
  }

    const registerRequest = useApi();    

    const signIn = (e) => {
      e.preventDefault();
      registerRequest.updateRequest({url: "/api/register", method: "POST", body: {username: formState.username, password: formState.password}, headers: {contentType: "application/json"}});
    };

  useEffect( () => {
    if (registerRequest.data && registerRequest.data.token && token.current == ""){
      token.update(registerRequest.data.token);
      localStorage.setItem('token', registerRequest.data.token);
    }
  },[registerRequest]
  );


    

  return <div className="row">
    <div className="col-6">
      <form onSubmit={signIn}>
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
      </form>
      {token.current && token.current != "" ? <h2>Con token</h2> : <h2>Sin token</h2>}
    </div>
  </div>


}
export default Register;