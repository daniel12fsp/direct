// class Timer extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = { seconds: 0 };
//     }

//     tick() {
//       this.setState(prevState => ({
//         seconds: prevState.seconds + 1
//       }));
//     }

//     componentDidMount() {
//       this.interval = setInterval(() => this.tick(), 1000);
//     }

//     componentWillUnmount() {
//       clearInterval(this.interval);
//     }

//     render() {
//       return (
//         <div>
//           Seconds: {this.state.seconds}
//         </div>
//       );
//     }
//   }

//   ReactDOM.render(<Timer />, mountNode);
import { render, h } from "../../index";
import { Component } from "../../Component";

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
  }

  tick() {
    const { seconds } = this.state;
    this.setState({ seconds: seconds + 1 });
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <div>Seconds: {this.state.seconds}</div>;
  }
}

render(<Timer />, document.getElementById("root"));
