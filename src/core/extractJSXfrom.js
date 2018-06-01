import { changed, isComponent, isStatefulComponent } from "./changed";

export function extractJSXfrom(
  previousNode,
  nextNode,
  node,
  indexPrevNode = 0
) {
  if (isComponent(nextNode)) {
    //TODO Simplify, please
    if (isStatefulComponent(nextNode)) {
      if (previousNode && previousNode.type === nextNode.type) {
        node.instance.index = indexPrevNode;
        //TODO maybe check if props change to run update
        node.instance.__update__(nextNode.props, indexPrevNode);
        nextNode = node.instance.__nextDom__;
        return { previousNode, nextNode, updateBlocked: true };
      }
      if (nextNode && nextNode.type) {
        const newInstace = new nextNode.type(nextNode.props || {});
        node.instance = newInstace;
        node.instance.__mount__(node, indexPrevNode);
        nextNode.props && nextNode.props.ref && nextNode.props.ref(newInstace);
        nextNode = newInstace.__nextDom__;
        //TODO problably need a return to block update
      }
    } else {
      nextNode = nextNode.type(nextNode.props || {});
    }
  }
  if (isComponent(previousNode)) {
    if (isStatefulComponent(previousNode)) {
      node.instance.componentWillUnmount();
      previousNode = node.instance.__nextDom__;
    } else {
      //TODO I don't understand this!!!!
      previousNode = previousNode.type(previousNode.props);
    }
  }
  if (isComponent(previousNode) || isComponent(nextNode)) {
    return extractJSXfrom(previousNode, nextNode, node);
  }
  return { previousNode, nextNode, updateBlocked: false };
}
