import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import { connect } from 'react-redux'
import { addPost, changeSort, changeFilter } from '../actions'
import * as PostsAPI from '../utils/PostsAPI'
import { Switch } from 'react-foundation';

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
    
    console.log("INSIDE OF LISTCAT.JS!!!!!!!! ... componentWillReceiveProps")
    PostsAPI.getAllPosts().then((posts) => {
      console.log("The posts are ", posts)
      posts.map((post) => {
        console.log("The post is ", post)
        this.props.submitPost({ title: post['title'], author: post['author'], body: post['body'], id: post['id'], timestamp: post['timestamp'], category: post['category'], voteScore: post['voteScore'], deleted: post['deleted'] })
      })
    })
  }

  handleChangeSort = (event) => {
    this.props.changeSortMethod({ sortMethod: document.getElementById('selectSort').value })
    }

  handleFilterCategory = (cat) => {
    this.props.changeFilterCategory({ filterCat: cat['cat']['name'] })
    }

  render() {
    const { cats, selectedCat, selectCategory } = this.props
    console.log("SELECTED CAT IS ", selectedCat)

    return (
            <div className="ListCats">
    {/* Standard button */}
    <div> 
    <label>Categories:</label>
    <ButtonGroup>
    {cats.map((cat) => (
      <Button key={cat.name} id={cat.name} color="primary" onClick={(event) => this.handleFilterCategory({cat})} active={cat.name === selectedCat}>{cat.name}</Button>
  ))}
        </ButtonGroup> 
        <div> 
        <label>Sort Method:</label>
        <div>
          <select id="selectSort" onChange={(event) => 
         this.handleChangeSort(event) }>
            <option value="voteScore">Vote Score</option>
            <option value="timestamp">Time Stamp</option>
          </select>
        </div>
        </div>
        </div>
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
    submitPost: (data) => dispatch(addPost(data)),
    changeSortMethod: (data) => dispatch(changeSort(data)),
    changeFilterCategory: (data) => dispatch(changeFilter(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListCats)