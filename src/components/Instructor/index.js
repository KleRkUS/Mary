import React from "react";

import {instructors, attributes} from "../../consts";
import "../../styles/instructor.less";

import Header from "../Header";
import Attribute from "./components/Attrubite";

export default class Instructor extends React.Component {
  constructor(props) {
    super(props);

    this.handleData = this.handleData.bind(this);
    this.onAttributeClick = this.onAttributeClick.bind(this);

    this.data = [...instructors];
    this.attributes = [...attributes];

    this.state = {
      user: this.data[this.props.match.params.index],
      activeAttributes: [],
      inactiveAttributes: []
    }
  }

  handleData() {
    let activeAttributes = [],
        inactiveAttributes = [];

    for (let attribute of this.attributes) {
      if (this.state.user.attributes && this.state.user.attributes.indexOf(this.attributes.indexOf(attribute)) !== -1)  {
        activeAttributes.push({
          attribute: attribute,
          index: this.attributes.indexOf(attribute)
        });
      } else {
        inactiveAttributes.push({
          attribute: attribute,
          index: this.attributes.indexOf(attribute)
        });
      }
    }

    return {activeAttributes, inactiveAttributes};
  }

  onAttributeClick(index) {
    let user = {...this.state.user};

    if (!user.attributes) {
      user.attributes = [index];
    } else if (user.attributes.indexOf(index) === -1) {
      user.attributes.push(index);
    } else {
      user.attributes = user.attributes.filter(elem => elem !== index);
      console.log(user);
    }

    this.setState({
      user: user
    });

    this.forceUpdate();
  }

  returnToInstructors() {
    location.replace("/edit/instructors");
  }

  render() {
    const {user} = this.state,
          data = this.handleData();

    return(
      <div>
        <Header location={{pathname:"/edit"}}/>

        <section className="page--content">

          <div className="instructor--content">

            <div className="instructor--content--top">
              <h2 className="page--content--title">
                {user.name}
              </h2>

              <div className="instructor--content--list">

                <div className="instructor--content--list--active">
                  <h3>Может проводить инструктаж:</h3>

                  {data.activeAttributes.length === 0 && <span className="instructor--content--list--empty">Пусто</span>}
                  <ul className="instructor--content--list--ul">
                    {data.activeAttributes.map(elem => (
                      <li className="instructor--content--list--li" key={data.activeAttributes.indexOf(elem)}>
                        <Attribute
                          status="active"
                          index={elem.index}
                          title={elem.attribute.title}
                          img={elem.attribute.img}
                          onAttributeClick={this.onAttributeClick}
                        />
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="instructor--content--list--inactive">
                  <h3>Разрешить проводить инструктаж:</h3>

                  {data.inactiveAttributes.length === 0 && <span className="instructor--content--list--empty">Пусто</span>}
                  <ul className="instructor--content--list--ul">
                    {data.inactiveAttributes.map(elem => (
                      <li className="instructor--content--list--li" key={data.inactiveAttributes.indexOf(elem)}>
                        <Attribute
                          status="inactive"
                          index={elem.index}
                          title={elem.attribute.title}
                          img={elem.attribute.img}
                          onAttributeClick={this.onAttributeClick}
                        />
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>

            <div className="isntructor--content--bottom">
              <div className="instructor--content--buttons">
                <button className="instructor--content--button instructor--content--button--decline" onClick={this.returnToInstructors}>
                  Отмена
                </button>

                <button className="instructor--content--button instructor--content--button--accept" onClick={this.returnToInstructors}>
                  Сохранить
                </button>
              </div>
            </div>

          </div>

        </section>
      </div>
    );
  }

}