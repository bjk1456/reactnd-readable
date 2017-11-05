import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    connect
}
from 'react-redux'
import {
    addPost, addComment
}
from '../actions'
import '.././App.css';
import * as ReadsAPI from '../utils/ReadsAPI';
import TiThumbsUp from 'react-icons/lib/ti/thumbs-up';
import TiThumbsDown from 'react-icons/lib/ti/thumbs-down';
import TiDelete from 'react-icons/lib/ti/delete';

class ReadTools extends Component {
  static propTypes = {
    read: PropTypes.object,
    readType: PropTypes.string
  }

   handleUpVote = (event, readType, read) => {
        read.voteScore += 1;
        if (readType === "post") {
            this.props.submitPost(read)
            ReadsAPI.vote(read.id, "posts", "upVote").then(() => {})
        } else if (readType === "comment") {
            this.props.submitComment(read)
            ReadsAPI.vote(read.id, "comments", "upVote").then(() => {})
        }
    }

    handleDownVote = (event, readType, read) => {
        read.voteScore -= 1
        if (readType === "post") {
            this.props.submitPost(read)
            ReadsAPI.vote(read.id, "posts", "upVote").then(() => {})
        } else if (readType === "comment") {
            this.props.submitComment(read)
            ReadsAPI.vote(read.id, "comments", "upVote").then(() => {})
        }
    }

    handleDelete = (readType, read) => {
        read.deleted = "true";
        if (readType === "post") {
            this.props.submitPost(read)
            ReadsAPI.deleteRead(read.id, "posts").then(() => {})
        } else if (readType === "comment") {
            this.props.submitComment(read)
            ReadsAPI.deleteRead(read.id, "comments").then(() => {})
        }
    }

    renderNumComments(readType, readId) {
        if( readType === "post") {
        var numComments = 0;
        for (let key in this.props.comment) {
            if (this.props.comment[key]['parentId'] === readId) {
                numComments += 1;
                }
            }
        }
        return ( readType === "post" ? 
            < div > < label >Num Comments: {numComments}< /label > < /div > : null);
    }

render() {
	const { read, readType } = this.props
	return (
			<div>
			< button className = 'icon-btn'
                    onClick = {
                        (event) =>
                        this.handleUpVote(event, readType, read)
                    } >
                    < TiThumbsUp size = {
                        30
                    }
                    /> < /button> < button className = 'icon-btn'
                    onClick = {
                        (event) =>
                        this.handleDownVote(event, readType, read)
                    } >
                    < TiThumbsDown size = {
                        30
                    }
                    /> < /button> < label > Total Score: {
                        read.voteScore
                    } < /label> < div >
                    < button className = 'icon-btn'
                    onClick = {
                        (event) =>
                        this.handleDelete(readType, read)
                    } >
                    < TiDelete size = {
                        30
                    }
                    /> < /button> < label > timestamp: {
                        read.hmnRdDate
                    } < /label> < /div> 
                    { this.renderNumComments(readType, read.id) }
            </div>
				)
			}
		}

function mapStateToProps({post, comment}) {
    return {post, comment}
}

function mapDispatchToProps(dispatch) {
    return {
        submitPost: (data) => dispatch(addPost(data)),
        submitComment: (data) => dispatch(addComment(data)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReadTools)