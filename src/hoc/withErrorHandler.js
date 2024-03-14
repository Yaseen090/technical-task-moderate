import React, { Component } from 'react';

import Modal from '../components/UI/Modal/Modal';
import Aux from '../hoc/Auxillary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentDidMount() {
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                console.log('withErrorHandler:  Request.Use')
                return req;
            });
            this.resInterceptors = axios.interceptors.response.use(null, error => {
                console.log('withErrorHandler:  Response.Use')

                this.setState({ error: error });
            });
        }
        componentWillUnmount() {
            console.log("Will Unmount", this.reqInterceptors, this.resInterceptors)
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);

        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        }

        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        clicked={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : 'Something Didnt work'}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;