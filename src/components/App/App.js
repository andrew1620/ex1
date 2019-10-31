import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import SetForm from "../SetForm/SetForm";
import ShowObject from "../ShowObject/ShowObject";
import ShowFormObject from "../ShowFormObject/ShowFormObject";
import { connect } from "react-redux";

function App({ layersArr, onAddLayer, onGetLayersArr }) {
  const [isFetchCalled, setIsFetchCalled] = useState(false); // Состояние уже загруженных слоев, если нет то загрузить если да то не надо, инче появлялся постоянный рендер слоев
  const url = "http://localhost:3000/layers";
  if (!isFetchCalled) {
    fetch(url)
      .then(response => response.json())
      .then(layersArr => onGetLayersArr(layersArr))
      .catch(err => alert("Ошибка загрузки слоев " + err));
    setIsFetchCalled(true);
  }

  const [layer, setLayer] = useState({}); //Состояние слоя: готовый слой со стилями

  const addLayer = event => {
    event.preventDefault();
    onAddLayer({
      name: event.target.previousSibling.value,
      id: "userId",
      childLayers: []
    });
  };

  const [p, setP] = useState(<p></p>); //Состояние абзаца, в котором выводится объект для просмотра
  const [isShowedProperties, setIsShowedProperties] = useState(false);
  const [areShowedOutputAreas, setAreShowedOutputAreas] = useState(false);
  const [childLayersBuffer, setChildLayersBuffer] = useState([]);
  const [isCreatingChildLayer, setIsCreatingChildLayer] = useState(false); //состояние редактируем основной слой или потомок
  const [workingWithChildLayer, setWorkingWithChildLayer] = useState(false);
  const [requiredChildLayer, setRequiredChildLayer] = useState({});
  const [newChildLayer, setNewChildLayer] = useState({});

  const creatingChildLayer = e => {
    if (e.target.className === "btnInitialLayer") {
      setWorkingWithChildLayer(false);
      console.log(workingWithChildLayer);
    } else if (e.target.className === "btnChildLayer") {
      setWorkingWithChildLayer(true);
      console.log(workingWithChildLayer);
    } else return;
  };

  const saveChanges = event => {
    //Отслеживаем нажатие ненужных кнопок
    if (
      event.target.dataset.name === "btnSend" ||
      event.target.dataset.name === "createLayerRef" ||
      event.target.dataset.name === "btnCancel" ||
      // event.target.dataset.name === "childLayerSelect" ||
      event.target.dataset.name === "amountChildLayersHref"
    ) {
      event.preventDefault();
      return;
    }
    //Отслеживание нажатия на селект выбора слоя
    if (event.target.dataset.name === "layerSel") {
      let requiredLayer;
      async function getRequredLayer() {
        let response = await fetch(
          `http://localhost:3000/layers/configs/${event.target.options[event.target.value].dataset.id}`
        );
        requiredLayer = await response.json();
        Object.assign(layer, requiredLayer);

        if (layer.childLayers.length !== 0)
          setChildLayersBuffer(layer.childLayers);
      }
      // console.log(layer);
      getRequredLayer();
      return;
    }

    if (event.target.dataset.name === "addLayerInput") {
      setIsShowedProperties(true);
      setLayer(
        Object.assign(layer, {
          name: event.target.value,
          id: "userId",
          childLayers: [],
          objects: {}
        })
      );
      return;
    }

    if (event.target.dataset.name === "childLayerSelect") {
      fetch(
        `http://localhost:3000/layers/configs/${event.target.options[event.target.value].dataset.id}`
      )
        .then(response => response.json())
        .then(childLayer =>
          setRequiredChildLayer(Object.assign({}, childLayer))
        )
        .catch(err => alert("Произошла ошибка: " + err));
      return;
    }

    if (event.target.dataset.name === "addChildLayerInput") {
      setRequiredChildLayer({
        name: event.target.value,
        id: "userChildLayer",
        objects: {}
      });
      return;
    }

    //Создаем времен. перемнную св-в, для сохранения старых значений и доброски новых в layer.style
    const objectsBuffer = workingWithChildLayer
      ? Object.assign({}, requiredChildLayer.objects)
      : Object.assign({}, layer.objects);
    // console.log("objectBuffer ------", objectsBuffer);
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
    workingWithChildLayer
      ? setRequiredChildLayer(
          Object.assign(requiredChildLayer, { objects: objectsBuffer })
        )
      : setLayer(Object.assign(layer, { objects: objectsBuffer }));

    setAreShowedOutputAreas(true);
    // вызов ф-ии вывода готового абзаца в showObject
    showObj();
  };

  //состояние селекта childLayers
  const [
    isShowedChildLayersSelectContainer,
    setIsShowedChildLayersSelectContainer
  ] = useState(true);
  //состояние инпута и кнопки добавления childLayer
  const [
    isShowedAddChildLayerContainer,
    setIsShowedAddChildLayerContainer
  ] = useState(true);

  const showChildLayersSelect = () => {
    if (childLayersBuffer.length !== 0)
      setIsShowedChildLayersSelectContainer(
        !isShowedChildLayersSelectContainer
      );
    else setIsShowedAddChildLayerContainer(!isShowedAddChildLayerContainer);
  };

  const addChildLayer = event => {
    setChildLayersBuffer([
      ...childLayersBuffer,
      {
        id: Math.random(),
        name: event.target.previousElementSibling.value,
        objects: {}
      }
    ]);
  };

  //Ф-ия вывода свойств набранного объекта справа в рамке
  const showObj = () => {
    let strObjects = "";
    let strChildObjects = "";
    for (let key in layer.objects) {
      strObjects += ` ${key}: ${layer.objects[key]}, `;
    }
    for (let key in requiredChildLayer.objects) {
      strChildObjects += `${key}: ${requiredChildLayer.objects[key]},`;
    }
    setP(
      <p style={{ fontFamily: "Arial" }}>
        <b>name:</b> {layer.name}, <b>id:</b> {layer.id},<b>objects:</b>{" "}
        {strObjects}
        <p>
          <b>name:</b> {requiredChildLayer.name}, <b>id:</b>{" "}
          {requiredChildLayer.id},<b>objects:</b> {strChildObjects}
        </p>
      </p>
    );
  };

  const btnSaveChildLayer = event => {
    event.preventDefault();
    setChildLayersBuffer([...childLayersBuffer, requiredChildLayer]);
    console.log("---", childLayersBuffer);
    setLayer(Object.assign(layer, { childLayers: childLayersBuffer }));
    console.log(layer);
  };

  const [isHiddenAddLayerContainer, setIsHiddenAddLayerContainer] = useState(
    true
  );
  const [isHiddenSelectLayer, setIsHiddenSelectLayer] = useState(false);
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
        layersArr={layersArr}
        saveChanges={saveChanges}
        btnSendClick={btnSendClick}
        addLayer={addLayer}
        showFillProperty={showFillProperty}
        setIsShowedProperties={setIsShowedProperties}
        isShowedProperties={isShowedProperties}
        areShowedOutputAreas={areShowedOutputAreas}
        setAreShowedOutputAreas={setAreShowedOutputAreas}
        childLayersBuffer={childLayersBuffer}
        showChildLayersSelect={showChildLayersSelect}
        addChildLayer={addChildLayer}
        isShowedChildLayersSelectContainer={isShowedChildLayersSelectContainer}
        setIsShowedChildLayersSelectContainer={
          setIsShowedChildLayersSelectContainer
        }
        isShowedAddChildLayerContainer={isShowedAddChildLayerContainer}
        setIsShowedAddChildLayerContainer={setIsShowedAddChildLayerContainer}
        isHiddenAddLayerContainer={isHiddenAddLayerContainer}
        isHiddenSelectLayer={isHiddenSelectLayer}
        setIsHiddenAddLayerContainer={setIsHiddenAddLayerContainer}
        setIsHiddenSelectLayer={setIsHiddenSelectLayer}
        setIsCreatingChildLayer={setIsCreatingChildLayer}
        creatingChildLayer={creatingChildLayer}
        btnSaveChildLayer={btnSaveChildLayer}
      />

      <div>
        {areShowedOutputAreas && <ShowObject p={p} />}
        {areShowedOutputAreas && <ShowFormObject layerStyle={layer.objects} />}
      </div>
      {/* <Tooltip tooltipProps={tooltipProps} /> */}
    </div>
  );
}

export default connect(
  state => ({
    layersArr: state.layers
  }),
  dispatch => ({
    onGetLayersArr(layersArr) {
      dispatch({ type: "GET_LAYERS", payload: layersArr });
    },
    onAddLayer(layer) {
      dispatch({ type: "ADD_LAYER", payload: layer });
    }
  })
)(App);
