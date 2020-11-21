import React from "react";

const styles = {
  searchBar: {
    justifyContent: 'center'
  },
};

export default function Input(props) {
  return (
    <div>
     <nav className="navbar navbar-light bg-light">
        <div className="navbar-collapse row" id="navbarNav" style={styles.searchBar} ></div>
       <div className="form-group">
      <input className="form-control" {...props} />
       </div>
      </nav>
      </div>
  );
} 