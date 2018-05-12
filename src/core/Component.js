export class Component {
    //TODO remove method can be overwrite
	constructor(props) {
		this.props = props;
		this.type = 'COMPONENT';
		this.__nextDom__ = null;
		this.__node__ = null;
	}
	__mount__() {
		this.componentWillMount();
		this.__prevDom__ = this.__nextDom__;
		this.__nextDom__ = this.render();
		this.componentDidMount();
	}

	__update__(nextProps, nextState= this.state) {
        //TODO this line is super wrong
		let prevState = this.state;
		let prevProps = this.props;

		this.componentWillReceiveProps(nextProps);
		this.componentWillUpdate(nextProps, nextState);
		this.props = nextProps;
		if (this.shouldComponentUpdate(nextProps, nextState)) {
			this.__prevDom__ = this.__nextDom__;
			this.__nextDom__ = this.render();
		}
		this.componentDidUpdate(prevProps, prevState);
	}
	setState(state) {
        const newState = {...this.state, ...state};
		this.__update__(this.props, newState);
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
