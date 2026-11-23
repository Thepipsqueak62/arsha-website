import {testAPIRequest} from "@/app/API/testapi";
import React from "react";


interface TestData{
    message: string,
    message_id: string,
}



export function useTestAPIHook() {
    const [data, setData]= React.useState<TestData | null>(null);

    const fetch = React.useCallback(async () => {

        try{
            const request = await testAPIRequest()

            setData(request)

        }catch(e){
            console.error(e)
        }
    },[])
    React.useEffect(() => {fetch()},[fetch])

    return {data}
}