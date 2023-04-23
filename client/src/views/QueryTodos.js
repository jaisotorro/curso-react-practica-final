import { useEffect, useState } from "react";
import TodosList from "../components/TodosList";
import useApi from "../hooks/useApi";
import ModalType from "../contexts/modalType";
import NewTodo from "./NewTodo";
import Requery from "../contexts/requery";
import { PATHS } from "../constants/paths";
import InformarTodos from "../contexts/informarTodos";

const QueryTodos = () => {
    const [todos, setTodos] = useState([]);
    const [requery, setRequery] = useState(false);
    const [modalType, setModalType] = useState("");
    const queryTodosRequest = useApi();
    const [sortBy, setSortBy] = useState(null);
    // const [informarTodos, setInformarTodos] = useState(true); // para evitar un bucle infinito en el useEffect (2) 

    const query = (e) => {
        e.preventDefault();
        setSortBy(null);
        // setInformarTodos(true);
        queryTodosRequest.updateRequest({url: PATHS.api.notes, method: "GET"});
    }

    const requeryAndSort = (by) => {
        // setRequery(true);
        // setInformarTodos(true);
        setSortBy(by);
        // queryTodosRequest.updateResponsed(false);
        queryTodosRequest.updateRequest({url: PATHS.api.notes, method: "GET"});
    }
    
    // (1)
    useEffect(() => {
        if (requery){
            // setInformarTodos(true);
            queryTodosRequest.updateRequest({url: PATHS.api.notes, method: "GET"});
            setRequery(false);
        }
    }, [requery])

    // (2)
    useEffect(() => {
        if (queryTodosRequest && queryTodosRequest.data ){                
        // if (queryTodosRequest && queryTodosRequest.data && queryTodosRequest.responsed ){        
        // if (queryTodosRequest && queryTodosRequest.data && informarTodos){
            setTodos(queryTodosRequest.data);
            // queryTodosRequest.data = null; // ---------------- añadido
            // setInformarTodos(false);
            if (sortBy != null){
                sort();
                // setSortBy(null);
            }
        }
    // }, [queryTodosRequest,sortBy]);
    }, [queryTodosRequest]);    

    // useEffect(() => {
    const sort = () => {
        switch (sortBy) {
            case "title":
                setTodos([...todos].sort((a, b) => (a.title > b.title ? 1 : a.title < b.title ? -1 : 0)));
                break;
            case "content":
                setTodos([...todos].sort((a, b) => (a.content > b.content ? 1 : a.content < b.content ? -1 : 0)));
                break;
            default:
                null;
        }
        // setSortBy(null);
    }
    // ,[sortBy]);

    return (<Requery.Provider value={{ current: requery, update: setRequery }} >
        {/* <InformarTodos.Provider value={{ current: informarTodos, update: setInformarTodos }} > */}
            <ModalType.Provider value={{ current: modalType, update: setModalType }}>
                <h1>Gestión de notas</h1>
                <button onClick={query}>Consultar notas</button>{" "}
                <button onClick={() => { requeryAndSort("title") }}>Reordenar notas por título</button>{" "}
                <button onClick={() => { requeryAndSort("content") }}>Reordenar notas por descripción</button>{" "}
                <button onClick={() => setModalType("create")}>Crear nota</button>
                {todos.length > 0 && <TodosList todos={todos} />}
                {queryTodosRequest && queryTodosRequest.data && queryTodosRequest.data.length == 0 && <h1>Sin notas</h1>}    
                <NewTodo />
            </ModalType.Provider>
        {/* </InformarTodos.Provider> */}
    </Requery.Provider>)
}
export default QueryTodos;