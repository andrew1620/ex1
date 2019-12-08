import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import SetForm from "../SetForm/SetForm";
import ShowObject from "../ShowObject/ShowObject";
import ShowFormObject from "../ShowFormObject/ShowFormObject";
import { connect } from "react-redux";
import "./style.css";

function App({ onGetLayersArr, layer, onUpdateLayer }) {
  const [isFetchCalled, setIsFetchCalled] = useState(false); // Состояние уже загруженных слоев, если нет то загрузить если да то не надо, инче появлялся постоянный рендер слоев
  const url = "http://localhost:3000/layers";
  if (!isFetchCalled) {
    fetch(url)
      .then(response => response.json())
      .then(layersArr => onGetLayersArr(layersArr))
      .catch(err => alert("Ошибка загрузки слоев " + err));
    setIsFetchCalled(true); // ф-ия остановки постоянного запроса данных
  }

  const [p, setP] = useState(<p></p>); //Состояние абзаца, в котором выводится объект для просмотра
  const [isShowedProperties, setIsShowedProperties] = useState(false);
  const [areShowedOutputAreas, setAreShowedOutputAreas] = useState(false);
  const [workingWithChildLayer, setWorkingWithChildLayer] = useState(false);
  const [requiredChildLayer, setRequiredChildLayer] = useState({});
  const [addChildLayerInputValue, setAddChildLayerInputValue] = useState("");
  const [addChildLayerInputStyle, setAddChildLayerInputStyle] = useState({});
  const [shouldAddChildLayer, setShouldAddChildLayer] = useState(false);

  const [layerObjects, setLayerObjects] = useState({});

  const creatingChildLayer = event => {
    if (event.target.classList.contains("btnInitialLayer")) {
      setWorkingWithChildLayer(false);
      // console.log(
      //   "from creating Layer---workingwith childLayer: ",
      //   workingWithChildLayer
      // );
    } else if (event.target.classList.contains("btnChildLayer")) {
      setWorkingWithChildLayer(true);
      // console.log(
      //   "from creating Layer---workingwith childLayer: ",
      //   workingWithChildLayer
      // );
    }
    return;
  };

  //Нажатие на селект выбора слоя
  const handleLayerSelect = event => {
    try {
      getRequredLayer();
      async function getRequredLayer() {
        let response = await fetch(
          `http://localhost:3000/layers/configs/${
            event.target.options[event.target.value].dataset.id
          }`
        );
        let requiredLayer = await response.json();
        onUpdateLayer(requiredLayer);

        // showObj();
        setAreShowedOutputAreas(true);
      }
    } catch (err) {
      alert("Произошла ошибка: ", err);
    } finally {
      showObj();
    }
  };

  const handleAddLayerInput = event => {
    setIsShowedProperties(true);
    onUpdateLayer({
      name: event.target.value,
      id: "userId",
      childLayers: [],
      objects: {}
    });
    return;
  };
  const handleChildLayerSelect = event => {
    // fetch(
    //   `http://localhost:3000/layers/configs/${event.target.options[event.target.value].dataset.id}`
    // )
    //   .then(response => response.json())
    //   .then(childLayer =>
    //     setRequiredChildLayer(Object.assign({}, childLayer))
    //   )
    //   .catch(err => alert("Произошла ошибка: " + err));
    // return;

    // Временно, пока не настроен сервер
    const index = event.target.value;
    setRequiredChildLayer(Object.assign(layer.childLayers[index]));
    // console.log("from childLayerSelect---", requiredChildLayer);
    return;
  };
  const handleChildLayerInput = event => {
    setAddChildLayerInputValue(event.target.value);
    setRequiredChildLayer({
      name: event.target.value,
      id: "userChildLayer",
      objects: {}
    });
    return;
  };

  const collectObjects = event => {
    const objectsBuffer = workingWithChildLayer
      ? Object.assign({}, requiredChildLayer.objects)
      : Object.assign({}, layer.objects);

    let name = event.target.dataset.property;
    if (event.target.type === "checkbox") {
      objectsBuffer[name] = event.target.checked;
    } else {
      objectsBuffer[name] = event.target.value;
      onUpdateLayer(Object.assign(layer, { objects: objectsBuffer }));
    }

    // if (workingWithChildLayer) {
    //   setRequiredChildLayer(
    //     Object.assign(requiredChildLayer, { objects: objectsBuffer })
    //   );
    // } else {
    //   onUpdateLayer(Object.assign(layer, { objects: objectsBuffer }));
    // }
    setAreShowedOutputAreas(true);
    showObj();
  };

  // const saveChanges = event => {
  //   //Отслеживаем нажатие ненужных кнопок
  //   if (
  //     event.target.dataset.name === "btnSend" ||
  //     event.target.dataset.name === "createLayerRef" ||
  //     event.target.dataset.name === "btnCancel" ||
  //     event.target.dataset.name === "amountChildLayersHref" ||
  //     event.target.dataset.name === "layerSel"
  //   ) {
  //     event.preventDefault();
  //     return;
  //   }

  //   //Создаем времен. перемнную св-в, для сохранения старых значений и доброски новых в layer.objects
  //   const objectsBuffer = workingWithChildLayer
  //     ? Object.assign({}, requiredChildLayer.objects)
  //     : Object.assign({}, layer.objects);

  //   //Отслеживаем нажатие на чекбокс, нужно для установки true/false вместо on/''
  //   if (event.target.type === "checkbox") {
  //     objectsBuffer[event.target.dataset.property] = event.target.checked;
  //     // После отмены флажка fill все fill-свойства удаляются из объекта
  //     if (objectsBuffer[event.target.dataset.property] === false) {
  //       for (let prop in objectsBuffer) {
  //         if (
  //           prop === "fill" ||
  //           prop === "fillColor" ||
  //           prop === "fillOpacity" ||
  //           prop === "fillRule"
  //         )
  //           delete objectsBuffer[prop];
  //       }
  //     }
  //   } else if (event.target.type === "text") {
  //     //Если не написали св-во оно удаляется (иначе будет пустое)
  //     event.target.value === ""
  //       ? delete objectsBuffer[event.target.dataset.property]
  //       : (objectsBuffer[event.target.dataset.property] = event.target.value);
  //   } else objectsBuffer[event.target.dataset.property] = event.target.value; //Докидываем новые св-ва во временную перемн. стилей
  //   //после выбора слоя (только после выбора слоя, если не выбирать, такое св-во не появляется) в стилях появляется св-во с пустым ключом, эта строка удаляет пустой ключ из style
  //   if ("" in objectsBuffer || "undefined" in objectsBuffer) {
  //     delete objectsBuffer[""];
  //     delete objectsBuffer["undefined"];
  //   }
  //   //В layer забрасывается св-ва из второго аргумента (объекта), а там у ключа style значение - объект с новыми и старыми стилями
  //   if (workingWithChildLayer) {
  //     setRequiredChildLayer(
  //       Object.assign(requiredChildLayer, { objects: objectsBuffer })
  //     );
  //   } else {
  //     onUpdateLayer(Object.assign(layer, { objects: objectsBuffer }));
  //     // console.log("from endOfSaveChanges --- ", layer);
  //   }
  //   setAreShowedOutputAreas(true);

  //   // вызов ф-ии вывода готового абзаца в showObject
  //   showObj();
  //   // console.log("конец saveChanges");
  // };

  //Ф-ия вывода свойств набранного объекта справа в рамке
  const showObj = () => {
    let strObjects = "";
    for (let key in layer.objects) {
      strObjects += ` ${key}: ${layer.objects[key]}, `;
    }
    const pList = layer.childLayers.map(item => {
      let strChildObjects = "";
      for (let key in item.objects) {
        strChildObjects += ` ${key}: ${item.objects[key]}, `;
      }
      return (
        <p key={Date().now}>
          <b>name:</b> {item.name}
          <br /> <b>id:</b> {item.id}
          <br /> <b>objects:</b> {strChildObjects}
        </p>
      );
    });
    setP(
      <p style={{ fontFamily: "Arial" }}>
        <div style={{ textAlign: "center", margin: 0 }}>Intial layer</div>
        <hr style={{ margin: 0 }} />
        <b>name:</b> {layer.name}
        <br />
        <b>id:</b> {layer.id}
        <br />
        <b>objects:</b> {strObjects}
        {layer.childLayers.length !== 0 && (
          <div style={{ textAlign: "center", margin: "15px 0 0 0" }}>
            Child layers
            <hr style={{ margin: 0 }} />
          </div>
        )}
        {pList}
      </p>
    );
  };

  const btnSaveChildLayer = event => {
    if (event.target.tagName === "BUTTON") event.preventDefault();

    //Проверка на пустой childLayer
    if (Object.keys(requiredChildLayer.objects).length === 0) return;
    checkSameChildLayer();
    onUpdateLayer(
      Object.assign(layer, {
        childLayers: [...layer.childLayers, requiredChildLayer]
      })
    );
    setWorkingWithChildLayer(false);
    document.querySelector(".btnChildLayer").classList.remove("active");
    document.querySelector(".btnInitialLayer").classList.add("active");

    //ф-ия проверки одинаковых childLayers
    function checkSameChildLayer() {
      const childLayersArr = layer.childLayers;
      let index = "initial";
      for (let i = 0; i < childLayersArr.length; i++) {
        if (childLayersArr[i].name === requiredChildLayer.name) {
          index = i;
          break;
        }
      }
      if (index !== "initial") {
        childLayersArr.splice(index, 1);
        onUpdateLayer(Object.assign(layer, { childLayers: childLayersArr }));
      } else return;
    }

    // console.log("from btnSaveChildLayer - layer--- ", layer);
  };

  const [isHiddenAddLayerContainer, setIsHiddenAddLayerContainer] = useState(
    true
  );
  const [isHiddenSelectLayer, setIsHiddenSelectLayer] = useState(false);
  async function btnSendClick(event) {
    event.preventDefault();
    let sendMethod, url;
    if (layer.id === "userId") {
      sendMethod = "POST";
      url = "http://localhost:3000/layers/configs";
    } else {
      //надо добавить разрешение на запрос изменения данных на сервере
      sendMethod = "PUT";
      url = `http://localhost:3000/layers/configs/${layer.id}`;
    }

    try {
      await fetch(url, {
        method: sendMethod,
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(layer)
      });
      alert("Успешно");
      setIsFetchCalled(false); // нужно отрендерить новый список доступных слоев
    } catch (e) {
      alert(`Ошибка ${e}`);
    } finally {
      setIsHiddenAddLayerContainer(true);
      setIsHiddenSelectLayer(false);
      setAreShowedOutputAreas(false);
      setIsShowedProperties(false);
    }
  }

  const showFillProperty = event => {
    //Открытие доп. свойств при нажатии на fill
    if (event.target.tagName === "INPUT") {
      event.target.parentElement.parentElement.nextElementSibling.hidden = !event
        .target.parentElement.parentElement.nextElementSibling.hidden;
    }
  };

  return (
    <div className="appDiv">
      <SetForm
        // saveChanges={saveChanges}
        btnSendClick={btnSendClick}
        showFillProperty={showFillProperty}
        setIsShowedProperties={setIsShowedProperties}
        isShowedProperties={isShowedProperties}
        areShowedOutputAreas={areShowedOutputAreas}
        setAreShowedOutputAreas={setAreShowedOutputAreas}
        isHiddenAddLayerContainer={isHiddenAddLayerContainer}
        isHiddenSelectLayer={isHiddenSelectLayer}
        setIsHiddenAddLayerContainer={setIsHiddenAddLayerContainer}
        setIsHiddenSelectLayer={setIsHiddenSelectLayer}
        creatingChildLayer={creatingChildLayer}
        btnSaveChildLayer={btnSaveChildLayer}
        addChildLayerInputValue={addChildLayerInputValue}
        setAddChildLayerInputValue={setAddChildLayerInputValue}
        addChildLayerInputStyle={addChildLayerInputStyle}
        shouldAddChildLayer={shouldAddChildLayer}
        setShouldAddChildLayer={setShouldAddChildLayer}
        workingWithChildLayer={workingWithChildLayer}
        setWorkingWithChildLayer={setWorkingWithChildLayer}
        handleLayerSelect={handleLayerSelect}
        handleAddLayerInput={handleAddLayerInput}
        handleChildLayerSelect={handleChildLayerSelect}
        handleChildLayerInput={handleChildLayerInput}
        collectObjects={collectObjects}
      />

      <div className="outputAreas">
        {areShowedOutputAreas && <ShowObject p={p} />}
        {areShowedOutputAreas && <ShowFormObject layerStyle={layer.objects} />}
      </div>
    </div>
  );
}

export default connect(
  state => ({
    layersArr: state.layers,
    layer: state.layer,
    childLayersBuffer1: state.childLayersBuffer
  }),
  dispatch => ({
    onGetLayersArr(layersArr) {
      dispatch({ type: "GET_LAYERS", payload: layersArr });
    },
    onUpdateLayer(layer) {
      dispatch({ type: "UPDATE_LAYER", payload: layer });
    }
  })
)(App);

// //Проверка на пустое поле addChildLayerInput
// if (
//   addChildLayerInputValue === "" &&
//   workingWithChildLayer &&
//   shouldAddChildLayer
// ) {
//   setAddChildLayerInputStyle({ outline: "1px solid red" });
//   return;
// } else {
//   setAddChildLayerInputStyle({ outline: "none" });
// }
