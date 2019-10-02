import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import SetForm from "../SetForm/SetForm";
import ShowObject from "../ShowObject/ShowObject";

function App() {
  const [idList] = useState([
    { id: 1, text: "layer 1" },
    { id: 2, text: "layer 2" },
    { id: 3, text: "layer 3" },
    { id: 4, text: "layer 4" }
  ]);

  const [layer, setLayer] = useState({});
  const [p, setP] = useState(<p></p>);
  const saveChanges = event => {
    if (event.target.dataset.name === "btnSend") {
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
    // if (event.target.tagName === "INPUT") event.target.value = ""; //Удаление написанного текста в инпуте, если нужно - откомментировать

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
      />
      <ShowObject p={p} />
    </div>
  );
}

export default App;
