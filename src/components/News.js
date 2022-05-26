import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  // document.title = `${capitalize(props.category)} - LethaLNews`

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=bae187f65c384d23bc91dcedaf8817f7&page=${page}&pagesize=${props.pageSize}`
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json()
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }
  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
  },[])

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=bae187f65c384d23bc91dcedaf8817f7&page=${page + 1}&pagesize=${props.pageSize}`
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  }

  return (
    <>
      <h1 className=' text-center' style={{margin: "35px, 0", marginTop: '90px'}}>LethaLNews - top headlines on {capitalize(props.category)} Category</h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((e, index) => {
              return (
                <div className="col-md-4" key={index}>
                  <Newsitem title={e.title ? e.title.slice(0, 45) : ''} description={e.description ? e.description.slice(0, 88) : ''} imageUrl={e.urlToImage} newsUrl={e.url} author={e.author ? e.author : 'unknown author'} date={e.publishedAt} source={e.source.name} />
                </div>
              )
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  )
}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News