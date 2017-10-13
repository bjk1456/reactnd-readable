import React from 'react'
import { Button } from 'reactstrap';
import TextareaAutosize from 'react-autosize-textarea';
import { connect } from 'react-redux'
import { addPost, addComment } from '../actions'
import PropTypes from 'prop-types'
import * as PostsAPI from '../utils/PostsAPI'
import { Redirect } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'

class CreatePost extends React.Component {
  
  static propTypes = {
    postId: PropTypes.string,
    editPost: PropTypes.bool,
    postType: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.handlePostSubmit = this.handlePostSubmit.bind(this)
}
/**
static propTypes = {
    category: PropTypes.string
  }
*/
  componentDidMount(){
    console.log("Inside of CreatePost.js .... componentDIDMount()")

      	const {editPost, postId, postType} = this.props;
  	console.log("Create Post ... componentWillReceiveProps");
  	console.log(".........this.props.postType === ", this.props.postType);
  	console.log("Inside of CreatePost.js ... editPost == ", editPost);
  	console.log("Inside of CreatePost.js ... postId == ", postId);

  	  if(this.props.parentId){
  	console.log("88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888")
  	this.setState({parentId: this.props.parentId})
  }
  	
  	if ((editPost) && (postType === "post")) {
  	  console.log("!!!! Inside of CreatePost.js ... editPost == ", editPost);
  	  console.log("!!!! postId == ", postId);
  	  for(var key in this.props.posts) {
	      if (this.props.posts[key]['id'] === postId){
	        var post = this.props.posts[key];
	        post.title = key
	        console.log("INSIDE OF CreatePost.js ... The post is ", post)
	        this.setState({title: post.title})
	        this.setState({author: post.author})
	        this.setState({body: post.body})
	        this.setState({id: post.id})
	        this.setState({delete: post.delete})

	        //this.setCategory({category: post.category})
	    }
  }
  }
  if ((editPost) && (postType === "comment")) {
  	  console.log("!!!! Inside of CreatePost.js ... postTypes is comment ... editPost == ", editPost);
  	  console.log("!!!! postId == ", postId);
  	  for(var key in this.props.comments) {
  	  	if (this.props.comments[key]['id'] === postId){
	        var post = this.props.comments[key];
	        //post.title = key
	        console.log("INSIDE OF CreatePost.js ... The COMMENT is ", post)
	        this.setState({title: "I am a comment"})
	        this.setState({author: post.author})
	        this.setState({body: post.body})
	        this.setState({id: post.id})
	        this.setState({delete: post.delete})
			this.setState({parentDeleted: post.parentDeleted})
			

	        //this.setCategory({category: post.category})
	    }
  }
  }



}
  componentWillReceiveProps(newProps){
  	const {editPost, postId, postType, parentId} = this.props;
    console.log("Inside of CreatePost.js ... componentWillReceiveProps() ... newProps = ", newProps);
    console.log("newProps.postId === ", newProps.postId)
    console.log("this.state.id === ", this.state.id)
    console.log("newProps.posts === ", newProps.posts)
    console.log("postType === ", postType)

    if(newProps.postId === this.state.id) {
      for(var key in newProps.posts) {
	      if (newProps.posts[key]['id'] === newProps.postId){
	        var post = newProps.posts[key];
	        post.title = key
	        console.log("INSIDE OF CreatePost.js ... componentWillReceiveProps(newProps) ... The post is ", post)
	        this.setState({title: post.title})
	        this.setState({author: post.author})
	        this.setState({body: post.body})
	        this.setState({id: post.id})
	        this.setState({delete: post.delete})
	    }
  }
    }
    if(parentId){
    	console.log("999999999999999999999999 parentId === ", parentId);
    	this.setState({parentId: parentId})
    }

  
  }
  //const { cateogry } = this.props

  state = {
    title: "",
    author: "",
    body: "",
    id: "",
    deleted: "",
    parentDeleted: "",
    parentId: "",
  }

 textareaStyle = {
    width: 600,
    padding: '10px 8px',
    border: '1px solid rgba(39, 41, 43, .15)',
    borderRadius: 4,
    fontSize: 15
  }
  
  handlePostSubmit() {
  var emptyFld = false;
  var msg = ""

  if(this.state.title.length < 1){
    emptyFld = true;
    msg = "title"
  }
  if(this.state.author.length < 1){
    emptyFld = true;
    msg += ", author"
  }
  if(this.state.body.length < 1){
    emptyFld = true;
    msg += ", body"
  }
  if(emptyFld) {
  	window.alert("MISSING FIELDS: " + msg);
  	return;
  }
  /**
    if(this.props.editPost) {
  	console.log("The submit button was pressed and editPost is TRUE");
  }
  */
  console.log("this.props.editPost  ===== ", this.props.editPost )
  if((this.props.editPost != true) && (this.props.filter['filterCat'] === "all") && (this.props.postType === "post")) {
  	window.alert("Click on a category from above: ");
  	return;
  }

  const uuidv4 = require('uuid/v1');
  var date = Date.now();
  var id = null;
  var category = null;
  this.state.id ? id = this.state.id : id = uuidv4();
  if(this.props.editPost != true) {
  	category = this.props.filter['filterCat'];
  } else{
  	category = this.props.editPost.category;
  }

  console.log("Inside of CreatePost.js ... about to SUBMIT COMMENT!!!!!!!!!!!!!!!!! ... this.props.postType === ", this.props.postType)
  console.log("Inside of CreatePost.js ... about to SUBMIT COMMENT!!!!!!!!!!!!!!!!! ... the category is ", category)
  if(this.props.postType === "comment"){
  	this.props.submitComment({ title: this.state.title, author: this.state.author, body: this.state.body, id: id, timestamp: date, 
  	  parentDeleted: this.state.parentDeleted, parentId: this.state.parentId })
  	console.log("Inside of CreatePost.js ... about to SUBMIT COMMENT!!!!!!!!!!!!!!!!!")
  	if(this.props.editPost){
  		PostsAPI.updateComment(id, date, this.state.body );
  	} else {
  	  PostsAPI.comment(this.state.parentId, this.state.author, this.state.body, id, date).then(() => {
  })
  }
} else {
  this.props.submitPost({ title: this.state.title, author: this.state.author, body: this.state.body, id: id, timestamp: date, category: category,
  deleted: false }) 
  	//category: this.props.category, deleted: this.deleted, category: this.category, voteScore: this.voteScore });
  if(this.props.editPost){
      PostsAPI.updatePost(id, this.state.title, this.state.body );
  }else{
  	PostsAPI.post(this.state.title, this.state.author, this.state.body, id, date, this.props.category).then(() => {
  })
  }
}

  
  this.setState({
    title: "",
    author: "",
    body: "",
    deleted: "",
    parentDeleted: "",
    parentId: "",
  });

/**
   const history = createHistory()
   history.push('/');
   window.location.reload()
 */   
  }
  
  handleTitle(e) {
    this.setState({title: e})
  }

  handleAuthor(e) {
    this.setState({author: e})
  }

  handleBody(e) {
    this.setState({body: e})
  }

  render() {
  	console.log("INSIDE OF CREATEPOST ... this.props.postType", this.props.postType)
    return (
   <fieldset>
    <legend>{this.props.postType}:</legend>
    Title: <input type="text" name="title" id="exampleEmail" placeholder="{id}" onChange={(event) => 
          this.handleTitle(event.target.value)} value={this.state.title} /><br/>
    Author: <input type="text" name="author" id="author" placeholder="Publius" onChange={(event) => 
          this.handleAuthor(event.target.value)} value={this.state.author}/><br/>
    <TextareaAutosize
      rows={3}
      style={this.textareaStyle}
      onChange={(event) => 
          this.handleBody(event.target.value)}
      value={this.state.body}
      placeholder="What's on your mind? Post it here."/><br/>
      <Button onClick={this.handlePostSubmit}>Submit</Button>
    </fieldset>
	
  )
  }
}

function mapStateToProps(state, props) {
   return Object.assign({}, props, { 
    posts: state.post,
    comments: state.comment,
    filter: state.filter 
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
)(CreatePost)

//export default CreatePost