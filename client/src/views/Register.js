import { useState } from "react"
import { DEFAULT_STATE } from "../constants/form";
import "../styles/Form.css";
import useApi from "../hooks/useApi";

const Register = () => {
console.log("en Register");
    const [formState, setFormState] = useState(DEFAULT_STATE);

    // Devolvemos una funcion para modificar una parte del estado! (pendiente revisar comentario)
  const onChange = (key) => {
    return (e) => setFormState({
      ...formState,
      [key]: e.target.value
    });
  }

//   const onSubmit = (e) => {
//     e.preventDefault();
// console.log("*** en Register-onSubmit-ini");
//     registerRequest.updateParams("/api/register", "POST", "", JSON.stringify({username: formState.username, password: formState.password}));

//         if (registerRequest.data){
//             token = registerRequest.data.token;
// console.log("*** en Register-con datos de respuesta. token: "+token);
//         }
//   }

    const registerRequest = useApi();    

  // Función para registrar una nueva cuenta (pendiente adaptar)
  const signIn = () => {
console.log("*** en Register-signIn-ini");
    registerRequest.updateParams("/api/register", "POST", "", {username: formState.username, password: formState.password});
    // registerRequest.updateParams("/api/register", "POST", "", JSON.stringify({username: formState.username, password: formState.password}));
    // registerRequest.updateParams("/api/register", "POST", "", JSON.stringify({username: "Usu", password: "123"}));

    };

    let token; // pendiente contexto o Redux
    if (registerRequest.data){
        token = registerRequest.data.token;
        console.log("*** en Register-con datos de respuesta. token: "+token);
    }

    

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