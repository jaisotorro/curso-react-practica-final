import "../styles/TodosList.css";
import useApi from "../hooks/useApi"; // comentar provis para provocar error
import Modal from "../components/Modal";
import { useContext, useState } from "react";
import Todo from "../contexts/todo";
import ModalType from "../contexts/modalType";
import TodoToUpdate from "../contexts/todoToUpdate";
import UpdateTodo from "../views/UpdateTodo";
import ShowTodo from "../views/ShowTodo";


const TodosList = ({ todos }) => {
  const deleteTodoRequest = useApi();
  const [showModal, setShowModal] = useState(false);
  const [idTodo, setIdTodo] = useState(null);
  const [todoToUpdate, setTodoToUpdate] = useState({});
  const [todo, setTodo] = useState(null);
  // const [modalType, setModalType] = useState("");
  const modalType = useContext(ModalType);
  
  const openModal = (todoId, pModalType) => {
    switch (pModalType){
      case "show":
        setTodo({id: todoId});
        break;
      default:
        setTodo(null);
    }
    modalType.update(pModalType);
    // setModalType(pModalType);
  };


  const openModalDelete = (idTodo) => {
    setShowModal(true);
    setIdTodo(idTodo);
  }
  const openModalUpdate = (todo) => {
    setShowModal(true);
    setTodoToUpdate(todo);
  }

  const closeModal = () => {
    setShowModal(false);
    setIdTodo(null);
  }


  // const deleteTodo = (idTodo) => {
  const deleteTodo = () => {
    deleteTodoRequest.updateRequest({ url: "/api/notes/" + idTodo, method: "DELETE" });
    setShowModal(false);
  }


  return (<TodoToUpdate.Provider value={{ current: todoToUpdate, update: setTodoToUpdate }}>
    <Todo.Provider value={{ current: todo, update: setTodo }}>
      {/* <ModalType.Provider value={{current: modalType, update: setModalType}}> */}
        <section className="todoslist">
          <h3>Lista de Tareas</h3>
          <ul className="todoslist_list">
            {todos.map((todo, i) => (
              <li key={i} className="todoslist_item" >
                {todo.title + ": " + todo.content}
                <button onClick={() => openModal(todo.id, "show")}>Ver</button>
                {/* <button onClick={() => setTodoToUpdate(todo)}>Modificar</button>             */}
                <button onClick={() => openModalUpdate(todo)}>Modificar</button>
                <button onClick={() => openModalDelete(todo.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
                
          <Modal show={showModal} onClose={closeModal}>
            {idTodo != null ? <>
              <h3>¿Confirmas la eliminación de esta tarea? (tras eliminarla, debes reconsultar para refrescar la lista)</h3>
              <button onClick={deleteTodo}>Aceptar</button>
              <button onClick={closeModal}>Cancelar</button>
            </> :
        
              <UpdateTodo />
            }
          </Modal>
          <ShowTodo />
        </section>
      {/* </ModalType.Provider>         */}
    </Todo.Provider>
  </TodoToUpdate.Provider>
  );
};

export default TodosList;
