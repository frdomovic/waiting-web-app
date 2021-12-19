export const getUser = () =>{
    const userStr = sessionStorage.getItem("user");
    if(userStr) return JSON.parse(userStr);
    else return null;
}
export const setID = (id) =>{
    sessionStorage.setItem("id",id);
}
export const getID = () =>{
    return sessionStorage.getItem("id") || null;
}

export const setStatus = (status) => {
    sessionStorage.setItem("status",status);
}
export const getPWstatus = () =>{
    return sessionStorage.getItem("status") || null;
}
export const getToken = () => {
    return sessionStorage.getItem("token") || null;
}
export const setToken = (token) => {
    sessionStorage.setItem("token",token);
}
export const removeToken = () => {
    sessionStorage.removeItem("token");
}
export const setUser = (user) => {
    sessionStorage.setItem("user", JSON.stringify(user));
}

export const setUserSession = (token, user) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user", JSON.stringify(user));
}

export const removeUser = () => {
    sessionStorage.removeItem("user");
}

export const removeUserSession = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("status");
    sessionStorage.removeItem("id");
}