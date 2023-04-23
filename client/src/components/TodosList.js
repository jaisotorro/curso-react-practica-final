import "../styles/TodosList.css";
import useApi from "../hooks/useApi"; // comentar para provocar error y probar Error Boundary
import Modal from "../components/Modal";
import { useContext, useState } from "react";
import Todo from "../contexts/todo";
import ModalType from "../contexts/modalType";
import TodoToUpdate from "../contexts/todoToUpdate";
import UpdateTodo from "../views/UpdateTodo";
import ShowTodo from "../views/ShowTodo";
import Requery from "../contexts/requery";
import { PATHS } from "../constants/paths";


const TodosList = ({ todos }) => {
  const deleteTodoRequest = useApi();
  const [showModal, setShowModal] = useState(false);
  const [idTodo, setIdTodo] = useState(null);
  const [todoToUpdate, setTodoToUpdate] = useState({});
  const [todo, setTodo] = useState(null);
  // const [modalType, setModalType] = useState("");
  const modalType = useContext(ModalType);
  const requery = useContext(Requery);
  

  const openModal = (todo, pModalType) => {
    switch (pModalType){
      case "show":
        setTodo({id: todo.id});
        break;
      case "update":
        setTodo({id: todo.id, title: todo.title, content: todo.content});
        break;
      default:
        setTodo(null);
    }
    modalType.update(pModalType);
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
    deleteTodoRequest.updateRequest({ url: PATHS.api.notes + "/" + idTodo, method: "DELETE" });
    setShowModal(false);
    requery.update(true);
  }

  return (<TodoToUpdate.Provider value={{ current: todoToUpdate, update: setTodoToUpdate }}>
    <Todo.Provider value={{ current: todo, update: setTodo }}>
        <section className="todoslist">
          <h3>Lista de notas (Ttiulo: descripcion): </h3>
          <ul className="todoslist_list">
            {todos.map((todo, i) => (
              <li key={i} className="todoslist_item" >
                {todo.title + ": " + todo.content}
                {" "}
                <button onClick={() => openModal(todo, "show")}>Ver</button>
                <button onClick={() => openModal(todo, "update")}>Modificar</button>                
                <button onClick={() => openModalDelete(todo.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
          <Modal show={showModal && idTodo != null} onClose={closeModal}>
              <h3>¿Confirmas la eliminación de esta nota?</h3>
              <button onClick={deleteTodo}>Aceptar</button>
              <button onClick={closeModal}>Cancelar</button>
          </Modal>
          <ShowTodo />
          <UpdateTodo />
        </section>
    </Todo.Provider>
  </TodoToUpdate.Provider>
  );
};

export default TodosList;
