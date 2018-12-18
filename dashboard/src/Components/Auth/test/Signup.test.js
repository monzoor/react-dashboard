/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import { Signup, SignupForm } from '../SignUp';
import { Email, Password, Name } from '../_FormComponent';
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

const wrappedMount = () => mountWrap(<Provider store={store}><SignupForm wrappedComponentRef={(inst) => { formRef = inst; }} {...props} /></Provider>);

wrappedMount();
const { form } = formRef.props;


describe('This is Sign up test', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<Signup form={form} {...props} debug />);
        expect(component).toMatchSnapshot();
    });
    it('Email validation on change with no input', () => {
        const wrapper = shallow(<Signup form={form} {...props} />);
        const emailComponent = shallow(<Email form={form} />);

        emailComponent.find('#email').simulate('change');
        expect(wrapper.find('Email').render().find('.ant-form-explain').text()).toEqual('email is required');
    });
    it('Email validation on change with wrong email format', () => {
        const wrapper = shallow(<Signup form={form} {...props} />);
        const emailComponent = shallow(<Email form={form} />);

        emailComponent.find('#email').simulate('change', { target: { value: 'mmtamal@gmail.c' } });
        expect(wrapper.find('Email').render().find('.ant-form-explain').text()).toEqual('email is not a valid email');
    });
    it('Email validation on change with valid email format', () => {
        const wrapper = shallow(<Signup form={form} {...props} />);
        const emailComponent = shallow(<Email form={form} />);

        emailComponent.find('#email').simulate('change', { target: { value: 'mmtamal@gmail.com' } });
        expect(wrapper.find('Email').render().find('.ant-form-explain').length).toBe(0);
    });
    it('Password validation length on change with no input', () => {
        const wrapper = shallow(<Signup form={form} {...props} />);
        const passwordComponent = shallow(<Password form={form} />);

        passwordComponent.find('#password').simulate('change');
        expect(wrapper.find('Password').render().find('.ant-form-explain').text()).toEqual('password is required');
    });
    it('Password validation length on change with wrong length', () => {
        const wrapper = shallow(<Signup form={form} {...props} />);
        const passwordComponent = shallow(<Password form={form} />);

        passwordComponent.find('#password').simulate('change', { target: { value: '12' } });
        expect(wrapper.find('Password').render().find('.ant-form-explain').text()).toEqual('password must be at least 3 characters');
    });
    it('Password validation length on change with correct length', () => {
        const wrapper = shallow(<Signup form={form} {...props} />);
        const passwordComponent = shallow(<Password form={form} />);

        passwordComponent.find('#password').simulate('change', { target: { value: '123' } });
        expect(wrapper.find('Password').render().find('.ant-form-explain').length).toBe(0);
    });


    it('Name validation length on change with no input', () => {
        const wrapper = shallow(<Signup form={form} {...props} />);
        const nameComponent = shallow(<Name form={form} />);

        nameComponent.find('#name').simulate('change');
        expect(wrapper.find('Name').render().find('.ant-form-explain').text()).toEqual('name is required');
    });
    it('Name validation length on change with wrong length', () => {
        const wrapper = shallow(<Signup form={form} {...props} />);
        const nameComponent = shallow(<Name form={form} />);

        nameComponent.find('#name').simulate('change', { target: { value: 'mo' } });
        expect(wrapper.find('Name').render().find('.ant-form-explain').text()).toEqual('name must be at least 3 characters');
    });
    it('Name validation length on change with correct length', () => {
        const wrapper = shallow(<Signup form={form} {...props} />);
        const nameComponent = shallow(<Name form={form} />);

        nameComponent.find('#name').simulate('change', { target: { value: 'monzoor' } });
        expect(wrapper.find('Name').render().find('.ant-form-explain').length).toBe(0);
    });

    it('Form submit test', () => {
        const preventDefault = jest.fn();
        const wrapper = shallow(<Signup form={form} {...props} />);
        const emailComponent = shallow(<Email form={form} />);
        const passwordComponent = shallow(<Password form={form} />);
        const nameComponent = shallow(<Name form={form} />);
        emailComponent.find('#email').simulate('change', { target: { value: 'mmtamal@gmail.com' } });
        passwordComponent.find('#password').simulate('change', { target: { value: '123' } });
        nameComponent.find('#name').simulate('change', { target: { value: 'monzoor' } });
        wrapper.find('Form').simulate('submit', { preventDefault });
        wrapper.setState({ loading: true });
        expect(preventDefault).toBeCalled();
        expect(wrapper.state().loading).toBe(true);
    });

    it('Form submit test unsucess', () => {
        const preventDefault = jest.fn();
        const wrapper = shallow(<Signup form={form} {...props} />);
        const emailComponent = shallow(<Email form={form} />);
        const passwordComponent = shallow(<Password form={form} />);
        const nameComponent = shallow(<Name form={form} />);
        emailComponent.find('#email').simulate('change', { target: { value: 'mmtamal@gm' } });
        passwordComponent.find('#password').simulate('change', { target: { value: '12' } });
        nameComponent.find('#name').simulate('change', { target: { value: 'mo' } });
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
        const result = Signup.getDerivedStateFromProps(nextProps, prevState);
        expect(result).toEqual({
            loading: false,
            errors: nextProps.errors,
        });
    });
});
/* eslint-enable no-undef */
