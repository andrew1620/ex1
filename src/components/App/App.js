import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import SetForm from "../SetForm/SetForm";
import ShowObject from "../ShowObject/ShowObject";
import ShowFormObject from "../ShowFormObject/ShowFormObject";
import Tooltip from "../Tooltip/Tooltip";

function App() {
  const url = "http://localhost:3000/layers";

  const [idList, setIdList] = useState([]);
  try {
    fetch(url)
      .then(response => response.json())
      .then(data => setIdList(data));
  } catch (e) {
    console.log("Ошибка при получении списка слоев", e);
  }
  // async function getLayerList() { //Пример получения через async await, может понадобиться когда нужно будет обработать выбор слоя (при создании нового сразу отправлять на сервер и перерендерить селект, тогда он вернется с id и уже будет в списке и можно будет добавить автоматический выбор в селекте)
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   setIdList(data);
  // }
  // getLayerList();

  const [layer, setLayer] = useState({}); //Состояние слоя: готовый слой со стилями
  const addLayer = event => {
    event.preventDefault();

    setIdList([
      ...idList,
      {
        name: event.target.previousSibling.value,
        id: "userId",
        childLayers: []
      }
    ]);
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
      if (idList[event.target.value].id !== "userId") {
        let requiredLayer;
        async function getRequredLayer() {
          let response = await fetch(
            `http://localhost:3000/layers/configs/${event.target.options[event.target.value].dataset.id}`
          );
          requiredLayer = await response.json();
          Object.assign(layer, requiredLayer);
        }
        getRequredLayer();
      } else {
        setLayer(
          Object.assign(layer, {
            name: idList[event.target.value].name,
            id: idList[event.target.value].id,
            objects: idList[event.target.value].style || {}
          })
        );
      }
      return;
    }

    if (!("name" in layer)) {
      let requiredLayer;
      async function getRequredLayer() {
        let response = await fetch(`http://localhost:3000/layers/configs/${0}`);
        requiredLayer = await response.json();
        // console.log(requiredLayer);
        Object.assign(layer, requiredLayer);
        setLayer(Object.assign(layer, requiredLayer));
      }
      getRequredLayer();
    }

    //Создаем времен. перемнную св-в, для сохранения старых значений и доброски новых в layer.style
    const objectsBuffer = Object.assign({}, layer.objects);

    //Отслеживаем нажатие на чекбокс, нужно для установки true/false вместо on/''
    if (event.target.type === "checkbox") {
      objectsBuffer[event.target.dataset.property] = event.target.checked;
      // После отмены флажка fill все fill-свойства удаляются из объекта
      if (objectsBuffer[event.target.dataset.property] === false) {
        for (let prop in objectsBuffer) {
          if (
            prop === "fill" ||
            prop === "fillColor" ||
            prop === "fillOpacity" ||
            prop === "fillRule"
          )
            delete objectsBuffer[prop];
        }
      }
    } else if (event.target.type === "text") {
      //Если не написали св-во оно удаляется (иначе будет пустое)
      event.target.value === ""
        ? delete objectsBuffer[event.target.dataset.property]
        : (objectsBuffer[event.target.dataset.property] = event.target.value);
    } else objectsBuffer[event.target.dataset.property] = event.target.value; //Докидываем новые св-ва во временную перемн. стилей
    //после выбора слоя (только после выбора слоя, если не выбирать, такое св-во не появляется) в стилях появляется св-во с пустым ключом, эта строка удаляет пустой ключ из style
    if ("" in objectsBuffer) delete objectsBuffer[""];
    //В layer забрасывается св-ва из второго аргумента (объекта), а там у ключа style значение - объект с новыми и старыми стилями
    setLayer(Object.assign(layer, { objects: objectsBuffer }));

    console.log(layer);
    // вызов ф-ии вывода готового абзаца в showObject
    showObj();
  };

  //Ф-ия вывода свойств набранного объекта справа в рамке
  const showObj = () => {
    let strObjects = "";
    for (let key in layer.objects) {
      strObjects += ` ${key}: ${layer.objects[key]}, `;
    }
    setP(
      <p style={{ fontFamily: "Arial" }}>
        <b>name:</b> {layer.name}, <b>id:</b> {layer.id}, <b>objects:</b>{" "}
        {`{${strObjects}}`}
      </p>
    );
  };

  async function btnSendClick(event) {
    event.preventDefault();
    let sendMethod, url;
    if (layer.id === "userId") {
      sendMethod = "PUT";
      url = "http://localhost:3000/layers/configs";
    } else {
      //надо добавить разрешение на запрос изменения данных на сервере
      sendMethod = "PUSH";
      url = `http://localhost:3000/layers/configs/${layer.id}`;
    }

    try {
      let response = await fetch(url, {
        method: sendMethod,
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(layer)
      });
      alert("Успешно");
    } catch (e) {
      alert(`Ошибка ${e}`);
    }
  }

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
        <ShowFormObject layerStyle={layer.objects} />
      </div>
      {/* <Tooltip tooltipProps={tooltipProps} /> */}
    </div>
  );
}

export default App;
