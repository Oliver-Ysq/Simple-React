import SmpReact from "../../SmpReact/SmpReact";
import imgsrc from "../../assets/gamepad.png";
import "./style.css";

export default class Header extends SmpReact.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header className="wrapper">
        <div class="box">
          <img className="logo" src={imgsrc} alt=""/>
          <div class="textWrapper">
            <div className="leftTitle">SmpReact</div>
            <div className="tips">powered by SmpReact</div>
          </div>
        </div>
        <div className="buttons">
          <div className={(this.props.page === 0 ? 'active' : '')+' title pointer'}
               onClick={() => this.props.setPage(0)}>Counter
          </div>
          <div className={(this.props.page === 1 ? 'active' : '')+' title pointer'}
               onClick={() => this.props.setPage(1)}>TodoList
          </div>
        </div>
      </header>
    );
  }
}