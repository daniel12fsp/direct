import { changed, isComponent, isStatefulComponent } from "./changed";
import { extractJSXfrom } from "./extractJSXfrom";
export { changed };

export function h(type, props, ...children) {
  return { type, props, children };
}

//TODO rename indexPrevNode to chindIndex
export function update(previousNodeArg, nextNodeArg, node, indexPrevNode = 0) {
  let { previousNode, nextNode, updateBlocked } = extractJSXfrom(
    previousNodeArg,
    nextNodeArg,
    node,
    indexPrevNode
  );
  if (updateBlocked) {
    return;
  }
  if (previousNode == null) {
    return add(nextNode, node);
  }
  if (nextNode == null) {
    return remove(node, indexPrevNode);
  }
  //TODO remove variable change when is already ok
  const change = changed(previousNode, nextNode);
  if (change) {
    replace(nextNode, node, indexPrevNode);
  }
  const firstChild = node.children[0];
  if (!firstChild) return;
  const prevChildren = (previousNode && previousNode.children) || [];
  const nextChildren = (nextNode && nextNode.children) || [];
  const maxLength = Math.max(nextChildren.length, prevChildren.length);
  for (let i = 0; i < maxLength; i++) {
    const nextChild = nextChildren[i];
    const prevChild = prevChildren[i];
    const prevNodeChild = node.children[indexPrevNode] || firstChild;
    update(prevChild, nextChild, prevNodeChild, i);
  }
}

function createElementDom(element) {
  if (typeof element === "string" || typeof element === "number") {
    return document.createTextNode(element);
  }
  if (typeof element === "object") {
    if (typeof element.type === "string") {
      const newNode = document.createElement(element.type);
      addProps(newNode, element.props);
      return newNode;
    }
    throw Error("Type of object is not evaluaty");
  }
  // Element is function or a boolean the value create is undefined
  //Remeber typeof is string, number, boolean,function, object
  return undefined;
}

const events = new Set([
  "onclick",
  "onkeydown",
  "onchange",
  "oninput",
  "onsubmit",
  "onkeyup"
]);

const RESERVED_PROPS = new Set(["key", "ref", "__self", "__source"]);

export function addProps(node, props) {
  if (!props) return;
  Object.keys(props).forEach(key => {
    const value = props[key];
    const normalizeteKey = key.toLocaleLowerCase();
    if (events.has(normalizeteKey)) {
      node.addEventListener(normalizeteKey.substr(2), value);
      return;
    }
    const attr = key === "className" ? "class" : normalizeteKey;
    if (attr === "style") {
      //TODO parse object to string
    }
    if (!RESERVED_PROPS.has(attr)) {
      node.setAttribute(attr, value);
    }
  });
}

function addNode(nextNode, parent) {
  const newNode = createElementDom(nextNode);
  if (newNode === undefined) return;
  parent.appendChild(newNode);
  if (Array.isArray(nextNode.children)) {
    for (let i = 0; i < nextNode.children.length; i++) {
      let nextChild = nextNode.children[i];
      let result = extractJSXfrom(undefined, nextChild, newNode);
      nextChild = result.nextNode;
      add(nextChild, newNode);
    }
  }
}

function add(nextNode, parent) {
  if (nextNode == null) return;
  if (Array.isArray(nextNode)) {
    nextNode.forEach(item => {
      const result = extractJSXfrom(undefined, item, parent);
      item = result.nextNode;
      add(item, parent);
    });
  } else {
    const result = extractJSXfrom(undefined, nextNode, parent);
    nextNode = result.nextNode;
    addNode(nextNode, parent);
  }
}

function remove(parent, indexPrevNode) {
  if (!parent) return null;
  const child = parent.childNodes[indexPrevNode];
  parent.removeChild(child);
}

function replace(nextNode, parent, indexPrevNode) {
  if (Array.isArray(nextNode)) {
    replaceArr(nextNode, parent, indexPrevNode);
  } else {
    replaceNode(nextNode, parent, indexPrevNode);
  }
}

function replaceNode(nextNode, parent, indexPrevNode) {
  const child = parent.childNodes[indexPrevNode];
  const newNode = createElementDom(nextNode);
  //TODO problably need a test
  if (typeof child === "undefined" || typeof newNode === "undefined") return;
  if (child.hasChildNodes()) {
    while (child.childNodes.length !== 0) {
      const newChild = child.childNodes[0];
      newNode.appendChild(newChild);
    }
  }
  parent.replaceChild(newNode, child);
}

function replaceArr(nextNode, parent, indexPrevNode) {
  const childNodes = parent.childNodes;
  while (childNodes.length !== indexPrevNode) {
    childNodes[indexPrevNode].remove();
  }
  nextNode.forEach(item => add(item, parent));
  return;
}

export function render(jsx, node) {
  node.innerHTML = "";
  update(null, jsx, node);
}
