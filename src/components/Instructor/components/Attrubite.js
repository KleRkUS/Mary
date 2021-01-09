import React from "react";

import "../../../styles/attribute.less";

export default class Attribute extends React.Component {
  constructor(props) {
    super(props);

    this.onAttributeClick = this.onAttributeClick.bind(this);
  }

  onAttributeClick() {
    this.props.onAttributeClick(+this.props.index);
  }

  onAttributeRemove() {
    this.props.onAttributeRemove(+this.props.index);
  }

  render() {
    const {title, img, status} = this.props;

    return(
      <div className={`attribute attribute--${status}`} onClick={this.onAttributeClick}>
        <img src={`/assets/icons/Attributes/${img}_${status}.svg`} alt={title}/>
        <span className={`attribute--title attribute--title--${status}`} onClick={this.onAttributeRemove}>{title}</span>
      </div>
    );
  }

}