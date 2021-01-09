import React from "react";


export default class Content extends React.Component {
  constructor(props) {
    super(props);

    this.toggleLabClosed = this.toggleLabClosed.bind(this);

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
    ]

    this.state = {
      closed: false
    }
  }

  toggleLabClosed() {
    this.setState({
      closed: !this.state.closed
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
            onClick={this.toggleLabClosed}
          >
            {this.state.closed ? 'Лаборатория закрыта' : 'Закрыть лабораторию'}
          </button>
        </section>

      </div>
    );
  }

}