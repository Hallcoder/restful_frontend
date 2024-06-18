import PaginatedTable from "@/components/PaginatedTable";
import ProtectedRoute from "@/components/protectedRoute";
import axios from "axios";
import React,{useMemo,useState, useEffect} from "react";
import toast from "react-hot-toast";
const Books = () =>{
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    const columns = useMemo(
        () => [
            { Header: 'id', accessor: 'id' },
            { Header: 'name', accessor: 'name' },
            { Header: 'author', accessor: 'author' },
            { Header: 'publisher', accessor: 'publisher' },
            { Header: 'publicationYear', accessor: 'publicationYear' },
            { Header: 'subject', accessor: 'subject' },
        ],
        []
    );
    useEffect(()=>{
      axios.get("http://localhost:3001/books",{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
        }
      }).then(d =>{
        console.log(d);
        setData(d.data.data);
    }).catch(err =>{
        toast.error(err.message);
        console.log(err);
    }).finally(() =>{
          setLoading(false);
      });
    },[])
    return <ProtectedRoute>
            <div className="m-auto mt-20">
        <h2 className="text-3xl text-center">List of books</h2>
        {loading ? "Loading data...":<PaginatedTable columns={columns} data={data} />}
    </div>
        </ProtectedRoute> 
}

export default Books;