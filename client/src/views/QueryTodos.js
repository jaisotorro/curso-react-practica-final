import { useEffect, useState } from "react";
import TodosList from "../components/TodosList";
import useApi from "../hooks/useApi";

const QueryTodos = () => {
    const [todos, setTodos] = useState([]);
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

    return (<>
        <h1>Consulta de tareas</h1>
        <button onClick={query}>Consultar</button>
        {todos.length > 0 ? 
        <TodosList todos={todos} /> : 
        <h1>Sin tareas</h1>}
    </>)
}
export default QueryTodos;