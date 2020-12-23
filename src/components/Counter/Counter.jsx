import SmpReact from "../../SmpReact/SmpReact";
import "./style.css";

let interval;

export default class Counter extends SmpReact.Component {

  constructor(props) {
    super(props);
    this.state = {
      canIclick: true,
      disabled: false,
      x: 0
    };
    this.calc = this.calc.bind(this);
    this.setInterval = this.setInterval.bind(this);
    this.clearInterval = this.clearInterval.bind(this);
  }

  calc(e) {
    if (!this.state.canIclick) return;
    switch (parseInt(e.target.id)) {
      case 1:
        this.props.setN(this.props.n + 1);
        break;
      case 2:
        this.props.setN(this.props.n - 1);
        break;
      case 3:
        this.props.setN(this.props.n * 2);
        break;
      case 4:
        this.props.setN(0);
        break;
      default:
        throw new Error();
    }
  };

  clearInterval() {
    if (!this.state.canIclick) {
      clearInterval(interval);
      console.log("定时器已关闭");
    }
    this.setState({
      canIclick: true,
      disabled: false
    });
  };

  setInterval() {
    if (!this.state.canIclick) return false;
    const that = this;
    interval = setInterval(() => {
      that.props.setN(that.props.n + 1);
    }, 1000);
    this.setState({
      disabled: true,
      canIclick: false
    });
  };

  componentDidMount() {
    console.log('Counter Mount！');
  }

  componentWillUnmount() {
    console.log('Counter unmount！');
  }

  render() {
    return (
      <div className="listWrapper maxH">
        <div className="display">{this.props.n}</div>
        <div className="btnWrapper">
          <div>
            <button className={'button ' + (this.state.disabled ? 'ban' : '')} id={1} onClick={this.calc}>+1</button>
            <button className={'button ' + (this.state.disabled ? 'ban' : '')} id={2} onClick={this.calc}>-1</button>
            <button className={'button ' + (this.state.disabled ? 'ban' : '')} id={3} onClick={this.calc}>×2</button>
            <button className={'button ' + (this.state.disabled ? 'ban' : '')} id={4} onClick={this.calc}>clear</button>
          </div>
          <div class="secondLine">
            <button className="button" onClick={this.setInterval}>setInterval</button>
            <button className="button" onClick={this.clearInterval}>clearInterval</button>
          </div>
        </div>
      </div>
    );
  }
}