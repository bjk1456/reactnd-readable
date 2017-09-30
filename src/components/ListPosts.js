import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import logo from './logo.svg';
import ListCats from './ListCats'
import Post from './Post'
import CreatePost from './CreatePost'
import '.././App.css';
import * as PostsAPI from '../utils/PostsAPI'


import {
  Media,
  ButtonToolbar,
  Button
} from 'reactstrap';

export default class ListPosts extends React.Component {

  componentDidMount(){
  	PostsAPI.getPostsCategory(this.props.match.params.cat).then((posts) => {
  	  if(posts !== undefined) {
  	    posts.map((post, None) =>
  	  	  console.log("The post is " + post))
  	}})

      /**
      cats.map((cat, None) => {
        this.setState({cats: this.state.cats.concat( cat )})
    })})
    */
  }

  render() {
  	console.log(this.props.match.params.cat)
    return (
    	<div className='list-posts'>
    	<h1>Archives ({this.props.match.params.cat})</h1>

    	 <CreatePost category={this.props.match.params.cat}/>
    	 </div>
  )}
  }
