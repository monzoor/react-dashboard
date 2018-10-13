import React, { Component } from 'react';
import { withRouter, Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import NotFound from '../404';

const test = () => (
    <h1>asdasd</h1>
)
class ErrorBoundary extends Component {

    constructor (props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        }
    }
    static propTypes = {
    children: PropTypes.oneOfType([
          PropTypes.node,
          PropTypes.arrayOf(PropTypes.node)
        ]).isRequired,
        // render: PropTypes.func.isRequired
    };

    componentDidCatch(error, errorInfo) {
        console.log('errrr---catch', error);
        this.setState({
            hasError: (error.componetError)? false : true,
            error,
            errorInfo,
            componentError: error.componetError || null
        })
    }
    render () {


        if (this.state.hasError) {
            switch(this.state.error.status) {
                case 404: {
                    return <Redirect push to={{ pathname: this.props.match.url, state: { status: 404 }}}/>
                }
                case 500: {
                    return <Redirect push to={{ pathname: this.props.match.url, state: { status: 500 }}}/>
                }
                default:

                    return <Redirect push to={{ pathname: this.props.match.url, state: { status: null }}}/>

                    // return <NotFound></NotFound>
                    // return this.props.render(this.state.error, this.state.errorInfo);
                    // return (
                    //     <h2>Something went wrong.</h2>
                    // );
            }
            //
            // return <Redirect push to={{ pathname: this.props.match.url, state: { status: 404 }}}/>
            // return <NotFound></NotFound>
        }

        return this.props.children;
    }
}
const mapStateToProps = (state, ownProps) => {
    // console.log('===boundary===', state.errors);
    return {
        errors: state.errors.payload
    };
};



export default withRouter(ErrorBoundary)
