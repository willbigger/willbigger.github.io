import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom'; // Importing the router
import FormComponent from "./components/FormComponent"; // Importing the form
import Footer from "./components/Footer"; // Importing the footer
import About from "./components/About"; // Importing the about page
import Header from "./components/Header"; // Importing the header
import FAQ from "./components/FAQ"; // Importing the FAQ page
import Terms from "./components/Terms";
import Feedback from "feeder-react-feedback"; // import Feedback component
import "feeder-react-feedback/dist/feeder-react-feedback.css"; // import stylesheet




function App() {

  return (
    <Router>
      {/* <div className="App" style={{backgroundColor: '#F1F1EF'}}> this is a comment*/}
      <div className="App">


        <Header />
        <Feedback
          projectId="62b6110b36acf60004935fe2"
          email="true"
          emailRequired="true"
          feedbackTypes={["general", "bug"]}
          position="left"/>
        <Route path='/' exact component={FormComponent} />
        <Route path='/about' component={About} />
        <Route path='/faq' component={FAQ} />
        <Route path='/terms' component={Terms} />
        
        <Footer />
       
      </div>
    </Router>
  );
}

export default App;
