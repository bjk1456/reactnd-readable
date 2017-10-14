import React from 'react';
import {
    Link
}
from 'react-router-dom'
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
import {
    MediaObject, MediaObjectSection
}
from 'react-foundation';
import {
    Thumbnail
}
from 'react-foundation';
import TiThumbsUp from 'react-icons/lib/ti/thumbs-up';
import TiThumbsDown from 'react-icons/lib/ti/thumbs-down';
import TiDelete from 'react-icons/lib/ti/delete';
import PropTypes from 'prop-types'

class ListReads extends React.Component {
    static propTypes = {
        readType: PropTypes.string
    }

    handleUpVote = (event, readType, read) => {
        read.voteScore += 1;
        console.log("readType == ", readType);
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

    render() {
        var {
            readType
        } = this.props
        var readsToDsply = [];
        var reads = {};
        var hmnRdDate = new Date();

        if (readType === "comment") {
            reads = this.props.comments;
        } else {
            readType = "post"
            reads = this.props.posts;
        }
        for (var key in reads) {
            var post = reads[key];
            post.title = key
            if (('parentDeleted' in post) && (post.parentDeleted)) {
                post.deleted = true;
            }
            if (post.deleted === false) {
                hmnRdDate.setTime(new Date(post.timestamp));
                post.hmnRdDate = hmnRdDate.toUTCString();
                readsToDsply.push(post);
            }
        }

        var sortMeth = this.props.sortMethod['sortMethod'];
        readsToDsply.sort((a, b) => {
            if (sortMeth === "voteScore") {
                return b.voteScore - a.voteScore;
            }
            if (sortMeth === "timestamp") {
                return b.timestamp - a.timestamp;
            }
        })
        var filterCat = this.props.filterCategory['filterCat'];
        if (filterCat !== "all") {
            readsToDsply = readsToDsply.filter((post) => {
                return post.category === filterCat;
            })
        }

        return (
            < div className = 'list-posts' >
            < ul class = "list-unstyled" > {
                readsToDsply.map((read) => ( < li >
                    < MediaObject >
                    < MediaObjectSection >
                    < Thumbnail src = {
                        require('./pyle1.jpg')
                    }
                    /> < /MediaObjectSection> < MediaObjectSection isMain >
                    < h4 > {
                        read.title
                    } < /h4> < h6 > Author: {
                        read.author
                    } < /h6> < p > {
                        read.body
                    } < /p> < /MediaObjectSection> < MediaObjectSection isBottom >
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
                    } < /label> < /div> < div >
                    < Link to = {
                        readType + "/" + read.id
                    } > View Comments / Edit < /Link> < /div> < /MediaObjectSection> < /MediaObject> < /li>
                ))
            } < /ul>
            < /div>
        )
    }
}

function mapStateToProps(state, props) {
    return Object.assign({}, props, {
        posts: state.post,
        comments: state.comment,
        sortMethod: state.sort,
        filterCategory: state.filter,
    });
}

function mapDispatchToProps(dispatch) {
    return {
        submitPost: (data) => dispatch(addPost(data)),
        submitComment: (data) => dispatch(addComment(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListReads)