import React from "react";

export default class Content extends React.Component {
  constructor(props) {
    super(props);

    this.toggleLabClosed = this.toggleLabClosed.bind(this);
    this.togglePopupShow = this.togglePopupShow.bind(this);
    this.toggleOptionState = this.toggleOptionState.bind(this);
    this.closeLib = this.closeLib.bind(this);

    this.data = [
      {
        date_short: "Сегодня",
        date_full: "Понедельник, 12 октября",
        place: "Коворкинг",
        building: "Кронверкский пр, 49",
        room: "511",
        title: "Мастерская дизайна",
        teacher: "Заблоцкая Светлана",
        beginning: "18:00",
        ending: "20:00"
      },
      {
        date_short: "Завтра",
        date_full: "Вторник, 13 октября",
        place: "Коворкинг",
        building: "Кронверкский пр, 49",
        room: "511",
        title: "Мастерская организации быта (Мастерская Хозяюшек)",
        teacher: "Толстоба Надежда",
        beginning: "20:00",
        ending: "21:00"
      },
    ];

    this.options = [
      {
        img: "light",
        title: "Свет",
        id: 0,
        states: {
          on: "Включен",
          off: "Выключен"
        }
      },
      {
        img: "window",
        title: "Окна",
        id: 1,
        states: {
          on: "Открыты",
          off: "Закрыты"
        }
      },
      {
        img: "power",
        title: "Розетки",
        id: 2,
        states: {
          on: "Включены",
          off: "Выключены"
        }
      }
    ]

    this.state = {
      closed: false,
      popup: false,
      activeOptions: [1,2]
    }
  }

  toggleLabClosed() {
    this.setState({
      closed: !this.state.closed
    });
  }

  togglePopupShow() {
    this.setState({
      popup: !this.state.popup
    })
  }

  closeLib() {
    if (this.state.activeOptions.length === 0) {
      this.setState({
        closed: true,
        popup: false
      });
    } else {
      this.togglePopupShow();
    }
  }

  toggleOptionState(e) {
    const index = +e.target.dataset.index;
    let activeStates = [...this.state.activeOptions];

    if (activeStates.indexOf(index) === -1) {
      activeStates.push(index);
    } else {
      activeStates = activeStates.filter(elem => elem !== index);
    }

    console.log(activeStates);

    this.setState({
      activeOptions: activeStates
    });
  }

  render() {
    return (
      <div className="homepage--content">

        <section className="homepage--content--top">

          <div className="homepage--content--top--row homepage--content--top--title">
            <h2>Мои ближайшие события</h2>
            <img src="/assets/icons/Homepage/Calandar.svg" alt="Calendar"/>
          </div>

          <div className="homepage--content--top--row homepage--content--top--schedule">
            <div className="homepage--content--top--schedule--inner">

              {this.data.map(elem => (
                <div className="homepage--content--top--schedule--block" key={this.data.indexOf(elem)}>
                  <div className="homepage--content--top--schedule--block--top">
                    <h3>{elem.date_short}</h3>
                    <h3>{elem.date_full}</h3>
                  </div>

                  <div className="homepage--content--top--schedule--block--bottom">
                    <div className="homepage--content--top--schedule--block--row row">

                      <span className="homepage--content--top--schedule--block--place">
                        {elem.place}
                      </span>

                      <div className="homepage--content--top--schedule--block--location">
                        <img src="/assets/icons/Homepage/location.svg" alt="Location"/>
                        <span>{elem.building}</span>
                      </div>

                      <span className="homepage--content--top--schedule--block--room">
                        {`ауд. ${elem.room}`}
                      </span>
                    </div>

                    <div className="homepage--content--top--schedule--block--row row">
                      <div className="homepage--content--top--schedule--block--col homepage--content--top--schedule--block--time">
                        <h2>{elem.beginning}</h2>
                        <h2>{elem.ending}</h2>
                      </div>
                      <div className="homepage--content--top--schedule--block--col homepage--content--top--schedule--block--time">
                        <h2>{elem.title}</h2>
                        <span>
                          <img src="/assets/icons/Homepage/user.svg" alt="User"/>
                          {elem.teacher}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>

        </section>
        <section className="homepage--content--bottom">
          <button
            className={`homepage--content--bottom--button homepage--content--bottom--button--${this.state.closed ? "closed" : "opened"} transitioned`}
            disabled={this.state.closed ? true : ""}
            onClick={this.togglePopupShow}
          >
            {this.state.closed ? 'Лаборатория закрыта' : 'Закрыть лабораторию'}
          </button>
        </section>

        <div className={`responsible--popup--add responsible--popup--add--${this.state.popup ? "active" : ""} transitioned homepage--popup homepage--popup--${this.state.popup ? "active" : ""}`}>
          <h2 className="responsible--popup--add--title">
            Новый инструктор
          </h2>

          <div className="homepage--popup--options">
            {this.options.map(elem => (
              <div className="homepage--popup--option" key={elem.id} data-index={elem.id} onClick={this.toggleOptionState}>
                <div data-index={elem.id}>
                  <img src={`/assets/icons/Homepage/Popup/${elem.img}.svg`} alt={elem.title} data-index={elem.id}/>
                  <span className="homepage--popup--option--title" data-index={elem.id}>{elem.title}</span>
                </div>

                <span
                  className={`homepage--popup--option--status homepage--popup--option--status--${this.state.activeOptions.indexOf(elem.id) === -1 ? "inactive" : "active"}`}
                  data-index={elem.id}
                >
                  {this.state.activeOptions.indexOf(elem.id) === -1 ? `${elem.states.off}` : `${elem.states.on}`}
                </span>
              </div>
            ))}
          </div>

          <div className="responsible--popup--add--buttons">

            <button className="responsible--popup--add--buttons--decline" onClick={this.togglePopupShow}>
              Отменить
            </button>
            <button className="responsible--popup--add--buttons--accept" onClick={this.closeLib}>
              Подтвердить
            </button>

          </div>
        </div>

        {this.state.popup && <div className="responsible--popup--wrapper"/>}
      </div>
    );
  }

}