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
  	//this.props.loadPosts(this.props.match.params.cat);
  	console.log("mapStateToProps ", this.props.posts)
  	/**
  	this.props.posts.map((post) => {
  		console.log("DUH post is ... ", post)
  	})
  	*/

  }

  render() {
  	console.log("Inside of ListPosts.js")
  	console.log(this.props.match.params.cat)
  	//console.log("mapStateToProps ", this.state.post)
  	/**
  	if(this.state.posts) {
  	  console.log("mapStateToProps ", this.state.posts)
  	}
  	*/
    return (
    	<div className='list-posts'>
    	<h1>Archives ({this.props.match.params.cat})</h1>

    	 <CreatePost category={this.props.match.params.cat}/>
    	 </div>
  )}
  }

function mapStateToProps(state) {
   return { posts: state.post };
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
