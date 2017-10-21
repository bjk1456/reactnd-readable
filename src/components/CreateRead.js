import React from 'react'
import {
    Button
}
from 'reactstrap';
import TextareaAutosize from 'react-autosize-textarea';
import {
    connect
}
from 'react-redux'
import {
    addPost, addComment
}
from '../actions'
import PropTypes from 'prop-types'
import * as ReadsAPI from '../utils/ReadsAPI'
import createHistory from 'history/createBrowserHistory'

class CreateRead extends React.Component {

    static propTypes = {
        postId: PropTypes.string,
        editRead: PropTypes.bool,
        readType: PropTypes.string
    }

    constructor(props) {
        super(props)
        this.handlePostSubmit = this.handlePostSubmit.bind(this)
    }

    componentDidMount() {
        const {
            editRead, postId, readType
        } = this.props;

        if (this.props.parentId) {
            this.setState({
                parentId: this.props.parentId
            })
        }

        if ((editRead) && (readType === "post")) {
            for (var key in this.props.posts) {
                if (this.props.posts[key]['id'] === postId) {
                    var post = this.props.posts[key];
                    post.title = key
                    this.setState({
                        title: post.title
                    })
                    this.setState({
                        author: post.author
                    })
                    this.setState({
                        body: post.body
                    })
                    this.setState({
                        id: post.id
                    })
                    this.setState({
                        delete: post.delete
                    })
                }
            }
        }
        if ((editRead) && (readType === "comment")) {
            for (var key in this.props.comments) {
                if (this.props.comments[key]['id'] === postId) {
                    var post = this.props.comments[key];
                    this.setState({
                        title: "I am a comment"
                    })
                    this.setState({
                        author: post.author
                    })
                    this.setState({
                        body: post.body
                    })
                    this.setState({
                        id: post.id
                    })
                    this.setState({
                        delete: post.delete
                    })
                    this.setState({
                        parentDeleted: post.parentDeleted
                    })
                }
            }
        }

    }

    componentWillReceiveProps(newProps) {
        const {
            parentId
        } = this.props;

        if (newProps.postId === this.state.id) {
            for (var key in newProps.posts) {
                if (newProps.posts[key]['id'] === newProps.postId) {
                    var post = newProps.posts[key];
                    post.title = key
                    this.setState({
                        title: post.title
                    })
                    this.setState({
                        author: post.author
                    })
                    this.setState({
                        body: post.body
                    })
                    this.setState({
                        id: post.id
                    })
                    this.setState({
                        delete: post.delete
                    })
                }
            }
        }
        if (parentId) {
            this.setState({
                parentId: parentId
            })
        }
    }

    state = {
        title: "",
        author: "",
        body: "",
        id: "",
        deleted: "",
        parentDeleted: "",
        parentId: "",
    }

    textareaStyle = {
        width: 600,
        padding: '10px 8px',
        border: '1px solid rgba(39, 41, 43, .15)',
        borderRadius: 4,
        fontSize: 15
    }

    handlePostSubmit() {
        var emptyFld = false;
        var msg = ""

        if (this.state.title.length < 1) {
            emptyFld = true;
            msg = "title"
        }
        if (this.state.author.length < 1) {
            emptyFld = true;
            msg += ", author"
        }
        if (this.state.body.length < 1) {
            emptyFld = true;
            msg += ", body"
        }
        if (emptyFld) {
            window.alert("MISSING FIELDS: " + msg);
            return;
        }
        
        if (((this.props.editRead !== true) && (this.props.filter['filterCat'] === "all") && (this.props.readType === "post")) ||
            ((this.props.location) && (this.props.location.pathname === "/createPost") && (this.props.filter['filterCat'] === "all"))) {
            window.alert("Click on a category from above: ");
            return;
        }
    
        const uuidv4 = require('uuid/v1');
        var date = Date.now();
        var id = null;
        var category = null;
        this.state.id ? id = this.state.id : id = uuidv4();
        if (this.props.editRead !== true) {
            category = this.props.filter['filterCat'];
            console.log("Inside of CreateRead.js ... category === ", category)
        } else {
            category = this.props.editRead.category;
        }
        if (this.props.readType === "comment") {
            this.props.submitComment({
                title: this.state.title,
                author: this.state.author,
                body: this.state.body,
                id: id,
                timestamp: date,
                parentDeleted: this.state.parentDeleted,
                parentId: this.state.parentId
            })
            if (this.props.editRead) {
                ReadsAPI.updateComment(id, date, this.state.body);
            } else {
                ReadsAPI.comment(this.state.parentId, this.state.author, this.state.body, id, date).then(() => {})
            }
        } else {
            this.props.submitPost({
                title: this.state.title,
                author: this.state.author,
                body: this.state.body,
                id: id,
                timestamp: date,
                category: category,
                deleted: false
            })
            if (this.props.editRead) {
                ReadsAPI.updatePost(id, this.state.title, this.state.body);
            } else {
                ReadsAPI.post(this.state.title, this.state.author, this.state.body, id, date, this.props.category).then(() => {})
            }
        }

        this.setState({
            title: "",
            author: "",
            body: "",
            deleted: "",
            parentDeleted: "",
            parentId: "",
        });
        
        const history = createHistory()
        history.push('/');
        window.location.reload()
    }

    handleTitle(e) {
        this.setState({
            title: e
        })
    }

    handleAuthor(e) {
        this.setState({
            author: e
        })
    }

    handleBody(e) {
        this.setState({
            body: e
        })
    }

    render() {
        return ( < fieldset >
            < legend > {
                this.props.readType
            }: < /legend>
            Title: < input type = "text"
            name = "title"
            id = "exampleEmail"
            placeholder = "{id}"
            onChange = {
                (event) =>
                this.handleTitle(event.target.value)
            }
            value = {
                this.state.title
            }
            /><br/ >
            Author: < input type = "text"
            name = "author"
            id = "author"
            placeholder = "Publius"
            onChange = {
                (event) =>
                this.handleAuthor(event.target.value)
            }
            value = {
                this.state.author
            }
            /><br/ >
            < TextareaAutosize rows = {
                3
            }
            style = {
                this.textareaStyle
            }
            onChange = {
                (event) =>
                this.handleBody(event.target.value)
            }
            value = {
                this.state.body
            }
            placeholder = "What's on your mind? Post it here." / > < br / >
            < Button onClick = {
                this.handlePostSubmit
            } > Submit < /Button> < /fieldset >

        )
    }
}

function mapStateToProps(state, props) {
    return Object.assign({}, props, {
        posts: state.post,
        comments: state.comment,
        filter: state.filter
    });
}

function mapDispatchToProps(dispatch) {
    return {
        submitPost: (data) => dispatch(addPost(data)),
        submitComment: (data) => dispatch(addComment(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateRead)