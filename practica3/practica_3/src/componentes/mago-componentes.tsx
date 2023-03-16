
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

type Mago = {
    id: string;
    firstName: string;
    lastName: string;

}

const HouseComponent = () => {
    const [mago, setMago] = useState<Mago[]>([]);


    const fetchHouses = async () => {
        const response = await fetch('https://wizard-world-api.herokuapp.com/Wizards');
        const data = await response.json();
        setMago(data);
    }
useEffect(() => {
    fetchHouses();
},[mago] );

if((mago.length === 0 ))return(
<div className="spinner-screen">
<div className="spinner">
  <div className="double-bounce1"></div>
  <div className="double-bounce2"></div>
</div>
</div>);
    return(
    <div>

        {mago.map((mago) => (
                    <Link 
                    style={{ textDecoration: 'none' }}
                      key={mago.id}
                      id={mago.id} href={`/destino/${mago.id}`}//aqui falta cambiar el/destino por el nombre de la nueva ruta
                    >
            <div key={mago.id}> 
                <h1>{mago.firstName}</h1>
                <h2>{mago.lastName}</h2>

    </div>
    </Link>
        ))}
    
    </div>



    )
    
}




export default HouseComponent;