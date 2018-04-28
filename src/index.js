export function h(type, props, ...children) {
    // console.log(arguments);
    return { type, props, children };
  }
export function changed(previousNode, nextNode, node){
    if (previousNode === null ){
        if(nextNode === null){
            console.log("nextNode");
            return null;
        } else {
            add(nextNode, node)
        }

    }
}


export function add(nextNode, node){
    if(nextNode === undefined || nextNode === null) return;
    const isTag = true;
    let newNode;
    switch (typeof nextNode) {
        case "string":
            newNode =  document.createTextNode(nextNode);
            break;
        case "object":
            newNode =  document.createElement(nextNode.type);
        default:
            break;
        
    }
    node.appendChild(newNode);
}

export function remove(){

}

export function replace(){

}
export function render(jsx, node){
    changed(null, jsx, node)
}
