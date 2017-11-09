import React from 'react';

class Balloon extends React.PureComponent {
  render() {
    const {position} = this.props;
    const {top, left} = position;
    const topPosition = `-${top}`.replace('%', '');
    const leftPosition = `${left}`.replace('%', '');
    const balloonClassName = `cls-${top}`.replace('%', '');
    return (
      <div style={{position: 'absolute', height: '100%', width: '100%', top: '0', left: '0', pointerEvents: 'none'}}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <g>
            <g>
              <ellipse className={balloonClassName} cx={topPosition} cy={leftPosition} rx="0.84" ry="0.55"
                       transform="rotate(-82.53)"/>
            </g>
          </g>
        </svg>
      </div>
    );
  }
}

export default Balloon;
