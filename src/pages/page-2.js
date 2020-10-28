import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

function HeadList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number, index) => {
    return <td key={index}>{index + 1}</td>;
  });
  return (
    <tr>
      <th>{}</th>
      {listItems}
      <td>{}</td>
    </tr>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  let sum = 0;
  const listItems = numbers.map((number, index) => {
    number = number | 0;
    sum += number;
    return <td key={index}>{number}</td>;
  });
  return (
    <tr>
      <th>E</th>
      {listItems}
      <td>{sum}</td>
    </tr>
  );
}

function SalList(props) {
  const numbers = props.numbers;
  let cals = [];
  let sum = 0;

  let pre_numbers = props.pre_numbers;
  let new_numbers = pre_numbers.concat(numbers);

  numbers.forEach((number, index) => {
    let subsum = 0;
    subsum += new_numbers[index + pre_numbers.length - 1] | 0;
    subsum += new_numbers[index + pre_numbers.length - 2] | 0;
    subsum += new_numbers[index + pre_numbers.length - 3] | 0;
    
    let average = subsum / 3;
    let prefix = 0;
    
    number = number | 0;
    if (number < 0) {
      prefix = 0;
    } else if (number < 2000) {
      prefix = 0.1;
    } else {
      prefix = 0.2;

      switch (true) {
        case (average < 2000):
          // console.log('below 2000');
          break;
        case (average < 5000):
          prefix += average / 1000 * 0.05;
          break;
        case (average < 40000):
          prefix = 0.45;
          prefix += (average - 5000) / 20000;
          break;
        case (average < 50000):
          prefix = 2.2;
          prefix += (average - 40000) / 40000;
          break;
        default:
          // console.log('over 50000');
          prefix = 2.45;
          break;
      }
    }

    let cal = Math.round(number * prefix);
    cals.push(<td key={index}>{cal}</td>);
    sum += cal;
  });

  return (
    <tr>
      <td>S</td>
      {cals}
      <td>{sum}</td>
    </tr>
  );
}

export default class SecondPage extends React.Component {
  state = {
    numbers: [2000, 5000, 10000],
    pre_numbers: [],
    show_pre: false
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value.split(",")
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    console.log(this.state.numbers);
  }

  toggleShow = event => {
    event.preventDefault()
    
    this.setState({
      "show_pre": !this.state.show_pre
    })

    if (this.state.show_pre) {
      event.target.innerHTML = "+"
    } else {
      event.target.innerHTML = "-"
    }
  }

  render() {
    return (
      <Layout>
        <SEO title="Page two" />
        <h1>Hi from the second page</h1>
        <p>Welcome to page 2</p>

        <form onSubmit={this.handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            {/* Data: */}
            <input
              type="text"
              name="numbers"
              value={this.state.numbers}
              onChange={this.handleInputChange}
              style={{ width: "100%" }}
            />
          </div>
          {/* <button type="submit">Update</button> */}
          <a 
            href="/#"
            onClick={this.toggleShow}
            style={{ textDecoration: "none", marginRight: "10px" }}
          >
            +
          </a>
          {this.state.show_pre &&
            <label style={{ marginBottom: "10px" }}>
              <input
                type="text"
                name="pre_numbers"
                value={this.state.pre_numbers}
                onChange={this.handleInputChange}
                style={{ maxWidth: "200px" }}
              />
            </label>
          }
        </form>

        <table style={{ marginBottom: "80px" }}>
          <thead>
            <HeadList numbers={this.state.numbers} />
          </thead>
          <tbody>
            <NumberList numbers={this.state.numbers} />
            <SalList numbers={this.state.numbers} pre_numbers={this.state.pre_numbers} />
          </tbody>
        </table>

        <Link to="/">Go back to the homepage</Link>
      </Layout>
    );
  }
}
