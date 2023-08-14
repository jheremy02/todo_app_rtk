import axios from "axios";


const client= axios.create({
    baseURL:"http://localhost:8000"
})


// me saca la data especifica del response
client.interceptors.response.use(response=>response.data , error=> {

    if (!error.response) {
        return Promise.reject({message:error.message})
    } else {
        if (error.response.status === 401) {
            removeAuthorizationHeader();
    
            if (window.location.pathname !== "/login") {
    
                window.location = "/login";
                return Promise.reject({
                    message: error.response.statusText,
                    ...error.response,
                    ...error.response.data,
                  });
            } 
    
            return Promise.reject({
                message: error.response.statusText,
                ...error.response,
                ...error.response.data,
              });
          }

        return Promise.reject({
            message:error.response.statusText,
            ...error.response,
            ...error.response.data
        })
    }

}
)
//setea al cliente para que el token viaje en la cabezera en cada llamada a la peticion
export const setAuthorizationHeader=(token)=>client.defaults.headers.common['Authorization']='Bearer '+token

export const removeAuthorizationHeader=()=>{
    delete client.defaults.headers.common['Authorization']
}

export default client