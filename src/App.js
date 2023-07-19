import React, { Component } from 'react';
import './App.css';

class ExpenseTracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      amount: '',
      balance: 500,
    };
  }

  incrementValue = () => {
    const { amount, balance } = this.state;
    const parsedAmount = Number(amount);

    if (parsedAmount <= 0 || isNaN(parsedAmount)) {
      alert('Please enter a valid positive number.');
      return;
    }

    const newTransaction = {
      date: new Date().toISOString(),
      amount: parsedAmount,
      type: 'Add',
    };
    const newBalance = balance + parsedAmount;

    this.setState((prevState) => ({
      transactions: [...prevState.transactions, newTransaction],
      balance: newBalance,
      amount: '',
    }));
  };

  decrementValue = () => {
    const { amount, balance } = this.state;
    const parsedAmount = Number(amount);

    if (parsedAmount <= 0 || isNaN(parsedAmount)) {
      alert('Please enter a valid positive number.');
      return;
    }

    const newTransaction = {
      date: new Date().toISOString(),
      amount: parsedAmount,
      type: 'Remove',
    };
    const newBalance = balance - parsedAmount;

    if (newBalance < 0) {
      alert('Insufficient balance for this transaction.');
      return;
    }

    this.setState((prevState) => ({
      transactions: [...prevState.transactions, newTransaction],
      balance: newBalance,
      amount: '',
    }));
  };

  valueGiven = (event) => {
    this.setState({ amount: event.target.value });
  };

  render() {
    const { transactions, balance, amount } = this.state;

    return (
      <div className="bg-container">
        <h1>Expense Tracker - Basic</h1>
        <div className="numbers-container">
          <label>Balance: {balance}</label>
          <input
            type="number"
            id="numbers"
            name="quantity"
            min="0"
            step="1"
            onChange={this.valueGiven}
            value={amount}
          />
          <div>
            <button onClick={this.incrementValue}>Add</button>
            <button onClick={this.decrementValue}>Remove</button>
          </div>
        </div>
        <div className="transaction-container">
          <p>Transactions:</p>
          <ul>
            {transactions.map((transaction, index) => (
              <li key={index}>
                {transaction.date} - {transaction.amount} - {transaction.type}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ExpenseTracker;
