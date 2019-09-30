import React from "react";

function IdList({ idList }) {
  // const [idList, setIdList] = useState([
  //   { id: 1, text: "layer 1" },
  //   { id: 2, text: "layer 2" },
  //   { id: 3, text: "layer 3" },
  //   { id: 4, text: "layer 4" }
  // ]);
  const list = idList.map((item, index) => {
    return (
      <option key={item.id} value={index}>
        {item.text}
      </option>
    );
  });
  return (
    <select className="custom-select mr-sm-2" data-name="layerSel">
      {list}
    </select>
  );
}
export default IdList;
