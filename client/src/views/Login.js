import { useState, useContext, useEffect } from "react" // comentar para provocar error y probar ErrorBoundary
import { DEFAULT_STATE } from "../constants/form";
import "../styles/Form.css";
import useApi from "../hooks/useApi";
import Token from "../contexts/token";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { connect } from "../actions/connection";
import { PATHS } from "../constants/paths";
import { Result } from "./Result";
import { updateName } from "../actions/user";
import { updateData } from '../actions/connection';

const Login = () => {
    const dispatch = useDispatch();
    const token = useContext(Token);
    const { state } = useLocation();
    const [formState, setFormState] = useState(DEFAULT_STATE);
    const displayAlert = state && state.msg != null 
    const loginRequest = useApi();
    const [resultMsg, setResultMsg] = useState(null);

  const onChange = (key) => {
    return (e) => setFormState({
      ...formState,
      [key]: e.target.value
    });
  }


    const login = (e) => {
      e.preventDefault();
      loginRequest.updateRequest({url: PATHS.api.login, method: "POST", body: {username: formState.username, password: formState.password}, headers: {contentType: "application/json"}});
    };

  useEffect( () => {
    if (loginRequest) {
      if (loginRequest.data && loginRequest.data.token && token.current == ""){
        token.update(loginRequest.data.token);
        localStorage.setItem('token', loginRequest.data.token);
        const now = new Date();
        dispatch(updateData({user: loginRequest.data.username, time: now.getHours()+":"+now.getMinutes()}));
        setResultMsg("Te has conectado correctamente. Ya puedes gestionar tus notas");
      }
      if (loginRequest.error != null && loginRequest.error != "") {
        setResultMsg("OOPS¡¡. " + loginRequest.error);
      }
    }
  },[loginRequest]
  );

  return <div className="row">
    <div className="col-6">
      <form onSubmit={login}>
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
        <input type="submit" value="Conectarme" />
      </form>
      {resultMsg != null && <Result msg = {resultMsg} />}
    </div>
    {displayAlert && (
        <div className="login-alert" role="alert">
          {state.msg}
        </div>
      )}

  </div>
}
export default Login;