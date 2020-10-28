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
      <th></th>
      {listItems}
      <td>S</td>
    </tr>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  let sum = 0;
  const listItems = numbers.map((number, index) => {
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

  numbers.forEach((number, index) => {
    let subsum = 0;
    subsum += numbers[index-1] | 0;
    subsum += numbers[index-2] | 0;
    subsum += numbers[index-3] | 0;

    let average = subsum / 3;
    let prefix = 0;

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

const numbers = [2000, 5000, 10000];

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>

    <table>
      <thead>
        <HeadList numbers={numbers} />
      </thead>
      <tbody>
        <NumberList numbers={numbers} />
        <SalList numbers={numbers} />
      </tbody>
    </table>

    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
