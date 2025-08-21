import React, { use, useEffect, useState } from 'react'
import { useStore } from '../../context/Store'
import AppButton from '../AppButton'
import { STATE_OR_CITIES } from '../../utils/Data'
import AppTextArea from "../../components/AppTextArea"
import axios from 'axios'
const DBURL = import.meta.env.VITE_SERVER_URI
import toast from 'react-hot-toast'


const EditProfile = ({ setIsProfileEditOpen, info }) => {

    const [location, setInfo] = useState(info?.location || 'select location');
    const [bio, setBio] = useState(info?.bio || '');


    const handelUpdateBioOrLocation = async () => {

        try {
            toast.loading("updating...")
            let responce = await axios.post(`${DBURL}/updatebioorlocation`, {
                location: location,
                bio: bio
            }, { withCredentials: true })

            if (responce.data.success) {
                toast.dismiss()
                toast.success("updated successfully")
                setIsProfileEditOpen(false)
                window.location.reload()
            }

        } catch (error) {
            toast.error(error?.responce?.data.message) || toast.error("something went wrong")
            toast.dismiss()
        }
    }





    return (
        <div className='h-screen w-screen fixed top-0 left-0 bg-white z-[100] flex items-center'>
            <div className='sm:w-[40vw] w-[90vw] h-[50vh] mx-auto flex flex-col gap-[20px]'>
                <div>
                    <label className='text-2xl '>location</label>
                    <br></br>
                    <input list='location' onChange={(e) => { setInfo(e.target.value) }} value={location} className='border-[1px]  border-black text-2xl py-2 px-10 block h-[50px] outline-none w-full'></input>
                    <datalist id='location'>
                        {
                            STATE_OR_CITIES?.map((city, index) => {
                                return <option value={city} key={index}>{city}</option>
                            })
                        }
                    </datalist>
                </div>
                <AppTextArea label='bio' value={bio} onchange={(e) => { setBio(e.target.value) }} />
                <AppButton title='save' onclick={() => handelUpdateBioOrLocation()} />
            </div>


            <div className='h-[40px] w-[40px] flex items-center justify-center cursor-pointer bg-black absolute top-[2%] right-[2%] ' onClick={() => { setIsProfileEditOpen(false) }}><i className=" text-white ri-close-large-fill"></i></div>
        </div>
    )
}

const Profile = () => {

    const [userInfo, setUserInfo] = useState()
    const [isProfileEditOpen, setIsProfileEditOpen] = useState(false)
    let { loadUserAllInfo } = useStore()
   let [revPosts,setRevPosts] = useState([])


    const openEditProfile = () => {
        setIsProfileEditOpen(!isProfileEditOpen)
    }

    const hadelProfileUpload = async (e) => {
        try {
            let file = e.target.files[0]
            if (!file) {
                return
            } else {
                let formdata = new FormData()
                formdata.append("file", file)
                toast.loading("uploading...")
                let responce = await axios.post(`${DBURL}/uploadrpofile`, formdata, {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })

                if (responce.data.success) {
                    toast.success(responce.data.message)
                    toast.dismiss()
                    window.location.reload()
                } else {
                    toast.error(responce.data.message)
                    toast.dismiss()
                }
            }

        } catch (error) {
            toast.error(error?.responce?.data?.message)
        }
    }

    useEffect(() => {
        setUserInfo(loadUserAllInfo())
    }, [])


    return (
        <>
            <div className='px-[20px] py-[10px] relative'>
                <h2 className='text-xl flex items-center cursor-pointer mb-[20px]'>{userInfo?.name}<i className="ri-arrow-down-wide-line"></i></h2>

                <div className='w-full min-h-[150px] flex gap-[10px] flex-wrap'>

                    <div>
                        <label className='h-[90px] w-[90px] bg-red-200 rounded-md overflow-hidden block cursor-pointer' htmlFor='user-profile'>
                            <img src={userInfo?.user_info?.userProfile} className='h-full w-full object-cover' />
                        </label>

                        <input type='file' accept='image/*' className='hidden' id='user-profile' onChange={(e) => hadelProfileUpload(e)} encType="multipart/form-data" name="file"></input>

                        <h4 className='text-xl'>{userInfo?.user_name}</h4>
                        <p className='text-xl text-gray-400'>{userInfo?.email}</p>
                    </div>

                    <div className='flex flex-col items-start justify-start'>
                        <div className='flex gap-[20px]'>
                            <p className='text-2xl cursor-pointer whitespace-nowrap'>{userInfo?.posts?.length} <span className='text-base sm:text-xl text-gray-600'>Posts</span></p>
                            <p className='text-2xl cursor-pointer whitespace-nowrap'>{userInfo?.followers?.length} <span className='text-base sm:text-xl text-gray-600'>Followers</span></p>
                            <p className='text-2xl cursor-pointer whitespace-nowrap'>{userInfo?.following?.length} <span className='text-base sm:text-xl  text-gray-600'>Following</span></p>
                        </div>
                        {
                            userInfo?.user_info?.location ?
                                <div className='mt-[1px] flex gap-[10px] items-center text-xl'>
                                    <span className='flex items-center gap-[10px]'><i className="ri-map-pin-fill text-gray-600 text-sm"></i>{userInfo?.user_info?.location}</span>
                                </div> : null
                        }
                        <div className='text-xl mt-[1px]'><i className="ri-quill-pen-ai-fill text-sm text-gray-600"></i> {userInfo?.user_info?.bio}</div>
                    </div>
                </div>

            </div>

            <div className=' w-[80vw]  sm:w-[40vw] md:w-[20vw] ml-[20px]'>
                <AppButton title='edit profile' onclick={() => { openEditProfile() }} />
            </div>



            <div className=' pb-[10%] w-full  mt-[20px]'>
                <i className='ri-calendar-2-line text-2xl ml-[30px] mt-[30px]'></i>
                <div className='w-[100%] min-h-[400px] flex flex-wrap  items-center sm:px-[20px] justify-center sm:justify-start'>
                    {
                        userInfo?.posts?.map((postInfo, index) => {
                            return (
                                <div className=' w-[280px] h-[240px] sm:h-[350px] sm:w-[350px] m-[4px] overflow-hidden border-[0.1px] cursor-pointer  bg-red-100 shrink-0 border-gray-600 ' key={index}>
                                    <img src={postInfo.image} className='h-full w-full object-cover' />
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            {
                isProfileEditOpen ? <EditProfile setIsProfileEditOpen={setIsProfileEditOpen} info={userInfo?.user_info} /> : null
            }

        </>
    )
}

export default Profile