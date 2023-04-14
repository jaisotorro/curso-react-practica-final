import "../styles/TodosList.css";
import useApi from "../hooks/useApi";
import Modal from "../components/Modal";
import { useState } from "react";

const TodosList = ({ todos }) => {
  const deleteTodoRequest = useApi();    

  const [showModal, setShowModal] = useState(false);
  const [idTodo, setIdTodo] = useState(null)

  const openModal = (idTodo) => {
    setShowModal(true);
    setIdTodo(idTodo);
  }
  const closeModal = () => {
    setShowModal(false);
    setIdTodo(null);
  }


  // const deleteTodo = (idTodo) => {
  const deleteTodo = () => {    
    deleteTodoRequest.updateRequest({url: "/api/notes/"+idTodo, method: "DELETE"});
    setShowModal(false);
  }

  return (
    <section className="todoslist">
      <h3>Lista de Tareas</h3>
      <ul className="todoslist_list">
        {todos.map((todo, i) => (
          <li key={i} className="todoslist_item" >
            {todo.title + ": " + todo.content}
            <button onClick={() => openModal(todo.id)}>Eliminar</button>
            {/* <button onClick={() => deleteTodo(todo.id)}>Eliminar</button> */}
          </li>
        ))}
      </ul>
      <Modal show={showModal} onClose={closeModal}>
        <h3>¿Estás seguro de que deseas eliminar esta tarea? (tras eliminarla, debes reconsultar para refrescar la lista)</h3>
        <button onClick={deleteTodo}>Aceptar</button>
        <button onClick={closeModal}>Cancelar</button>
      </Modal>
    </section>
  );
};

export default TodosList;
