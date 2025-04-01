import React, { Component} from "react";
import { NewsItem } from "./NewsItem";
import { Spinner } from "./spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  // creating constructor..........
  constructor() {
    super();
    //defining state...........
    this.state = {
      article: [],
      loading: false,   
      page: 1,
      totalResults: 0,
    };
  }

  // using LifeCycleMethod............
  async componentDidMount() {
    this.props.set_progress(10);
    //fetching data from news api.........
    let url = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${this.props.api_key}`;
    let data = await fetch(url);
    let parse_data = await data.json();
    //initializing the state.........
    this.setState({
      article: parse_data.articles || [],
      totalResults: parse_data.totalResults || 0,
    });

    this.props.set_progress(100); 
  }

  previous_button_method = async () => {
    let previous_url = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${this.props.api_key}&page=${
      this.state.page - 1
    }&pageSize=${this.props.page_size}`;
    this.setState({ loading: true });
    let previous_data = await fetch(previous_url);
    let previous_parsed_data = await previous_data.json();
    this.setState({
      page: this.state.page - 1,
    });
    this.setState({
      article: previous_parsed_data.articles,
      loading: false,
    });
  };

  next_button_method = async () => {
    if (
      this.state.page + 1 >
      Math.ceil(this.state.totalResults / this.props.page_size)
    ) {
    } else {
      let next_url = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${this.props.api_key}&page=${
        this.state.page + 1
      }&pageSize=${this.props.page_size}`;
      this.setState({ loading: true });
      let next_data = await fetch(next_url);
      let next_parse_data = await next_data.json();
      this.setState({
        page: this.state.page + 1,
      });
      this.setState({
        article: next_parse_data.articles,
        loading: false,
      });
    }
  };

  render() {
    return (
      <>
        {/* Adding NewsItem in News........ */}
        <div className="container my-3">
          <h1 className="text-center" style={{margin: "60px", marginTop: "70px"}}>NewsApp - Top Headlines</h1>

          {/* Adding loading functionality....... */}
          {/* {this.state.loading && <Spinner />} */}

          {/* Adding infinite scroll functionality..... */}
          <InfiniteScroll
            dataLength={this.state.article ? this.state.article.length : 0}   
            next={this.fetchMoreData}
            hasMore={this.state.article && this.state.article.length !== this.state.totalResults}
            loader={this.state.loading && <Spinner />}
          >     
            <div className="row">
              {this.state.totalResults > 0 ? !this.state.loading && this.state.article.map((element) => {
                  return (
                    <div className="col-md-4 my-4" key={element.url}>
                      <NewsItem
                        title={element.title ? element.title.slice(0, 30) : ""}
                        description={
                          element.description
                            ? element.description.slice(0, 95)
                            : ""
                        }
                        image_url={
                          element.urlToImage
                            ? element.urlToImage
                            : "https://as1.ftcdn.net/v2/jpg/05/78/74/32/1000_F_578743248_OOaLJqcSNbKIH67JzAPUKODhFL9SNJFL.jpg"
                        }
                        news_url={element.url}
                        author={element.author}
                        date={element.publishedAt}
                        source={element.source.name}
                      />
                    </div>
                  );
                }) : <h2 className="text-center" style={{marginTop:"80px"}}>No News Found</h2>} 
            </div>
          </InfiniteScroll>

          <hr />
          {/* Adding Previous and Next buttons */}
          <div className="container_buttons d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              className="btn btn-dark"
              onClick={this.previous_button_method}
            >
              {" "}
              &larr; Previous
            </button>
            <button
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.page_size)
              }
              type="button"
              className="btn btn-dark"
              onClick={this.next_button_method}
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </>
    );
  }
}