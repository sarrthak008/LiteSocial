import React, { useEffect ,useState } from 'react'
import axios from 'axios'
import UserCard from "../UserCard"
import { useStore } from '../../context/Store'

const DBURL = import.meta.env.VITE_SERVER_URI 



const Peoples = () => {
  const  [peoples,setPeoples] =  useState([])
  let {isalredyFollow} = useStore()
  
  const loadUsers = async ()=>{
     try {

        let responce  = await axios.get(`${DBURL}/getusers`)

        if(responce.data.success){
          setPeoples(responce.data.data)
        }
     } catch (error) {
        console.log(error)
     }
  }

  useEffect(()=>{
    loadUsers()
  },[])


  return (
    <div className='min-h-[100vh]  p-[10px]'>
       <h2 className='text-2xl'>expore peoples</h2>
       <div className='flex flex-wrap items-start justify-evenly'>
          {
            peoples?.map((people,index)=>{
               return(
                !isalredyFollow(people?._id) ? <UserCard key={index} data={people}/> :null
               )
            })
          }
       </div>
    </div>
  )
}

export default Peoples