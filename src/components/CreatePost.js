import React from 'react'
import { Button } from 'reactstrap';
import TextareaAutosize from 'react-autosize-textarea';
import { connect } from 'react-redux'
import { addPost } from '../actions'
import PropTypes from 'prop-types'
import * as PostsAPI from '../utils/PostsAPI'



class CreatePost extends React.Component {
	constructor(props) {
    super(props)
    this.handlePostSubmit = this.handlePostSubmit.bind(this)
}
static propTypes = {
    category: PropTypes.string
  }

  //const { cateogry } = this.props

  state = {
    title: "",
    author: "",
    body: "",
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
  	window.alert("MISSING FIELDS: " + msg)
  }
  const uuidv4 = require('uuid/v4');
  var date = Date.now();
  var id = uuidv4();
  this.props.submitPost({ title: this.state.title, author: this.state.author, body: this.state.body, id: id, timestamp: date, category: this.props.category });
  PostsAPI.post(this.state.title, this.state.author, this.state.body, id, date, this.props.category).then(() => {
  })
  
  this.setState({
    title: "",
    author: "",
    body: "",
  });
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
    return (
   <fieldset>
    <legend>Post:</legend>
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

function mapStateToProps ({ post }) {
  return {
  	post
  };
}
function mapDispatchToProps (dispatch) {
  return {
    submitPost: (data) => dispatch(addPost(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePost)

//export default CreatePost