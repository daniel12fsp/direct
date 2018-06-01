import { update, h, render } from "../../index";
import { Component } from "../../Component";

import { p } from "../utils.js";
let parentRef;
let fnParent = e => (parentRef = e);
class RawChild extends Component{
  render() {
    const { items } = this.props;
    //TODO without parent h2
    return items.map(({key, value})=> <div key={key}>{value}</div>);
  }
}
class Child extends Component {
  render() {
    const { items } = this.props;
    //TODO without parent h2
    return <h2>{items.map(({key, value})=> <div key={key}>{value}</div>)}</h2>;
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
        <h3>Helllow</h3>
        <this.props.child items={items} />
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
    const items = [];
    update(null, <Parent child={Child} ref={fnParent} />, root);
    expect(p(root.innerHTML)).toBe("<div><h3>Helllow</h3><h2></h2></div>");
    items.push(
      {
        key: 1,
        value: "first"
      }
    )
    parentRef.setState({items});
    expect(p(root.innerHTML)).toBe("<div><h3>Helllow</h3><h2><divkey=\"1\">first</div></h2></div>");
    items.push({
      key: 2,
      value: "second"
    });
    parentRef.setState({items});
    expect(p(root.innerHTML)).toBe("<div><h3>Helllow</h3><h2><divkey=\"1\">first</div><divkey=\"2\">second</div></h2></div>");
    items.push({
      key: 3,
      value: "third"
    });
    parentRef.setState({items});
    expect(p(root.innerHTML)).toBe("<div><h3>Helllow</h3><h2><divkey=\"1\">first</div><divkey=\"2\">second</div><divkey=\"3\">third</div></h2></div>");
  });
  it("Parent Works", () => {
    update(null, <Parent child={RawChild} ref={fnParent} />, root);
    expect(p(root.innerHTML)).toBe("<div><h3>Helllow</h3></div>");
    parentRef.setState({items: [{
      key: 1,
      value: "first"
    }]});
    expect(p(root.innerHTML)).toBe("<div><h3>Helllow</h3><divkey=\"1\">first</div></div>");
  });
});
