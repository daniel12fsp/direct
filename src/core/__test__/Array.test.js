import { update, add, h, render } from "../index";
import { Component } from "../Component";

class C extends Component {
  render() {
    return <div>Component</div>;
  }
}

function F() {
  return <div>Component stateless</div>;
}

function Parent({ children }) {
  return <div>{children}</div>;
}

class LazyParent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: []
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        value: [1, 2, 3]
      });
    }, 200);
  }
  render() {
    const { value } = this.state;
    return <div>{value}</div>;
  }
}
describe("Array", () => {
  let root;
  beforeEach(() => {
    root = document.createElement("div");
  });
  it("Must array be in dom", () => {
    update(
      null,
      <div>
        {[
          <div>Div</div>,
          null,
          <span>Span</span>,
          undefined,
          <C />,
          false,
          <F />,
          true
        ]}
      </div>,
      root
    );
    expect(root.innerHTML).toBe(
      "<div><div>Div</div><span>Span</span><div>Component</div><div>Component stateless</div></div>"
    );
  });

  it("Must array be in dom", () => {
    update(null, <span>{[<C />, <F />]}</span>, root);
    expect(root.innerHTML).toBe(
      "<span><div>Component</div><div>Component stateless</div></span>"
    );
  });

  it("Must be in dom", done => {
    render(
      <h1>
        <LazyParent />
        <LazyParent />
      </h1>,
      root
    );
    setTimeout(() => {
      expect(root.innerHTML).toBe("<h1><div>123</div><div>123</div></h1>");
      done();
    }, 200);
  });
});
