import React, { useEffect, useState } from "react"
import { GetServerSideProps, NextPage } from "next"
import Link from "next/link";
import axios from "axios";




export default function Home() {
  const [status, setStatus] = useState<string>("Loading")

  useEffect(()=>{
    getResponse()
  },[])

  const getResponse = async () => {
    try {
      const response = await axios.get("http://localhost:3002/")
      setStatus(response.data.message)
    } catch (error) {
      setStatus("error")
    }
  }

  return(
    <>
      <div className="inicio">
        <h1>{status}</h1>


        <div className="conjunto">
          <Link href={"/Books"}>
            <button className="boton">Books</button>
          </Link>

          <Link href={"/Users"}>
            <button className="boton">Users</button>
          </Link>

          <Link href={"/Authors"}>
            <button className="boton">Authors</button>
          </Link>
        </div>


      </div>
      
      

    </>
  )
}