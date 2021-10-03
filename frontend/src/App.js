import React from "react";
import { BrowserRouter as Router, Route} from 'react-router-dom' // Importing the router
import FormComponent from "./components/FormComponent"; // Importing the form
import Footer from "./components/Footer"; // Importing the footer
import About from "./components/About"; // Importing the about page
import Header from "./components/Header"; // Importing the header
import DataTrends from "./components/DataTrends"; // Importing the data trends page


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Route path='/' exact component={FormComponent}/>
        <Route path='/about' component={About}/>
        <Route path='/datatrends' component={DataTrends}/>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
