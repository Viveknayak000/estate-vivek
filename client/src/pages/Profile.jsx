// import { useSelector } from "react-redux"
// import { useRef } from "react"

// export default function Profile() {
//   const fileRef = useRef(null)
//   const {currentUser}=useSelector((state)=>state.user)
//   return (
//     <div className="p-3 max-w-lg mx-auto">
//       <h1 className='text-3xl font-semibold text-center m-7'>Profile</h1>
//       <form className="flex flex-col gap-4 ">
//         <input type="file" ref={fileRef} hidden accept="image/*" />
//         <img onClick={()=> fileRef.current.click()} src={currentUser.avatar} alt="profile" 
//         className="rounded-full h-24 w-24 self-center object-cover cursor-pointer mt-2"/>
//         <input type="text" placeholder="username" id="username"
//         className="border p-3 rounded-lg " />
//         <input type="email" placeholder="email" id="email"
//         className="border p-3 rounded-lg " />
//         <input type="text" placeholder="password" id="password"
//         className="border p-3 rounded-lg " />
//         <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">update</button>
//       </form>
//       <div className="flex justify-between mt-5">
//         <span className="text-red-700 cursor-pointer">Delete Account</span>
//         <span className="text-red-700 cursor-pointer">Signout</span>
//       </div>
//     </div>
//   )
// }



import { useSelector } from "react-redux";
import { useRef, useState } from "react";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [imageUrl, setImageUrl] = useState(currentUser?.avatar || ""); // ✅ Initial avatar state

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file); // ✅ Ensure the backend expects "file"

    try {
      const res = await fetch("http://localhost:3000/api/upload", { 
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Cloudinary Response:", data);

      if (data.imageUrl) {
        setImageUrl(data.imageUrl);  // ✅ Update profile image in UI
      } else {
        console.error("Upload failed:", data.message);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center m-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input type="file" ref={fileRef} hidden accept="image/*" onChange={handleFileChange} />
        <img
          onClick={() => fileRef.current.click()}
          src={imageUrl || "/default-avatar.png"}
          alt="profile"
          className="rounded-full h-24 w-24 self-center object-cover cursor-pointer mt-2"
        />
        <input type="text" placeholder="username" id="username" className="border p-3 rounded-lg" />
        <input type="email" placeholder="email" id="email" className="border p-3 rounded-lg" />
        <input type="password" placeholder="password" id="password" className="border p-3 rounded-lg" />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Signout</span>
      </div>
    </div>
  );
}
