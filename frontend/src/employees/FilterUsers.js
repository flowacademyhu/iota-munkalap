import React,{useState, useEffect, useCallback} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function FilterUsers({status, onStatusChange}) {

  const handleInputChange = useCallback(
    event => {
      onStatusChange(event.target.value);
    },
    [onStatusChange]
  );
    
   // this.props.onStatusChange(event.target.value)
    // if (e === active) { e = true }
    // if (e === inactive) { e = false }
    // if (e === "all") { e = null }
    //String to boolean
  

    // let title = "Mind"
    // console.log(status)
    // //boolean to String
    // if (status === true) {title = "Aktív" } 
    // else if (status === false) { title = "Inaktív" } 
  
  //console.log("TITLE", title)
    
  return (
    <div>
    <select class="btn btn-success" onChange={handleInputChange}>
      <option value="true" >Aktív</option>
      <option value="false">Inaktív</option>
      <option value={null}>Mind</option>
      
    </select>
  </div>
  );
}

export default FilterUsers;