import SmpReact from "../../SmpReact/SmpReact";
import "./style.css";

export default class TodoList extends SmpReact.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
  }

  componentDidMount() {
    console.log('todoList Mount！');
  }

  handleFinish(e) {
    let {list} = this.props;
    let len = list.length, newList = [], finishItem;
    for (let i = 0; i < len; i++) {
      if (parseInt(list[i].id) === parseInt(e.target.id)) {
        if (list[i].done === true) return;
        list[i].done = true;
        finishItem = list[i];
      } else newList.push(list[i]);
    }
    newList.push(finishItem);
    this.props.setList(newList);
  }

  handleDelete(e) {
    this.props.setList(this.props.list.filter(v => parseInt(v.id) !== parseInt(e.target.id)));
  }

  render() {
    return (
      <div className="listWrapper todoWrapper">
        {this.props.list.map(v => {
          return (
            <div key={v.id} className="card">
              <div className={(v.done ? 'finish-text' : '') + " card-content"}>
                {v.content}
              </div>
              <div className="card-btn">
                <button className="finish-btn" id={v.id} onClick={this.handleFinish}>完成</button>
                <button className="del-btn" id={v.id} onClick={this.handleDelete}>删除</button>
              </div>
            </div>
          );
        })}
        <div className="newItem">添加</div>
      </div>
    );
  }
}