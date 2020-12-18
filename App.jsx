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
      list: [{content: "汽车", done: false}, {content: "写作业", done: false}],
      page: 0,
    };

    this.setN = (newN) => {
      this.setState({n: newN});
    };
    this.setPage = () => {
      this.setState({page: (this.state.page + 1) % 2});
    };

  };

  componentDidMount() {
    console.log('App mount');
  }

  render() {
    return (
      <div className="page">
        <Header/>
        <main>
          <Counter setN={(n) => {this.setN(n);}} n={this.state.n}/>
          <TodoList className="" list={this.state.list}/>
        </main>
        <Footer/>
      </div>
    );
  }
}