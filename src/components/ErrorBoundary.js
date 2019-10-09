import React, { Component } from 'react';

export default class ErrorBoundary extends Component{

    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
        console.log('from compo', error);
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
    }

    render() {
        if (this.state.error) {
            return (
                <div>
                    <h2>{this.state.error && this.state.error.message}</h2>
                </div>
            );
        }

        return this.props.children;
    }

}