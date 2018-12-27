import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FadeInAnimation } from '../../../Utils/DesignUtils';
import landingImage from '../../../assets/images/bg-auth-left.jpg';
import landingImage2 from '../../../assets/images/bg-auth-right.jpg';


class AuthLayout extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node),
        ]).isRequired,
    };

    render() {
        const { children } = this.props;

        return (
            <div className="container-fluid">
                <div className="row minvh-100">
                    <div className="col-6 d-none d-lg-block landing" style={{ backgroundImage: `url(${landingImage})` }} />
                    <div className="col-lg-6 col-12 d-flex landing landing-right" style={{ backgroundImage: `url(${landingImage2})` }}>
                        <div className="row align-items-center minvh-100 w-100 mx-0">
                            <div className="col-lg-8 col-12 mx-auto">
                                <FadeInAnimation>
                                    {children}
                                </FadeInAnimation>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AuthLayout;
