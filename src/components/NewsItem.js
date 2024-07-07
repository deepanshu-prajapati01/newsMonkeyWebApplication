import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, url } = this.props;
        return (
            <>
                <div className="card" style={{height: "100%" }}>
                    <img src={imageUrl != null ? imageUrl : "https://img.freepik.com/premium-vector/check-out-mini-doodle-illustration-showing-error-found-concept_67813-13769.jpg?w=740"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}...</p>
                        <a href={url} target='_blank' rel="noreferrer" className="btn btn-dark d-flex justify-content-center "><span>Read More</span></a>
                    </div>
                </div>
            </>
        )
    }
}

export default NewsItem
