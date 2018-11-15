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
import { auth } from '../../Actions/authAction';
import { Email, Password, RememberMe } from './_FormComponent';

export class Login extends Component {
    static propTypes = {
        form: PropTypes.oneOfType([PropTypes.object]).isRequired,
    };

    state = {
        loading: false,
    }


    componentWillReceiveProps(nextProps) {
        const { errors } = this.props;
        if (nextProps.errors !== errors) {
            if (nextProps.errors.errorInfos.hasErrors) {
                this.setState({
                    loading: false,
                });
                message.destroy();
            }
            if (nextProps.errors.errorInfos.messages && nextProps.errors.errorInfos.componentError) {
                message.error(nextProps.errors.errorInfos.messages);
            }
        }
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
        // eslint-disable-next-line react/destructuring-assignment
        // console.log(this.props.form.getFieldProps('email').value);
        const { loading } = this.state;
        const { form, errors } = this.props;
        // const { getFieldDecorator } = form;

        return (
            <Form onSubmit={this.handleSubmit} id="logIn">
                <h1 className="text-center font-weight-light mb-4">Login</h1>
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

const LoginForm = Form.create()(Login);
// export {
//     LoginForm,
// };
export default withRouter(connect(mapStateToProps)(LoginForm));
// export default WrappedNormalLoginForm;
