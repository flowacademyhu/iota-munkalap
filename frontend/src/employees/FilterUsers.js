import React,{useState, useEffect, useCallback} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

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
  }

    // let title = "Mind"
    // console.log(status)
    // //boolean to String
    // if (status === true) {title = "Aktív" } 
    // else if (status === false) { title = "Inaktív" } 
  
  //console.log("TITLE", title)
    
  return (
    <div>
    <select onChange={handleInputChange}>
      <option value="true" >Aktív</option>
      <option value="false">Inaktív</option>
      <option selected value="">Mind</option>
      
    </select>
  </div>
  );
}

export default FilterUsers;