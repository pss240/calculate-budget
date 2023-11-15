import react, { Component } from 'react';
import './App.css';

export default class App extends Component {
  state = {
    title: '',
    money: 0,
    update: false,
    updateId: '',
    budget: 51200,
    calData: [
      {
        id: 1,
        title: "식비",
        money: 1200
      },
      {
        id: 2,
        title: "교통비",
        money: 50000
      }
    ]
  }

  handleInputData = () => {
    let newCalData = {
      id: Date.now(),
      title: this.state.title,
      money: this.state.money
    }
    this.setState({ calData: [...this.state.calData, newCalData], title: '', money: 0, budget: this.state.budget+Number(newCalData.money)});
  }
  handleChangeTitle = (e) => {
    this.setState({ title: e.target.value });
  }
  handleChangeMoney = (e) => {
    this.setState({ money: e.target.value });
  }
  handleChangeState = (id) => {
    let newcalData = this.state.calData.map((data) => {
      if (data.id === id) {
        this.setState({ title: data.title, money: data.money, update: true, updateId: id });
      }
      return data;
    })
  };
  handleUpdateData = () => {
    let newcalData = this.state.calData.map((data) => {
      if (data.id === this.state.updateId) {
        data.title = this.state.title
        data.money = this.state.money
      }
      return data;
    })
    this.setState({ calData: newcalData, title: '', money: 0, update: false });
    this.handleBudget()
  }
  handleDeleteData = (id) => {
    let minus = 0
    let newcalData = this.state.calData.filter(data => data.id !== id)
    let Data = this.state.calData.map((data) => {
      if (data.id === id) {
        minus = Number(data.money)
        return
      }
    });
    this.setState({ calData: newcalData,budget:this.state.budget-minus });
    this.handleBudget()

  }
  handleAllDelete = () => {
    this.setState({ calData: [] });
    this.handleBudget()
  }
  handleBudget = () => {
    let newBudget = 0;
    this.state.calData.map((data) => (
      newBudget = newBudget + Number(data.money)
    ))
    this.setState({ budget: newBudget })
  }

  render() {
    return (
      <div className="container">
        <div className="calculateBlock">
          <div className="title">예산 계산기</div>
          <div className="calListBlock">
            <div className="inputBlock">
              <div className="inputOne">
                <div>지출 항목</div>
                <input type="text" className="inputValueTitle" placeholder='예) 렌트비'
                  onChange={this.handleChangeTitle}
                  value={this.state.title}></input>
              </div>
              <div className="inputTwo">
                <div>비용</div>
                <input type="text" className="inputValueMoney"
                  value={this.state.money}
                  onChange={this.handleChangeMoney}></input>
              </div>
            </div>
            {this.state.update ? <button className="submitBtn" onClick={this.handleUpdateData}>수정</button> : <button className="submitBtn" onClick={this.handleInputData}>제출</button>}
            <div className="ListBlock">
              {
                this.state.calData.map((data) => (
                  <div key={data.id}>
                    <span>{data.title}</span>
                    <span>{data.money}</span>
                    <button onClick={() => this.handleChangeState(data.id)}>수정</button>
                    <button onClick={() => this.handleDeleteData(data.id)}>삭제</button>
                  </div>
                ))
              }
            </div>
            <button className="submitBtn" onClick={this.handleAllDelete}>목록 지우기</button>
          </div>
          {
            <div className="budgetResults">총 지출: {this.state.budget}원</div>
          }
        </div>
      </div>
    );
  }
}