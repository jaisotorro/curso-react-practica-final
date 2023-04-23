import { useState, useContext, useEffect } from "react"
import { DEFAULT_STATE } from "../constants/form";
import "../styles/Form.css";
import useApi from "../hooks/useApi";
import Token from "../contexts/token";
import { Result } from "./Result";
import { PATHS } from "../constants/paths";
import { updateName } from "../actions/user";
import { useDispatch } from "react-redux";

const Register = () => {
  const token = useContext(Token);
  const [formState, setFormState] = useState(DEFAULT_STATE);
  const [resultMsg, setResultMsg] = useState(null);
  // const [result, setResult] = useState(null);
  const dispatch = useDispatch();

  const onChange = (key) => {
    return (e) => setFormState({
      ...formState,
      [key]: e.target.value
    });
  }

  const registerRequest = useApi();

  const signIn = (e) => {
    e.preventDefault();
    registerRequest.updateRequest({ url: PATHS.api.register, method: "POST", body: { username: formState.username, password: formState.password }, headers: { contentType: "application/json" } });
  };

  useEffect(() => {
    if (registerRequest) {
      if (registerRequest.data && registerRequest.data.token && token.current == "") {
        token.update(registerRequest.data.token);
        localStorage.setItem('token', registerRequest.data.token);
        dispatch(updateName(registerRequest.data.username));
        setResultMsg("Te has registrado y conectado correctamente. Ya puedes gestionar tus tareas");
        // setResult({
        //   ok: true,
        //   msg: "Te has registrado y conectado correctamente. Ya puedes gestionar tus tareas"
        // });
      }
      if (registerRequest.error != null && registerRequest.error != "") {
        setResultMsg("OOPS¡¡. " + registerRequest.error);
        // setResult({
        //   ok: false,
        //   msg: "Oops. " + registerRequest.error
        // });
      }
    } 
  }, [registerRequest]
  );

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
      {resultMsg != null && <Result msg = {resultMsg} />}
    </div>
  </div>
}
export default Register;