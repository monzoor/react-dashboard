import React from 'react';
import { Provider } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MemoryRouter } from 'react-router';
// eslint-enable-next-line import/no-extraneous-dependencies
import LoginFormCompoent, { Login, LoginForm } from '../Login';
import { Email, Password } from '../_FormComponent';
import App from '../../App';
// import { mountWrap } from './testHelper';
import store from '../../../Store';

const props = {
    errors: {
        errorInfos: {
            hasErrors: false,
        },
    },
    dispatch: jest.fn(),
};
let formRef;

const wrappedMount = () => mountWrap(<Provider store={store}><LoginForm wrappedComponentRef={(inst) => { formRef = inst; }} {...props} /></Provider>);

wrappedMount();
const { form } = formRef.props;


describe('This is login test', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<Login form={form} {...props} debug />);
        expect(component).toMatchSnapshot();
    });
    it('Find login component', () => {
        const appWrapper = mount(
            <MemoryRouter>
                <App />
            </MemoryRouter>,
        );
        expect(appWrapper.find(LoginFormCompoent).length).toBe(1);
    });
    it('Email validation on change with no input', () => {
        const wrapper = shallow(<Login form={form} {...props} />);
        const emailComponent = shallow(<Email form={form} />);

        emailComponent.find('#email').simulate('change');
        expect(wrapper.find('Email').render().find('.ant-form-explain').text()).toEqual('email is required');
    });
    it('Email validation on change with wrong email format', () => {
        const wrapper = shallow(<Login form={form} {...props} />);
        const emailComponent = shallow(<Email form={form} />);

        emailComponent.find('#email').simulate('change', { target: { value: 'mmtamal@gmail.c' } });
        expect(wrapper.find('Email').render().find('.ant-form-explain').text()).toEqual('email is not a valid email');
    });
    it('Email validation on change with valid email format', () => {
        const wrapper = shallow(<Login form={form} {...props} />);
        const emailComponent = shallow(<Email form={form} />);

        emailComponent.find('#email').simulate('change', { target: { value: 'mmtamal@gmail.com' } });
        expect(wrapper.find('Email').render().find('.ant-form-explain').length).toBe(0);
    });
    it('Password validation length on change with no input', () => {
        const wrapper = shallow(<Login form={form} {...props} />);
        const passwordComponent = shallow(<Password form={form} />);

        passwordComponent.find('#password').simulate('change');
        expect(wrapper.find('Password').render().find('.ant-form-explain').text()).toEqual('password is required');
    });
    it('Password validation length on change with wrong length', () => {
        const wrapper = shallow(<Login form={form} {...props} />);
        const passwordComponent = shallow(<Password form={form} />);

        passwordComponent.find('#password').simulate('change', { target: { value: '12' } });
        expect(wrapper.find('Password').render().find('.ant-form-explain').text()).toEqual('password must be at least 3 characters');
    });
    it('Password validation length on change with correct length', () => {
        const wrapper = shallow(<Login form={form} {...props} />);
        const passwordComponent = shallow(<Password form={form} />);

        passwordComponent.find('#password').simulate('change', { target: { value: '123' } });
        expect(wrapper.find('Password').render().find('.ant-form-explain').length).toBe(0);
    });

    it('Form submit test', () => {
        const preventDefault = jest.fn();
        const wrapper = shallow(<Login form={form} {...props} />);
        const emailComponent = shallow(<Email form={form} />);
        const passwordComponent = shallow(<Password form={form} />);
        emailComponent.find('#email').simulate('change', { target: { value: 'mmtamal@gmail.com' } });
        passwordComponent.find('#password').simulate('change', { target: { value: '123' } });
        wrapper.find('Form').simulate('submit', { preventDefault });
        wrapper.setState({ loading: true });
        expect(preventDefault).toBeCalled();
        expect(wrapper.state().loading).toBe(true);
    });

    it('Test cGDSFP', () => {
        const nextProps = {
            errors: {
                errorInfos: {
                    hasErrors: true,
                    messages: 'error found',
                    componentError: true,
                },
            },
        };
        const prevState = {
            errors: {
                errorInfos: {
                    hasErrors: false,
                },
            },
        };
        const result = Login.getDerivedStateFromProps(nextProps, prevState);
        expect(result).toEqual({
            loading: false,
            errors: nextProps.errors,
        });
    });
});
