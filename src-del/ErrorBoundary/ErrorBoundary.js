import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alert } from 'antd';
// import NotFound from '../Components/404';

// const test = () => (
//     <h1>asdasd</h1>
// )
class ErrorBoundary extends Component {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.node,
            PropTypes.arrayOf(PropTypes.node),
        ]).isRequired,
        // render: PropTypes.func.isRequired
    };

    state = {
        hasError: false,
        status: null,
        messages: null,
        componentError: null,
    }


    // componentDidCatch(error, errorInfo) {
    componentDidCatch() {
        // console.log('errrr---catch', this.props);
        const { errors } = this.props;
        const { status, messages, componentError } = errors.errorInfos;
        this.setState({
            hasError: true,
            status,
            messages,
            componentError: componentError || null,
        });
    }

    render() {
        const {
            hasError, status, messages, componentError,
        } = this.state;
        const { match, children } = this.props;
        if (hasError) {
            if (!componentError) {
                switch (status) {
                case 404: {
                    return <Redirect push to={{ pathname: match.url, state: { status: 404 } }} />;
                }
                case 500: {
                    return <Redirect push to={{ pathname: match.url, state: { status: 500 } }} />;
                }
                default:
                    // console.log(')))))))))');
                }
            }
            return (
                <Alert
                  description={messages}
                  type="error"
                  closable
                  showIcon
                />
            );
        }

        return children;
    }
}
const mapStateToProps = state => ({
    errors: state.errors,
});

export default withRouter(connect(mapStateToProps)(ErrorBoundary));
// export default withRouter(ErrorBoundary);
