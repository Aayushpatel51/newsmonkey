import React, { Component } from 'react'

export default class NewsItems extends Component {

    render() {
        let{title,description,image,url, author,date} = this.props;
        return (
            <div className="card">
            <img src={!image?"https://static.toiimg.com/thumb/msid-86095442,width-1070,height-580,imgsize-24672,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg":image} className="card-img-top" style={{height: "200px"}} alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-muted">By {author? author: "Unkown"} on {new Date(date).toGMTString()}</small></p>
                <a rel="noreferrer" href={url} target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
            </div>
        )
    }
}
