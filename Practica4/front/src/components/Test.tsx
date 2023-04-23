import React, { useEffect, useState } from "react"

const Test = () => {
    useEffect(() => {
        const fetchTest = async () => {
            const response = await fetch("http://localhost:8080/test")
            const json = await response.json();
            setData(json);
        }
        fetchTest();
    },[]);

    const [data, setData] = useState<{test:string} | undefined>(undefined);

    return (
        <>
            {data && data.test}
        </>
    )
}

export default Test;