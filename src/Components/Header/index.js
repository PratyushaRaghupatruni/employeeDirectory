import React from 'react';

const styles = {
  headerStyle: {
    background: 'indigo',
    color: 'white',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomstyle:'solid',
    borderBottomWidth: 3,
    borderColor: 'orange'
  },
};
export default function Header() {
    return (
         <div className="jumbotron jumbotron-fluid" style={styles.headerStyle}>
        <div className="container ">
          <h1 className="display-4 text-center">Employee Directory</h1>
          <p className="lead text-center">Search for an in Search bar</p>
        </div>

      </div>
    );
}