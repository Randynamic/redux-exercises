import React, { Component } from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import Balloon from './Balloon';
import AmusementPark from './AmusementPark';

import './Amuse.scss';

@connect(({balloons}) => ({
  balloons
}))
class Amuse extends Component {
  render() {
    const {balloons} = this.props;

    const Balloons = map(balloons.data, (balloon, key) => <Balloon position={balloon.position} key={key}></Balloon>);

    return (
      <div className="root">
        <AmusementPark />
        {Balloons}
      </div>);
  }
}

export default Amuse;
