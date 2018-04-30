import { update, h, add } from "./core";

const tree1 = (
  <div>
    <span />
    <p />
  </div>
);

const tree2 = (
  <div>
    <span>
      <h1 />
    </span>
    <p>
      <a />
    </p>
  </div>
);
const root = document.createElement("ul");
add(tree1, root);
console.log("-->>>>>");
update(tree1, tree2, root);
console.log(root.innerHTML);
