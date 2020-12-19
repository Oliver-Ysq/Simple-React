import SmpReact from "./src/SmpReact/SmpReact";
import "./App.css";
import Header from "./src/components/Header/Header";
import Footer from "./src/components/Footer/Footer";
import Counter from "./src/components/Counter/Counter";
import TodoList from "./src/components/TodoList/TodoList";

export default class App extends SmpReact.Component {
  constructor() {
    super();
    this.state = {
      n: 0,
      list: [{content: "周末去爬山！", id: 0, done: false}, {content: "周五收拾房间！", id: 1, done: false}],

      page: 0,
    };

    this.setN = (newN) => {this.setState({n: newN});};
    this.setPage = (newPage) => {this.setState({page: newPage});};
    this.setList = (newList) => {this.setState({list: newList});};

  };

  render() {
    return (
      <div className="page">
        <Header setPage={(n) => this.setPage(n)} page={this.state.page}/>
        <main>
          <Counter className={this.state.page === 1 ? 'none' : ''} setN={(n) => {this.setN(n);}} n={this.state.n}/>
          <TodoList className={this.state.page === 0 ? 'none' : ''} list={this.state.list} setList={this.setList}/>
        </main>
        <Footer/>
      </div>
    );
  }
}