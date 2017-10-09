import React, { Component } from 'react';
import { Link, Route, Redirect } from 'react-router-dom'
import logo from './logo.svg';
import ListCats from './ListCats'
import Post from './Post'
import ListPosts from './ListPosts'
import { connect } from 'react-redux'
import { addPost } from '../actions'
import '.././App.css';
import * as PostsAPI from '../utils/PostsAPI'
import TiThumbsUp from 'react-icons/lib/ti/thumbs-up'
import { MediaObject, MediaObjectSection } from 'react-foundation';
import { Thumbnail, ThumbnailLink } from 'react-foundation';


import {
  Media,
  ButtonToolbar,
  Button
} from 'reactstrap';

class App extends React.Component {
  state = {
    cats: [],
    selectedCat: ""
  }
  
  componentDidMount(){
    PostsAPI.getCats().then((cats) => {
      this.setState({cats})})
  }

  selectCategory = (cat) => {
    console.log("The cat is ", cat['cat'].name)
    console.log("this.state.selectedCat == " + this.state.selectedCat )
    this.setState({selectedCat: cat['cat'].name})
  }
  
  render() {
    return (
<div>
     <ListCats cats={this.state.cats} selectCategory={this.selectCategory} selectedCat={this.state.selectedCat}/>
     <Route path="/" component={ListPosts}/>
</div>
  
    );
  }
}

export default App;

