import SmpReact from "../../SmpReact/SmpReact";
import imgsrc from "../../assets/gamepad.png";
import "./style.css";

export default class Footer extends SmpReact.Component {
  constructor() {
    super();
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
      </header>
    );
  }
}