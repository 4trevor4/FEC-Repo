import React from 'react';
import './Reviews.css';
// import ReviewsRateDate from './ReviewsRateDate.jsx';


class ReviewsTiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ''
    };
  }


  render() {
    const reviews = this.props.reviews;

    let date, summary, recommend, response;
    const starAndMonthTile = {
      '0': '☆☆☆☆☆', 'Jan': 'January', 'Jul': 'July',
      '1': '★☆☆☆☆', 'Feb': 'February', 'Aug': 'August',
      '2': '★★☆☆☆', 'Mar': 'March', 'Sep': 'September',
      '3': '★★★☆☆', 'Apr': 'April', 'Oct': 'October',
      '4': '★★★★☆', 'May': 'May', 'Nov': 'November',
      '5': '★★★★★', 'Jun': 'June', 'Dec': 'December'
    };

    if (reviews.results) {
      summary = reviews.results.map((item, index) => {
        if (index > 1) { return; }
        date = new Date(item.date.slice(0, 10));
        date = date.toString().slice(4, 15);
        date = `${starAndMonthTile[date.slice(0, 3)]} ${date.slice(4, 6)}, ${date.slice(-4)}`;

        if (item.recommend) { recommend = '✔ I recommend this product'; }
        if (item.response) { response = item.response; }

        return (
          <div className="individualReviewBox" key={item.summary}>
            <div id="starsUsernameDate">
              <p>{starAndMonthTile[item.rating.toString()]}</p>
              <p id="usernameDate">{item.reviewer_name}, {date}</p>
            </div>

            <div id="summaryHelpfulAndReport">
              <p id="summaryTitle">{item.summary}</p>
              <p id="summaryBody">{item.body}</p>
              <p id="trueRecommend">{recommend}</p>
              <p id="trueResponse">{'Response:', response}</p>
              <div id="helpfulAndReport">
                <span>Helpful?</span>
                <span><span className="yes">Yes</span> ({item.helpfulness})</span>
                <span id="break"></span><span className="report">Report</span>
              </div>
            </div>
          </div>
        );
      });
    }

    return (
      <React.Fragment>
        <div className="individualReviewBox">
          {/* <ReviewsRateDate reviews={this.props.reviews}/> */}
        </div>
        {summary}
      </React.Fragment>
    );
  }
}

export default ReviewsTiles;