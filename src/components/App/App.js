import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import SetForm from "../SetForm/SetForm";
import ShowObject from "../ShowObject/ShowObject";
import ShowFormObject from "../ShowFormObject/ShowFormObject";
import { connect } from "react-redux";
import "./style.css";

function App({
  onGetLayersArr,
  layer,
  onUpdateLayer,
  childLayer,
  onUpdateChildLayer,
  onClearChildLayer,
  childLayersArr,
  onUpdateChildLayersArr,
  onClearChildLayersArr
}) {
  const [isFetchCalled, setIsFetchCalled] = useState(false); // Состояние уже загруженных слоев, если нет то загрузить если да то не надо, инче появлялся постоянный рендер слоев
  const url = "http://localhost:3000/layers";
  if (!isFetchCalled) {
    fetch(url)
      .then(response => response.json())
      .then(layersArr => onGetLayersArr(layersArr))
      .catch(err => alert("Ошибка загрузки слоев " + err));
    setIsFetchCalled(true); // ф-ия остановки постоянного запроса данных
  }

  const [isShowedProperties, setIsShowedProperties] = useState(false);
  const [areShowedOutputAreas, setAreShowedOutputAreas] = useState(false);
  const [workingWithChildLayer, setWorkingWithChildLayer] = useState(false);
  const [shouldAddChildLayer, setShouldAddChildLayer] = useState(false);

  const creatingChildLayer = event => {
    if (event.target.classList.contains("btnInitialLayer")) {
      setWorkingWithChildLayer(false);
    } else if (event.target.classList.contains("btnChildLayer")) {
      setWorkingWithChildLayer(true);
    }
    return;
  };

  const handleLayerSelect = event => {
    try {
      //Загрузка основного слоя
      getRequredLayer();
      async function getRequredLayer() {
        let response = await fetch(
          `http://localhost:3000/layers/configs/${
            event.target.options[event.target.value].dataset.id
          }`
        );
        let requiredLayer = await response.json();
        onUpdateLayer(requiredLayer);

        //Загрузка childLayers из основного слоя
        onClearChildLayersArr();
        requiredLayer.childLayers.map(id => {
          downloadChildLayer(id);
        });

        setAreShowedOutputAreas(true);
      }
    } catch (err) {
      alert("Произошла ошибка: ", err);
    }
  };
  function downloadChildLayer(id) {
    fetch(`http://localhost:3000/layers/configs/${id}`)
      .then(response => response.json())
      .then(layer => {
        onUpdateChildLayersArr(layer);
      })
      .catch(err =>
        alert(
          "Ошибка загрузки childLayers to childLayersArr --> GetChildLayersList " +
            err
        )
      );
  }

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
    onUpdateChildLayer(childLayersArr[event.target.value]);
  };
  const handleChildLayerInput = event => {
    onUpdateChildLayer({
      name: event.target.value,
      id: "userChildLayerId",
      childLayers: [],
      objects: {}
    });
    return;
  };

  const collectObjects = event => {
    if (
      event.target.dataset.name === "childLayerSelect" ||
      event.target.dataset.name === "addChildLayerInput"
    )
      return;

    let name = event.target.dataset.property;
    let buffer = {};
    if (event.target.type === "checkbox") {
      buffer[name] = event.target.checked;
    } else {
      buffer[name] = event.target.value;
    }

    if (workingWithChildLayer) {
      onUpdateChildLayer(
        Object.assign(childLayer, {
          objects: { ...childLayer.objects, ...buffer }
        })
      );
    } else {
      onUpdateLayer(
        Object.assign(layer, { objects: { ...layer.objects, ...buffer } })
      );
    }
    setAreShowedOutputAreas(true);
  };

  const [isHiddenAddLayerContainer, setIsHiddenAddLayerContainer] = useState(
    true
  );
  const [isHiddenSelectLayer, setIsHiddenSelectLayer] = useState(false);
  async function btnSendClick(event) {
    event.preventDefault();

    let sendMethod, url, data;
    //Если работаем с чайлдовым слоем, то готовим его к отправке
    if (workingWithChildLayer) {
      data = childLayer;
      if (childLayer.id === "userChildLayerId") {
        sendMethod = "POST";
        url = "http://localhost:3000/layers/configs";
      } else {
        sendMethod = "PUT";
        url = `http://localhost:3000/layers/configs/${childLayer.id}`;
      }
      //Если с основным то готовим layer
    } else {
      data = layer;
      if (layer.id === "userId") {
        sendMethod = "POST";
        url = "http://localhost:3000/layers/configs";
      } else {
        //надо добавить разрешение на запрос изменения данных на сервере
        sendMethod = "PUT";
        url = `http://localhost:3000/layers/configs/${layer.id}`;
      }
    }

    try {
      await fetch(url, {
        method: sendMethod,
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(data)
      });
      alert("Успешно");
      setIsFetchCalled(false); // нужно отрендерить новый список доступных слоев
      onClearChildLayer(); // Для обнуления childLayer при отправке на сервер
    } catch (e) {
      alert(`Ошибка ${e}`);
    } finally {
      setIsHiddenAddLayerContainer(true);
      setIsHiddenSelectLayer(false);
      setAreShowedOutputAreas(false);
      setIsShowedProperties(false);
    }
  }

  return (
    <div className="appDiv">
      <SetForm
        btnSendClick={btnSendClick}
        setIsShowedProperties={setIsShowedProperties}
        isShowedProperties={isShowedProperties}
        areShowedOutputAreas={areShowedOutputAreas}
        setAreShowedOutputAreas={setAreShowedOutputAreas}
        isHiddenAddLayerContainer={isHiddenAddLayerContainer}
        isHiddenSelectLayer={isHiddenSelectLayer}
        setIsHiddenAddLayerContainer={setIsHiddenAddLayerContainer}
        setIsHiddenSelectLayer={setIsHiddenSelectLayer}
        creatingChildLayer={creatingChildLayer}
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
        {areShowedOutputAreas && <ShowObject />}
        {areShowedOutputAreas && <ShowFormObject layerStyle={layer.objects} />}
      </div>
    </div>
  );
}

export default connect(
  state => ({
    layersArr: state.layers,
    layer: state.layer,
    childLayersBuffer1: state.childLayersBuffer,
    childLayer: state.childLayer,
    childLayersArr: state.childLayersArr
  }),
  dispatch => ({
    onGetLayersArr(layersArr) {
      dispatch({ type: "GET_LAYERS", payload: layersArr });
    },
    onUpdateLayer(layer) {
      dispatch({ type: "UPDATE_LAYER", payload: layer });
    },
    onUpdateChildLayer(childLayer) {
      dispatch({ type: "UPDATE_CHILD_LAYER", payload: childLayer });
    },
    onClearChildLayer() {
      dispatch({ type: "CLEAR_CHILD_LAYER" });
    },
    onUpdateChildLayersArr(elem) {
      dispatch({ type: "UPDATE_ARR", payload: elem });
    },
    onClearChildLayersArr() {
      dispatch({ type: "CLEAR_ARR" });
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
