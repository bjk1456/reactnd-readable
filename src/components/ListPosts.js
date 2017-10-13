import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import logo from './logo.svg';
import ListCats from './ListCats'
import Post from './Post'
import CreatePost from './CreatePost'
import { connect } from 'react-redux'
import { addPost, addComment } from '../actions'
import '.././App.css';
import * as PostsAPI from '../utils/PostsAPI';
import { MediaObject, MediaObjectSection } from 'react-foundation';
import { Thumbnail, ThumbnailLink } from 'react-foundation';
import TiThumbsUp from 'react-icons/lib/ti/thumbs-up';
import TiThumbsDown from 'react-icons/lib/ti/thumbs-down';
import TiDelete from 'react-icons/lib/ti/delete';
import PropTypes from 'prop-types'


import {
  Media,
  ButtonToolbar,
  Button
} from 'reactstrap';

class ListPosts extends React.Component {
    static propTypes = {
    readType: PropTypes.string
  }

  componentDidMount(){
    console.log("Inside of ListPosts.js ... posts are !!!!!!!!!!!!", this.props.posts);
  }

  handleUpVote = (event, readType, read) => {
    read.voteScore += 1;
    console.log("readType == ", readType);
  if(readType === "post") {
    this.props.submitPost(read)
    PostsAPI.vote(read.id, "posts", "upVote").then(() => {
  })
  } else if (readType === "comment") {
    this.props.submitComment(read)
    PostsAPI.vote(read.id, "comments", "upVote").then(() => {
  })
    }
  }

  handleDownVote = (event, readType, read) => {
    read.voteScore -= 1
  if(readType === "post") {
    this.props.submitPost(read)
    PostsAPI.vote(read.id, "posts", "upVote").then(() => {
  })
  } else if (readType === "comment") {
    this.props.submitComment(read)
    PostsAPI.vote(read.id, "comments", "upVote").then(() => {
  })
    }
    }

  handleDelete = (readType, read) => {
    read.deleted = "true";
    if(readType === "post") {
      this.props.submitPost(read)
      PostsAPI.deleteRead(read.id, "posts").then(() => {
      })
    } else if (readType === "comment") {
      this.props.submitComment(read)
      PostsAPI.deleteRead(read.id, "comments").then(() => {
      })
    }
  }

  render() {
    var { readType } = this.props
    console.log("Inside of ListPosts.js ... render() ... readType == ", readType);
    var readsToDsply = [];
    var reads = {};
    var hmnRdDate = new Date();

    if(readType === "comment"){
      console.log("readType is comment");
      reads = this.props.comments;
      console.log("reads === ", reads);
    } else {
      readType = "post"
      reads = this.props.posts;
    }
    for(var key in reads){
      console.log("Inside of ListPosts.js for loop ... key == ", key)
      var post = reads[key];
        post.title = key
        if(('parentDeleted' in post) && (post.parentDeleted)) {
          post.deleted = true;
        }
        if(post.deleted === false) {
          hmnRdDate.setTime(new Date(post.timestamp));
          post.hmnRdDate = hmnRdDate.toUTCString();
          readsToDsply.push(post);
        }
    }
      console.log("readsToDsply == ", readsToDsply);
      var sortMeth = this.props.sortMethod['sortMethod'];
      readsToDsply.sort((a,b) => {
        if (sortMeth === "voteScore") {
          return b.voteScore - a.voteScore;
        }
        if (sortMeth === "timestamp") {
          return b.timestamp - a.timestamp;
    }})
      var filterCat = this.props.filterCategory['filterCat'];
      if(filterCat !== "all") {
        console.log("The filter cat is ", filterCat, " before filter applied readsToDsply == ", readsToDsply);
        readsToDsply = readsToDsply.filter((post) => {
          return post.category === filterCat;
        })}

        console.log("Inside of ListPosts.js ... readsToDsply == ", readsToDsply)
        console.log("still inside ListPosts.js ... ... about to return .... readType == ", readType);

    return (

      <div className='list-posts'>
      <ul class="list-unstyled">
      {readsToDsply.map((read) => (
        <li>
      <MediaObject>
    <MediaObjectSection>
      <Thumbnail src={require('./pyle1.jpg')}/>
    </MediaObjectSection>
    <MediaObjectSection isMain>
      <h4>{read.title}</h4>
      <h6>Author: {read.author}</h6>
      <p>{read.body}</p>
    </MediaObjectSection>
     <MediaObjectSection isBottom>
       <button
         className='icon-btn'
         onClick={(event) => 
         this.handleUpVote(event, readType, read) }>
         <TiThumbsUp size={30}/>
       </button>
      <button
         className='icon-btn'
         onClick={(event) => 
         this.handleDownVote(event, readType, read) }>
         <TiThumbsDown size={30}/>
       </button>
       <label>Total Score: {read.voteScore} </label>
       <div>
       <button
         className='icon-btn'
         onClick={(event) => 
         this.handleDelete(readType, read) }>
         <TiDelete size={30}/>
       </button>
       <label>timestamp: {read.hmnRdDate}</label>
       </div>
       <div>
         <Link to={readType + "/" + read.id}>View Comments/Edit</Link>
       </div>
    </MediaObjectSection>
  </MediaObject>
  </li>

       ))}
    </ul>


       
       </div>
  )
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
)(ListPosts)
