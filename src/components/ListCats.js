import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import { connect } from 'react-redux'
import { addPost } from '../actions'
import * as PostsAPI from '../utils/PostsAPI'

import {
  ButtonGroup,
  Button
} from 'reactstrap';


class ListCats extends Component {
  static propTypes = {
    cats: PropTypes.array.isRequired,
    selectedCat: PropTypes.string,
    selectCategory: PropTypes.func.isRequired
  }

    componentDidMount(){
    
    console.log("INSIDE OF APP.JS!!!!!!!!")
    PostsAPI.getAllPosts().then((posts) => {
      console.log("The posts are ", posts)
      posts.map((post) => {
        console.log("The post is ", post)
        this.props.submitPost({ title: post['title'], author: post['author'], body: post['body'], id: post['id'], timestamp: post['timestamp'], category: post['category'], voteScore: post['voteScore'] })
      })
    })

      /**
      cats.map((cat, None) => {
        this.setState({cats: this.state.cats.concat( cat )})
    })})
    */
  }

  render() {
    const { cats, selectedCat, selectCategory } = this.props
    console.log("SELECTED CAT IS ", selectedCat)

    return (
            <div className="ListCats">
    {/* Standard button */}
    <ButtonGroup>
    {cats.map((cat) => (
    	
    	<Link to={"/category/" + cat.path} >
      <Button key={cat.name} id={cat.name} color="primary" onClick={() => selectCategory({cat})} active={cat.name === selectedCat}>{cat.name}</Button>
      </Link>
  ))}
        </ButtonGroup>

   
  </div>
  )}
  }

//export default ListCats

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
)(ListCats)