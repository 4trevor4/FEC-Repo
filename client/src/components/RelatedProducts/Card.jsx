import React from 'react';
import { Async } from 'react-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // // image: this.props.image
      productInfo: this.props.productInfo,
      category: this.props.productInfoCategory,
      name: this.props.productInfoName,
      price: this.props.productInfoPrice,
      rating: '★★★☆☆',
      isLoaded: false
    };
  }

  componentDidMount() {
    this.updateState();
  }
  updateState() {
    // removed for brevity, doing some calculations here
    // based on some data that is stored in Redux and is
    // passed here as props.

    this.setState({
      productInfo: this.props.productInfo,
      category: this.props.productInfoCategory,
      name: this.props.productInfoName,
      price: this.props.productInfoPrice,
      rating: '★★★☆☆',
      isLoaded: true
    });
  }



  render() {
    if (this.state.isLoaded) {
      const data = this.props.productInfo;
      console.log('CARD INFO ==== INFO ==== INFO ', data);
      return (
        <div className="related-category">{this.props.productInfoCategory}
          <div className='card-itself'>
            <img
              className='default-image'
              // src={this.props.productInfo.url}
              alt={this.props.productInfoName}
            />
          </div>
          <div className="related-name">{this.props.productInfoName}</div>
          <div className="related-price">${this.props.productInfoPrice}</div>
          <div className="related-rating">★★★☆☆</div>
          <br></br>
        </div>
      );

    } else {
      return <></>;
    }

  }

}

export default Card;