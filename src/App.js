import './App.css';
import React, { Component } from 'react';
import { Navbar } from './components/Navbar';
import { News } from './components/News';
import {Routes, Route} from 'react-router-dom';
import { Categories_news } from './components/categories_news';
// import { NewsItem } from './components/NewsItem';
import LoadingBar from 'react-top-loading-bar';

// class based components............
export default class App extends Component{
  state = {
    progress: 0
  }

  set_progress = (progress_params)=>{
    this.setState({progress: progress_params}); 
  }

  //Adding News API KEY............
  API_KEY = "paste your api key here";

  render(){
    return (
      <>
      {/* Adding Navbar..... */}
      <Navbar/>
      {/* Adding top loading bar.... */}
      <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />

      {/* Adding News..... */}
      {/* <News page_size={9} country={"in"} category={"sports"}/> */}

      {/* Adding news items...... */}
      {/* <NewsItem/> */}

      {/* Adding route........... */}
      <Routes>
        <Route path='' element={<News api_key={this.API_KEY} set_progress={this.set_progress} page_size={9}/>} />
         
        <Route exact path='/everything' element={<News api_key={this.API_KEY} page_size={9} key="everything" set_progress={this.set_progress}/>} />
                                                                                 
        <Route exact path='/buisness' element={<Categories_news api_key={this.API_KEY} heading={"Buisness"} page_size={9} country={"in"} category={"buisness"} key="buisness" set_progress={this.set_progress}/>} />                    

        <Route exact path='/sports' element={<Categories_news api_key={this.API_KEY} heading={"Sports"} page_size={9} country={"in"} category={"sports"} key="sports" set_progress={this.set_progress}/>} />
            
        <Route exact path='/health' element={<Categories_news api_key={this.API_KEY} heading={"Health"} page_size={9} country={"in"} category={"health"} key="health" set_progress={this.set_progress} />}/>

        <Route exact path='/entertainment' element={<Categories_news api_key={this.API_KEY} heading={"Entertainment"} page_size={9} country={"in"} category={"entertainment"} key="entertainment" set_progress={this.set_progress}/>} />

        <Route exact path="/technology" element={<Categories_news api_key={this.API_KEY} heading={"Technology"} page_size={9} country={"in"} category={"technology"} key="technology" set_progress={this.set_progress} />} />

        <Route exact path='/science' element={<Categories_news api_key={this.API_KEY} heading={"Science"} page_size={9} country={"in"} category={"science"} key="science" set_progress={this.set_progress} />} />

        <Route exact path='/general' element={<Categories_news api_key={this.API_KEY} heading={"General"} page_size={9} country={"in"} category={"general"} key="general" set_progress={this.set_progress} />}/>

      </Routes>
      </>
    );
  }
}