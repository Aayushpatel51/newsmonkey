// import  './App.css';
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  pageSize = 6;
  state ={
    progress:0
  }
  setProgress= (progress)=>{
    this.setState({progress:progress})
  }
  constructor() { 
    super();
    this.state = {
        value : ""
    };
    this.handleChange = this.handleChange.bind(this);
}
  handleChange(event){
    this.setState({ value:  event.target.value});
    console.log(event.target.value);
}
  render() {
    return (
      <Router>
      <div>
        <NavBar handleChange={this.handleChange} filterValue={this.state.value}/>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}

      />
        <Switch>
          <Route exact path="/"><News key="general" handleChange={this.handleChange} filterValue={this.filterValue} setProgress={this.setProgress} pageSize={this.pageSize} country={"in"} category={"general"} /></Route>
          <Route exact path="/business"><News key="business" handleChange={this.handleChange} setProgress={this.setProgress} pageSize={this.pageSize} country={"in"} category={"business"} /></Route>
          <Route exact path="/entertainment"><News key="entertainment" handleChange={this.handleChange} setProgress={this.setProgress} pageSize={this.pageSize} country={"in"} category={"entertainment"} /></Route>
          <Route exact path="/general"><News key="general" handleChange={this.handleChange} setProgress={this.setProgress} pageSize={this.pageSize} country={"in"} category={"general"} /></Route>
          <Route exact path="/health"><News key="health" handleChange={this.handleChange} setProgress={this.setProgress} pageSize={this.pageSize} country={"in"} category={"health"} /></Route>
          <Route exact path="/science"><News key="science" handleChange={this.handleChange} setProgress={this.setProgress} pageSize={this.pageSize} country={"in"} category={"science"} /></Route>
          <Route exact path="/sports"><News key="sports" handleChange={this.handleChange} setProgress={this.setProgress} pageSize={this.pageSize} country={"in"} category={"sports"} /></Route>
          <Route exact path="/technology"><News key="technology" handleChange={this.handleChange} setProgress={this.setProgress} pageSize={this.pageSize} country={"in"} category={"technology"} /></Route>
        </Switch>
      </div>
      </Router>
    )
  }
}
