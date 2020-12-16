import SmpReact from "../../SmpReact/SmpReact";
import "./style.css";

export default class Counter extends SmpReact.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="listWrapper">
        <div className="display">{this.props.n}</div>
        <div className="btnWrapper">
          <div>
            <button className={this.props.disabled && 'ban'} onClick={() => this.props.add()}>+1</button>
            <button className={this.props.disabled && 'ban'} onClick={() => this.props.minus()}>-1</button>
            <button className={this.props.disabled && 'ban'} onClick={() => this.props.mult()}>×2</button>
            <button className={this.props.disabled && 'ban'} onClick={() => this.props.clear()}>clear</button>
          </div>
          <div class="secondLine">
            <button onClick={() => this.props.setInterval()}>setInterval</button>
            <button onClick={() => this.props.clearInterval()}>clearInterval</button>
          </div>
        </div>
      </div>
    );
  }
}