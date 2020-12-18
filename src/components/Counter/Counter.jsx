import SmpReact from "../../SmpReact/SmpReact";
import "./style.css";

export default class Counter extends SmpReact.Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: null,
      canIclick: true,
      disabled: false,
    };

    this.calc = (type) => {
      if (!this.state.canIclick) return;
      switch (type) {
        case 0:
          this.props.setN(this.props.n + 1);
          break;
        case 1:
          this.props.setN(this.props.n - 1);
          break;
        case 2:
          this.props.setN(this.props.n * 2);
          break;
        case 3:
          this.props.setN(0);
          break;
        default:
          throw new Error();
      }
    };

    this.setInterval = () => {
      if (!this.state.canIclick) return false;
      const that = this;
      this.setState({
        disabled: true,
        interval: setInterval(() => {
          that.setState({
            n: that.state.n + 1
          });
        }, 1000),
        flag: false
      });
    };

    this.clearInterval = () => {
      if (this.state.canIclick === false) {
        clearInterval(this.state.interval);
        window.alert("定时器已关闭");
      }
      this.setState({
        flag: true,
        interval: null,
        disabled: false
      });
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('Counter update');
  }

  render() {
    return (
      <div className="listWrapper">
        <div className="display">{this.props.n}</div>
        <div className="btnWrapper">
          <div>
            <button className={this.state.disabled && 'ban'} onClick={() => this.calc(0)}>+1</button>
            <button className={this.state.disabled && 'ban'} onClick={() => this.calc(1)}>-1</button>
            <button className={this.state.disabled && 'ban'} onClick={() => this.calc(2)}>×2</button>
            <button className={this.state.disabled && 'ban'} onClick={() => this.calc(3)}>clear</button>
          </div>
          <div class="secondLine">
            <button onClick={() => this.setInterval()}>setInterval</button>
            <button onClick={() => this.clearInterval()}>clearInterval</button>
          </div>
        </div>
      </div>
    );
  }
}