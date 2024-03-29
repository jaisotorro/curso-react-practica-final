import { useMemo, useEffect, useState, useContext } from "react";
import Token from "../contexts/token";

// Hook para acceder a la API
//
const useApi = () => {
  // const [url, setUrl] = useState("");
  // const [method, setMethod] = useState(null);
  // const [requestBody, setRequestBody] = useState({});
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  // const [performRequest, setPerformRequest] = useState(false);
  const [request, setRequest] = useState({});
  const [responsed, setResponsed] = useState(false);

  const token = useContext(Token);

  const updateRequest = (newRequest) => {
    setRequest(newRequest);
    // setPerformRequest(true);
  }
  
  const updateResponsed = (newState) => {
    setResponsed(newState);
  }

  useEffect(() => {
    setError("");
    if (request && request.method && request.url) {
      let body;
      if (request.body) {
        body = JSON.stringify(request.body);
      }

      const config = {
        method: request.method,
        headers: {},
        body: body
      }
      if (request.headers && request.headers.contentType) {
        config.headers["Content-Type"] = request.headers.contentType; 
      }
      if (token.current && token.current != "") {
        config.headers["api-token"] = token.current;
      }
      // Realizamos la llamada al servidor
        fetch(request.url, config)
        .then((res) => res.json())
        .then((json) => {
          if (json.error != null) {
            setError(json.error);
            setResponsed(true);
          } else {
            setData(json);
            setResponsed(true);
          }
        });
    }
  }, [request]);

  return {
    data,
    error,
    updateRequest,
    responsed,
    updateResponsed
  };
};

export default useApi;
