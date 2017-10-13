import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import logo from './logo.svg';
import ListCats from './ListCats'
import ListReads from './ListReads'
import CreateRead from './CreateRead'
import { connect } from 'react-redux'
import { addPost, addComment } from '../actions'
import '.././App.css';
import * as ReadsAPI from '../utils/ReadsAPI'
import { MediaObject, MediaObjectSection } from 'react-foundation';
import { Thumbnail, ThumbnailLink } from 'react-foundation';
import TiThumbsUp from 'react-icons/lib/ti/thumbs-up'
import TiThumbsDown from 'react-icons/lib/ti/thumbs-down'


import {
  Media,
  ButtonToolbar,
  Button
} from 'reactstrap';

class ReadDetail extends React.Component {

   state = {
    id: "",

  }

  componentDidMount(){
    var postPatt = /post/;
    var commPatt = /comment/
    var isPost = this.props.location.pathname.search(postPatt);
    var isComment = this.props.location.pathname.search(commPatt);

    console.log("Inside of ReadDetails.js ... !!!!!!!!!!!! ... this.props.match.params.postId === ", this.props.match.params.postId);
    console.log("... this.props.location.pathname == ", this.props.location.pathname);
    console.log("Inside of ReadDetails.js ... !!!!!!!!!!!! ... this.props.match.params.commentId === ", this.props.match.params.commentId)
    if(this.props.match.params.postId) {

      ReadsAPI.getCommentsPost(this.props.match.params.postId).then((comments) => {
        console.log("The comments are ", comments)
        comments.map((comment) => {
          this.props.submitComment({ title: comment['title'], author: comment['author'], body: comment['body'], id: comment['id'], timestamp: comment['timestamp'], 
            category: comment['category'], voteScore: comment['voteScore'], deleted: comment['deleted'], parentDeleted: comment['parentDeleted'],
            parentId: comment['parentId'] })})
        })
        this.setState({id: this.props.match.params.postId})
    
        /**
        posts.map((post) => {
          console.log("The post is ", post)
          this.props.submitPost({ title: post['title'], author: post['author'], body: post['body'], id: post['id'], timestamp: post['timestamp'], category: post['category'], voteScore: post['voteScore'], deleted: post['deleted'] })
        })
        */
      } else if (this.props.match.params.commentId) {
        this.setState({id: this.props.match.params.commentId})
      }


}

  componentWillReceiveProps(newProps){
    console.log("Inside of ReadDetail.js ... componentWillReceiveProps() ... newProps === ", newProps.match.params.postId);
    if(newProps.match.params.postId === this.state.id) {
      this.setState({id: this.props.match.params.postId})
    }


  }

  render() {
    console.log("Inside of ReadDetail.js render ... this.props.posts == ", this.props.posts);
    console.log("... this.props.match.params.postId === ", this.props.match.params.postId);
    console.log("?????????????????????????????? isPost === ", this.state.readType)
    var post = null;
    var postFound = false;
    var postType = "";
   
    if(this.props.match.params.postId) {
      postType = "post";
    for(var key in this.props.posts) {
      if (this.props.posts[key]['id'] === this.props.match.params.postId){
        post = this.props.posts[key];
        console.log("... before if post.delted ... post === ", post)
        if(post.deleted === false) {
          post.title = key
          postFound = true;
          
          console.log("INSIDE OF ReadDetail.js FOR LOOP ... The post is ", post)
        }
    }
  }
} else if (this.props.match.params.commentId){
      postType = "comment";
      for(var key in this.props.comments) {
      if (this.props.comments[key]['id'] === this.props.match.params.commentId){
        post = this.props.comments[key];
        console.log("... before if post.delted ... post === ", post)
        if(post.deleted === false) {
          post.title = key
          postFound = true;
          
          console.log("INSIDE OF ReadDetail.js FOR LOOP ... The COMMENT is ", post)
          console.log("What he said ... this.state.id === ", this.state.id)
        }
    }
  }

}




  if(postFound === true) {

    console.log("Inside of ReadDetail ... BY THE POWERS TO CREATE ... postType === ", postType);
    var postId = null;
    if (this.props.match.params.postId) {
      postId = this.props.match.params.postId
    } else if (this.props.match.params.commentId) {
      postId = this.props.match.params.commentId;
    }
    return (
    <div>
    <CreateRead postId={postId} editPost={true} postType={postType}/>
    {postType === "post" ? (
      <div>
      <hr width="300"/>
      <ListReads readType="comment"/>
      <div>
      <hr width="300"/>
      <label>Create a Comment:</label>
      <CreateRead editPost={false} postType={"comment"} parentId={postId}/>
      </div>
      </div>
    ) : (<div></div>)}
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
    comments: state.comment,
    sortMethod: state.sort,
    filterCategory: state.filter,
  });
}

function mapDispatchToProps (dispatch) {
  return {
    submitPost: (data) => dispatch(addPost(data)),
    submitComment: (data) => dispatch(addComment(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReadDetail)
