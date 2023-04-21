import { useEffect, useState } from "react";
import TodosList from "../components/TodosList";
import useApi from "../hooks/useApi";
import ModalType from "../contexts/modalType";
import NewTodo from "./NewTodo";
import Requery from "../contexts/requery";
import { PATHS } from "../constants/paths";

const QueryTodos = () => {
    const [todos, setTodos] = useState([]);
    const [requery, setRequery] = useState(false);
    const [modalType, setModalType] = useState("");
    const queryTodosRequest = useApi();

    useEffect(() => {
        if (requery){
            queryTodosRequest.updateRequest({url: PATHS.api.notes, method: "GET"});
            setRequery(false);
        }
    }, [requery])

    const query = (e) => {
        e.preventDefault();
        queryTodosRequest.updateRequest({url: PATHS.api.notes, method: "GET"});
    }

    useEffect(() => {
        if (queryTodosRequest && queryTodosRequest.data){
            setTodos(queryTodosRequest.data);
        }
    }, [queryTodosRequest]);

    return (<Requery.Provider value={{current: requery, update: setRequery}} >
        <ModalType.Provider value={{current: modalType, update: setModalType}}>
            <h1>Gestión de tareas</h1>
            <button onClick={query}>Consultar tareas</button>{" "}
            <button onClick={() => setModalType("create")}>Crear tarea</button>
            {todos.length > 0 ? 
            <TodosList todos={todos} /> : 
            <h1>Sin tareas</h1>}
            <NewTodo />
        </ModalType.Provider>
    </Requery.Provider>)
}
export default QueryTodos;