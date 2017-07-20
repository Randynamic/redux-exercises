import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBalloons, repositionBalloons } from '../actions/balloon.actions';
import { map } from 'lodash';
import Balloon from './Balloon';
import AmusementPark from './AmusementPark';

import './Amuse.scss';

@connect(({balloons}) => ({
  balloons
}), {getBalloons, repositionBalloons})
class Amuse extends Component {
  constructor() {
    super(...arguments);
    this.onRepositionClick = this.onRepositionClick.bind(this);
  }

  onRepositionClick(event) {
    const {repositionBalloons} = this.props;
    event.stopPropagation();

    repositionBalloons();
  }

  render() {
    const {balloons, getBalloons} = this.props;

    const Balloons = map(balloons.data, (balloon, key) => <Balloon position={balloon.position} key={key}></Balloon>);

    return (
      <div className="root" onClick={getBalloons}>
        <button onClick={this.onRepositionClick}>REPOSITION</button>
        <AmusementPark />
        {Balloons}
      </div>);
  }
}

export default Amuse;
