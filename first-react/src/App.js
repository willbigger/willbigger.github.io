import './App.css';

function App() {
  return (
    <div>
      <h1>Evaluation Criteria</h1>
      <h1>EOS or LOS</h1>

      <form>
        <input type="radio" id="eos" name="field_1" value="EOS"></input>
     	  <label for="eos">EOS</label>
        <input type="radio" id="los" name="field_1" value="LOS"></input>
 	      <label for="los">LOS</label><br></br>
  	    <input type="submit" value="Submit"></input>
      </form>
      <hr></hr>

      <h1>Date/Time of culture</h1>

	    <form>
  	    <label for="culture_date">Culture Taken (date and time): </label>
  	    <input type="datetime-local" id="culturedate" name="culturedate"></input>
  	    <input type="submit" value="Submit"></input>
	    </form>

   	  <hr></hr>

       <h1>Cultures Sent:</h1>

       <form>
  	    <label for="cultures-sent">Cultures Sent:</label>
        <br></br>
        <input type="checkbox" id="cultures-sent:blood" name="cultures-sent:blood"></input>
        <label for="blood">Blood</label>
        <br></br>
        <input type="checkbox" id="cultures-sent:urine" name="cultures-sent:urine"></input>
        <label for="urine">Urine</label>
        <br></br>
        <input type="checkbox" id="cultures-sent:csf" name="cultures-sent:csf"></input>
        <label for="csf">CSF</label>
        <br></br>
  	    <input type="submit" value="Submit"></input>
	    </form>
      <hr></hr>


      <h1>Pathogen Isolation</h1>

      <form>
        <input type="radio" id="pathogen-yes" name="pathogen-yes" value="Yes"></input>
        <label for="pathogen-yes">Yes</label>
        <br></br>
        <input type="radio" id="pathogen-no" name="pathogen-no" value="No"></input>
        <label for="pathogen-no">No</label>
        <br></br>
  	    <input type="submit" value="Submit"></input>
      </form>
      <hr></hr>

      <h1>Site of Infection:</h1>

      <form>
      <input type="checkbox" id="infection-site:blood" name="infection-site:blood"></input>
        <label for="blood">Blood</label>
        <br></br>
      <input type="checkbox" id="infection-site:urine" name="infection-site:urine"></input>
        <label for="urine">Urine</label>
        <br></br>
        <input type="checkbox" id="infection-site:csf" name="infection-site:csf"></input>
        <label for="csf">CSF</label>
        <br></br>
        <input type="checkbox" id="infection-site:peritoneal" name="infection-site:peritoneal"></input>
        <label for="peritoneal">Peritoneal</label>
        <br></br>
        <input type="checkbox" id="infection-site:skin" name="infection-site:skin"></input>
        <label for="skin">Skin</label>
        <br></br>
  	    <input type="submit" value="Submit"></input>
      </form>
      <hr></hr>

      <h1>NEC Present:</h1>
      <form>
      <input type="radio" id="nec-yes" name="nec-yes" value="Yes"></input>
      <label for="nec-yes">Yes</label>

      <input type="radio" id="nec-no" name="nec-no" value="No"></input>
      <label for="nec-yes">No</label>
      <br></br>
  	    <input type="submit" value="Submit"></input>
      </form>

    </div>
  );
}

export default App;
