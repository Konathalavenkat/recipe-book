const PropertyControlleComponent = ({controller, renderer}: {controller: boolean, renderer: () => JSX.Element} )=> {
    if(controller){
        return renderer();
    }
    return  null;
}

export default PropertyControlleComponent;