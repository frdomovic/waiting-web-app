import React from "react";
import {Route, Redirect} from "react-router-dom";
import { getWork, getAdmin } from "./Common";

const PublicRoute = ({component: Component, ...rest}) =>{
    console.log(getWork());
    return (
        <Route
            {...rest}
            render={props => {
                if(!getAdmin()){
                    return !getWork() ? <Component {...props}/>
                : <Redirect to={{ pathname: "/WorkerStartPage" }}/>
                }else{
                    return !getAdmin() ? <Component {...props}/>
                : <Redirect to={{ pathname: "/admindash" }}/>
                }
                
            }}
        ></Route>
    );

}

export default PublicRoute;
