export default class Component{
    type = "COMPONENT"
    __vd__ = null;
    __node__ = null;
    constructor(props){
        this.props = props;
        this.state = {};
        this.__mount__();
    }
    __mount__(){
        componentWillMount();
        this.__vd__ = render();
        componentDidMount();
    }

    __update__(){
        componentWillUpdate();
        if (shouldComponentUpdate()) {
            this.__vd__ = render();
            componentDidUpdate();
        }
    }
    setState(){
        this.__update__();
    }
    componentWillMount(){

    }
    componentDidMount(){

    }
    componentWillUpdate(){

    }
    componentDidUpdate(){

    }
    shouldComponentUpdate(){
        return true;
    }
    componentWillReceiveProps(){

    }
    componentWillUnmount(){

    }

    render(){

    }
}