import React from "react";

const PropertyControlleComponent = ({controller, renderer}: {controller: boolean, renderer: () => React.ReactElement} )=> {
    if(controller){
        return renderer();
    }
    return  null;
}

export default PropertyControlleComponent;