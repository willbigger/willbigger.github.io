import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div>
      <h1>Evaluation Criteria</h1>
      <h1>EOS or LOS</h1>

      <form>
        <input type="radio" id="eos" name="feild_1" value="EOS"></input>
     	  <label for="eos">EOS</label>
        <input type="radio" id="los" name="field_1" value="LOS"></input>
 	      <label for="los">LOS</label><br></br>
  	    <input type="submit" value="Submit"></input>
      </form>
      <hr></hr>

      <h1>Date/Time of culture</h1>

	    <form>
  	    <label for="culture_date">Culture Taken (date and time):</label>
  	    <input type="datetime-local" id="culturedate" name="culturedate"></input>
  	    <input type="submit" value="Submit"></input>
	    </form>

   	  <hr></hr>
    </div>
  );
}

export default App;
