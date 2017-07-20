import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import deepForceUpdate from 'react-deep-force-update';
import App from '../common/App';
import configureStore from '../common/configureStore';
import Amuse from '../common/components/Amuse';

const onRenderComplete = function initialRenderComplete() {
    const elem = document.getElementById('css');
    if (elem) elem.parentNode.removeChild(elem);
};

const container = document.getElementById('app');
const content = React.createElement(Amuse);
let appInstance;
try {
    appInstance = ReactDOM.render(
        <App store={configureStore(process.env.BROWSER && window.__INITIAL_STATE__)}>{content}</App>,
        container,
        () => onRenderComplete(),
    );
} catch (error) {
    console.error(error);
}

// Enable Hot Module Replacement (HMR)
if (module.hot) {
    module.hot.accept('../common/components/Amuse', () => {
        if (appInstance) {
            // Force-update the whole tree, including components that refuse to update
            deepForceUpdate(appInstance);
        }
    });
}
