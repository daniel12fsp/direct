export class Component {
	constructor(props) {
		this.props = props;
		this.type = 'COMPONENT';
		this.__prevDom__ = null;
		this.__nextDom__ = null;
		this.__node__ = null;
	}
	__mount__() {
		this.componentWillMount();
		this.__prevDom__ = this.__nextDom__;
		this.__nextDom__ = this.render();
		this.componentDidMount();
	}

	__update__(nextProps) {
		//TODO this line is super wrong
		let nextState = this.state;
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
	setState() {
		this.__update__();
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
