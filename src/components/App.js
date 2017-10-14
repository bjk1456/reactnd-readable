import React
from 'react';
import {
    Route
}
from 'react-router-dom'
import ListCats from './ListCats'
import ReadDetail from './ReadDetail'
import CreateRead from './CreateRead'
import ListReads from './ListReads'
import '.././App.css';
import * as ReadsAPI from '../utils/ReadsAPI'

class App extends React.Component {
    state = {
        cats: [],
        selectedCat: ""
    }

    componentDidMount() {
        ReadsAPI.getCats().then((cats) => {
            this.setState({
                cats
            })
        })
    }

    selectCategory = (cat) => {
        this.setState({
            selectedCat: cat['cat'].name
        })
    }

    render() {
        return ( < div >
            < ListCats cats = {
                this.state.cats
            }
            selectCategory = {
                this.selectCategory
            }
            selectedCat = {
                this.state.selectedCat
            }
            /> < Route exact path = "/"
            selectedCat = {
                this.state.selectedCat
            }
            component = {
                ListReads
            }
            /> < Route exact path = "/createPost"
            component = {
                CreateRead
            }
            /> < Route exact path = "/createComment"
            component = {
                CreateRead
            }
            /> < Route exact path = "/post/:postId"
            component = {
                ReadDetail
            }
            /> < Route exact path = "/post/comment/:commentId"
            component = {
                ReadDetail
            }
            /> < /div>
        );
    }
}

export default App;
