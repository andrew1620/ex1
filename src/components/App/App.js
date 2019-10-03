import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import SetForm from "../SetForm/SetForm";
import ShowObject from "../ShowObject/ShowObject";

function App() {
  const [idList, setIdList] = useState([
    { id: 1, text: "layer 1" },
    { id: 2, text: "layer 2" },
    { id: 3, text: "layer 3" },
    { id: 4, text: "layer 4" }
  ]);

  const [layer, setLayer] = useState({}); //Состояние слоя: готовый слой со стилями
  const addLayer = event => {
    event.preventDefault();
    setIdList([
      ...idList,
      { id: "userLayer", text: event.target.previousSibling.value }
    ]);
    // let selectLayer = document.querySelector("#root div form select");
    //Чтобы сначала добавил в массив а потом назначил selected, иначе устанавливается предпоследний т.к. не успевает отрендериться
    // setTimeout(() => {//не пашет, еще нет последний эл-т не добавленный
    //   selectLayer.options[selectLayer.options.length - 1].selected = true;
    //   setLayer(
    //     Object.assign(layer, {
    //       name: idList[idList.length - 1].text,
    //       style: {}
    //     })
    //   );
    //   console.log(idList);
    // });
  };

  const [p, setP] = useState(<p></p>); //Состояние абзаца, в котором выводится объект для просмотра
  const saveChanges = event => {
    if (
      event.target.dataset.name === "btnSend" ||
      event.target.dataset.name === "btnAddLayer" ||
      event.target.dataset.name === "addLayerInput"
    ) {
      event.preventDefault();
      return;
    }
    //Отслеживание нажатия на селект выбора слоя
    if (event.target.dataset.name === "layerSel") {
      setLayer(
        Object.assign(layer, {
          name: idList[event.target.value].text,
          id: idList[event.target.value].id,
          style: {}
        })
      );
      return;
    }
    //Проверка: если пропустили выбор слоя, берется первый из списка
    if (!("name" in layer)) {
      setLayer(
        Object.assign(layer, {
          name: idList[0].text,
          id: idList[0].id,
          style: {}
        })
      );
    }

    //Создаем времен. перемнную св-в, для сохранения старых значений и доброски новых в layer.style
    const styleBuffer = Object.assign({}, layer.style);
    //Отслеживаем нажатие на чекбокс, нужно для установки true/false вместо on/''
    if (event.target.type === "checkbox") {
      styleBuffer[event.target.id] = event.target.checked;
    } else if (event.target.type === "text") {
      //Если не написали св-во оно удаляется (иначе будет пустое)
      event.target.value === ""
        ? delete styleBuffer[event.target.id]
        : (styleBuffer[event.target.id] = event.target.value);
    } else styleBuffer[event.target.id] = event.target.value; //Докидываем новые св-ва во временную перемн. стилей
    //после выбора слоя (только после выбора слоя, если не выбирать такое св-во не появляется) в стилях появляется св-во с пустым ключом, эта строка удаляет пустой ключ из style
    if ("" in styleBuffer) delete styleBuffer[""];
    //В layer забрасывается св-ва из второго аргумента (объекта), а там у ключа style значение - объект с новыми и старыми стилями
    setLayer(Object.assign(layer, { style: styleBuffer }));

    // вызов ф-ии вывода готового абзаца в showObject
    showObj();
  };

  //Ф-ия вывода набранного объекта справа в рамке
  const showObj = () => {
    let strStyle = "";
    for (let key in layer.style) {
      strStyle += ` ${key}: ${layer.style[key]}, `;
    }
    setP(
      <p style={{ fontFamily: "Arial" }}>
        <b>name:</b> {layer.name}, <b>id:</b> {layer.id}, <b>style:</b>{" "}
        {`{${strStyle}}`}
      </p>
    );
  };

  const btnSendClick = event => {
    //Обработчик нажатия на кнопку Отправить
    event.preventDefault();
  };

  const showToolTip = event => {
    const targetCoords = event.target.getBoundingClientRect();
    let p = event.target.parentElement.querySelector(".addLayerTooltip");
    p.style.display = "inline-block";
    p.style.left = targetCoords.left + event.target.offsetWidth / 2 + "px";
    p.style.top = targetCoords.bottom + 5 + "px";
    p.style.opacity = 1;
    setTimeout(() => (p.style.display = "none"), 1500);
  };

  return (
    <div
      style={{
        margin: "10px auto",
        display: "flex",
        justifyContent: "center",
        width: "70%"
      }}
    >
      <SetForm
        idList={idList}
        saveChanges={saveChanges}
        btnSendClick={btnSendClick}
        addLayer={addLayer}
        showToolTip={showToolTip}
      />
      <ShowObject p={p} />
    </div>
  );
}

export default App;
