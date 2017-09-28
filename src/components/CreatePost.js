import React from 'react'
import { Button } from 'reactstrap';
import TextareaAutosize from 'react-autosize-textarea';
import { connect } from 'react-redux'
import { addPost } from '../actions'


class CreatePost extends React.Component {
	constructor(props) {
    super(props)
    //this.handlePostSubmit = this.handlePostSubmit.bind(this)
}
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
  /**
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
  }
  */

  handleTitle(e) {
  	console.log("The e is ", e)
    this.setState({title: e})
  }

  handleAuthor(e) {
  	console.log("The e is ", e);
    this.setState({author: e})
  }

  handleBody(e) {
  	console.log("The e is ", e);
    this.setState({body: e})
  }

  render() {
  	const { handlePostSubmit } = this.props
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
     <Button onClick={handlePostSubmit}>Submit</Button>
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
    handlePostSubmit: (data) => dispatch(addPost(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePost)

//export default CreatePost