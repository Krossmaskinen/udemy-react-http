import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        posting: false,
        submitted: false
    }

    componentDidMount() {
        console.log(this.props);
    }

    postDataHandler = () => {
        const data = {
            title: this.state.title,
            body: this.state.content,
            author: this.state.author
        };

        this.setState({ posting: true });

        axios.post('posts', data)
            .then(response => {
                console.log(data);
                this.setState({ submitted: true, posting: false });
            });
    }

    render() {
        let redirect = this.state.submitted ? <Redirect to="/posts" /> : null;
        let content = (
            <div className="NewPost">
                {redirect}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({ title: event.target.value })} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({ content: event.target.value })} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({ author: event.target.value })}>
                    <option value="Jean Paul">Jean Paul</option>
                    <option value="Kei">Kei</option>
                    <option value="Nami">Nami</option>
                    <option value="Fabian">Fabian</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );

        if (this.state.posting) {
            content = (
                <div style={{ textAlign: 'center' }}>
                    <div className="lds-dual-ring"></div>
                    <div>
                        Posting...
                    </div>
                </div>);
        }

        return (
            <div>
                {content}
            </div>
        );
    }
}

export default NewPost;