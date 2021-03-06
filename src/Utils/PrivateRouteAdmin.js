import React from "react";
import {Route, Redirect} from "react-router-dom";
import { getAdmin } from "./Common";

const PrivateRoute = ({component: Component, ...rest}) =>{
    return (
        <Route
            {...rest}
            render={props => {
                return getAdmin() ? <Component {...props}/>
                : <Redirect to={{ pathname: "/login", state: {from: props.location } }}/>
            }}
        ></Route>
    );

}

export default PrivateRoute;
