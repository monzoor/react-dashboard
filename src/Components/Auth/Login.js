import React, { PureComponent } from 'react';
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
import { auth } from '../../Actions/authAction';
import { Email, Password, RememberMe } from './_FormComponent';

export class Login extends PureComponent {
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
                dispatch(auth(this.props, values));
            }
        });
    }

    render() {
        const { loading } = this.state;
        const { form, errors } = this.props;
        return (
            <Form onSubmit={this.handleSubmit}>
                <h1 className="text-center font-weight-light mb-4">asdasd</h1>
                <Email form={form} />
                <Password form={form} />
                <div className="row">
                    <div className="col-6">
                        <RememberMe className="float-left" form={form} />
                    </div>
                    <div className="col-6">
                        <Link className="float-right mb-2" to="/">Forgot password</Link>
                    </div>
                </div>

                <Button className="btn btn-primary" htmlType="submit" loading={loading} block>
                    Log in
                </Button>
                <ErrorBoundary>
                    <ErrorThrower {...errors} errorMessage="Crushed in login" />
                </ErrorBoundary>
                <Link to="/signup" className="btn btn-block btn-outline-primary mt-3">
                    Signup
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

export const LoginForm = Form.create()(Login);

export default withRouter(connect(mapStateToProps)(LoginForm));
