
"use client";
import { useState } from "react";
import {useQuery} from "@tanstack/react-query";



export default function TestPage() {
    const [id, setId] = useState(0);
    const {data,refetch,isPending,isFetching, error} = useQuery({
        queryKey: ["get_messagesById",id],
        queryFn: () => postTodos(id)
    })
    if(error){
        alert("something went wrong!")
        console.log(error)
    }


    return (
        <div className="flex items-center  min-h-screen bg-gray-900">

            <div className="bg-white text-black px-8 py-6 rounded-xl shadow-lg text-xl font-semibold">
                THIS IS THE MESSAGE
                <h2>{isPending ? "LOADING......"
                    : (data?.return_message ?? `Message Not Found`)}</h2>
            </div>

            <div className="bg-white text-black px-8 py-6 rounded-xl shadow-lg text-xl font-semibold">
                THIS IS THE MESSAGE ID
                <h2>
                    {isPending ? "LOADING......"
                        :  (data?.message_id)}
                </h2>
            </div>
            <button
                onClick={() => refetch()}
                className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
                REFRESH
            </button>
            <div className="bg-white text-black px-8 py-6 rounded-xl shadow-lg text-xl font-semibold">

                <input onChange={(e)=>setId(Number(e.target.value))} value={id}/>
            </div>

        </div>

    );
}


const getTodos = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const response = await fetch(`http://127.0.0.1:3001/test`)
    return await response.json()
}
const postTodos = async (id: number) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const response =  await fetch(`http://127.0.0.1:3001/testpost/`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            message_id: id,
        })
    });
    return await response.json()
}