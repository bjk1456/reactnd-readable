import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import logo from './logo.svg';
import ListCats from './ListCats'
import Post from './Post'
import CatView from './CatView'
import CreatePost from './CreatePost'
import '.././App.css';
import * as PostsAPI from '../utils/PostsAPI'

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

      /**
      cats.map((cat, None) => {
        this.setState({cats: this.state.cats.concat( cat )})
    })})
    */
  }

  selectCategory = (cat) => {
    console.log("The cat is ", cat['cat'].name)
    console.log("this.state.selectedCat == " + this.state.selectedCat )
    this.setState({selectedCat: cat['cat'].name})
  }
    /**
    this.setState(prevState => {
      return {
        selectedCat: cat['cat'].name
      };
  })}
  */
  
  render() {
    
    return (

    
<div>
     <ListCats cats={this.state.cats} selectCategory={this.selectCategory} selectedCat={this.state.selectedCat}/>
     <CreatePost/>
     <Route path="/category/:cat" component={CatView}/>
     
      <Route path="/" render ={() => (

      <ul class="list-unstyled">
      <Link to={'category/cat'}>TEST</Link>
      
      
  <li class="media">
    <img src={require('./pyle1.jpg')} />
    <div class="media-body">
      <h5 class="mt-0 mb-1">List-based media object</h5>
      Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
    </div>
  </li>
  <li class="media my-4">
    <img src={require('./recall2.jpg')} />
    <div class="media-body">
      <h5 class="mt-0 mb-1">List-based media object</h5>
      Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
    </div>
  </li>
 
</ul>
 )}/>

           
            



</div>
  
    );
  }
}

export default App;
