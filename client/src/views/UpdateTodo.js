import { useContext, useEffect } from "react";
import useApi from "../hooks/useApi";
import TodoToUpdate from "../contexts/todoToUpdate";
import { useState } from "react";
import { DEFAULT_STATE } from "../constants/form";

const UpdateTodo = ({ idTodo }) => {
    const todoToUpdate = useContext(TodoToUpdate);
    const updateTodoRequest = useApi();
    const [formState, setFormState] = useState(DEFAULT_STATE);
    
    useEffect(() => {
        if (todoToUpdate != {}) {
            setFormState({
                title: todoToUpdate.current.title,
                content: todoToUpdate.current.content
            })
        }
    },
        [todoToUpdate]
    );    
    
    const onChange = (key) => {
        return (e) => setFormState({
            ...formState,
            [key]: e.target.value
        });
    }


    const saveUpdatedTodo = () => {
        updateTodoRequest.updateRequest({ url: "/api/notes/" + todoToUpdate.current.id, 
            method: "PUT", 
            body: {title: formState.title, content: formState.content},
            headers: {contentType: "application/json"}});
        todoToUpdate.update({});
    }

    return (<>{
        todoToUpdate.current != {} && todoToUpdate.current.id ?
            <form onSubmit={saveUpdatedTodo}>
                <br /><br />
                <h1>Modificar tarea</h1>
                <h3>¿Ttas modificarla, debes reconsultar para refrescar la lista)</h3>
                <h1>
                    <label htmlFor="title">Título: </label>
                    <input id="title" type="text" value={formState.title} onChange={onChange("title")} />
                </h1>
                <br />
                <h1>
                    <label htmlFor="content">Descripción: </label>
                    <input id="content" type="text" value={formState.content} onChange={onChange("content")} />
                </h1>
                <br />
                <input type="submit" value="Guardar" />
            </form>
            : null
    }</>)

}
export default UpdateTodo;