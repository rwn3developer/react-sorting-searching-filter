import React, { useEffect, useState } from 'react'
import { Link, json } from 'react-router-dom'


const View = () => {

    const [record,setRecord] = useState([]);
    const [searchname,setSearchName] = useState("");
    const [sort,setSort] = useState("");
    const [status,setStatus] = useState(""); 
    const [filterdata,setfilterData] = useState([]);

    useEffect(()=>{
        let all = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : [] 
        setRecord(all);
    },[]) 

    //search functionality
    useEffect(()=>{
        if(searchname != ""){
            const searchData = record.filter((val)=>{
                return val.name.toLowerCase().includes(searchname.toLowerCase());
            })
            setRecord(searchData)
        }else{
            let all = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : [] 
            setRecord(all);
        }
    },[searchname])

    //record delete
    const deleteData = (id) =>{
        let deleteRecord = record.filter((val)=>{
            return val.userid != id;
        })
       setRecord(deleteRecord);
       localStorage.setItem('user',JSON.stringify(deleteRecord));
       alert("User Delete")
    }

    const resetFilter = () => {
        let all = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : [] 
        setRecord(all);
        setSearchName("");
    }

    //sorting functionality
    useEffect(()=>{
        let result = [...record];
        if(sort != ""){
            if (sort === "descending") {
                result = [...record].sort((a, b) => {
                  return b.name.localeCompare(a.name);
                });
              } else if (sort === "ascending") {
                result = [...record].sort((a, b) => {
                  return a.name.localeCompare(b.name);
                });
            }
            setRecord(result)
        }
    },[sort])


    //status filterwise record
    useEffect(()=>{
        if(status!=""){
            let original = [...record];
            original = original.filter((curItem)=>{
                return curItem.status === status
            })
            setfilterData(original)
        }
    },[status])


  return (
    <center>
        <h1>View page</h1>

        Name :- <input type='text' onChange={ (e) => setSearchName(e.target.value) } value={searchname} placeholder='search name'/>
        <button onClick={ () => resetFilter() }>Reset</button>

            {
                record.length == 0 ? (<p>Record not found</p>) : ""
            }
            <br></br><br></br>

            Name wise sort :- <select onChange={ (e) => setSort(e.target.value) }>
                <option>---sort---</option>
                <option value="ascending">Accending</option>
                <option value="descending">Decending</option>
                
            </select><br></br><br></br>


            Status wise filter :- 
            <select onChange={ (e) => setStatus(e.target.value) }>
                <option>---status---</option>
                <option value="latest">Latest</option>
                <option value="upcomming">Upcomming</option>
                <option value="pending">Pending</option>
                <option value="complete">Complete</option>

            </select><br></br><br></br>

            <table border={1}>
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Name</td>
                        <td>Phone</td>
                        <td>Status</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        filterdata.length!=0 ? (
                            filterdata.map((val)=>{
                                return (
                                    <tr key={val.userid}>
                                        <td>{val.userid}</td>
                                        <td>{val.name}</td>
                                        <td>{val.phone}</td>
                                        <td>{val.status}</td>
                                        <td>
                                            <button onClick={ () => deleteData(val.userid) }>Delete</button> ||
                                            <button>
                                                <Link to={`/editrecord/${val.userid}`}>Edit</Link>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        ) : (
                            record.map((val)=>{
                                return (
                                    <tr key={val.userid}>
                                        <td>{val.userid}</td>
                                        <td>{val.name}</td>
                                        <td>{val.phone}</td>
                                        <td>{val.status}</td>
                                        <td>
                                            <button onClick={ () => deleteData(val.userid) }>Delete</button> ||
                                            <button>
                                                <Link to={`/editrecord/${val.userid}`}>Edit</Link>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        )
                    }
                </tbody>
            </table>
        <Link to={`/addrecord`}>Add</Link>
    </center>
  )
}

export default View
