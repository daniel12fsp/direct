//props -> attr
//Function
//Component

export function h(type, props, ...children) {
  return { type, props, children };
}
function isSameType(item1, item2, type) {
  return type === typeof item1 && typeof item2 === typeof item1;
}
export function changed(previousNode, nextNode) {
  if (previousNode == null && nextNode == null) return false;
  const typeDiff =
    typeof previousNode !== typeof nextNode ||
    "" + previousNode != "" + nextNode;
  if (typeDiff) return true;
  const childrenDiff =
    isSameType(previousNode, nextNode, "object") &&
    previousNode.type &&
    nextNode.type;
  const childrenDiffType = childrenDiff && previousNode.type != nextNode.type;
  if (childrenDiffType) return true;
  const strDiff =
    isSameType(previousNode, nextNode, "string") && previousNode !== nextNode;
  if (strDiff) return true;
  return false;
}

export function update(previousNode, nextNode, node) {
  // console.log("update", arguments);
  if (previousNode == null) {
    if (nextNode == null) {
      return;
    }
    add(nextNode, node);
    return;
  }
  if (nextNode == null) {
    if (previousNode.index) {
      remove(node, node.childNodes[previousNode.index]);
    } else {
      remove(node, node.firstChild);
    }
    return;
  }
  const change = changed(previousNode, nextNode);
  if (change) {
    //For strings
    if (typeof nextNode == "string") {
      replace(nextNode, node, node.firstChild);
      return;
    } 
    // For array
    const nextChildren = nextNode.children;
    if (nextChildren.length == 0) {
      if (previousNode.index) {
        replace(nextNode, node, node.childNodes[previousNode.index]);
      } else {
        replace(nextNode, node, node.firstChild);
      }
      return;
    }
  }
  const prevChildren = previousNode.children;
  const nextChildren = nextNode.children;
  const maxLength = Math.max(nextChildren.length, prevChildren.length);
  const firstChild = node.children[0];
  for (let i = 0; i < maxLength; i++) {
    const nextChild = nextChildren[i];
    const prevChild = prevChildren[i];
    const prevNodeChild = node.children[i] || firstChild;
    update(prevChild, nextChild, prevNodeChild);
  }
}

function createTagOrText(element) {
  let newNode;
  switch (typeof element) {
    case "number":
    case "string":
      newNode = document.createTextNode(element);
      break;
    case "object":
      // //id dev
      if (!element.type) {
        throw Error("Type of object is not evaluaty");
      }
      newNode = document.createElement(element.type);
      break;
    case "function":
    case "boolean":
      newNode = null;
      break;
    default:
      throw Error("Type of element is invalid");
      break;
  }
  return newNode;
}

export function add(nextNode, parent) {
  if (nextNode == null || parent == null) return;
  if (Array.isArray(nextNode)) {
    nextNode.forEach(item => add(item, parent));
    return;
  }
  const newNode = createTagOrText(nextNode);
  if (newNode === null) return;
  parent.appendChild(newNode);
  //for string
  if (typeof nextNode != "object") return;
  //for object
  for (let i = 0; i < nextNode.children.length; i++) {
    const nextChild = nextNode.children[i];
    if (nextChild && typeof nextChild == "object") {
      nextChild.index = i;
    }
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
  if (newNode === null) return;
  parent.replaceChild(newNode, child);
}
export function render(jsx, node) {
  update(null, jsx, node);
}
