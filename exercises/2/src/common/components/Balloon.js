import React from 'react';

function Balloon({position}) {
  const {top, left} = position;
  const topPosition = `-${top}`.replace('%', '');
  const leftPosition = `${left}`.replace('%', '');
  const balloonClassName = `cls-${top}`.replace('%', '');
  return (
    <div style={{position: 'absolute', height: '100%', width: '100%', top: '0', left: '0', pointerEvents: 'none'}}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <g>
          <g className="bunch_of_balloons">
            <ellipse className={balloonClassName} cx={topPosition} cy={leftPosition} rx="0.84" ry="0.55"
                     transform="rotate(-82.53)"/>
          </g>
        </g>
      </svg>
    </div>
  );
}

export default Balloon;
