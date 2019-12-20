import React from 'react';

export default class ReviewStars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStar: props.selectedStar,
      hoveredStar: props.selectedStar,
      hover: false,
    };
  }

  hoverUpdate = (hoveredStar) => {
    this.setState({hover: true, hoveredStar });
  }

  updateRating = (rating) => {
    this.props.updateRating(rating);
    this.setState({ selectedStar: rating });
  }

  returnStars = () => {
    const { hover, hoveredStar, selectedStar } = this.state;
    // const { updateRating } = this.props;
    let one;
    let two;
    let three;
    let four;
    let five;

    if (!hover) {
      one = (selectedStar >= 1) ? "checked" : "";
      two = (selectedStar >= 2) ? "checked" : "";
      three = (selectedStar >= 3) ? "checked" : "";
      four = (selectedStar >= 4) ? "checked" : "";
      five = (selectedStar >= 5) ? "checked" : "";
    }

    if (hover) {
      one = (hoveredStar >= 1) ? "checked" : "";
      two = (hoveredStar >= 2) ? "checked" : "";
      three = (hoveredStar >= 3) ? "checked" : "";
      four = (hoveredStar >= 4) ? "checked" : "";
      five = (hoveredStar >= 5) ? "checked" : "";
    }

    return (
      <div className="stars">
        <span 
          className={`fa fa-star ${one}`}
          onClick={() => this.updateRating(1)}
          onMouseOver={() => this.hoverUpdate(1)}
          onMouseOut={() => this.setState({ hover: false })}
        >
        </span>

        <span 
          className={`fa fa-star ${two}`}
          onClick={() => this.updateRating(2)}
          onMouseOver={() => this.hoverUpdate(2)}
          onMouseOut={() => this.setState({ hover: false })}
          >
        </span>

        <span 
          className={`fa fa-star ${three}`}
          onClick={() => this.updateRating(3)}
          onMouseOver={() => this.hoverUpdate(3)}
          onMouseOut={() => this.setState({ hover: false })}
        >
        </span>

        <span 
          className={`fa fa-star ${four}`}
          onClick={() => this.updateRating(4)}
          onMouseOver={() => this.hoverUpdate(4)}
          onMouseOut={() => this.setState({ hover: false })}
        >
        </span>

        <span 
          className={`fa fa-star ${five}`}
          onClick={() => this.updateRating(5)}
          onMouseOver={() => this.hoverUpdate(5)}
          onMouseOut={() => this.setState({ hover: false })}
        >
        </span>
      </div>
    )
  }

  render() {
    return this.returnStars(this.props.store);
  }
}