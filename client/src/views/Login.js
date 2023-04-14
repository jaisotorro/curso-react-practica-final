import { useState, useContext, useEffect } from "react"
import { DEFAULT_STATE } from "../constants/form";
import "../styles/Form.css";
import useApi from "../hooks/useApi";
import Token from "../contexts/token";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { connect } from "../actions/connection";

const Login = () => {
    const dispatch = useDispatch();
    const token = useContext(Token);
    const { state } = useLocation();
    const [formState, setFormState] = useState(DEFAULT_STATE);
    const displayAlert = state && state.msg != null 
    const loginRequest = useApi();    

  const onChange = (key) => {
    return (e) => setFormState({
      ...formState,
      [key]: e.target.value
    });
  }


    const login = (e) => {
      e.preventDefault();
      loginRequest.updateRequest({url: "/api/login", method: "POST", body: {username: formState.username, password: formState.password}, headers: {contentType: "application/json"}});
    };

  useEffect( () => {
    if (loginRequest.data && loginRequest.data.token && token.current == ""){
      token.update(loginRequest.data.token);
      localStorage.setItem('token', loginRequest.data.token);
      // dispatch(addTodo(connect));
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
    </div>
    {displayAlert && (
        <div className="login-alert" role="alert">
          {state.msg}
        </div>
      )}

  </div>
}
export default Login;