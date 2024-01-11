import React, { useEffect, useState } from 'react'
import { Link, json } from 'react-router-dom'


const Add = () => {

    const [name,setName] = useState("");
    const [phone,setPhone] = useState("");
    const [status,setStatus] = useState("");

    const [record,setRecord] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault();

        if(!name || !phone){
            alert("All field are required");
            return false;
        }

       let userid = Math.floor(Math.random() * 10000);
       let obj = {userid,name,phone,status};
       let all = [...record,obj];
       localStorage.setItem('user',JSON.stringify(all));
       setRecord(all);
       setName("")
       setPhone("");
       alert("User Add");       
    }

    useEffect(()=>{
        let oldrecord = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : []
        setRecord(oldrecord)
    },[])

  return (
    <center>
        <h1>Add Record</h1>
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
                        <td>Status : </td>
                        <td>
                            <select onChange={ (e) => setStatus(e.target.value) }>
                                <option>---select status---</option>
                                <option value="latest">Latest</option>
                                <option value="upcomming">Upcomming</option>
                                <option value="pending">Pending</option>
                                <option value="complete">Complete</option>
                            </select>
                        </td>
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

export default Add
