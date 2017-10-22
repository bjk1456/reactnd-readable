import React, {
    Component
}
from 'react';
import {
    Link
}
from 'react-router-dom'
import PropTypes from 'prop-types'
import {
    connect
}
from 'react-redux'
import {
    addPost, changeSort, changeFilter, addComment
}
from '../actions'
import * as ReadsAPI from '../utils/ReadsAPI'
import {
    ButtonGroup,
    Button
}
from 'reactstrap';

class ListCats extends Component {
    static propTypes = {
        cats: PropTypes.array.isRequired,
        selectedCat: PropTypes.string,
        selectCategory: PropTypes.func.isRequired
    }

    componentDidMount() {
        ReadsAPI.getAllPosts().then((posts) => {
            posts.map((post) => {
                this.props.submitPost({
                    title: post['title'],
                    author: post['author'],
                    body: post['body'],
                    id: post['id'],
                    timestamp: post['timestamp'],
                    category: post['category'],
                    voteScore: post['voteScore'],
                    deleted: post['deleted']
                })
                ReadsAPI.getCommentsPost(post['id']).then((comments) => {
                    comments.map((comment) => {
                    this.props.submitComment({
                        title: comment['title'],
                        author: comment['author'],
                        body: comment['body'],
                        id: comment['id'],
                        timestamp: comment['timestamp'],
                        category: comment['category'],
                        voteScore: comment['voteScore'],
                        deleted: comment['deleted'],
                        parentDeleted: comment['parentDeleted'],
                        parentId: comment['parentId']
                    })
                })
              })
            })
        })
    }

    handleChangeSort = (event) => {
        this.props.changeSortMethod({
            sortMethod: document.getElementById('selectSort').value
        })
    }

    handleFilterCategory = (cat) => {
        this.props.changeFilterCategory({
            filterCat: cat['cat']['name']
        })
    }

    render() {
        const {
            cats, selectedCat
        } = this.props
        return ( < div className = "ListCats" > { /* Standard button */ } <div>
            < label > Categories: < /label> < ButtonGroup > {
            cats.map((cat) => ( < Button key = {
                    cat.name
                }
                id = {
                    cat.name
                }
                color = "primary"
                onClick = {
                    (event) => this.handleFilterCategory({
                        cat
                    })
                }
                active = {
                    cat.name === selectedCat
                } > {
                    cat.name
                } < /Button>
            ))
        } < /ButtonGroup>  <div> <div> < Link to = "/createPost" > Create Post < /Link>  <div> < label > Sort Method: < /label > </div> <div> < select id = "selectSort"
        onChange = {
                (event) =>
                this.handleChangeSort(event)
            } >
            < option value = "voteScore" > Vote Score < /option> < option value = "timestamp" > Time Stamp < /option > < /select> </div> </div> </div> < /div> </div>
    )
}
}

function mapStateToProps(state, props) {
    return Object.assign({}, props, {
        posts: state.post
    });
}

function mapDispatchToProps(dispatch) {
    return {
        submitPost: (data) => dispatch(addPost(data)),
        changeSortMethod: (data) => dispatch(changeSort(data)),
        changeFilterCategory: (data) => dispatch(changeFilter(data)),
        submitComment: (data) => dispatch(addComment(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListCats)
