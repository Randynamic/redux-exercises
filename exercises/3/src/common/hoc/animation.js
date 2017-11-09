import React from 'react';

export default function animation(className) {
  return (WrappedComponent) => {
    return class Animate extends React.Component {
      render() {
        return <span className={className}><WrappedComponent {...this.props} /></span>
      }
    }
  }
}
