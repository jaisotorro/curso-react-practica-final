import { useContext, useEffect, useRef } from "react";
import useApi from "../hooks/useApi";
import TodoToUpdate from "../contexts/todoToUpdate";
import { useState } from "react";
import { DEFAULT_STATE } from "../constants/form";
import Modal from "../components/Modal";
import Todo from "../contexts/todo";
import ModalType from "../contexts/modalType";
import Requery from "../contexts/requery";
import { PATHS } from "../constants/paths";

const UpdateTodo = ({ idTodo }) => {
    const todoToUpdate = useContext(TodoToUpdate);
    const todo = useContext(Todo);
    const modalType = useContext(ModalType);
    const updateTodoRequest = useApi();
    const [formState, setFormState] = useState(DEFAULT_STATE);
    const titleRef = useRef(null);
    const contentRef = useRef(null);  
    const requery = useContext(Requery); 

    const closeModal = () => {
        todo.update(null);
        setFormState({});
        // setShowModal(false);
        modalType.update("");
      }

      useEffect(() => {
        if (todo.current != null && todo.current.id != "") {
            setFormState({
                title: todo.current.title,
                content: todo.current.content
            })
        }},
        [todo]    
    );    
      
    const saveUpdatedTodo = () => {
        setFormState({
            ...DEFAULT_STATE,
            title: titleRef.current.value,
            color: contentRef.current.value
          });      
        updateTodoRequest.updateRequest({ url: PATHS.api.notes + "/" + todo.current.id, 
            method: "PUT", 
            body: {title: titleRef.current.value, content: contentRef.current.value},
            headers: {contentType: "application/json"}});
        todo.update(null);
        setFormState({});
        requery.update(true);
    }

    return (<Modal show={modalType.current == "update" && todo.current != null && todo.current.id} onClose={closeModal}>
        <form onSubmit={saveUpdatedTodo}>
            <br /><br />
            <h1>Modificar tarea</h1>
            <h1>
                <label htmlFor="title">Título: </label>
                <input id="title" type="text" ref={titleRef} defaultValue={formState.title} />
                {/* <input id="title" type="text" ref={titleRef} defaultValue={todo.current.title} />                 */}
            </h1>
            <br />
            <h1>
                <label htmlFor="content">Descripción: </label>
                <input id="content" type="text" ref={contentRef} defaultValue={formState.content} />
                {/* <input id="content" type="text" ref={contentRef} defaultValue={todo.current.content} />                 */}
            </h1>
            <br />
            <input type="submit" value="Guardar" />
            <button onClick={closeModal}>Cancelar</button>
        </form>
    </Modal>)
}
export default UpdateTodo;