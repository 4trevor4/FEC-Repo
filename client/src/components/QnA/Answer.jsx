import React from 'react';
var dayjs = require('dayjs');
import axios from 'axios';

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedYes: false,
      numOfYes: this.props.answer.helpfulness
    };
    this.yesHandler = this.yesHandler.bind(this);
  }

  yesHandler() {
    if (this.state.clickedYes === false) {
      this.setState({
        clickedYes: true,
        numOfYes: this.state.numOfYes + 1
      });
      // call the answer helpfulness api endpoint
      const {formatBody} = this.props;
      const {answer_id: answerId} = this.props.answer;
      const body = formatBody('PUT', `/qa/answers/${answerId}/helpful`);
      axios.post('/api/*', body)
        .then((results) => {
          console.log('Successful');
        })
        .catch((err) => {
          console.log('Error while updating the answer helpfulness');
        });

    }

  }

  render() {
    const {answer} = this.props;
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    var dayjsObj = dayjs(answer.date);
    var year = dayjsObj.get('year');
    var month = monthNames[dayjsObj.get('month')];
    var dt = dayjsObj.get('date');
    console.log('AnswerIddddddd: ', answer.answer_id);

    return (
      <div className="answers" key={answer.answer_id}>
        <div className="answers-body">
          <p style={{fontWeight: 'bold', marginRight: '5px'}}>A:</p>
          <p>
            {answer.body}
          </p>
        </div>
        <div className="answer-info">
          <div>
            <p>by {answer.answerer_name === 'Seller' ? <span style={{fontWeight: 'bold'}}>{answer.answerer_name}</span> : answer.answerer_name},</p>
          </div>
          <div>
            <p>{month} {dt}, {year}</p>
          </div>
          <div>
            <p>|</p>
          </div>
          <div>
            <p>Helpful? <a className="answer-yes" onClick={this.yesHandler}> Yes </a>({this.state.numOfYes})</p>
          </div>
          <div>
            <p>|</p>
          </div>
          <div>
            <p>Report</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Answer;