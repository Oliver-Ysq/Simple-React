import SmpReact from "../../SmpReact/SmpReact";
import "./style.css"

export default class TodoList extends SmpReact.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="listWrapper">
        {this.props.list.map(v=><div>{v.content}</div>)}
      </div>
    );
  }
}