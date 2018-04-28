//evaluate array, boolean, number
//two-level tree
//three-level tree
//ten-level tree 
//props -> attr
//Component

export function h(type, props, ...children) {
	return { type, props, children };
}
function isSameType(item1, item2, type){
    return type === typeof item1 && typeof item2 === typeof item1;
}
function changed(previousNode, nextNode) {
	// return false;
	const typeDiff = typeof previousNode !== typeof nextNode;
    const childrenDiff =
        isSameType(previousNode, nextNode, 'object') && 
        previousNode.children !== nextNode.children;
    const strDiff = isSameType(previousNode, nextNode, 'string') && 
        previousNode !== nextNode;
	return typeDiff || childrenDiff || strDiff;
}
export function update(previousNode, nextNode, node) {
    // console.log("update", arguments)
	if (previousNode == null) {
		if (nextNode == null) {
			return null;
		} else {
			add(nextNode, node);
		}
	} else {
		if (nextNode == null) {
			remove(node, node.firstChild);
		} else {
            const change = changed(previousNode, nextNode);
            // console.log(change);
            const nextChildren = nextNode.children;
			if (change) {
                //For strings
                if (typeof nextNode == "string"){
					replace(nextNode, node, node.firstChild);
                }else 
                //For arrays
				if (nextChildren.length === 0) {
					replace(nextNode, node, node.firstChild);
				} else {
                    const prevChildren = previousNode.children;
					const maxLength = Math.max(nextChildren.length, prevChildren.length);
					for (let i = 0; i < maxLength; i++) {
						const nextChild = nextChildren[i];
						const prevChild = prevChildren[i];
                        const prevNodeChild = node.childNodes[i];
						update(prevChild, nextChild, prevNodeChild);
					}
				}
			}
		}
	}
}

function createTagOrText(element) {
	let newNode;
	switch (typeof element) {
		case 'string':
			newNode = document.createTextNode(element);
			break;
		case 'object':
			newNode = document.createElement(element.type);
			break;
		default:
			console.log(element);
			throw Error('Type of element is invalid');
			break;
	}
	return newNode;
}

export function add(nextNode, parrent) {
    // console.log("add", nextNode, parrent.tagName);
	if (nextNode == null || parrent == null) return;
	const newNode = createTagOrText(nextNode);
    parrent.appendChild(newNode);
    //for string
    if (typeof nextNode == "string") return;
    //for object
    for (let i = 0; i < nextNode.children.length; i++) {
        const nextChild = nextNode.children[i];
        add(nextChild, newNode);
    }
}

export function remove(parent, child) {
	if (parent == null || child == null) return;
	parent.removeChild(child);
}

export function replace(nextNode, parent, child) {
	if (nextNode == null || parent == null || child == null) return;
    const newNode = createTagOrText(nextNode);
	parent.replaceChild(newNode, child);
}
export function render(jsx, node) {
	update(null, jsx, node);
}
