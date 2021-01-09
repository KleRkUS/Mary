import React from "react";
import Header from "../Header";
import Content from "./components/Content";

import "../../styles/homepage.less";

export default class Homepage extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <Header location={this.props.location}/>

        <section className="page--content">
          <Content/>
        </section>
      </div>
    );
  }


}