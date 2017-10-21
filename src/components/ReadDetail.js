import React from 'react';
import ListReads from './ListReads'
import CreateRead from './CreateRead'
import {
    connect
}
from 'react-redux'
import {
    addPost, addComment
}
from '../actions'
import '.././App.css';
import * as ReadsAPI from '../utils/ReadsAPI'

class ReadDetail extends React.Component {

    state = {
        id: "",

    }

    componentDidMount() {
        if (this.props.match.params.postId) {

            this.setState({
                id: this.props.match.params.postId
            })
        } else if (this.props.match.params.commentId) {
            this.setState({
                id: this.props.match.params.commentId
            })
        }

    }

    componentWillReceiveProps(newProps) {
        if (newProps.match.params.postId === this.state.id) {
            this.setState({
                id: this.props.match.params.postId
            })
        }
    }

    render() {

        var post = null;
        var postFound = false;
        var readType = "";

        if (this.props.match.params.postId) {
            readType = "post";
            for (var key in this.props.posts) {
                if (this.props.posts[key]['id'] === this.props.match.params.postId) {
                    post = this.props.posts[key];
                    if (post.deleted === false) {
                        post.title = key
                        postFound = true;
                    }
                }
            }
        } else if (this.props.match.params.commentId) {
            readType = "comment";
            for (var key in this.props.comments) {
                if (this.props.comments[key]['id'] === this.props.match.params.commentId) {
                    post = this.props.comments[key];
                    if (post.deleted === false) {
                        post.title = key
                        postFound = true;
                    }
                }
            }

        }

        if (postFound === true) {
            var postId = null;
            if (this.props.match.params.postId) {
                postId = this.props.match.params.postId
            } else if (this.props.match.params.commentId) {
                postId = this.props.match.params.commentId;
            }
            return ( < div >
                < CreateRead postId = {
                    postId
                }
                editRead = {
                    true
                }
                readType = {
                    readType
                }
                /> {
                readType === "post" ? ( < div >
                    < hr width = "300" / >
                    < ListReads readType = "comment" readId = {postId} / >
                    < div >
                    < hr width = "300" / >
                    < label > Create a Comment: < /label> < CreateRead editRead = {
                    false
                }
                readType = {
                    "comment"
                }
                parentId = {
                    postId
                }
                /> < /div > < /div>
            ): ( < div > < /div>)} < /div > )
        } else {
            return (null)
        }
    }
}

function mapStateToProps(state, props) {
    return Object.assign({}, props, {
        posts: state.post,
        comments: state.comment,
        sortMethod: state.sort,
        filterCategory: state.filter,
    });
}

function mapDispatchToProps(dispatch) {
    return {
        submitPost: (data) => dispatch(addPost(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReadDetail)