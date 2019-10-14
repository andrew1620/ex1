import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import SetForm from "../SetForm/SetForm";
import ShowObject from "../ShowObject/ShowObject";
import ShowFormObject from "../ShowFormObject/ShowFormObject";
import Tooltip from "../Tooltip/Tooltip";

function App() {
  const [idList, setIdList] = useState([
    { id: 1, text: "layer 1" },
    { id: 2, text: "layer 2" },
    { id: 3, text: "layer 3" },
    { id: 4, text: "layer 4" }
  ]);

  // const url = "http://localhost:3000/layers";
  // const request = new XMLHttpRequest();
  // request.open("GET", url, false);
  // request.send();
  // console.log(request.response);

  const [layer, setLayer] = useState({}); //Состояние слоя: готовый слой со стилями
  const addLayer = event => {
    event.preventDefault();

    setIdList([
      ...idList,
      { text: event.target.previousSibling.value, id: "userId" }
    ]);
    // let selectLayer = document.querySelector("#root div form select"); //Вся эта хрень, чтобы при задании нового слоя он автоматически выбирался в селекте, так ее допилить решается проблема с id
    // //Чтобы сначала добавил в массив а потом назначил selected, иначе устанавливается предпоследний т.к. не успевает отрендериться
    // setTimeout(() => {
    //   //не пашет, на странице последний эл-т появляется, а в массиве его еще нет
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
    //Отслеживаем нажатие ненужных кнопок
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
      styleBuffer[event.target.dataset.property] = event.target.checked;
      // После отмены флажка fill все fill-свойства удаляются из объекта
      if (styleBuffer[event.target.dataset.property] === false) {
        for (let prop in styleBuffer) {
          if (
            prop === "fill" ||
            prop === "fillColor" ||
            prop === "fillOpacity" ||
            prop === "fillRule"
          )
            delete styleBuffer[prop];
        }
      }
    } else if (event.target.type === "text") {
      //Если не написали св-во оно удаляется (иначе будет пустое)
      event.target.value === ""
        ? delete styleBuffer[event.target.dataset.property]
        : (styleBuffer[event.target.dataset.property] = event.target.value);
    } else styleBuffer[event.target.dataset.property] = event.target.value; //Докидываем новые св-ва во временную перемн. стилей
    //после выбора слоя (только после выбора слоя, если не выбирать, такое св-во не появляется) в стилях появляется св-во с пустым ключом, эта строка удаляет пустой ключ из style
    if ("" in styleBuffer) delete styleBuffer[""];
    //В layer забрасывается св-ва из второго аргумента (объекта), а там у ключа style значение - объект с новыми и старыми стилями
    setLayer(Object.assign(layer, { style: styleBuffer }));

    // console.log(layer);
    // вызов ф-ии вывода готового абзаца в showObject
    showObj();
  };

  //Ф-ия вывода свойств набранного объекта справа в рамке
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

  const showFillProperty = event => {
    //Открытие доп. свойств при нажатии на fill
    if (event.target.tagName === "INPUT") {
      event.target.parentElement.parentElement.nextElementSibling.hidden = !event
        .target.parentElement.parentElement.nextElementSibling.hidden;
    }
  };

  const [tooltipProps, setTooltipProps] = useState({});
  const showTooltip = event => {
    if (event.target.dataset.tooltip) {
      setTooltipProps({
        positionLeft: event.clientX,
        positionTop: event.clientY,
        tooltipText: event.target.dataset.tooltip
      });
      // alert(event.clientX);
    } else return;
  };

  return (
    <div
      style={{
        margin: "10px auto",
        display: "flex",
        // flexWrap: "wrap",
        justifyContent: "center",
        width: "70%"
      }}
    >
      <SetForm
        idList={idList}
        saveChanges={saveChanges}
        btnSendClick={btnSendClick}
        addLayer={addLayer}
        // showToolTip={showToolTip}
        showFillProperty={showFillProperty}
        showTooltip={showTooltip}
      />
      <div>
        <ShowObject p={p} />
        <ShowFormObject layerStyle={layer.style} />
      </div>
      {/* <Tooltip tooltipProps={tooltipProps} /> */}
    </div>
  );
}

export default App;
