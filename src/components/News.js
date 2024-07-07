import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {


    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string,
        pageSize: PropTypes.number
    }


    static defaultProps = {
        country: "in",
        category: "general",
        pageSize: 9,
        hasError: "False"
    }



    constructor(props) {
        super();
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0,
            hasError: "False"
        }
    }


    // async UpdateNews() {
    //     let api = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category
    // =${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    //     console.log(api)

    //     this.setState({
    //         loading: true,
    //         articles: ""
    //     })

    //     let data = await fetch(api);
    //     let parsedData = await data.json()
    //     this.setState({
    //         articles: parsedData.articles,
    //         loading: false,
    //         totalResults: parsedData.totalResults
    //     })
    // }

    async componentDidMount() {
        let api = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;

        let data = await fetch(api);
        let parsedData = await data.json()
        this.setState({
            articles: parsedData.articles,
            loading: false,
            page: this.state.page + 1,
            totalResults: parsedData.totalResults,
            hasError: "False"
        })
    }



    fetchMoreData = async () => {
        // if (this.state.articles.length != this.state.totalResults) {
        //     this.setState({ hasMore: false });
        //     return;
        // }

        console.log(this.state.page)
        // var pageOut = this.state.page+1
        this.setState({
            page: this.state.page + 1
            // page: pageOut
        })
        console.log(this.state.page)

        let api = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
        console.log(api)

        let data = await fetch(api);
        console.log(data.status)

        if (data.status === 426) {
            this.setState({
                hasError: "True",
                loading: false
            })
        } else if ((data.status >= 200) && (data.status <= 299)) {
            let parsedData = await data.json()
            this.setState({
                articles: this.state.articles.concat(parsedData.articles),
                loading: false,
                totalResults: parsedData.totalResults,
                hasError: "False"
            })
        }

    }


    render() {


        return (
            <>
                <h1 className='text-center' style={{ marginBottom: "1rem" }}>NewsMonkey - Top Headlines</h1>
                {this.state.loading === true ? <Spinner /> : null}
                {console.log(this.state.hasError === "False" ? false : true)}
                <InfiniteScroll
                    dataLength={this.state.articles}
                    next={this.fetchMoreData}
                    // hasMore={(this.state.articles.length < this.state.totalResults) || (this.hasError === false)}
                    hasMore={this.state.hasError === "True" ? false : true}
                    loader={this.state.hasError === "True" ?  null:<Spinner />}
                >

                    <div className="container">
                        <div className="row">
                            {!this.state.loading && this.state.articles.map((element) => {
                                return <div key={element.url} className="col-md-4" style={{ marginBottom: "1rem" }}>
                                    <NewsItem title={!element.title ? "Null" : element.title} description={element.description} imageUrl={element.urlToImage} url={element.url} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </ >
        )
    }
}

export default News

