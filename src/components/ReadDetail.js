import React from 'react';
import ListReads from './ListReads'
import CreateRead from './CreateRead'
import {
    connect
}
from 'react-redux'
import {
    addPost
}
from '../actions'
import '.././App.css';

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

    handlePost() {
      let postFound = null;
      
            for (let key in this.props.posts) {
                if (this.props.posts[key]['id'] === this.props.match.params.postId) {
                    let post = this.props.posts[key];
                    if (post.deleted === false) {
                        post.title = key
                        if(this.props.match.params.category === post.category) {
                            postFound = post;
                        }
                    }
                }
            }
            return postFound;
    }

    handleComment() {
      let commentFound = null;
      for (let key in this.props.comments) {
        if (this.props.comments[key]['id'] === this.props.match.params.commentId) {
            let comment = this.props.comments[key];
            if (comment.deleted === false) {
              comment.title = key
              commentFound = comment;
                          }
                      }
                  }
      return commentFound;
    }

    render() {
        let post = null;
        let postFound = false;
        let readType = "";

        if (this.props.match.params.postId) {
            post = this.handlePost()
            if(post){
              postFound = true;
              readType = "post";
            }
            console.log("post === ", post)
        } else if (this.props.match.params.commentId) {
            post = this.handleComment();
            if(post){
              postFound = true;
              readType = "comment";  
            }
        }

        if (postFound === true) {
            let postId = null;
            if (this.props.match.params.postId) {
                postId = this.props.match.params.postId
            } else if (this.props.match.params.commentId) {
                postId = this.props.match.params.commentId;
            }
            return ( <div>
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
                readType === "post" ? ( <div>
                    < hr width = "300" / >
                    < ListReads readType = "comment" readId = {postId} / >
                    <div>
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
                /> < /div > </div>
            ): ( <div> < /div>)} < /div > )
        } else {
     return ( < div >
      < h3 > 404 page not found < /h3> < p > We are sorry but the component you are looking
      for does not exist. < /p> < /div>) }
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