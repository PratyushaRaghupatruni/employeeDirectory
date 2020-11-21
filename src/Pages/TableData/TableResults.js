import React, { useState, useEffect } from 'react';
import { Col,Row ,Table } from 'react-bootstrap';
import   Input  from '../../Components/Input';
import API from '../../utils/API';

export default function TableData() {
  const [employees, setEmployees] = useState([]);
  const [allEmployees,setAllEmployees] =useState([]);

  useEffect(() => {
    getData();
  },[]);

  const getData = async () => {
    const response = await API.getUsers();
    setEmployees((response.data.results));
      setAllEmployees(response.data.results)

  };


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

 const renderHeader = () => {
        let headerElement = ['Image', 'Name', 'Email', 'Phone', 'Birthday']

        return headerElement.map((key, index) => {
            return <th key={index} style={{ width: '20%',textAlign:'center', }}>
              {key}
              {key === 'Name' ? (<i class="fa fa-fw fa-sort"></i> ): ""}      
              </th>
        })
    }

       const renderBody = () => {
        return employees && employees.map(({ login, picture,name, email, phone,dob }) => {
            return (
                 <tr key={login.uuid}>
                    <td data-th="Image" style={{ width: '20%',textAlign:'center', }}>
                       <img
                        src={picture.thumbnail}
                        alt={'Picture of  ' + name.first + ' ' + name.last}
                     />
                    </td>
                    <td data-th="Name" style={{ width: '20%',textAlign:'center', }}>
                      {name.first} {name.last}
                    </td>
                    <td data-th="Email" style={{ width: '20%',textAlign:'center', }}>{email}</td>
                    <td data-th="Phone" style={{ width: '20%',textAlign:'center', }}>{phone}</td>
                     <td data-th="Birthday" style={{ width: '20%',textAlign:'center', }}>{dateFormat(dob.date)}</td>
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
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                   {renderBody()}
                </tbody>
            </Table>
          </div>
    )
}
