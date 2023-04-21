import { useState, useContext } from "react"
import { DEFAULT_STATE } from "../constants/form";
import "../styles/Form.css";
import useApi from "../hooks/useApi";
import { PATHS } from "../constants/paths";

const NewTodo = () => {
console.log("en CreateTodo");
    const [formState, setFormState] = useState(DEFAULT_STATE);
    const createTodoRequest = useApi();    

  const onChange = (key) => {
    return (e) => setFormState({
      ...formState,
      [key]: e.target.value
    });
  }


  // Función para crear una nueva tarea
  const create = (e) => {
console.log("*** en CreateTodo-create-ini");
    e.preventDefault();
    createTodoRequest.updateRequest({url: PATHS.api.notes, method: "POST", body: {title: formState.title, content: formState.content}, headers: {contentType: "application/json"}});
    };

  return <div className="row">
    <div className="col-6">
      <form onSubmit={create}>
        <br/><br/>
        <h1>Nueva tarea</h1>
        <h1>
        <label htmlFor="title">Título: </label>
        <input id="title" type="text" value={formState.title} onChange={onChange("title")} />
        </h1>
        <br/>
        <h1>
        <label htmlFor="content">Descripción: </label>
        <input id="content" type="text" value={formState.content} onChange={onChange("content")} />
        </h1>
        <br/>
        <input type="submit" value="Guardar tarea" />
      </form>
    </div>
  </div>


}
export default NewTodo;