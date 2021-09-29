import React from 'react';
import './modals.css';
import ModalStars from './components/ModalStars.jsx';
import ModalCharacs from './components/ModalCharacs.jsx';
import ModalReviewBody from './components/ModalReviewBody.jsx';
import ModalUpload from './components/ModalUpload.jsx';
import HOC from '../../HOC/withInteractionApi.jsx';
import axios from 'axios';


class AddReviewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starClick: false,
      productID: Number(this.props.reviewsMeta.product_id),
      rating: '',
      summary: '',
      body: '',
      recommend: true,
      name: '',
      email: '',
      photos: [],
      photosForServer: [],
      photosObj: [],
      characteristics: ''
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onChangeHandler2 = this.onChangeHandler2.bind(this);
    this.starClick = this.starClick.bind(this);
    this.submitReviewHandler = this.submitReviewHandler.bind(this);
    this.photos = this.photos.bind(this);
  }

  onChangeHandler(key, value) {
    if (key && value) {
      let data = {};
      data[key] = value;
      this.setState( data );
    }
    this.props.sendInteraction('Write New Review');
  }

  onChangeHandler2(e) {
    let value = e.target.value;
    let key = e.target.name;
    if (key === 'recommend' && value === 'yes') {
      this.setState({ recommend: true });
    } else if (key === 'recommend' && value === 'no') {
      this.setState({ recommend: false });
    } else if (key && value) {
      let data = {};
      data[key] = value;
      this.setState( data );
    }
    this.props.sendInteraction('Write New Review');
  }

  starClick() {
    this.setState({ starClick: true });
  }

  submitReviewHandler(e) {
    console.log('===>', this.state.photosForServer);
    if (!this.state.starClick) {
      alert('please choose a star rating');
      event.preventDefault();
    } else {
      let S = this.state;
      const params = {
        // eslint-disable-next-line camelcase
        product_id: S.productID,
        rating: S.rating,
        summary: S.summary,
        body: S.body,
        recommend: S.recommend,
        name: S.name,
        email: S.email,
        photos: S.photosForServer,
        characteristics: S.characteristics
      };

      let postReview = this.props.formatBody(null, null, null, params);
      axios.post('/api/reviews', postReview.data)
        .then((results) => {
          console.log('Successful POST of Review'); event.preventDefault();

          let formData = new FormData();
          for (let imageFile of this.state.photosObj) {
            formData.append('photos', imageFile);
          }

          axios.post('/photos', formData)
            .then((results) => console.log('photo upload to server success'))
            .catch((err) => console.log('photo upload to server error', err));
        })
        .catch((err) => {
          console.log('Error while posting the Review');
          // event.preventDefault();
        });
      // event.preventDefault();
    }
    // event.preventDefault();
    this.props.show();
  }

  photos(blobPhoto, fail = false, photoShortName, photoObj) {
    if (fail) {
      let photosServer = this.state.photosForServer;
      let photosAPI = this.state.photos;
      let photosObjArr = this.state.photosObj;

      photosServer.pop();
      photosAPI.pop();
      photosObjArr.pop();

      this.setState({
        photosForServer: photosServer,
        photos: photosAPI,
        photosObj: photosObjArr
      });
    } else {
      let photosServer = this.state.photosForServer;
      let photosAPI = this.state.photos;
      let photosObjArr = this.state.photosObj;

      photosServer.push(photoShortName);
      photosAPI.push(blobPhoto);
      photosObjArr.push(photoObj);

      this.setState({
        photos: photosAPI,
        photosForServer: photosServer,
        photosObj: photosObjArr
      });
    }
  }



  render () {
    if (!this.props.show) { return null; }

    return (
      <div className="image-modal">
        <div className="image-modal-content">
          <div className="image-modal-header">
            <h4>Write Your Review</h4>
            <h5>About the {this.props.productName || 'product'}</h5>
          </div>

          <div className="image-modal-body">
            <form onSubmit={this.submitReviewHandler}>
              <label>Overall Rating* </label>
              <br></br>
              <ModalStars starClick={this.starClick} onChangeHandler={this.onChangeHandler}/>
              <br></br>
              <br></br>

              <label>Do you recommend this product?*</label>
              <br></br>
              <input type="radio" value="yes" name="recommend" onClick={this.onChangeHandler2} defaultChecked required/>
              <label>yes</label>
              <input type="radio" value="no" name="recommend" onClick={this.onChangeHandler2}/>
              <label>no</label>
              <br></br>
              <br></br>

              <label>Characteristics*</label>
              <br></br>
              <ModalCharacs reviewsMeta={this.props.reviewsMeta} onChangeHandler={this.onChangeHandler} characObj={{}}/>
              <br></br>

              <label>Review Summary*</label>
              <br></br>
              <textarea cols="60" rows="1" maxLength="60" placeholder="Example: Best purchase ever!" onChange={this.onChangeHandler2} onClick={() => this.props.sendInteraction('Write New Review')} name="summary" required></textarea>
              <br></br>
              <br></br>

              <label>Review Body*</label>
              <br></br>
              <ModalReviewBody onChangeHandler={this.onChangeHandler}/>
              <br></br>
              <br></br>

              <label>Upload Photos</label>
              <br></br>
              <ModalUpload photos={this.photos} photosS={this.state.photos}/>
              <br></br>
              <br></br>

              <label>Your nickname*</label>
              <br></br>
              <textarea cols="40" rows="1" maxLength="60" placeholder="Example: jackson11!" onChange={this.onChangeHandler2} onClick={() => this.props.sendInteraction('Write New Review')} name="name" required></textarea>

              <br></br>
              <i>For privacy reasons, do not use your full name or email address</i>
              <br></br>
              <br></br>

              <label>Your email*</label>
              <br></br>
              <input placeholder="Example: jackson11@email.com" type="email" maxLength="60" onClick={() => this.props.sendInteraction('Write New Review')} required
                pattern="^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$" name="email" onChange={this.onChangeHandler2}
              />
              <br></br>
              <i>For authentication reasons, you will not be emailed</i>

              <div className="image-modal-footer">
                <button className="image-button" type="button" onClick={this.props.show} onChange={() => this.props.sendInteraction('Write New Review')}>cancel</button>

                <input className="image-button" type="submit" value="submit" onClick={() => this.props.sendInteraction('Write New Review')}/>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default HOC(AddReviewModal, 'Ratings & Reviews');