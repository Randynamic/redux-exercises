import fetch from 'isomorphic-fetch';

export default store => next => action => {
    const {url, method, data, type} = action;
    if(url && method) {
        // DO AJAX CALL
        next({ ...action, ...{ type: `${type}_PENDING` }});

        request({url, method, data},
            payload => dispatchSuccess({next, type, action, payload}),
            err => dispatchError({next, type, action, err}));
    }

    return next(action);
};

export function _checkStatus(response) {
    if(response.status >= 200 && response.status < 300) {
        return response;
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export function _parseJSON(response) {
    return response.status !== 204 && response.status !== 205 ? response.json() : null;
}

async function request({ url, method, data }, successCallback, errorCallback) {
    try {
        const response = await fetch(url, {
            method,
            body: data ? JSON.stringify(data) : undefined,
        });

        const checkedResponse = _checkStatus(response);
        const parsedResponse = await _parseJSON(checkedResponse);
        return successCallback(parsedResponse);

    } catch (err) {
        return errorCallback(err);
    }
}

const dispatchSuccess = ({next, type, action, payload}) => {
    return next({
        type: type + '_SUCCESS',
        payload,
        originalPayload: action.payload,
    });
};

const dispatchError = ({next, type, action, err}) => {
    return next({
        type: type + '_ERROR',
        error: err.message || err || 'Unknown',
        status: (err && err.response && err.response.status) || 0,
        originalPayload: action.payload
    });
};



