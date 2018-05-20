// class TodoApp extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = { items: [], text: '' };
//       this.handleChange = this.handleChange.bind(this);
//       this.handleSubmit = this.handleSubmit.bind(this);
//     }
  
//     render() {
//       return (
//         <div>
//           <h3>TODO</h3>
//           <TodoList items={this.state.items} />
//           <form onSubmit={this.handleSubmit}>
//             <label htmlFor="new-todo">
//               What needs to be done?
//             </label>
//             <input
//               id="new-todo"
//               onChange={this.handleChange}
//               value={this.state.text}
//             />
//             <button>
//               Add #{this.state.items.length + 1}
//             </button>
//           </form>
//         </div>
//       );
//     }
  
//     handleChange(e) {
//       this.setState({ text: e.target.value });
//     }
  
//     handleSubmit(e) {
//       e.preventDefault();
//       if (!this.state.text.length) {
//         return;
//       }
//       const newItem = {
//         text: this.state.text,
//         id: Date.now()
//       };
//       this.setState(prevState => ({
//         items: prevState.items.concat(newItem),
//         text: ''
//       }));
//     }
//   }
  
//   class TodoList extends React.Component {
//     render() {
//       return (
//         <ul>
//           {this.props.items.map(item => (
//             <li key={item.id}>{item.text}</li>
//           ))}
//         </ul>
//       );
//     }
//   }
  
//   ReactDOM.render(<TodoApp />, mountNode);

  import { render, h } from "../../index";
import { Component } from "../../Component";

class TodoApp extends Component {
    constructor(props) {
      super(props);
      this.state = { items: [], text: '' };
      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }
  

  
    handleChange(e) {
    //   this.setState({ text: e.target.value });
    }
  
    handleClick(e) {
    console.log("handleClick");
      const newItem = {
        text: this.state.text,
        id: Date.now()
      };
      const {items} = this.state;
      this.setState({
        items: [...items, newItem],
        text: ''
      });
    }

    render() {
        return (
          <div>
            <h3>TODO</h3>
            <TodoList items={this.state.items} />
              <label htmlFor="new-todo">
                What needs to be done?
              </label>
              <input
                id="new-todo"
                onChange={this.handleChange}
                value={this.state.text}
              />
              <button onClick={this.handleClick}>
                Add #{this.state.items.length + 1}
              </button>
          </div>
        );
      }
  }
  
  class TodoList extends Component {
    render() {
      return (
        <ul>
          {this.props.items.map(item => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      );
    }
  }
  
  render(<TodoApp />, document.getElementById("root"));