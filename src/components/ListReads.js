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
    addPost, addComment, changeFilter
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
        readType: PropTypes.string,
        readId: PropTypes.string
    }

    componentDidMount() {
        if((this.props.match) && (this.props.match.params.category)){
            this.props.changeFilterCategory({
                filterCat: this.props.match.params.category
            })
        }
        else{
            this.props.changeFilterCategory({
            filterCat: "all"
        })
        }
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
        console.log("this.props.comments === ", this.props.comments)
        for (let key in this.props.comments) {
            if (this.props.comments[key]['parentId'] === readId) {
                numComments += 1;
                }
            }
        }
        return ( readType === "post" ? 
            < div > < label >Num Comments: {numComments}< /label > < /div > : null);
    }

    render() {
        let {
            readType
        } = this.props
        let readsToDsply = [];
        let reads = {};
        let hmnRdDate = new Date();

        if (readType === "comment") {
            for (let key in this.props.comments) {
            if (this.props.comments[key]['parentId'] === this.props.readId) {
                reads[key] =  this.props.comments[key];
                }
            }
        } else {
            readType = "post"
            reads = this.props.posts;
        }
        for (let key in reads) {
            let post = reads[key];
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

        let sortMeth = this.props.sortMethod['sortMethod'];
        readsToDsply.sort((a, b) => {
            if (sortMeth === "voteScore") {
                return b.voteScore - a.voteScore;
            }
            if (sortMeth === "timestamp") {
                return b.timestamp - a.timestamp;
            }
        })
        let filterCat = this.props.filterCategory['filterCat'];
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
                    < /MediaObjectSection> < MediaObjectSection isMain >
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
                    } < /label> < /div> 
                    { this.renderNumComments(readType, read.id) }  
                    {
                    readType === "post" ? (
                        < div > 
                        < Link to = {
                            read.category + "/" + read.id
                        } > View Comments / Edit < /Link>
                        < /div >
                        ) : (
                        < div >
                        < Link to = {
                            readType + "/" + read.id
                        } > View Comments / Edit < /Link>
                        < /div >)} < /MediaObjectSection> < /MediaObject> < /li>
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
        submitComment: (data) => dispatch(addComment(data)),
        changeFilterCategory: (data) => dispatch(changeFilter(data)),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListReads)