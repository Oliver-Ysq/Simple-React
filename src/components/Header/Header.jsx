import SmpReact from "../../SmpReact/SmpReact";
import imgsrc from "../../assets/gamepad.png";
import "./style.css";

export default class Footer extends SmpReact.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="wrapper">
        <div class="box">
          <img className="logo" src={imgsrc} alt=""/>
          <div class="textWrapper">
            <div className="title">Counter-Demo</div>
            <div className="tips">powered by SmpReact</div>
          </div>
        </div>
        <div className="buttons">
          <div className={this.props.page === 0 ? 'title active' : 'title'}>Counter</div>
          <div className={this.props.page === 1 ? 'title active' : 'title'}>TodoList</div>
        </div>
      </header>
    );
  }
}