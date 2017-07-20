import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';

class App extends Component {
  static propTypes = {
    store: PropTypes.object, // eslint-disable-line,
    children: PropTypes.element.isRequired,
  };

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <div style={{height: '100%'}}>
          {React.Children.only(this.props.children)}
        </div>
      </Provider>
    );
  }
}

export default App;
