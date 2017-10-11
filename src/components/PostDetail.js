import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import logo from './logo.svg';
import ListCats from './ListCats'
import Post from './Post'
import CreatePost from './CreatePost'
import { connect } from 'react-redux'
import { addPost } from '../actions'
import '.././App.css';
import * as PostsAPI from '../utils/PostsAPI'
import { MediaObject, MediaObjectSection } from 'react-foundation';
import { Thumbnail, ThumbnailLink } from 'react-foundation';
import TiThumbsUp from 'react-icons/lib/ti/thumbs-up'
import TiThumbsDown from 'react-icons/lib/ti/thumbs-down'


import {
  Media,
  ButtonToolbar,
  Button
} from 'reactstrap';

class ListPosts extends React.Component {

  componentDidMount(){
    console.log("Inside of ListPosts.js ... posts are !!!!!!!!!!!!", this.props.posts);
  }

  componentWillReceiveProps(){
    console.log("Inside of PostDetail.js ... componentWillReceiveProps()");
  }

  handleUpVote = (e, post) => {
    post.voteScore += 1
    this.props.submitPost(post)
    }

  handleDownVote = (e, post) => {
    post.voteScore -= 1
    this.props.submitPost(post)
    }

  render() {
    var post = null;
    var postFound = false;
    for(var key in this.props.posts) {
      if (this.props.posts[key]['id'] === this.props.match.params.postId){
        post = this.props.posts[key];
        post.title = key
        postFound = true;
        console.log("INSIDE OF PostDetail.js ... The post is ", post)
    }
  }

  if(postFound === true) {
    return (
    <div>
    <CreatePost postId={this.props.match.params.postId} editPost={true}/>
    <div>
      <h1>Archives ({this.props.match.params.postId})</h1>
    </div>
    </div>
  )
} else {
  return (null)
}
}
}

function mapStateToProps(state, props) {
   return Object.assign({}, props, { 
    posts: state.post,
    sortMethod: state.sort,
    filterCategory: state.filter,
  });
}

function mapDispatchToProps (dispatch) {
  return {
    submitPost: (data) => dispatch(addPost(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPosts)
