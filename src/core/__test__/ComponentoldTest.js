import { changed, h, update, render } from "../index";
import { Component } from "../Component";
let dumb,
  lifecycle = [];
// class DumbCompoment extends Component {
//   constructor(props) {
//     lifecycle.push("constructor");
//     super(props);
//     this.state = {
//       status: `I'm dumb`
//     };
//   }
//   componentWillReceiveProps() {
//     lifecycle.push("componentWillReceiveProps");
//   }
//   componentWillMount() {
//     lifecycle.push("componentWillMount");
//   }
//   componentDidMount() {
//     lifecycle.push("componentDidMount");
//   }
//   componentWillUpdate() {
//     lifecycle.push("componentWillUpdate");
//   }
//   componentDidUpdate() {
//     lifecycle.push("componentDidUpdate");
//   }
//   shouldComponentUpdate() {
//     lifecycle.push("shouldComponentUpdate");
//     return true;
//   }
//   componentWillReceiveProps() {
//     lifecycle.push("componentWillReceiveProps");
//   }
//   componentWillUnmount() {
//     lifecycle.push("componentWillUnmount");
//   }
//   render() {
//     lifecycle.push("render");
//     return <div>{this.state.status}</div>;
//   }
// }

// class PropsCompoment extends Component {
//   render() {
//     return <div>{this.props.status}</div>;
//   }
// }

// class TwoLevelCompoment extends Component {
//   render() {
//     return (
//       <div>
//         TwoLevelCompoment
//         <PropsCompoment status={this.props.status} />
//       </div>
//     );
//   }
// }
// const p = code => code.replace(/\s/g, "");

// describe("Component lifecycle", () => {
//   let root;
//   beforeEach(() => {
//     root = document.createElement("div");
//     lifecycle = [];
//   });
//   it("null vs Component", () => {
//     const answear = p(
//       `<div>
//             I'm dumb
//             </div>`
//     );
//     update(null, <DumbCompoment beSmart={false} />, root);
//     expect(p(root.innerHTML)).toBe(answear);
//     const methods = [
//       "constructor",
//       "componentWillMount",
//       "render",
//       "componentDidMount"
//     ];
//     expect(lifecycle).toEqual(methods);
//   });
//   it("Component vs null", () => {
//     const answear = "";
//     update(null, <DumbCompoment beSmart={false} />, root);
//     lifecycle = [];
//     update(<DumbCompoment beSmart={false} />, null, root);
//     expect(p(root.innerHTML)).toBe(answear);
//     const methods = ["componentWillUnmount"];
//     expect(lifecycle).toEqual(methods);
//   });
//   it("With props diff: Component  vs Component", () => {
//     let answear = "<div>str1</div>";
//     update(null, <PropsCompoment status="str1" />, root);
//     expect(p(root.innerHTML)).toBe(answear);
//     update(
//       <PropsCompoment status="str1" />,
//       <PropsCompoment status="str2" />,
//       root
//     );
//     answear = "<div>str2</div>";
//     expect(p(root.innerHTML)).toBe(answear);
//   });
//   it("With props diff: Component1  vs Component2", () => {
//     let answear = "<div>str1</div>";
//     update(null, <PropsCompoment status="str1" />, root);
//     expect(p(root.innerHTML)).toBe(answear);
//     update(
//       <PropsCompoment status="str1" />,
//       <DumbCompoment beSmart={false} />,
//       root
//     );
//     answear = "<div>I'mdumb</div>";
//     expect(p(root.innerHTML)).toBe(answear);
//   });
//   it("Component1  vs 2-level Component2", () => {
//     let answear = "<div>str1</div>";
//     update(null, <PropsCompoment status="str1" />, root);
//     expect(p(root.innerHTML)).toBe(answear);
//     update(
//       <PropsCompoment status="str1" />,
//       <TwoLevelCompoment status="cool" />,
//       root
//     );
//     answear = "<div>TwoLevelCompoment<div>cool</div></div>";
//     expect(p(root.innerHTML)).toBe(answear);
//   });
//   it("2-level Component1  vs 2-level Component1", () => {
//     update(null, <TwoLevelCompoment status="cool" />, root);
//     let answear = "<div>TwoLevelCompoment<div>cool</div></div>";
//     expect(p(root.innerHTML)).toBe(answear);
//     update(
//       <TwoLevelCompoment status="cool" />,
//       <TwoLevelCompoment status="coolest" />,
//       root
//     );
//     answear = "<div>TwoLevelCompoment<div>coolest</div></div>";
//     expect(p(root.innerHTML)).toBe(answear);
//   });
//   xit("componentWillUmmount");
// });

// class StateComponent extends Component {
//   constructor(props) {
//     lifecycle.push("constructor");
//     super(props);
//     this.state = {
//       status: `I'm dumb`,
//       msg: "I love her too"
//     };
//   }
//   render() {
//     lifecycle.push("render");
//     return (
//       <div>
//         {this.state.status}
//         :
//         {this.state.msg}
//       </div>
//     );
//   }
// }

// ref=null;
// let comp=null;
// root = document.createElement("div");

// describe("setState of <StateComponent/>", () => {
//   it("Mount <StateComponent/>", () => {
//     render(<StateComponent ref={e => (ref = e)} />, root);
//     expect("instance" in ref).toBe(true);
//     const answear = p("<div>I'm dumb:I love her too</div>");
//     expect(p(root.innerHTML)).toBe(answear);
//   });
//   it("1 - Check setState trigger lifecicles", () => {
//     ref.instance.setState({ status: "IDK" });
//     const answear = p("<div>IDK:I love her too</div>");
//     expect(p(root.innerHTML)).toBe(answear);
//   });
//   it("2- Check setState trigger lifecicles", () => {
//     ref.instance.setState({ msg: "I DUNNO" });
//     const answear = p("<div>IDK:I DUNNO</div>");
//     expect(p(root.innerHTML)).toBe(answear);
//   });
// });

// class Timer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { seconds: 0 };
//   }

//   tick() {
//     this.setState({
//       seconds: this.state.seconds + 1
//     });
//   }

//   render() {
//     return (
//       <div>
//         <span>Seconds:</span>
//         <span>{this.state.seconds}</span>
//       </div>
//     );
//   }
// }
// let root1 = document.createElement("div");
// const comp1 = <Timer ref={(e)=> ref = e}/>
// describe("<Time />", () => {
//   it("Mount", () => {
//     render(comp1, root1);
//     const answear = p("<div><span>Seconds:</span><span>0</span></div>");
//     expect(p(root1.innerHTML)).toBe(answear);
//   })
//   it("exec tick", () => {
//     ref.instance.tick();
//     const answear = p("<div><span>Seconds:</span><span>1</span></div>");
//     expect(p(root1.innerHTML)).toBe(answear);
//   })

// })

// class TodoApp extends Component {

//     handleChange(e) {
//       this.setState({  });
//     }

//     render() {
//       return (
//         <div>
//             <hr />
//             <button>
//               Add
//             </button>
//         </div>
//       );
//     }
//   }
//   let root = document.createElement("div");
//   let ref;
//   const comp2 = <TodoApp ref={(e)=> ref = e}/>
//   describe("<TodoApp />", () => {
//     it("mount", () => {
//       render(comp2, root);
//       console.log(root.innerHTML)
//       const answear = p("<div><hr><button>Add</button></div>");
//       expect(p(root.innerHTML)).toBe(answear);
//     })
//     it("exec tick", () => {
//       ref.instance.setState({color: "blue"});
//       const answear = p("<div><span>Seconds:</span><span>1</span></div>");
//       expect(p(root.innerHTML)).toBe(answear);
//     })

//   })
