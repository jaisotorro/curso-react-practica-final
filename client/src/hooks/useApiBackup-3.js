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
  }
  
//   const updateParams = (pUrl, pMethod = "GET", pRequestBody = {}) => {
// console.log("*** en updateParams-ini");
//     setPerformRequest(true);
// console.log("*** en updateParams-1");    
//     setUrl(pUrl);
//     setMethod(pMethod);
//     if (pRequestBody != {}){
//       setRequestBody(JSON.stringify(pRequestBody));
//     }
//   }


  const config = useMemo(() => {
    const conf = {
      method: method,
      headers: {},
      //  headers: { 'Content-Type': 'application/json'}, // no funciona
      body: requestBody
    };
    conf.headers["Content-Type"] = "application/json"; // forma alternativa, pendiente hacerlo dinamico para resto peticiones
    if (conf.headers == null) {
      conf.headers = {};
    }
    if (token.current && token.current != "") {
      conf.headers["api-token"] = token.current;
    }

    return conf;
  }, [method, requestBody, token.current]);

  useEffect(() => {
console.log("*** en useEffect-ini. performRequest = "+performRequest);
          setError("");
          if (performRequest) {
console.log("*** en useEffect-antes llamada API-1");
if (config.headers["api-token"]){ 
  console.log("*** en useEffect-antes llamada API-2. token en peticion: "+config.headers['api-token']);
}
            // Realizamos la llamada al servidor
             fetch(url, config)
              .then((res) => res.json())
              .then((json) => {
                if (json.error != null) {
console.log("*** en useEffect-DESPUES llamada API con ERROR. error: "+json.error);
                  setError(json.error);
                } else {
console.log("*** en useEffect-DESPUES llamada API con OK");
                  setData(json);
                }
              })
              .finally(() => setPerformRequest(false));
          }
   
      }, [performRequest, token ]);

// console.log("*** En useApi-antes return-1");
if (data && data.token /* && token.current == "" */ ){
  // token.update(data.token);
  console.log("*** En useApi-antes return-2. data.token= "+data.token);
  console.log("*** En useApi-antes return-2. token.current= "+token.current);
}

  return {
    data,
    error,
    updateRequest
  };
};

export default useApi;
