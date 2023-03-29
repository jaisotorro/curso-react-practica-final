import { useMemo, useEffect, useState } from "react";

// Hook para acceder a la API
//
// @param {String} url La URL a la que acceder
// @param {String} token El token de autenticacion si estuviera presente
// @param {Object} fetchParams Un objeto para pasar a fetch con configuración extra
const useApi = () => {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState(null);
  const [token, setToken] = useState(null);
  const [requestBody, setRequestBody] = useState({});
  // const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [performRequest, setPerformRequest] = useState(false);
  
  const updateParams = (pUrl, pMethod = "GET", pToken = "", pRequestBody = {}) => {
console.log("*** en updateParams-ini");
    setPerformRequest(true);
console.log("*** en updateParams-1");    
    setUrl(pUrl);
    setMethod(pMethod);
    if (pToken && pToken != ""){
      setToken(pToken);
    }
    if (pRequestBody != {}){
      setRequestBody(JSON.stringify(pRequestBody));
    }
  }


  const config = useMemo(() => {
    const conf = {
      method: method,
      headers: {},
      //  headers: { 'Content-Type': 'application/json'}, // no funciona
      body: requestBody
    };
    conf.headers["Content-Type"] = "application/json"; // forma alternativa, pendiente hacerlo dinamico para resto peticiones
    // Comprobamos el token
    if (conf.headers == null) {
      conf.headers = {};
    }
    if (token && token != "") {
      conf.headers["api-token"] = token;
    }

    return conf;
  }, [method, token]);

  useEffect(() => {
console.log("*** en useEffect-ini. performRequest = "+performRequest);
          setError("");
          if (performRequest) {
console.log("*** en useEffect-antes llamada API");
            // Realizamos la llamada al servidor
             fetch(url, config)
              .then((res) => res.json())
              .then((json) => {
                if (json.error != null) {
console.log("*** en useEffect-ERROR. error: "+json.error);
                  setError(json.error);
                } else {
console.log("*** en useEffect-OK");
                  setData(json);
                   setToken(json.token);
                   tokenProvis = json.token;
                }
              })
              .finally(() => setPerformRequest(false));
          }
   
      }, [performRequest ]);

console.log("*** En useApi-antes return-1");
if (data){
console.log("*** En useApi-antes return-2. data.token= "+data.token);
}

  return {
    data,
    error,
    updateParams
  };
};

export default useApi;
