import React,{useState, useEffect, useCallback} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function FilterUsers(props) {
  const { status, onStatusChange } = props


  const handleInputChange = useCallback() {
      onStatusChange(e.target.value);
      if (e === "true") { e = true }
      if (e === "false") { e = false }
      else if (e === "") { e = null }
    },
    [onStatusChange]
  );
    
  return (
    <div>
    <select class="btn btn-success" onChange={handleInputChange}>
      <option value="true" >Aktív</option>
      <option value="false">Inaktív</option>
      <option value="">Mind</option>
      
    </select>
  </div>
  );
}

export default FilterUsers;