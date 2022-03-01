import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom'; // Importing the router
import FormComponent from "./components/FormComponent"; // Importing the form
import Footer from "./components/Footer"; // Importing the footer
import About from "./components/About"; // Importing the about page
import Header from "./components/Header"; // Importing the header
import FAQ from "./components/FAQ"; // Importing the FAQ page

function App() {

  return (
    <Router>
      <div className="App" style={{backgroundColor: '#F1F1EF'}}>


        <Header />
        <Route path='/' exact component={FormComponent} />
        <Route path='/about' component={About} />
        <Route path='/faq' component={FAQ} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
