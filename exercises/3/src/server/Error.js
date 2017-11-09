import React from 'react';
import PropTypes from 'prop-types';

const ErrorPage = ({ error }) => (
    <div>
    Errora :P
        <p>
            {error}
        </p>
    </div>
);

ErrorPage.propTypes = {
    error: PropTypes.shape({
        message: PropTypes.string,
    }).isRequired,
};

export default ErrorPage;
