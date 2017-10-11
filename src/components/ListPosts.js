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

  handleUpVote = (e, post) => {
    post.voteScore += 1
    this.props.submitPost(post)
    }

  handleDownVote = (e, post) => {
    post.voteScore -= 1
    this.props.submitPost(post)
    }

  render() {
    var postsToDsply = []

    for(var key in this.props.posts) {
      var post = this.props.posts[key];
        post.title = key
        postsToDsply.push(post)
    }
      console.log("postsToDsply == ", postsToDsply);
      var sortMeth = this.props.sortMethod['sortMethod'];
      postsToDsply.sort((a,b) => {
        if (sortMeth === "voteScore") {
          return b.voteScore - a.voteScore;
        }
        if (sortMeth === "timestamp") {
          return b.timestamp - a.timestamp;
    }})
      var filterCat = this.props.filterCategory['filterCat'];
      if(filterCat !== "all") {
        console.log("The filter cat is ", filterCat);
        postsToDsply = postsToDsply.filter((post) => {
          return post.category === filterCat;
        })}

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
      <button
         className='icon-btn'
         onClick={(event) => 
         this.handleDownVote(event, post) }>
         <TiThumbsDown size={30}/>
       </button>
       <label>Total Score: {post.voteScore} </label>
       <div>
         <Link to={"post/" + post.id}>View Comments/Edit</Link>
       </div>
    </MediaObjectSection>
  </MediaObject>
  </li>

       ))}
    </ul>
      <h1>Archives ({this.props.match.params.cat})</h1>

       
       </div>
  )
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
