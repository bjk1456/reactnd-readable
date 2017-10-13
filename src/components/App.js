import React, { Component } from 'react';
import { Link, Route, Redirect } from 'react-router-dom'
import ListCats from './ListCats'
import ReadDetail from './ReadDetail'
import CreateRead from './CreateRead'
import ListReads from './ListReads'
import { addPost } from '../actions'
import '.././App.css';
import * as ReadsAPI from '../utils/ReadsAPI'
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
    ReadsAPI.getCats().then((cats) => {
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
     <Route exact path="/" selectedCat={this.state.selectedCat} component={ListReads} />
     <Route exact path="/createPost" component={CreateRead} />
      <Route exact path="/createComment" component={CreateRead} />
     <Route exact path="/post/:postId" component={ReadDetail}/>
     <Route exact path="/post/comment/:commentId" component={ReadDetail}/>
</div>
  
    );
  }
}

export default App;

