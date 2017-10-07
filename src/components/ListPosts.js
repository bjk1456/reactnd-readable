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


import {
  Media,
  ButtonToolbar,
  Button
} from 'reactstrap';

class ListPosts extends React.Component {

  componentDidMount(){
    console.log("Inside of ListPosts.js ... posts are !!!!!!!!!!!!", this.props.posts);
  }

  render() {
    var matchFound = false;
    var matches = []
    if (this.props.posts) {
      var match = null;
      for(var key in this.props.posts) {
        var pCat = this.props.posts[key]['category'];
        if(pCat === this.props.match.params.cat) {
          matchFound = true;
          var match = this.props.posts[key]
          match.title = key
          matches.push(match)
        }
    }
  }
    if (matchFound) {
    return (

      <div className='list-posts'>
      <ul class="list-unstyled">
      {matches.map((match) => (
       <li class="media">
         <img src={require('./pyle1.jpg')} />
         
        <h5 class="mt-0 mb-1">{match.title}</h5>

        <h9 class="mt-0 mb-2">Author: {match.author}</h9>
        <div class="media-body">
        {match.body}
       </div>
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
