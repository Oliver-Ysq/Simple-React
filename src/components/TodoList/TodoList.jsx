import SmpReact from "../../SmpReact/SmpReact";
import "./style.css";

export default class TodoList extends SmpReact.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
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

  handleAdd = () => {
    /*  箭头函数中的this相当于应用了闭包。
    *   由于箭头函数中没有this，所以在声明时绑定了this为所在词法环境中的this。
    *   this指向了组件实例。
    * */
    console.log(this);
    let res = window.prompt('请输入待办事项');
    if (res === null || res === "") return;
    else {
      let list = this.props.list;
      list.unshift({content: res, id: new Date().valueOf()});
      this.props.setList(list);
    }
  };

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
        <div className="newItem" onClick={this.handleAdd}>添加</div>
      </div>
    );
  }
}