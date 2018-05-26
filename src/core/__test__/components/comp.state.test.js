import { update, h, render } from "../../index";
import { Component } from "../../Component";

import { p } from "../utils.js";
let parentRef, childRef;
let fnChild = e => (childRef = e);
let fnParent = e => (parentRef = e);

class Child extends Component {
  render() {
    const { msg } = this.props;
    return <div> {msg} </div>;
  }
}

class Parent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "Do you have time?"
    };
    this.setMsg = () => {
      this.setState({ msg: "Hi, Geovana" });
    };
  }
  render() {
    const { msg } = this.state;
    return (
      <div>
        <Child msg={msg} ref={fnChild} />
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
    expect(childRef.props).toEqual({
      msg: "Do you have time?",
      ref: fnChild
    });
    expect(childRef.state).toEqual({});

    expect(parentRef.props).toEqual({ ref: fnParent });
    expect(parentRef.state).toEqual({ msg: "Do you have time?" });

    expect(p(root.innerHTML)).toBe("<div><div>Doyouhavetime?</div></div>");
    parentRef.setMsg();
    expect(p(root.innerHTML)).toBe("<div><div>Hi,Geovana</div></div>");
  });
});
