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


import {
  Media,
  ButtonToolbar,
  Button
} from 'reactstrap';

class ListPosts extends React.Component {

  componentDidMount(){
    console.log("Inside of ListPosts.js ... posts are !!!!!!!!!!!!", this.props.posts);
  }

  handleUpVote = (e, post) => {
    console.log("handleUpVote pressed e == ", e);
    console.log("e.disabeled === ",e.disabeled)
    console.log("isItDisabeled??", e.disabeled)
    post.voteScore += 1
    console.log("The post is ", post)
    this.props.submitPost({ post: post })
    }

  render() {
    var dsplyPosts = false;
    var fetchAllPosts = false;
    var postsToDsply = []
    console.log("Inside of ListPosts.js ... render() ... this.props.match.url == ", this.props);



    if((this.props.match.params.cat) && (this.props.match.params.cat != "all")) {
      console.log("Inside of ListPosts.js ... and his.props.match.params.cat == ", this.props.match.params.cat);
      if (this.props.posts) {
      var match = null;
      for(var key in this.props.posts) {
        var pCat = this.props.posts[key]['category'];
        if(pCat === this.props.match.params.cat) {
          dsplyPosts = true;
          var match = this.props.posts[key]
          match.title = key
          postsToDsply.push(match)
        }
    }
  }
    }
    else if (this.props.match.params.cat = "all") {
      for(var key in this.props.posts) {
        var post = this.props.posts[key];
        post.title = key
        postsToDsply.push(post)
        dsplyPosts = true
    }
  }

    if (dsplyPosts) {
    return (

      <div className='list-posts'>
      <ul class="list-unstyled">
      {postsToDsply.map((post) => (
        <li>
      <MediaObject>
    <MediaObjectSection>
      <Thumbnail src={require('./pyle1.jpg')}/>
    </MediaObjectSection>
    <MediaObjectSection isMain>
      <h4>{post.title}</h4>
      <h6>Author: {post.author}</h6>
      <p>{post.body}</p>
    </MediaObjectSection>
     <MediaObjectSection isBottom>
       <button
         className='icon-btn'

         onClick={(event) => 
         this.handleUpVote(event, post) }>
         <TiThumbsUp size={30}/>
       </button>
    </MediaObjectSection>
  </MediaObject>
  </li>

       ))}
    </ul>
      <h1>Archives ({this.props.match.params.cat})</h1>

       <CreatePost category={this.props.match.params.cat}/>
       </div>
  )}
  else {
    return (null)
  } }
}

function mapStateToProps(state, props) {
   return Object.assign({}, props, { 
    posts: state.post 
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
