import React, { Component } from 'react';
import { connect } from 'react-redux';
import { repositionBalloons } from '../actions/balloon.actions';
import { map } from 'lodash';
import Balloon from './Balloon';
import AmusementPark from './AmusementPark';

import './Amuse.scss';

@connect(({balloons}) => ({
  balloons
}), {repositionBalloons})
class Amuse extends Component {

  onRepositionClick = (event) => {
    const {repositionBalloons} = this.props;
    event.stopPropagation();

    repositionBalloons();
  };

  render() {
    const {balloons} = this.props;

    const Balloons = map(balloons.data, (balloon, key) => <Balloon position={balloon.position} key={key}></Balloon>);

    return (
      <div className="root">
        <button onClick={this.onRepositionClick}>REPOSITION</button>
        <AmusementPark />
        {Balloons}
      </div>);
  }
}

export default Amuse;
