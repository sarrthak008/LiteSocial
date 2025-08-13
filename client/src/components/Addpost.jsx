import React, { useEffect, useState } from 'react'
import AppTextArea from './AppTextArea'
import AppButton from './AppButton'
import toast from 'react-hot-toast'
import axios from 'axios'

const DBURL = import.meta.env.VITE_SERVER_URI

const Addpost = ({setIsPostAddOpen}) => {

    const [fileData, setFileData] = useState(null)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [tags, setTags] = useState("")

    const handelUploadPost =async  (e) => {
        e.preventDefault();
        if (!fileData) {
            return toast.error("please select image")
        }
        if (title.length == 0 || description.length == 0) {
            return toast.error("title or description is required.")
        }
        
        let formdata = new FormData()
        formdata.append("post", fileData)
        formdata.append("title", title)
        formdata.append("description", description)
        formdata.append("tags", tags)
        
        toast.loading("try to upload post...")
           try {

              let response = await axios.post(`${DBURL}/uploadpost`,formdata,{
                withCredentials:true,
                headers:{
                    "Content-Type":"multipart/form-data"
                }
              })

              if(response.data.success){
                toast.success(response.data.message)
                setTitle("")
                setDescription("")
                setTags("")
                setFileData(null)
                toast.dismiss()
                setIsPostAddOpen(false)
              }else{
                toast.error(response.data.message)
                toast.dismiss()
              }

           } catch (error) {
             console.log(error.response)
             toast.error(error?.response?.data.message)
             toast.dismiss()
           }

    }


    return (
        <div className='h-screen w-screen fixed top-0 left-0  backdrop-blur-lg  overflow-y-scroll overflow-x-hidden hideScrollbar py-[50px]' onClick={
        ()=>{
            setIsPostAddOpen(false)
        }
        }>
            {
                fileData ?
                    <div className='h-[280px] w-[300px] sm:w-[400px] bg-black overflow-hidden mx-auto py-[30px] rounded-lg'>
                        <img src={URL.createObjectURL(fileData)} className='h-full w-full object-cover' />
                    </div>
                    :
                    null
            }

            <form method='post' encType="multipart/form-data" className='w-[90vw] mx-auto sm:w-[40vw] flex items-center justify-center flex-col gap-[30px] min-h-[100vh]' onSubmit={(e) => { handelUploadPost(e) }} onClick={(e) => {e.stopPropagation()}}>

                <div className='mb-[10px]'>
                    <label className='text-3xl border-dashed border-2 py-[10px] px-[40px] ' htmlFor='image'>select image <i className="ri-upload-cloud-line"></i></label>
                    <input type="file" name="post" id='image' className='hidden'
                        accept='image/*'
                        onChange={(e) => { setFileData(e.target.files[0]) }}
                    />
                </div>

                <div className='w-full'>
                    <AppTextArea label='title' value={title} onchange={(e) => { setTitle(e.target.value) }} />
                </div>

                <div className='w-full'>
                    <AppTextArea label='descrition' value={description} onchange={(e) => { setDescription(e.target.value) }} />
                </div>

                <div className='w-full'>
                    <AppTextArea label='#tags' value={tags} onchange={(e) => { setTags(e.target.value) }} />
                </div>

                <AppButton title="upload" type='submit' />

            </form>
 
      <div className='h-[40px] w-[40px] flex items-center justify-center cursor-pointer bg-black absolute top-[2%] right-[2%] '><i className=" text-white ri-close-large-fill"></i></div>
        </div>
    )
}

export default Addpost