
import React, { useState, useEffect } from 'react';

type Casa = {
    id: number;
    name: string;
    founder: string;
    commonRoom: string;
    traits: {id: number, name: string}[];
    heads:{id:number, firstName:string, lastName:string}[];

}

const HouseComponent = () => {
    const [casa, setCasa] = useState<Casa[]>([]);


    const fetchHouses = async () => {
        const response = await fetch('https://wizard-world-api.herokuapp.com/Houses');
        const data = await response.json();
        setCasa(data);
    }
useEffect(() => {
    fetchHouses();
},[casa] );

if((casa.length === 0 ))return(
<div className="spinner-screen">
<div className="spinner">
  <div className="double-bounce1"></div>
  <div className="double-bounce2"></div>
</div>
</div>);
    return(
    <div>
        {casa.map((casa) => (
            <div key={casa.id}>
                <h1>{casa.name}</h1>
                <h2>{casa.founder}</h2>
                <h3>{casa.commonRoom}</h3>
                {casa.traits.map((c:any) => (
                    <div key={c.id}>
                        <h4>{c.name}</h4>
                        </div>
                ))}
                {casa.heads.map((c:any) => (
                    <div key={c.id}>
                        <h4>{c.firstName}</h4>
                        </div>
                ))}

    </div>
        ))}
    </div>



    )
    
}




export default HouseComponent;