import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'


const Edit = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [name,setName] = useState("");
    const [phone,setPhone] = useState("");
    const [record,setRecord] = useState([]);

    useEffect(()=>{
        let all = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : []
        setRecord(all);
        let single = all.find(item => item.userid == id);
        setName(single.name)
        setPhone(single.phone);
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!name || !phone){
            alert("All field are required");
            return false;
        }

        let updateRecord = record.map((val)=>{
            if(val.userid == id){
                return {
                    ...val,
                    name : name,
                    phone : phone
                }
            }
            return val;
        })
        setRecord(updateRecord);
        localStorage.setItem('user',JSON.stringify(updateRecord));
        alert("Record update");
        navigate('/');

        
    }

   

  return (
    <center>
        <h1>Edit Record</h1>
        <form onSubmit={handleSubmit}>
            <table border={1}>
               <tbody>
                    <tr>
                        <td>Name : </td>
                        <td><input type="text" name='name' onChange={ (e) => setName(e.target.value) } value={name}/></td>
                    </tr>
                    <tr>
                        <td>Phone : </td>
                        <td><input type="text" name='phone' onChange={ (e) => setPhone(e.target.value) } value={phone}/></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><input type="submit"/></td>
                    </tr>
               </tbody>
            </table>
        </form>
        <Link to={`/`}>View</Link>
    </center>
  )
}

export default Edit
