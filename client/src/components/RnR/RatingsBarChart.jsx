import React from 'react';
import './Ratings.css';

class RatingsBarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      starsSelected: this.props.starsSelected
    };

    this.starCheck = this.starCheck.bind(this);
    this.starCheck2 = this.starCheck2.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.starsSelected !== this.props.starsSelected) {
      this.setState({ starsSelected: this.props.starsSelected });
    }
  }

  starCheck(num, total) {
    if (Number(num) > 0) {
      return Number(num) / total * 100 + '%';
    } else {
      return 0;
    }
  }

  starCheck2(reviewsData) {
    /*CREATES REVIEW COUNT ON REVIEW DATA NOT META*/
    let newObj = {5: 0, 4: 0, 3: 0, 2: 0, 1: 0};

    for (let i = 0; i < reviewsData.length; i++) {
      if (reviewsData[i].rating === 5) { newObj['5'] += 1; }
      if (reviewsData[i].rating === 4) { newObj['4'] += 1; }
      if (reviewsData[i].rating === 3) { newObj['3'] += 1; }
      if (reviewsData[i].rating === 2) { newObj['2'] += 1; }
      if (reviewsData[i].rating === 1) { newObj['1'] += 1; }
    }
    return newObj;
  }


  render() {
    // let reviewsCount = this.props.reviewsMeta.ratings;
    let reviewsCount = this.starCheck2(this.props.reviews.results);
    let test = reviewsCount;
    let reviewsTotal = Object.values(reviewsCount);
    if (reviewsTotal.length) {
      reviewsCount = reviewsTotal.reduce((prev, cur) => Number(prev) + Number(cur));
    } else { reviewsCount = 0; }
    let star5 = this.starCheck(test['5'], reviewsCount);
    let star4 = this.starCheck(test['4'], reviewsCount);
    let star3 = this.starCheck(test['3'], reviewsCount);
    let star2 = this.starCheck(test['2'], reviewsCount);
    let star1 = this.starCheck(test['1'], reviewsCount);

    let starsSelected;
    if (this.state.starsSelected.length > 0) {
      starsSelected = this.state.starsSelected.map((item, index) => {
        return (
          <span className="starFilters" key={item.toString()}>{item} Stars</span>
        );
      });
    }

    return (
      <React.Fragment>
        {starsSelected
          ? <div id="starFilterRemove">
            <span id="activeFilters">Active Filters:</span>
            <span id="removeFilters" onClick={(e) => this.props.sortStarClick(e, 0)}>{
              starsSelected ? 'Remove all filters  ⓧ' : null}
            </span>
          </div>
          : null}

        {/* {starsSelected
          ? <div id="eachStarFilter">{starsSelected}</div>
          : null} */}
        {starsSelected
          ? <div id="eachStarFilter">
            {starsSelected
              ? <div>{starsSelected}</div>
              : null}
          </div>
          : null}

        <span className="starRatings" onClick={(e) => this.props.sortStarClick(e, 5)}>
          5 stars
          <div className="starBar">
            <div className="starBar5" style={{width: star5}}></div>
          </div>
          <span className="individualCountStarBar">{test['5'] || 0}</span>
        </span>

        <span className="starRatings" onClick={(e) => this.props.sortStarClick(e, 4)}>
          4 stars
          <div className="starBar">
            <div className="starBar4" style={{width: star4}}></div>
          </div>
          <span className="individualCountStarBar">{test['4'] || 0}</span>
        </span>

        <span className="starRatings" onClick={(e) => this.props.sortStarClick(e, 3)}>
          3 stars
          <div className="starBar">
            <div className="starBar3" style={{width: star3}}></div>
          </div>
          <span className="individualCountStarBar">{test['3'] || 0}</span>
        </span>

        <span className="starRatings" onClick={(e) => this.props.sortStarClick(e, 2)}>
          2 stars
          <div className="starBar">
            <div className="starBar2" style={{width: star2}}></div>
          </div>
          <span className="individualCountStarBar">{test['2'] || 0}</span>
        </span>

        <span className="starRatings" onClick={(e) => this.props.sortStarClick(e, 1)}>
          1 stars
          <div className="starBar">
            <div className="starBar1" style={{width: star1}}></div>
          </div>
          <span className="individualCountStarBar">{test['1'] || 0}</span>
        </span>
      </React.Fragment>
    );
  }
}


export default RatingsBarChart;