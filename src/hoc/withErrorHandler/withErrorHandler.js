import React, { useState, useEffect } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Wrapper from '../Wrapper/Wrapper';
function withErrorHandler(WrappedComponent, axios = null){
    return props => {
        const [error, setError] = useState(null);

        useEffect(() => {
            if(axios != null){
                const requestInterceptor = config => {
                    setError(null);
                    return config;
                };
                const responseInterceptor = error => {
                    setError(error);
                }
                
                axios.interceptors.request.use(requestInterceptor);
                axios.interceptors.response.use(res => res, responseInterceptor.error);

                return () => {
                    axios.interceptors.request.eject(requestInterceptor);
                    axios.interceptors.response.eject(responseInterceptor);
                }
            }
        }, [axios]);

        function errorConfirmedHandler(){
            setError(null);
        }
        
        return (
            <Wrapper>
                <Modal show={error != null} modalClosed={errorConfirmedHandler}>
                    <h3>Something went wrong</h3>
                    <p>{error != null? error.message : ''}</p>
                    <button onClick={errorConfirmedHandler}>Ok</button>
                </Modal>
                <WrappedComponent {...props} />
            </Wrapper>
        );
    }
}

export default withErrorHandler;