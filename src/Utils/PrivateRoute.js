import React from "react";
import {Route, Redirect} from "react-router-dom";
import { getAdmin, getWork } from "./Common";

const PrivateRoute = ({component: Component, ...rest}) =>{
    return (
        <Route
            {...rest}
            render={props => {
                if(getAdmin()){
                    return getWork() ? <Component {...props}/>
                : <Redirect to={{ pathname: "/admindash", state: {from: props.location } }}/>
                }else{
                    return getWork() ? <Component {...props}/>
                : <Redirect to={{ pathname: "/login", state: {from: props.location } }}/>
                }
                
            }}
        ></Route>
    );

}

export default PrivateRoute;