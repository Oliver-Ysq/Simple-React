import SmpReact from "../../SmpReact/SmpReact";
import "./style.css";

export default class Footer extends SmpReact.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <footer>
        <div className="txt">Oliver-ysq</div>
        <div className="txt"><a target="_blank" href="https://github.com/Oliver-Ysq">https://github.com/Oliver-Ysq</a>
        </div>
      </footer>);
  }
}