import React, { useContext } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

const UserProfile = () => {
    const {user,updateNameAndPhoto} = useContext(AuthContext);
    const [error, setError] = useState('')
    const handelUpdate = (e) =>{
        e.preventDefault();
        const form = e.target;
        setError('')
        const name = form.name.value;
        let photoURL = form.photourl.value;

        if(name.length === 0 ){
          setError('Please Add your name');
          return;
        }
        if(photoURL.length === 0){
          photoURL = 'https://picsum.photos/200/300'
      }

        updateNameAndPhoto(name,photoURL)

        .then(()=>{
            e.target.reset()
            toast.success('your profile updated')
        })
        .catch(error =>{
            console.log(error);
        })

    }
    return (
        <div className=' my-12 mx-10 '>
               <div className="flex flex-col items-center justify-center">
                <h1 className='lg:text-4xl text-2xl font-semibold text-slate-700 mb-5'>UPDATE YOUR PROFILE</h1>
      <img
        src={user?.photoURL}
        alt="Profile"
        className="rounded-full w-32 h-32 object-cover border-4 border-white shadow-lg"
      />
      <h1 className="text-3xl font-bold mt-4">{user?.displayName}</h1>
      <p className="text-lg text-gray-600 mt-2">{user?.email}</p>
      <div className="mt-8 w-full max-w-md">
        <form onSubmit={handelUpdate}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder='Enter Your New Name'
              className="appearance-none border border-gray-500 rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline w-full"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Photo URL
            </label>
            <input
              type="text"
              id="photo"
              name="photourl"
              placeholder='Enter your New Photo URL'
              className="appearance-none border border-gray-500 rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline w-full"
            />
          </div>
          
          <div className="flex justify-between">
          <p className='text-red-500'>{error}</p>
            <button
              type="submit"
              className="bg-blue-500 border-0 border-none  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
             Update change
            </button>
            
          </div>
        </form>
          
      </div>
    </div>
        </div>
    );
};

export default UserProfile;