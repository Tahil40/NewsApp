import React, {Component} from "react";
import { NewsItem } from "./NewsItem";

export class Categories_news extends Component{
    constructor(){
        super();
        this.state = {
            article: [], 
            loading: false, 
            page: 1,
            totalresults: 0
        }
    }

    async componentDidMount(){
        this.props.set_progress(10); 
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api_key}`; 
        let data = await fetch(url);
        let parsed_data = await data.json(data);
            this.setState({
                article: parsed_data.articles,
                loading:true,
                totalresults: parsed_data.totalResults  
        });
        this.props.set_progress(100);
    }

    render(){
        return(
            <>            
            <div className="my-3 mx-3">       
                <h1 className="text-center" style={{marginTop:"70px"}}>NewsApp - {this.props.heading}</h1>
                <div className="row">
                    {this.state.totalresults > 0 ? !this.state.loading && this.state.article.map((element)=>{
                        console.log(element);
                        return <div className="col-md-4 my-4" key={element.url}>
                            <NewsItem title={element.title} description={element.description} image_url={element.urlToImage} news_url={element.url}/>
                            </div>

                    }) : <h2 className="text-center" style={{marginTop:"80px"}}>No News Found</h2>}
                    {/* <div className="col-md-4 my-4">
                        <NewsItem/>
                    </div>
                    <div className="col-md-4 my-4">
                        <NewsItem/>
                    </div>
                    <div className="col-md-4 my-4">
                        <NewsItem/>
                    </div> */}
                </div>
            </div>

            <hr className="mx-3 my-2"/>
            <div className="my-3 mx-3 d-flex justify-content-between">
                <button className="btn btn-dark" disabled={this.state.totalresults=0}>&larr; Previous</button>
                <button className="btn btn-dark" disabled={this.state.totalresults=0}>Next &rarr;</button>
            </div>
            </>
        );
    }
}