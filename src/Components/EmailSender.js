import { useState,useEffect } from "react"
import toast from "react-hot-toast";
import { sendemail } from "../Services/email.services";
import { LIGHT_URL,DARK_URL } from "../Utils/Constants";

const EmailSender = () => {

    const [Emaildata,SetEmaildata] = useState({
        to :"",
        subject:"",
        message : "",
    });

    const[Loader,SetLoader] = useState(false);
    const [ThemeIMG,SetThemeIMG] = useState(LIGHT_URL);
    const [Theme,SetTheme] = useState("light");

    useEffect(()=>{
        if(Theme === "dark"){
            document.documentElement.classList.add("dark");
        }else{
            document.documentElement.classList.remove("dark");
        }
    },[Theme]);

    const handleThemeSwith = ()=>{
        SetTheme(Theme === "dark" ? "light" : "dark");
        if(Theme === 'dark'){
            SetThemeIMG(LIGHT_URL);
        }
        else{
            SetThemeIMG(DARK_URL);

        }
    }

    const Handlefieldchange = (event,name)=>{
        SetEmaildata({...Emaildata,[name]:event.target.value});
    }

    const Handlesubmit = (async (event)=>{
       
        event.preventDefault();

        if(Emaildata.to =='' ||  Emaildata.subject =='' || Emaildata.message =='' ){
            toast.error("Invalid Entries !!")
            return;
        }

        try {
            SetLoader(true);
           await sendemail(Emaildata);
            toast.success("Email Sent Succesfully !! ")
            SetEmaildata({to :"",
            subject:"",
            message : "",});
        } catch (error) {
            console.log(error);
            toast.error("Error Occured , Email not Sent !!")
            
        }
        finally{SetLoader(false);}
        console.log(Emaildata);
    })

    return (
        <div>
            <div className="w-full min-h-screen flex justify-center items-center ">
                <div className=" Email-Card md:w-4/12 w-full mx-4 md:mx-0 p-4 rounded-lg  border shadow-lg bg-white dark:bg-blue-100">
                    
                    <div className="Header flex flex-wrap justify-between">
                            <h1 className="text-3xl font-bold text-gray-800">
                                Email Sender
                                <p className="text-sm text-gray-500 ">Send Your Email</p>
                            </h1>
                            
                            <div className="" onClick={()=>handleThemeSwith()}>
                                <img className="w-[50px] h-[25px]" src={ThemeIMG}></img>
                            </div>
                    </div>
                        
                    <form action="" onSubmit={Handlesubmit} >

                        {/*recipient*/}
                        <div className="mt-5 mb-5">
                            <label id="recipient" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">To</label>
                            <input value={Emaildata.to} onChange={(event)=> Handlefieldchange(event,'to')} placeholder="Enter Here" type="text" id="recipient" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>

                        {/*subject*/}
                        <div className="mb-5">
                            <label id="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Subject </label>
                            <input value={Emaildata.subject} onChange={(event)=> Handlefieldchange(event,'subject')} placeholder="Enter Here" type="text" id="subject" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>

                        {/*Message box*/}
                        <label id="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Your message</label>
                        <textarea value={Emaildata.message} onChange={(event)=> Handlefieldchange(event,"message")} id="message" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your Mail here..." />

                        {/*Submit/Clear Button*/}
                        <div className="button mt-4 flex justify-center gap-2">
                            
                            
                            {Loader && 
                            <div className="loader flex justify-center mt-4" role="status">
                                <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div>}

                            <button disabled={Loader} type="submit" className=" cursor-pointer border hover:bg-blue-700 text-white bg-blue-500 p-2 rounded-lg">
                                Send Email
                            </button>
                            <button className=" cursor-pointer border bg-gray-700 text-white hover:bg-gray-500 p-2 rounded-lg">
                                Clear
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default EmailSender