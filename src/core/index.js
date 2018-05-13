//initial setState
//TODO make setState asynchrony again
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
  const childrenDiffType =
    (childrenDiff && previousNode.type != nextNode.type) ||
    previousNode.props != nextNode.props;
  if (childrenDiffType) return true;
  const strDiff =
    isSameType(previousNode, nextNode, "string") && previousNode !== nextNode;
  if (strDiff) return true;
  return false;
}

export function update(previousNode, nextNode, node) {
  if (nextNode && nextNode.type && typeof nextNode.type === "function") {
    //TODO maybe another way?
    if (nextNode.type.prototype.render) {
      if (previousNode && previousNode.type === nextNode.type) {
        node.instance.__update__(nextNode.props);
        nextNode = node.instance.__nextDom__;
        return;
      }
      if (nextNode && nextNode.type) {
        const newInstace = new nextNode.type(nextNode.props || {});
        node.instance = newInstace;
        node.instance.__mount__();
        node.instance.__ref__ = node;
        nextNode.props && nextNode.props.ref && nextNode.props.ref(node);
        nextNode = newInstace.__nextDom__;
      }
    } else {
      nextNode = nextNode.type(nextNode.props || {});
    }
  } else if (
    previousNode &&
    previousNode.type &&
    typeof previousNode.type === "function"
  ) {
    if (previousNode.type.prototype.render) {
      node.instance.componentWillUnmount();
      previousNode = node.instance.__nextDom__;
    } else {
      previousNode = previousNode.type(previousNode.props);
    }
  }

  if (previousNode == null) {
    if (nextNode == null) {
      return;
    }
    add(nextNode, node);
    return;
  }
  const indexPrevNode = previousNode.index || 0;
  if (nextNode == null) {
    remove(node, node.childNodes[indexPrevNode]);
    return;
  }
  const change = changed(previousNode, nextNode);
  if (change) {
    replace(nextNode, node, node.childNodes[indexPrevNode]);
  }
  const firstChild = node.children[0];
  if (firstChild === undefined) return;
  const prevChildren = previousNode.children || [];
  const nextChildren = nextNode.children || [];
  const maxLength = Math.max(nextChildren.length, prevChildren.length);
  for (let i = 0; i < maxLength; i++) {
    const nextChild = nextChildren[i];
    const prevChild = prevChildren[i];
    const prevNodeChild = node.children[i] || firstChild;
    update(prevChild, nextChild, prevNodeChild);
  }
}

function createElementDom(element) {
  let newNode;
  switch (typeof element) {
    case "number":
    case "string":
      newNode = document.createTextNode(element);
      break;
    case "object":
      //id dev
      if (!element.type) {
        throw Error("Type of object is not evaluaty");
      }
      if (typeof element.type === "string") {
        newNode = document.createElement(element.type);
      }
      if (element.props) {
        addProps(newNode, element.props);
      }
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

const events = new Set(["onclick", "onkeydown"]);
export function addProps(node, props) {
  Object.keys(props).forEach(key => {
    if (typeof value === "function") return;
    const value = props[key];
    const normalizeteKey = key.toLocaleLowerCase();
    if (events.has(normalizeteKey)) {
      node.addEventListener(normalizeteKey.substr(2), value);
      return;
    }
    const attr = key === "className" ? "class" : normalizeteKey;
    node.setAttribute(attr, value);
  });
}

export function add(nextNode, parent) {
  if (nextNode == null || parent == null) return;
  if (Array.isArray(nextNode)) {
    nextNode.forEach(item => add(item, parent));
    return;
  }
  const newNode = createElementDom(nextNode);
  if (newNode === null) return;
  parent.appendChild(newNode);
  //for string
  if (typeof nextNode != "object") return;
  //for object
  for (let i = 0; i < nextNode.children.length; i++) {
    let nextChild = nextNode.children[i];
    if (nextChild && nextChild.type && typeof nextChild.type === "function") {
      if (nextChild.type.prototype.render) {
        const newInstace = new nextChild.type(nextChild.props || {});
        newInstace.__mount__();
        node.instance.__ref__ = newNode;
        nextChild = newInstace.__nextDom__;
      } else {
        nextChild = nextChild.type(nextChild.props || {});
      }

      //TODO I'm not saving instance
      // console.log("You missed");
    }
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
  const newNode = createElementDom(nextNode);
  if (newNode === null) return;
  parent.replaceChild(newNode, child);
}
export function render(jsx, node) {
  update(null, jsx, node);
}
