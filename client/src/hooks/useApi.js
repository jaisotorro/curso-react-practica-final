import { useMemo, useEffect, useState, useContext } from "react";
import Token from "../contexts/token";

// Hook para acceder a la API
//
const useApi = () => {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState(null);
  const [requestBody, setRequestBody] = useState({});
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [performRequest, setPerformRequest] = useState(false);
  const [request, setRequest] = useState({});

  const token = useContext(Token);

  const updateRequest = (newRequest) => {
    setRequest(newRequest);
    setPerformRequest(true);
  }
  
  useEffect(() => {
    setError("");
    if (request && request.method && request.url && request.body) {
      const config = {
        method: request.method,
        headers: {},
        body: request.body
      }
      config.headers["Content-Type"] = "application/json"; // forma alternativa, pendiente hacerlo dinamico para resto peticiones
      if (token.current && token.current != "") {
        config.headers["api-token"] = token.current;
      }
      // Realizamos la llamada al servidor
        fetch(request.url, config)
        .then((res) => res.json())
        .then((json) => {
          if (json.error != null) {
            setError(json.error);
          } else {
            setData(json);
          }
        });
    }
  }, [request, token ]);

  return {
    data,
    error,
    updateRequest
  };
};

export default useApi;
