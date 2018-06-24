import { update, h, render } from "../../index";
import { Component } from "../../Component";

import { p } from "../utils.js";
let parentRef;
let fnParent = e => (parentRef = e);

class Child extends Component {
  render() {
    const { items } = this.props;
    return (
      <div> {items.map(({ key, value }) => <div key={key}>{value}</div>)} </div>
    );
  }
}

class Parent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }
  render() {
    const { items } = this.state;
    return (
      <div>
        <Child items={items} />
      </div>
    );
  }
}

describe("State <Component />", () => {
  let root;
  beforeEach(() => {
    root = document.createElement("div");
  });
  it("Parent Works", () => {
    update(null, <Parent ref={fnParent} />, root);
    expect(p(root.innerHTML)).toBe("<div><div></div></div>");
    parentRef.setState({
      items: [
        {
          key: 1,
          value: "first"
        }
      ]
    });
    expect(p(root.innerHTML)).toBe("<div><div><div>first</div></div></div>");
  });
});
