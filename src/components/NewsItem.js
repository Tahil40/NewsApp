import React, {Component} from "react";

export class NewsItem extends Component{
    render(){
        // Destructioring..........
        let {title, description, image_url, news_url, author, publishedAt, source} = this.props;
        return(
            <>      
            <div className="card_container">
                <div className="card" style={{width: "18rem"}}>
                    <img src={image_url} className="card-img-top" alt="Loading..."/>
                    <div className="card-body">
                      <h5 className="card-title">{title}</h5>
                      <p className="card-text">{description}</p>
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {source}      
                        <span className="visually-hidden">unread messages</span>
                      </span>
                      <p className="card-text"><small className="text-muted">By {author} on {publishedAt}</small></p>
                      <a href={news_url} className="btn btn-dark">Read More</a>
                    </div>
                </div>
            </div>
            </>
        );
    }
}