import React from "react";

import Header from "../Header";
import Responsible from "./components/Responsible";
import Instructors from "./components/Instructors";

export default class Edit extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <Header location={{pathname: "/edit"}}/>

        <section className="page--content">
          {this.props.match.params.type === "responsible" && <Responsible/>}
          {this.props.match.params.type === "instructors" && <Instructors/>}
        </section>
      </div>
    );
  }
}