import React from "react";
import {Route, Redirect} from "react-router-dom";

const PublicRouteOdjel = ({component: Component, ...rest}) =>{
    return (
        <Route
            {...rest}
            render={props => {
                return <Component {...props}/>
                
            }}
        ></Route>
    );

}

export default PublicRouteOdjel;
