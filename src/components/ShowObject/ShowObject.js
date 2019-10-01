import React, { useState } from "react";

export default function ShowObject({ resObj }) {
  const divStyle = {
    border: "3px solid #eee",
    borderRadius: "15px",
    margin: "0 0px",
    padding: "10px",
    boxSizing: "border-box",
    wordWrap: "break-word",
    width: "350px"
  };
  const [arr, setArr] = useState([]);
  // const arr = [];
  let strStyle = "";
  const showObj = () => {
    for (let prop in resObj) {
      for (let key in resObj[prop].style) {
        strStyle += ` ${key}: ${resObj[prop].style[key]}, `;
      }
      setArr([
        ...arr,
        <p key={resObj[prop].id}>
          {`${prop} - id: ${resObj[prop].id}, style: {${strStyle}} `}
        </p>
      ]);
      strStyle = "";
      // arr.push(`${resObj[prop]}: ${prop},`);
    }
  };
  return (
    <div style={divStyle}>
      <button className="btn btn-primary" onClick={showObj}>
        refresh
      </button>
      {arr}
    </div>
  );
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
