import { useState, useContext, useRef } from "react"
import { DEFAULT_STATE } from "../constants/form";
import "../styles/Form.css";
import useApi from "../hooks/useApi";
import Modal from "../components/Modal";
import ModalType from "../contexts/modalType";
import Requery from "../contexts/requery";
import { PATHS } from "../constants/paths";
import InformarTodos from "../contexts/informarTodos";

const NewTodo = () => {
    const [formState, setFormState] = useState(DEFAULT_STATE);
    const titleRef = useRef(null);
    const contentRef = useRef(null);
    const createTodoRequest = useApi();    
    const modalType = useContext(ModalType);
    const requery = useContext(Requery);
    const informarTodos = useContext(InformarTodos);

    const create = (e) => {
      e.preventDefault();
      setFormState({
        ...DEFAULT_STATE,
        title: titleRef.current.value,
        color: contentRef.current.value
      });      
      informarTodos.update(true);
      createTodoRequest.updateRequest({url: PATHS.api.notes, method: "POST", body: {title: titleRef.current.value, content: contentRef.current.value}, headers: {contentType: "application/json"}});
      closeModal();
      requery.update(true);
      };
  
    const closeModal = () => {
      // todo.update(null); // descomentarlo para provocar error al guardar
      // setShowModal(false);
      modalType.update("");
      setFormState({});
    }

  return (<Modal show={modalType.current == "create"} onClose={closeModal}>
      <form onSubmit={create}>
        <br/><br/>
        <h1>Nueva nota</h1>
        <h1>
        <label htmlFor="title">Título: </label>
        <input id="title" type="text" ref={titleRef} defaultValue={formState.title} />
        </h1>
        <br/>
        <h1>
        <label htmlFor="content">Descripción: </label>
        <input id="content" type="text" ref={contentRef} defaultValue={formState.content} />
        </h1>
        <br/>
        <input type="submit" value="Guardar" />
        <button onClick={closeModal}>Cancelar</button>
      </form>
  </Modal>);


}
export default NewTodo;