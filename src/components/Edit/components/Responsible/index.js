import React from "react";

import "../../../../styles/responsible.less";

function removeA(arr) {
  var what, a = arguments, L = a.length, ax;
  while (L > 1 && arr.length) {
    what = a[--L];
    while ((ax= arr.indexOf(what)) !== -1) {
      arr.splice(ax, 1);
    }
  }
  return arr;
}

export default class Responsible extends React.Component {
  constructor(props) {
    super(props);

    this.getUsersFromData = this.getUsersFromData.bind(this);
    this.togglePopupShow = this.togglePopupShow.bind(this);
    this.addUser = this.addUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.toggleType = this.toggleType.bind(this);

    this.state = {
      type: 1,
      popup: false,
      data: {
        1621900800000: [
          "Воробьев Александр",
          "Пуляев Владимир",
          "Мирошниченко Владислав",
          "Грибоедов Сергей",
          "Юхно Родион",
          "Процюк Ярослава"
        ],
        1609286400000: [
          "Петров Михаил",
          "Полюшкин Егор",
          "Смирнов Ярослав",
          "Прощук Екатерина"
        ],
        1593129600000: [
          "Михайлов Стас",
          "Петухова Елена",
          "Евдакимов Алексей"
        ],
        1609286400001: [
          "Петров Михаил",
          "Полюшкин Егор",
          "Смирнов Ярослав",
          "Прощук Екатерина"
        ],
      }
    }

    this.times = [1621900800000, 1609286400000, 1593129600000];
  }

  getUsersFromData() {
    let arr = [];

    const data = {...this.state.data};

    for (let key of Object.keys(data)) {
      if ((key > Date.now() && this.state.type) || (key <= Date.now() && !this.state.type)) {
        arr.push(data[key]);
      }
    }

    return arr;
  }

  getZeroedDate(int) {
    return int >= 10 ? int : `0${int}`;
  }

  togglePopupShow() {
    this.setState({
      popup: !this.state.popup
    });
  }

  addUser() {
    const newUser = document.querySelector("#responsible--popup--add--input").value,
          users = {...this.state.data};

    if (newUser) {
      for (let key of Object.keys(users)) {
        if (key > Date.now()) users[key].push(newUser);
      }
    }

    this.togglePopupShow();

    this.setState({
      data: users
    })
  }

  removeUser(e) {
    const key = +e.target.dataset.time,
          user = e.target.dataset.user,
          data = {...this.state.data};

    removeA(data[this.times[key]], data[this.times[key]].find(elem => elem === user));

    this.setState({
      data: data
    });
  }

  toggleType() {
    this.setState({
      type: !this.state.type
    })
  }

  render() {
    const users = this.getUsersFromData();

    return (
        <div className="responsible--content">
          <div className="responsible--content--top">
            <h2 className="page--content--title">
              {this.state.type ? "Список ответственных" : "Просроченные права ответственных"}
            </h2>

            <div className={`responsible--content--blocks responsible--content--blocks--${this.state.type ? "active" : "inactive"}`}>
              <div className={`responsible--content--blocks--inner`}>
                {Object.keys(users).map(elem => (
                  <div className="bordered--content" key={Object.keys(users).indexOf(elem)}>
                    <div className="bordered--content--inner">
                      <div className="expires--date">
                        <span>Действительно до</span>
                        <span className="expires--date--date">
                          {`${this.getZeroedDate(new Date(elem).getDay())}.${this.getZeroedDate(new Date(elem).getMonth() + 1)}.${new Date(elem).getFullYear()}`}
                        </span>
                      </div>

                      {users[elem].map(user => (
                        <div className="edit--user--block" key={users[elem].indexOf(user)}>
                          <h2>{user}</h2>
                          <img src="/assets/icons/Edit/cross.svg" alt="&#10006;" data-time={elem} data-user={user} onClick={this.removeUser}/>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="responsible--content--bottom">
            <button className="responsible--content--bottom--button responsible--content--bottom--button--first" onClick={this.toggleType}>
              {this.state.type ? "Посмотреть просроченные" : "Вернуться назад"}
            </button>
            {this.state.type && <button className="responsible--content--bottom--button responsible--content--bottom--button--second" onClick={this.togglePopupShow}>
              <img src="/assets/icons/Edit/plus.svg" alt="+"/>
              Добавить ответственного
            </button>}
          </div>

          <div className={`responsible--popup--add responsible--popup--add--${this.state.popup ? "active" : ""} transitioned`}>
            <h2 className="responsible--popup--add--title">
              Новый ответственный
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