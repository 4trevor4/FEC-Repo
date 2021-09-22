import React from 'react';
import './AddQuestionModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class QuestionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      nickname: '',
      email: ''

    };
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div className="modal" onClick={this.props.onCancel}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <div className="modal-title">
              <h1>Ask your question</h1>
              <h4>About the product</h4>
            </div>
            <div style={{alignSelf: 'center', cursor: 'pointer'}}>
              <h1 style={{color: '#fff'}} onClick={this.props.onCancel}>X</h1>
            </div>
          </div>
          <div className="modal-body">
            <div>
              <h4>Your Question<span style={{color: 'red'}}>*</span></h4>
              <textarea
                className="modal-input"
                style={{height: '90px'}}
                name="question"
                value={this.state.question}
                maxLength="1000"
                onChange={this.changeHandler}
              ></textarea>
            </div>
            <div>
              <h4>What is your nickname<span style={{color: 'red'}}>*</span></h4>
              <input
                className="modal-input"
                value={this.state.nickname}
                name="nickname"
                placeholder="Example: jackson11!"
                maxLength="60"
                onChange={this.changeHandler}
              />
              <div className="modal-info">
                <FontAwesomeIcon className="privacy-info" icon="info-circle" />
                <p className="privacy-info">For privacy reasons, do not use your full name or email address</p>
              </div>

            </div>

            <div>
              <h4>Your email<span style={{color: 'red'}}>*</span></h4>
              <input
                className="modal-input"
                value={this.state.email}
                name="email"
                placeholder="Why did you like the product or not?"
                maxLength="60"
                onChange={this.changeHandler}
              />
              <div className="modal-info">
                <FontAwesomeIcon className="privacy-info" icon="info-circle" />
                <p className="privacy-info">For authentication reasons, you will not be emailed</p>
              </div>

            </div>
          </div>
          <div className="modal-footer">
            <button className="modal-cancel" onClick={this.props.onCancel}>Cancel</button>
            <button className="modal-submit">Submit</button>
          </div>

        </div>
      </div>
    );
  }
}

export default QuestionModal;