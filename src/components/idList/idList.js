import React from "react";

function IdList({ idList }) {
  const list = idList.map((item, index) => {
    return (
      <option
        key={item.id ? item.id : index * Math.random() * 10}
        value={index}
        data-id={item.id}
      >
        {" "}
        {/*надо допилить, в индекс как ключ не пойдет*/}
        {item.name}
      </option>
    );
  });
  return (
    <select
      className="custom-select mr-sm-2"
      data-name="layerSel"
      id="layerSel"
    >
      {list}
    </select>
  );
}
export default IdList;
