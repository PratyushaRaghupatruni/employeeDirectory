import React, { useState, useEffect } from 'react';
import { Col,Row ,Table } from 'react-bootstrap';
import   Input  from '../../Components/Input';
import API from '../../utils/API';

export default function TableData() {
  const [employees, setEmployees] = useState([]);
  const [allEmployees,setAllEmployees] =useState([]);
   const [sortConfig, setSortConfig] = useState(null);

  useEffect(() => {
    getData();
  },[]);

  const getData = async () => {
    const response = await API.getUsers();
    setEmployees((response.data.results));
      setAllEmployees(response.data.results)

  };
 let sortedEmployees = employees;
   if (sortConfig !== null) {
    employees.sort((a, b) => {
      let forward = sortConfig[sortConfig.field + "Forward"];
      let multiplier = 1;
      if (!forward) multiplier = -1;
      if (a.name[sortConfig.field] < b.name[sortConfig.field]) {
        return -1 * multiplier;
      }
      if (a.name[sortConfig.field] > b.name[sortConfig.field]) {
        return 1 * multiplier;
      }
      return 0;
    });
    console.log(sortedEmployees);
    console.log(sortConfig);
  }

//date function
  function dateFormat(date) {
    const dateArray = date.split("-");
     const year = dateArray[0];
    const month = dateArray[1];
    const dayArray = dateArray[2].split("T");
    const day = dayArray[0];
    const formattedDate = [month, day, year].join("-");
     return formattedDate;
  }

  const handleInputChange = event => {
    const searchValue = event.target.value;
   console.log("search Value :" + searchValue);
         const filteredList = employees.filter(names => {
          let employeeFirst = names.name.first.toLowerCase()
          return employeeFirst.indexOf(searchValue.toLowerCase()) !== -1;
        })

        console.log(JSON.stringify(filteredList));
       setEmployees(filteredList);

     if(searchValue === ''){
       setEmployees(allEmployees);
     }

  };

 

       const renderBody = () => {
        return employees && employees.map(({ login, picture, name, email, phone,dob }) => {
            return (
                 <tr key={login.uuid}>
                    <td data-th="Image" style={{ width: '15%',textAlign:'center', }}>
                       <img
                        src={picture.thumbnail}
                        alt={'Picture of  ' + name.first + ' ' + name.last}
                     />
                    </td>
                    <td data-th=" First Name" style={{ width: '15%',textAlign:'center', }}>
                      {name.first}
                    </td>
                    <td data-th=" Last Name" style={{ width: '15%',textAlign:'center', }}>
                      {name.last}
                    </td>
                    <td data-th="Email" style={{ width: '15%',textAlign:'center', }}>{email}</td>
                    <td data-th="Phone" style={{ width: '15%',textAlign:'center', }}>{phone}</td>
                     <td data-th="Birthday" style={{ width: '15%',textAlign:'center', }}>{dateFormat(dob.date)}</td>
                </tr>
            )
        })
    }
 return (
       <div>
          <Row>
            <Col size="md-12" className="justify-content-center">
             <Input
              onChange={handleInputChange}
              name="search"
              placeholder="Search by first name"
            />
        </Col>
       </Row>
         <br />
            <Table id='employee' striped hover responsive="sm">
                 <caption>Employees</caption>
                  <thead>
                    <tr>
                     <th style={{ width: '15%',textAlign:'center', }}>Image</th>
                     <th style={{ width: '15%',textAlign:'center', }}><button type="button" 
                         onClick={() =>  
                          setSortConfig({ field: "first",firstForward: !sortConfig?.firstForward ?? true,})} >
                          First Name </button>
                      </th>
                          
                     <th style={{ width: '15%',textAlign:'center', }}><button type="button"
                        onClick={() =>
                           setSortConfig({ field: "last",lastForward: !sortConfig?.lastForward ?? true,})} >
                        Last Name</button>
                    </th>

                     <th style={{ width: '15%',textAlign:'center', }}>Email</th>
                      <th style={{ width: '15%',textAlign:'center', }}>Phone</th>
                       <th style={{ width: '15%',textAlign:'center', }}>Birthday</th>
                     </tr>
                    </thead>
                <tbody>
                   {renderBody()}
                </tbody>
            </Table>
          </div>
    )
}
