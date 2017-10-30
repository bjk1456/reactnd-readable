import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import logo from './logo.svg';
import ListCats from './ListCats'
import Post from './Post'
import CreatePost from './CreatePost'
import '.././App.css';
import * as PostsAPI from '../utils/PostsAPI'


import {
  Media,
  ButtonToolbar,
  Button
} from 'reactstrap';

export default class CatView extends React.Component {

  render() {
  	console.log(this.props.match.params.cat)
    return (
    	<h1>Archives ({this.props.match.params.cat})</h1>
  )}
  }
