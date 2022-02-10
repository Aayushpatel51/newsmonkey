import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {

    static defaultProps = {
        pageSize: 10,
        country: 'in'
    }

    static propTypes = {
        pageSize: PropTypes.number,
        country: PropTypes.string,
        category: PropTypes.string,
        filterValue: PropTypes.string
    }

    constructor(props) { 
        super(props);
        this.state = {
            articles: [],
            page: 1,
            loading: false,
            totalResults: 0,
            data: [
                {
                    "fname": "Jayne",
                    "lname": "Washington",
                    "email": "jaynewashington@exposa.com",
                    "gender": "female"
                },
                {
                    "fname": "Peterson",
                    "lname": "Dalton",
                    "email": "petersondalton@exposa.com",
                    "gender": "male"
                },
                {
                    "fname": "Velazquez",
                    "lname": "Calderon",
                    "email": "velazquezcalderon@exposa.com",
                    "gender": "male"
                }
            ]
        }   
    }

    async updateNews(){
        this.props.setProgress(0);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=425aff477fc943b2bc946a9aa0d0a00a&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true})
        this.props.setProgress(30);
        let data = await fetch(url)
        let parsedData = await data.json()
        this.props.setProgress(70);
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false})
        this.props.setProgress(100);
    }

    async componentDidMount(){
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=022e15b6dbbf4316996a20247fac5725&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true})
        // let data = await fetch(url)
        // let parsedData = await data.json()
        // this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false})
        this.updateNews();
    }
    // handlePrevPage= async ()=> {
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=022e15b6dbbf4316996a20247fac5725&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    //     // this.setState({loading: true})
    //     // let data = await fetch(url)
    //     // let parsedData = await data.json()
    //     // this.setState({articles: parsedData.articles,page: this.state.page - 1, loading: false})
    //     this.setState({page: this.state.page - 1});
    //     this.updateNews();
    // }
    // handleNextPage= async ()=>  {
    //     // if(this.state.page + 1 > Math.ceil( this.state.totalResults/this.props.pageSize)){

    //     // }else{
    //     //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=022e15b6dbbf4316996a20247fac5725&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //     //     this.setState({loading: true})
    //     //     let data = await fetch(url)
    //     //     let parsedData = await data.json()
    //     //     this.setState({articles: parsedData.articles,page: this.state.page + 1, loading: false})
    //     // }
    //     this.setState({page: this.state.page + 1});
    //     this.updateNews();
    // }
    fetchMoreData = async() => {
        this.setState({page: this.state.page + 1});
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=425aff477fc943b2bc946a9aa0d0a00a&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults})
      };


    render() {
        return (
           <>
               <h2 className="text-center my-4">NewsMonkey - {this.props.category.toUpperCase()}</h2>
               {this.state.loading && <Spinner/>}
               <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length !== this.state.totalResults}
                loader={<Spinner/>}
                >
                <div className="container">
               <div className="row my-3">
                    { 
                        this.state.articles.map((element)=>{
                        return <div className="col-md-4 my-3" key={element.url}>
                        <NewsItems title={element.title?element.title.slice(0, 40):""} description={element.description?element.description.slice(0,90):""} image={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt}  />
                   </div>
                    })}
               </div>
               </div>
               </InfiniteScroll>
               {/* <div className="container d-flex justify-content-between">
               <button type="button" disabled={this.state.page<=1} onClick={this.handlePrevPage} className="btn btn-dark">Prev</button>
               <button type="button" disabled={this.state.page>= Math.ceil( this.state.totalResults/this.props.pageSize)} onClick={this.handleNextPage} className="btn btn-dark">Next</button>
               </div> */}
           </>
        )
    }
}
