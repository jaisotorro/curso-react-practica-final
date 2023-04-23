import { useContext, useEffect } from "react";
import useApi from "../hooks/useApi";
import Todo from "../contexts/todo";
import ModalType from "../contexts/modalType";
import Modal from "../components/Modal";
import { PATHS } from "../constants/paths";

const ShowTodo = () => {
    const queryTodoRequest = useApi();
    const todo = useContext(Todo);
    const modalType = useContext(ModalType);
    // const [showModal, setShowModal] = useState(false);
    
    const closeModal = () => {
        todo.update(null);
        // setShowModal(false);
        modalType.update("");
      }
    
    useEffect(() => {
        // Si la nota del contexto tiene el id y solamente el id, la recperamos completa del API y la guardamos
        console.log("todo.current: " + todo.current);
        if (todo.current != null && todo.current.id != "" && !todo.current.title ) {
            queryTodoRequest.updateRequest({ url: PATHS.api.notes + "/" + todo.current.id, 
            method: "GET"});
            // const todoLocal = queryTodoRequest.data;
            if (queryTodoRequest.data){
                todo.update({
                    // ...todo.current,
                    id: queryTodoRequest.data.id,
                    title: queryTodoRequest.data.title,
                    content: queryTodoRequest.data.content
                });
            }
        }
    },
    [todo,queryTodoRequest]);

    return (<>{
        queryTodoRequest.data && modalType.current == "show" ?
            <Modal show={modalType.current != ""} onClose={closeModal}>
                <br /><br />
                <h1>Datos nota</h1>
                <h2>{"ID (provis): " + queryTodoRequest.data.id}</h2>
                <br />
                <h2>{"Titulo: " + queryTodoRequest.data.title}</h2>
                <br />
                <h2>{"Descripción: " + queryTodoRequest.data.content}</h2>
                <br />
                <h2>{"Fecha creación: " + queryTodoRequest.data.createdAt}</h2>
                <br />
                <h2>{"Fecha modificación: " + queryTodoRequest.data.updatedAt}</h2>
                <br />
                <button onClick={closeModal}>Volver</button>
            </Modal>
            : null
    }</>)

}
export default ShowTodo;