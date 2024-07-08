import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    // const [totalResults, setTotalResults] = useState(0)
    const [hasError, setHasError] = useState("False")


    const updateNews = async () => {
        props.setProgress(20)
        let api = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`;
        let data = await fetch(api);
        props.setProgress(40)

        let parsedData = await data.json()
        props.setProgress(60)
        setArticles(parsedData.articles)
        setLoading(false)
        // setTotalResults(parsedData.totalResults)
        setHasError("False")
        props.setProgress(100)
    }


    useEffect(() => {
        updateNews()
    }, [])

    const fetchMoreData = async () => {
        let api = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page + 1}`;
        setPage(page + 1)

        let data = await fetch(api);

        if ((data.status >= 200) && (data.status <= 299)) {
            let parsedData = await data.json()
            setArticles(articles.concat(parsedData.articles))
            setLoading(false)
            // setTotalResults(parsedData.totalResults)
            setHasError("False")
        }
        else {
            if (data.status === 426 || data.status === 429) {
                console.log(`ERROR CODE: ${data.status}`)
                console.log(data.statusText)
            }
            setHasError("True")
            setLoading(false)
        }

    }





    return (
        <>
            <h1 className='text-center' style={{ margin: "1rem" }}>NewsMonkey - Top Headlines</h1>
            {/* {loading === true ? <Spinner /> : null} */}
            <InfiniteScroll
                dataLength={articles}
                next={fetchMoreData}
                // hasMore={(articles.length < totalResults) || (this.hasError === false)}
                hasMore={hasError === "True" ? false : true}
                loader={hasError === "True" ? null : <Spinner />}
            >

                <div className="container">
                    <div className="row">
                        {!loading && articles.map((element) => {
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



News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number
}


News.defaultProps = {
    country: "in",
    category: "general",
    pageSize: 9,
    hasError: "False"
}


export default News

