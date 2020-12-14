import SmpReact from "./src/SmpReact/SmpReact";
import "./App.css";
import Header from "./src/components/Header/Header";
import Footer from "./src/components/Footer/Footer";
import Counter from "./src/components/Counter/Counter";

export default class App extends SmpReact.Component {
  constructor() {
    super();
    this.state = {
      n: 0,
      interval: null,
      flag: true,
      disabled: false
    };

    this.calc = (type) => {
      switch (type) {
        case 0:
          this.setState({n: this.state.n + 1});
          break;
        case 1:
          this.setState({n: this.state.n - 1});
          break;
        case 2:
          this.setState({n: 2 * this.state.n});
          break;
        case 3:
          this.setState({n: 0});
          break;
        default:
          throw new Error();
      }
    };

    this.setInterval = () => {
      if (!this.state.flag) return false;
      const that = this;
      this.setState({
        disabled: true,
        interval: setInterval(() => {
          that.setState({
            n: that.state.n + 1
          });
        }, 1000),
        flag: false
      });
    };

    this.clearInterval = () => {
      if (this.state.flag === false) {
        clearInterval(this.state.interval);
        window.alert("定时器已关闭");
      }
      this.setState({
        flag: true,
        interval: null,
        disabled: false
      });
    };

  }

  render() {
    return (
      <div className="page">
        <Header/>
        <main>
          <Counter disabled={this.state.disabled} n={this.state.n} interval={this.state.interval}
                   add={() => this.calc(0)} minus={() => this.calc(1)}
                   mult={() => this.calc(2)}
                   clear={() => this.calc(3)} setInterval={() => this.setInterval()}
                   clearInterval={() => this.clearInterval()}/>
        </main>
        <Footer/>
      </div>
    );
  }
}