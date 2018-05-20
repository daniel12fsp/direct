import { update } from "./index";
export class Component {
  //TODO remove method can be overwrite
  constructor(props) {
    this.props = props;
    this.type = "COMPONENT";
    this.__nextDom__ = null;
    this.__node__ = null;
    this.__ref__ = null;
    this.state = {};
  }
  __mount__(node) {
    // if (! this.__nextDom__) return;
    this.componentWillMount();
    this.__prevDom__ = this.__nextDom__;
    this.__nextDom__ = this.render();
    this.__ref__ = node;
    // update(this.__prevDom__, this.__nextDom__, this.__ref__);
    this.componentDidMount();
  }

  __update__(nextProps, nextState = this.state, prevState) {
    let prevProps = this.props;
    this.state = nextState;
    this.componentWillReceiveProps(nextProps);
    this.props = nextProps;
    this.componentWillUpdate(nextProps, nextState);
    if (this.shouldComponentUpdate(nextProps, nextState)) {
      this.__prevDom__ = this.__nextDom__;
      this.__nextDom__ = this.render();
      update(this.__prevDom__, this.__nextDom__, this.__ref__);
      this.componentDidUpdate(prevProps, prevState);
    }
  }
  setState(state) {
    const newState = { ...this.state, ...state };
    this.__update__(this.props, newState, this.state);
  }

  componentWillMount() {}
  componentDidMount() {}
  componentWillUpdate() {}
  componentDidUpdate() {}
  shouldComponentUpdate() {
    return true;
  }
  componentWillReceiveProps() {}
  componentWillUnmount() {}

  render() {}
}
