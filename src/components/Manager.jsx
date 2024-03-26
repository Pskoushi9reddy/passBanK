import React from "react"
import { useRef,useState,useEffect } from "react"
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref=useRef();
    const passwordRef=useRef();
    const [form,setForm]=useState({site:"",username:"",password:""})
    const [passwordArray,setPasswordArray]=useState([])

    const getPasswords = async ()=>{
        let req= await fetch("http://localhost:3000/")
        let passwords=await req.json()
        console.log(passwords)
        setPasswordArray(passwords)
    }

    useEffect(()=>{
        getPasswords()
    },[])


    // useEffect(()=>{
    //     let passwords=localStorage.getItem("passwords");
    //     if(passwords)
    //     {
    //         setPasswordArray(JSON.parse(passwords))
    //     }
    // },[])

    const showPassword=()=>{
        
        if(ref.current.src.includes("icons/hidden.png"))
        {
            ref.current.src="icons/view.png"
            passwordRef.current.type="text"
        }
        else{
            ref.current.src="icons/hidden.png"
            passwordRef.current.type="password"
        }
    }

    const savePassword=async()=>{
        if(form.site.length>3 && form.username.length>3 && form.password.length>3)
        {
            // setPasswordArray([...passwordArray,form])

            // if any old entry id in db there after editing to be deleted (for editing password)
            await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},
            body:JSON.stringify({id:form.id})})

            // updates new entry of edited password newly
            setPasswordArray([...passwordArray,{...form,id:uuidv4()}])
            await fetch("http://localhost:3000/",{method:"POST",headers:{"Content-Type":"application/json"},
            body:JSON.stringify({...form,id : uuidv4()})})
            // localStorage.setItem("passwords",JSON.stringify([...passwordArray,{...form,id : uuidv4()}]))
            // console.log([...passwordArray,form])
            setForm({site:"",username:"",password:""})  // on saving restore back to empty tabs
            toast('Password Saved', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else{
            toast("Error:password not saved",{
                autoClose:1500,
            });
        }
    }

    const editPassword=(id)=>{
        console.log("Editing password with id ",id );
        // setForm(passwordArray.filter(item=>item.id===id)[0])
        setForm({...passwordArray.filter(i=>i.id===id)[0],id:id})
        setPasswordArray(passwordArray.filter(item=>item.id!==id)) // deletes and edits the array
        // setPasswordArray([...passwordArray,{...form,id:uuidv4()}])
        // localStorage.setItem("password",JSON.stringify([...passwordArray,form]))
         console.log([...passwordArray,form])
    }

    const deletePassword=async(id)=>{
        console.log("Deleting password with id ",id);
        let p=confirm("Do you really want to delete this Password")
        if(p)
        {
            // setPasswordArray([...passwordArray,form])
            setPasswordArray(passwordArray.filter(item=>item.id!==id)) // not to be taken as array in []
            await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},
            body:JSON.stringify({id})})
            //localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.id!==id)))
            // console.log([...passwordArray,form])
            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }

    const copyText=(text)=>{
        // alert("copied to clipboard "+ text)
        toast('copied to clipboard', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text);

    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
                />
                {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
            <div className="p-4 md:pt-8 md:mycontainer min-h-[86vh]">
                <h1 className="text-4xl text font-bold text-center">
                    <span className="text-purple-600">&lt;</span>
                    pass<span className="text-purple-600">BanK&gt;</span>
                </h1>
                <p className="text-purple-800 text-lg text-center">Your Own Password Manager</p>
                <div className="text-black flex flex-col p-4 gap-8 items-center pt-6">
                    <input value={form.site} onChange={handleChange} placeholder="Enter Website URL" className="rounded-full border border-purple-500 w-full p-4 py-1" type="text" name="site" id="site" />
                    <div className="flex w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} placeholder="Enter Username" className="rounded-full border border-purple-500 w-full p-4 py-1" type="text" name="username" id="username" />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder="Enter Password" className="rounded-full border border-purple-500 w-full p-4 py-1" type="password" name="password" id="password" />
                            <span className="absolute right-[3px] top-[4px] cursor-pointer" onClick={showPassword}>
                                <img ref={ref} className="p-1" width={26} src="icons/view.png" alt="eye"/>
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className="flex justify-center items-center bg-purple-500 hover:bg-purple-400 text-black rounded-full px-2 py-2 w-fit gap-2">
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                            Save Password</button>
                </div>
                <div className="passwords">
                    <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
                    {passwordArray.length===0 && <div>No Passwords to Show</div>}
                    {passwordArray.length!=0 && <table className="table-auto w-full rounded-md overflow-hidden m-15">
                            <thead className="bg-purple-700 text-black">
                                <tr>
                                    <th className="py-2">Site</th>
                                    <th className="py-2">Username</th>
                                    <th className="py-2">Password</th>
                                    <th className="py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-purple-100">
                                {passwordArray.map((item,index)=>{
                                    return <tr key={index}>
                                            <td className="py-2 border border-white text-center">
                                                <div className="flex items-center justify-center"><a href={item.site} target="_blank">{item.site}</a>
                                                    <div className="lordiconcopy size-7 cursor-pointer" onClick={()=>{copyText(item.site)}}>
                                                        {/* <img style={{"width":"25px","height":"22px"}} src="icons/copy.png" alt="copy" /> */}
                                                        <lord-icon
                                                            style={{"width":"25px","height":"25px","paddingTop":"3px","paddingLeft":"3px"}}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover">
                                                        </lord-icon>    
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-2 border border-white text-center">
                                                <div className="flex items-center justify-center">
                                                    <span>{item.username}</span>
                                                    <div className="lordiconcopy size-7 cursor-pointer" onClick={()=>{copyText(item.username)}}>
                                                        <lord-icon
                                                            style={{"width":"25px","height":"25px","paddingTop":"3px","paddinLeft":"3px"}}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover">
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-2 border border-white text-center">
                                                <div className="flex items-center justify-center">
                                                    <span>{"*".repeat(item.password.length)}</span>
                                                    <div className="lordiconcopy size-7 cursor-pointer" onClick={()=>{copyText(item.password)}}>
                                                        <lord-icon
                                                            style={{"width":"25px","height":"25px","paddingTop":"3px","paddingLeft":"3px"}}
                                                            src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover">
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-2 border border-white text-center">
                                                <span className="cursor-pointer mx-2" onClick={()=>{editPassword(item.id)}}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/gwlusjdu.json" trigger="hover" 
                                                        style={{"width":"25px","height":"25px"}}>
                                                    </lord-icon>
                                                </span>
                                                <span className="cursor-pointer mx-2" onClick={()=>{deletePassword(item.id)}}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/skkahier.json" trigger="hover"
                                                        style={{"width":"25px","height":"25px"}}>
                                                    </lord-icon>
                                                </span>
                                            </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>}
                </div>
            </div>
        </>
    )
}
export default Manager