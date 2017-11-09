
/**
 * Based on React Starter Kit (https://www.reactstarterkit.com/)
 */

import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import React from 'react';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';
import App from '../common/App';
import Html from './Html';
import ErrorPage from './Error';
import configureStore from '../common/configureStore';
import config from '../common/config';
import Amuse from '../common/components/Amuse';
import assets from './assets.json'; // eslint-disable-line import/no-unresolved

const app = express();

global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

app.get('*', async (req, res, next) => {
    try {
        const content = React.createElement(Amuse);

        const data = {};

        data.scripts = [assets.vendor.js, assets.client.js];

        data.state = {
          balloons: {
            data:{
              1: {
                position: {
                  top: `${getRandomInt(1,50)}%`,
                  left: `${getRandomInt(1,100)}%`,
                }
              },
              2: {
                position: {
                  top: `${getRandomInt(1,50)}%`,
                  left: `${getRandomInt(1,100)}%`,
                }
              },
              3: {
                position: {
                  top: `${getRandomInt(1,50)}%`,
                  left: `${getRandomInt(1,100)}%`,
                }
              },
              4: {
                position: {
                  top: `${getRandomInt(1,40)}%`,
                  left: `${getRandomInt(1,80)}%`,
                }
              },
              5: {
                position: {
                  top: `${getRandomInt(1,20)}%`,
                  left: `${getRandomInt(1,50)}%`,
                }
              }
            }
          },
        };

        data.title = 'AH Amusement Park';
        data.description = 'AH Amusement Park description';

        const store = configureStore(data.state);

        data.children = ReactDOM.renderToString(<App store={store}>{content}</App>);

        const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
        res.status(200);
        res.send(`<!doctype html>${html}`);
    } catch (err) {
        console.log(err);
        next(err);
    }
});

//
// Error handling
// -----------------------------------------------------------------------------
const prettyErrors = new PrettyError();
prettyErrors.skipNodeFiles();
prettyErrors.skipPackage('express');

app.use((error, req, res, next) => { // eslint-disable-line no-unused-vars
    console.error(prettyErrors.render(error));
    const html = ReactDOM.renderToStaticMarkup(
        <Html
            title="Internal Server Error"
            description={error.message}
        >
            {ReactDOM.renderToString(<ErrorPage error={error} />)}
        </Html>,
    );
    res.status(error.status || 500);
    res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
app.listen(config.port, () => {
    console.info(`The server is running at http://localhost:${config.port}/`);
});

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
    app.hot = module.hot;
    module.hot.accept('../common/components/Amuse');
}

export default app;

