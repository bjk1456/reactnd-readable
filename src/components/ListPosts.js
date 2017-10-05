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

  getPosts() {
    console.log("mapStateToProps.length is ... RENDER() ...", Object.keys(this.props.posts).length)
    if((Object.keys(this.props.posts).length > 0)) {
    for (var key in this.props.posts) {
        var val = this.props.posts[key]['category'];
        //console.log(val);
        console.log("Yuup");
        console.log(Object.keys(this.props.posts).hasOwnProperty('category'))
        if(this.props.posts[key]['category'] === this.props.match.params.cat) {
          console.log("IT IS A MATCH!!!!!! ", this.props.match.params.cat)
        }
    }
    
  }
  else {
    console.log("ELSE ... AND this.props.match.params.cat == ", this.props.match.params.cat);
    PostsAPI.getPostsCategory(this.props.match.params.cat).then((posts) => {
      if(posts !== undefined) {
        posts.map((post, None) =>
          this.props.submitPost({ title: post['title'], author: post['author'], body: post['body'], id: post['id'], timestamp: post['timestamp'], category: post['category'] }))
    }})
  }

  }

  componentWillReceiveProps(newProps){
    //console.log("The newProps.match.params.cat are ", newProps.match.params.cat)
    //this.getPosts()
  }

  componentDidMount(){
    //this.props.loadPosts(this.props.match.params.cat);
    console.log("mapStateToProps length is ", Object.keys(this.props.posts).length)
    //console.log("componentDidMount ... cat param == ", this.props.match.params.cat)
    //this.getPosts()


    /**
    this.props.posts.map((post) => {
      console.log("DUH post is ... ", post)
    })
    */

  }

  render() {
    console.log("Inside of ListPosts.js ... the cat is ", this.props.category )
    
    console.log("Inside of ListsPosts.js ... this.props.match.params.cat ", this.props.match.params.cat)

    console.log("this.props.posts == ", this.props.posts);
    //console.log("mapStateToProps ", this.state.post)
    /**
    if(this.state.posts) {
      console.log("mapStateToProps ", this.state.posts)
    }
    */
    return (
      <div className='list-posts'>
      <h1>Archives ({this.props.category})</h1>

       <CreatePost category={this.props.category}/>
       </div>
  )}
  }

const mapStateToProps = (state) => {
    return {
        posts: state.post
    };
};



function mapDispatchToProps (dispatch) {
  return {
    submitPost: (data) => dispatch(addPost(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPosts)
