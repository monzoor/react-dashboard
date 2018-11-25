import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import {
    Form,
    Button,
    message,
} from 'antd';

import ErrorBoundary from '../../ErrorBoundary/ErrorBoundary';
import ErrorThrower from '../../ErrorBoundary/ErrorThrower';
import { signup } from '../../Actions/authAction';
import { Email, Password, Name } from './_FormComponent';

export class Signup extends Component {
    static propTypes = {
        form: PropTypes.oneOfType([PropTypes.object]).isRequired,
    };

    state = {
        loading: false,
        errors: null,
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.errors !== prevState.errors) {
            if (nextProps.errors.errorInfos.hasErrors) {
                message.destroy();
            }
            if (nextProps.errors.errorInfos.messages && nextProps.errors.errorInfos.componentError) {
                message.error(nextProps.errors.errorInfos.messages);
            }
            return {
                loading: false,
                errors: nextProps.errors,
            };
        }
        return null;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { form, dispatch } = this.props;
        form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    loading: true,
                });
                dispatch(signup(this.props, values));
                return true;
            }
            return false;
        });
    }

    render() {
        const { loading } = this.state;
        const { form, errors } = this.props;

        return (
            <Form onSubmit={this.handleSubmit}>
                <h1 className="text-center font-weight-light mb-4">Sign Up</h1>
                <Name form={form} />
                <Email form={form} />
                <Password form={form} />
                <Button className="btn btn-primary mb-4" htmlType="submit" loading={loading} block>
                    Sign Up
                </Button>
                <ErrorBoundary>
                    <ErrorThrower {...errors} errorMessage="Crushed in sign up" />
                </ErrorBoundary>
                <Link to="/login">
                    Back to login
                </Link>
            </Form>
        );
    }
}

// const mapStateToProps = (state) => {
//     const { errors } = state;
//     return {
//         errors,
//     };
// };
const mapStateToProps = state => ({
    errors: state.errors,
});

export const SignupForm = Form.create()(Signup);

export default withRouter(connect(mapStateToProps)(SignupForm));
// export default WrappedNormalLoginForm;
