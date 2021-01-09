import React from "react";

import "../../../../styles/instructors.less";

import {instructors} from "../../../../consts";

export default class Instructors extends React.Component {
  constructor(props) {
    super(props);

    this.removeUser = this.removeUser.bind(this);
    this.togglePopupShow = this.togglePopupShow.bind(this);
    this.addUser = this.addUser.bind(this);

    this.state = {
      popup: false,
      data: [...instructors]
    }
  }

  removeUser(e) {
    e.preventDefault();
    e.stopPropagation();
    const data = [...this.state.data];
    data.splice(+e.target.dataset.index, 1);

    this.setState({
      data: data
    });
  }

  redirectToInstructor(e) {
    const index = +e.target.dataset.index;
    location.replace(`/instructor/${index}`)
  }

  togglePopupShow() {
    this.setState({
      popup: !this.state.popup
    })
  }

  addUser() {
    const data = [...this.state.data],
          name = document.querySelector("#responsible--popup--add--input").value;

    if (name.length > 0) {
      data.push({name: name});
    }

    this.setState({
      data: data,
      attributes: []
    });
    this.togglePopupShow();
  }

  render() {
    const {data} = this.state;

    return(
      <div className="instructors--content">

        <div className="instructors--content--top">
          <h2 className="page--content--title">
            Список инструкторов
          </h2>

          <div className="instructors--content--list">
            <div className="instructors--content--list--inner">

              {data.map(elem => (
                <div className="edit--user--block" key={data.indexOf(elem)} data-index={data.indexOf(elem)} onClick={this.redirectToInstructor}>
                  <h2 data-index={data.indexOf(elem)}>{elem.name}</h2>
                  <img src="/assets/icons/Edit/cross.svg" alt="&#10006;" data-index={data.indexOf(elem)} onClick={this.removeUser}/>
                </div>
              ))}

            </div>
          </div>
        </div>

        <div className="instructors--content--bottom">
          <button className="responsible--content--bottom--button responsible--content--bottom--button--second" onClick={this.togglePopupShow}>
            <img src="/assets/icons/Edit/plus.svg" alt="+"/>
            Добавить инструктора
          </button>
        </div>

        <div className={`responsible--popup--add responsible--popup--add--${this.state.popup ? "active" : ""} transitioned`}>
          <h2 className="responsible--popup--add--title">
            Новый инструктор
          </h2>

          <input type="text" className="responsible--popup--add--input" placeholder="Начните вводить имя" id="responsible--popup--add--input"/>

          <div className="responsible--popup--add--buttons">

            <button className="responsible--popup--add--buttons--decline" onClick={this.togglePopupShow}>
              Отменить
            </button>
            <button className="responsible--popup--add--buttons--accept" onClick={this.addUser}>
              Подтвердить
            </button>

          </div>
        </div>

        {this.state.popup && <div className="responsible--popup--wrapper"/>}

      </div>
    );
  }
}