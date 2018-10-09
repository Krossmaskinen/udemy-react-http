import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    };

    componentDidMount() {
        console.log(this.props);
        if (this.props.match.params.id) {
            if (!this.state.loadedPost || this.state.loadedPost.id !== this.props.match.params.id) {
                axios.get(`posts/${this.props.match.params.id}`)
                    .then(response => {
                        console.log(response);
                        this.setState({ loadedPost: response.data });
                    });
            }
        }
    }

    deletPostHandler = () => {
        axios.delete(`posts/${this.props.match.params.id}`)
            .then(response => {
                console.log(response);
            });
    }

    render() {
        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;

        if (this.props.match.params.id && !this.loadedPost) {
            post = <div style={{ textAlign: 'center' }}><div className="lds-dual-ring"></div></div>;
        }

        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletPostHandler}>Delete</button>
                    </div>
                </div>

            );
        }

        return post;
    }
}

export default FullPost;