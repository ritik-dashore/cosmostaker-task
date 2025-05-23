// const url = 'http://localhost:3000/Cosmostaker/api/'
const url = import.meta.env.VITE_API_URL
export const useFetchData = async (endPoint, method) =>{
    const token = localStorage.getItem('token')
    const data = await fetch(`${url}${endPoint}`, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
                "authorization":`Bearer ${token}`
            }}
          )
    const result = await data.json()
    return result
}

export const usePostData = async (endPoint, method, formObj) =>{
    const token = localStorage.getItem('token')
    const data = await fetch(`${url}${endPoint}`, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
                "authorization":`Bearer ${token}`
            },
            // body: new URLSearchParams({ email, password }),
            body: JSON.stringify(formObj)}
          )
    const result = await data.json()
    return result
}

export const useLogin = async (endPoint, method, formObj) =>{
    const data = await fetch(`${url}${endPoint}`, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            // body: new URLSearchParams({ email, password }),
            body: JSON.stringify(formObj)}
          )
    const result = await data.json()
    return result
}
