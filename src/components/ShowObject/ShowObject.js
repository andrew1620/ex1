import React from "react";

export default function ShowObject({ resObj }) {
  const divStyle = {
    border: "3px solid red",
    margin: "0 5px",
    padding: "10px",
    boxSizing: "border-box",
    height: "300px"
  };
  // const [arr, setArr] = useState([]);
  const arr = [];
  for (let prop in resObj) {
    // setArr([...arr, `${resObj[prop]}: ${prop},`]);
    arr.push(`${resObj[prop]}: ${prop},`);
  }
  return <div style={divStyle}>{arr}</div>;
}

// class ShowObject extends React.Component {
//   constructor() {
//     super();
//     this.state = { arr: [] };
//   }

//   render() {
//     const divStyle = {
//       border: "3px solid red",
//       margin: "0 5px",
//       padding: "10px",
//       boxSizing: "border-box",
//       height: "300px",
//       width: "300px"
//     };
//     // const [arr, setArr] = useState([]);
//     for (let prop in this.props.resObj) {
//       // setArr([...arr, `${resObj[prop]}: ${prop},`]);
//       // this.state.arr.push(`${this.props.resObj[prop]}: ${prop},`);
//       this.setState({
//         arr: [...this.state.arr, `${this.props.resObj[prop]}: ${prop},`]
//       });
//     }
//     return <div style={divStyle}>{this.state.arr}</div>;
//   }
// }
// export default ShowObject;
