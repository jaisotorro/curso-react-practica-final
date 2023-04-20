import { useState, useContext } from "react"
import { DEFAULT_STATE } from "../constants/form";
import "../styles/Form.css";
import useApi from "../hooks/useApi";
import Modal from "../components/Modal";
import ModalType from "../contexts/modalType";

const NewTodo = () => {
    const [formState, setFormState] = useState(DEFAULT_STATE);
    const createTodoRequest = useApi();    
    const modalType = useContext(ModalType);

    const closeModal = () => {
      // todo.update(null); // descomentarlo para provocar error al guardar
      // setShowModal(false);
      modalType.update("");
      setFormState({});
    }


  const onChange = (key) => {
    return (e) => setFormState({
      ...formState,
      [key]: e.target.value
    });
  }

  const create = (e) => {
    e.preventDefault();
    createTodoRequest.updateRequest({url: "/api/notes", method: "POST", body: {title: formState.title, content: formState.content}, headers: {contentType: "application/json"}});
    closeModal();
    };

  return (<Modal show={modalType.current == "create"} onClose={closeModal}>
      <form onSubmit={create}>
        <br/><br/>
        <h1>Nueva tarea</h1>
        <h3>(Tras crearla, debes reconsultar para refrescar la lista)</h3>
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
        <input type="submit" value="Guardar" />
      </form>
  </Modal>);


}
export default NewTodo;