import React, { Component } from 'react';

export default class ErrorBoundary extends Component{

    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }

    render() {
        let e = this.state.error;
        if (e && e.status && e.status !== 403 && e.status !== 401) {
            return (
                <div>
                    <h2>{this.state.error && this.state.error.message}</h2>
                </div>
            );
        }

        return this.props.children;
    }

}