import React from "react";
import { Link } from 'react-router-dom'; // Import links instead of reloading the page

function Header() {
  return (
    <div>
        <head>
          <meta charset="utf-8"></meta>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
        </head>
        
        <body>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <h1 class="navbar-brand">Evaluation Criteria</h1>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                  <Link class="nav-link" to='/'>Home</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to='/about'>About</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to='/datatrends'>Data Trends</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to='/outputwidget'>Your Submission</Link>
                </li>
              </ul>
            </div>
          </nav>
          <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        </body>
    </div>
  );
}

export default Header;