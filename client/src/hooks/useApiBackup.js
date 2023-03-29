import { useMemo, useEffect, useState } from "react";

// Hook para acceder a la API
//
// @param {String} url La URL a la que acceder
// @param {String} token El token de autenticacion si estuviera presente
// @param {Object} fetchParams Un objeto para pasar a fetch con configuración extra
const useApi = () => {
  // const useApi = () => {  
console.log("en useApi-ini");
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState(null);
  const [token, setToken] = useState(null);
  const [requestBody, setRequestBody] = useState({});
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [performRequest, setPerformRequest] = useState(false);
  
  const updateParams = (pUrl, pMethod = "GET", pToken = "", pRequestBody = {}) => {
console.log("*** En useApi-updateParams-ini");
    setPerformRequest(true);
    setUrl(pUrl);
    setMethod(pMethod);
    if (pToken && pToken != ""){
      setToken(pToken);
    }
    if (pRequestBody != {}){
console.log("*** En useApi-updateParams-pRequestBody informado");      
      setRequestBody(pRequestBody);
    }
console.log("*** En useApi-updateParams-fin. requestBody.usuario= "+requestBody.username);
  }


  // const config = useMemo(() => {
  //   const conf = {
  //     method: method,
  //     headers: { 'Content-Type': 'application/json'},
  //     body: requestBody
  //   };
  //   // Comprobamos el token
  //   if (conf.headers == null) {
  //     conf.headers = {};
  //   }
  //   if (token && token != "") {
  //     conf.headers["api-token"] = token;
  //   }

  //   return conf;
  // }, [method, token]);

  useEffect(() => {
let tokenProvis;
const ahora = new Date();
console.log("en useApi-useEffect-ini. Ahora: "+ahora.getHours()+":"+ahora.getMinutes()+":"+ahora.getSeconds()+"."+ahora.getMilliseconds());
          // Limpiamos los errores
          setError("");
          if (!loading){
            setLoading(true);
          }
    
          // if (performRequest) {
            // Realizamos la llamada al servidor
             fetch("/api/register", {method: "POST", headers: { 'Content-Type': 'application/json'}, body: JSON.stringify({username: "jaime991", password: "jaime"})})
              .then((res) => res.json())
              .then((json) => {
                if (json.error != null) {
                  setError(json.error);
                } else {
                  setData(json);
                   setToken(json.token);
                   tokenProvis = json.token;
                }
              })
              .finally(() => setLoading(false));
          // }
          console.log("*** En useApii-useEffect-fin-1");
          console.log("*** En useApii-useEffect-fin-2. error= "+error);
          console.log("*** En useApii-useEffect-fin 3. data= "+data);
          console.log("*** En useApii-useEffect-fin 4. token= "+token);
          console.log("*** En useApii-useEffect-fin 5. tokenProvis= "+tokenProvis);
   
      // }, [url, method, token, requestBody ]);
    }, [url]);      



//   useEffect(() => {
// console.log("*** en useApii-useEffect-ini-1. url: "+url+"; method: "+method+"; token: "+token+"; body.username= "+config.body.username);
//       // Limpiamos los errores
//       setError("");
//       if (!loading){
//         setLoading(true);
//       }

//       if (performRequest) {
// console.log("*** En useApii-useEffect-antes de llamada al API. url= "+url+"; method= "+config.method+"; username= "+config.body.username+"; password= "+config.body.password);
//         // Realizamos la llamada al servidor
//         fetch(url, config)
//           .then((res) => res.json())
//           .then((json) => {
//             if (json.error != null) {
//               setError(json.error);
//             } else {
//               setData(json);
//             }
//           })
//           .finally(() => setLoading(false));
// console.log("*** En useApii-useEffect-despues-1 de llamada al API");
// console.log("*** En useApii-useEffect-despues-2 de llamada al API. error= "+error);
// console.log("*** En useApii-useEffect-despues-3 de llamada al API. json= "+json);
//       }
//   }, [url, method, token, requestBody ]);

console.log("*** En useApii-fin 4. token= "+token);    
  return {
    data,
    error,
    updateParams
  };
};

export default useApi;
