export function isComponent(component) {
  return component && component.type && typeof component.type === "function";
}

export function isStatefulComponent(component) {
  return !!component.type.prototype.render;
}

function isSameType(item1, item2, type) {
  return type === typeof item1 && typeof item2 === typeof item1;
}

function isAllNullable(p, n) {
  return p == null && n == null;
}

function isTypeDiff(p, n) {
  return typeof p !== typeof n || "" + p != "" + n;
}

function isEqualChildren(p, n) {
  return p && n && isSameType(p, n, "object") && p.type && n.type;
}

function isChildrenDiffTypes(p, n) {
  return (
    p &&
    n &&
    ((isEqualChildren(p, n) && p.type != n.type) || p.props != n.props)
  );
}

function xor(op1, op2) {
  return !!(op1 ^ op2);
}
function isArrayDiff(p, n) {
  //TODO Improve this code for only array
  const isArrayN = Array.isArray(p);
  const isArrayP = Array.isArray(n);
  if (xor(isArrayP, isArrayN)) {
    return true;
  }
  if (isArrayP && isArrayN) {
    if (p.length === n.length && n.length === 0) {
      return false;
    } else {
      return true;
    }
    //TODO this code is unreachable
    n.map((item, index) => {
      if (changed(item, p[index])) {
        return true;
      }
    });
  }

  return false;
}
export function changed(p, n) {
  return (
    //TODO remove negative logic!
    (!isAllNullable(p, n) && isChildrenDiffTypes(p, n)) ||
    isTypeDiff(p, n) ||
    isArrayDiff(p, n)
  );
}
