import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom/cjs/react-router-dom';

Newlogin.propTypes = {
    
};

function Newlogin(props) {
    return (
        <div>
            <Link  to='/admin/dashboard'>Login</Link>
        </div>
    );
}

export default Newlogin;