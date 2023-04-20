import { useEffect, useState } from "react";
import TodosList from "../components/TodosList";
import useApi from "../hooks/useApi";
import ModalType from "../contexts/modalType";
import NewTodo from "./NewTodo";

const QueryTodos = () => {
    const [todos, setTodos] = useState([]);
    const [modalType, setModalType] = useState("");
    const queryTodosRequest = useApi();

    const query = (e) => {
        e.preventDefault();
        queryTodosRequest.updateRequest({url: "/api/notes", method: "GET"});
    }

    useEffect(() => {
        if (queryTodosRequest && queryTodosRequest.data){
            setTodos(queryTodosRequest.data);
        }
    }, [queryTodosRequest]);

    return (<ModalType.Provider value={{current: modalType, update: setModalType}}>
        <h1>Gestión de tareas</h1>
        <button onClick={query}>Consultar tareas</button>{" "}
        <button onClick={() => setModalType("create")}>Crear tarea</button>
        {todos.length > 0 ? 
        <TodosList todos={todos} /> : 
        <h1>Sin tareas</h1>}
        <NewTodo />
    </ModalType.Provider>)
}
export default QueryTodos;