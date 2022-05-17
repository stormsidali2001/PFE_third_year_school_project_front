import React,{useState,useEffect} from 'react'
import { Card,Form,form, TabContent, Table } from 'react-bootstrap';

import { getUsers, getData } from './AppData';
import{ScaleLoader} from 'react-spinners';
import ReactExport from 'react-data-export'
import { Button } from 'bootstrap';



const Homescreen=() => {
  const[users ,setUsers] =useState([]);
  const[exporData,setExporData]= useState([]);
  const[loading,setLoading] =useState(false);
 const ExcelFile=ReactExport.ExcelFile;
 const Excelsheet=ReactExport.ExcelFile.Excelsheet;
 

  async function getAllUsers() {
    const data = await getUsers();
    setUsers(data);
  }
  const UsersChangerHandler =async(e)=>{
    setExporData([]);
    setLoading(true);
    const data= await getData(e.traget.value);
    setExporData(data);
    setLoading(false);
  }
  useEffect(()=>{
    getAllUsers();

  }
  ,[])
  const DataSet=[
    {
      columns:[
        {title:"matricule",style:{font:{sz:"18",bold:true}}},
      {title:"email",style:{font:{sz:"18",bold:true}}},
      {title:"nom",style:{font:{sz:"18",bold:true}}},
      {title:"date de naissance",style:{font:{sz:"18",bold:true}}},

      ],

      data:exporData.map((data)=>[
        {value:data.name,style:{font:{sz:14}}},
        {value:data.email,style:{font:{sz:14}}},
        {value:data.nom,style:{font:{sz:14}}},
        {value:data.date_de_naissance,style:{font:{sz:14}}}
      ])
    }
  ]
  return (
    <div className='container'>
      <Card>
        <Card.Body>
          <Card.Title>export data</Card.Title>
          <Form>
            <Form.Label className='text-danger font-weight-bold'>select user</Form.Label>
            <Form.Control as="select"  onChange={(e)=>UsersChangerHandler(e)} defaultValue="choose......." >
              {users.map(
                (user,i)=>
                {
                    return <option key={i}
                      value={user.name}>{user.name}</option>;
                  }

              )}
            </Form.Control>
          </Form>
          <ExcelFile filename='la liste des utilisteurs'
          element={<Button type="button" className="btn btn-success float-right m-3"> export data</Button>}>
            <Excelsheet  DataSet={DataSet} nama='la liste des utilisateurs'/>

          </ExcelFile>
          <Table responsive>
            <thead>
              <tr>
                <th>matricule</th>
                <th>email</th>
                <th> nom</th>
                <th>date de naissance</th>
                
                </tr>
            </thead>
            <tbody>
              {exporData.lenght=== 0 ? 
              (
                <tr>
                  <td calSpan="10">
                    <ScaleLoader>
                      display:flex,
                      align-items:center,
                      justify-content:center,

                      color:red,
                      size={150}
                      loading={loading}
                    </ScaleLoader>
                  </td>
               
                </tr>
              ):(
                <>{
                  exporData.map((data)=>(
                    <tr key={data.uid}>
                      <td>{data.matricule}</td>
                      <td>{data.email}</td>
                      <td>{data.nom}</td>
                      <td>{data.date_de_naissance}</td>
                     
                    </tr>
                  )

                  )
                }
                </>
              )
              }
            </tbody>

          </Table>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Homescreen;
