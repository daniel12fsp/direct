//three-level tree
//ten-level tree
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
  // console.log('changed', arguments)
  // return false;
  const typeDiff =
    typeof previousNode !== typeof nextNode || previousNode != nextNode;
  // console.log(typeDiff, typeof previousNode, typeof nextNode);
  if (typeDiff) return true;
  const childrenDiff =
    previousNode.type == nextNode.type &&
    isSameType(previousNode, nextNode, "object") &&
    previousNode.children.length !== nextNode.children.length;
  // console.log(childrenDiff);
  if (childrenDiff) return true;
  const strDiff =
    isSameType(previousNode, nextNode, "string") && previousNode !== nextNode;
  // console.log(strDiff);
  if (strDiff) return true;

  return false;
  // return typeDiff || childrenDiff || strDiff;
}

export function update(previousNode, nextNode, node) {
  console.log("update", arguments);
  if (previousNode == null) {
    if (nextNode == null) {
      return null;
    } else {
      // console.log('add');
      add(nextNode, node);
    }
  } else {
    const change = changed(previousNode, nextNode);
    console.log("change", change);
    if (change) {
      if (nextNode == null) {
        if (previousNode.index) {
          remove(node, node.childNodes[previousNode.index]);
        } else {
          remove(node, node.firstChild);
        }
        return;
      }
      //For strings
      if (typeof nextNode == "string") {
        replace(nextNode, node, node.firstChild);
      } else {
        //For arrays
        const nextChildren = nextNode.children;
        if (nextChildren.length == 0) {
          if (previousNode.index) {
            replace(nextNode, node, node.childNodes[previousNode.index]);
          } else {
            replace(nextNode, node, node.firstChild);
          }
        } else {
          const prevChildren = previousNode.children;
          const maxLength = Math.max(nextChildren.length, prevChildren.length);
          const firstChild = node.childNodes[0];
          // console.log("Recursive");
          for (let i = 0; i < maxLength; i++) {
            const nextChild = nextChildren[i];
            const prevChild = prevChildren[i];
            const prevNodeChild = node.childNodes[i];
            update(prevChild, nextChild, prevNodeChild || firstChild);
          }
        }
      }
    }
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
      console.log(typeof element);
      throw Error("Type of element is invalid");
      break;
  }
  return newNode;
}

export function add(nextNode, parent) {
  console.log("add", nextNode, parent.tagName);
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
  // console.log('remove', parent, child);
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
