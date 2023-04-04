import { useState, useContext } from "react"
import { DEFAULT_STATE } from "../constants/form";
import "../styles/Form.css";
import useApi from "../hooks/useApi";

const CreateTodo = () => {
console.log("en CreateTodo");
    const [formState, setFormState] = useState(DEFAULT_STATE);
    const createTodoRequest = useApi();    

    // Devolvemos una funcion para modificar una parte del estado! (pendiente revisar comentario)
  const onChange = (key) => {
    return (e) => setFormState({
      ...formState,
      [key]: e.target.value
    });
  }


  // Función para crear una nueva tarea
  const create = () => {
console.log("*** en CreateTodo-create-ini");
    createTodoRequest.updateParams("/api/notes", "POST", {title: formState.title, content: formState.content});
    };

  return <div className="row">
    <div className="col-6">
      <form onSubmit={create}>
        <br/><br/>
        <h1>
        <label htmlFor="title">Usuario: </label>
        <input id="title" type="text" value={formState.title} onChange={onChange("title")} />
        </h1>
        <br/>
        <h1>
        <label htmlFor="content">Contraseña: </label>
        <input id="content" type="text" value={formState.content} onChange={onChange("content")} />
        </h1>
        <br/>
        <input type="submit" value="Crear cuenta" />
      </form>
    </div>
  </div>


}
export default CreateTodo;