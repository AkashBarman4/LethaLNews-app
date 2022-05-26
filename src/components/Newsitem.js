import React from 'react'

const Newsitem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
        <div className='my-4'>
            <div className="card" style={{ width: '18rem' }}>
                <img src={imageUrl ? imageUrl : 'https://cdn.pixabay.com/photo/2015/02/15/09/33/news-636978_1280.jpg'} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title} .....
                        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-success" style={{ left: '90%', zIndex: '1' }}>
                            {source}
                        </span>
                    </h5>
                    <p className="card-text">{description} .....</p>
                    <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toLocaleDateString()} {new Date(date).toLocaleTimeString()}</small></p>
                    <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        </div>
    )
}

export default Newsitem