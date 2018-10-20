import React, { Component } from 'react';

import PropTypes from 'prop-types';


class MainLayout extends Component {
    render() {
        const { children } = this.props;
        return (
            <div className="container-fluid">
                <div className="row minvh-100">
                    <div className="col-8 d-none d-lg-block bg-primary">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est consequatur culpa totam aliquid, excepturi ullam asperiores numquam iusto. Ea, asperiores!
                    </div>
                    <div className="col-lg-4 col-12 d-flex">
                        <div className="row align-items-center minvh-100 w-100 mx-0">
                            <div className="col-12 mx-auto">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
MainLayout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node),
    ]).isRequired,
};

export default MainLayout;
