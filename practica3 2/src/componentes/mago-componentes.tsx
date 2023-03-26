import React, { useState, useEffect } from 'react';
import Link from 'next/link';

type Mago = {
    id: string;
    firstName: string;
    lastName: string;
}

const MagoComponent = () => {
    const [mago, setMago] = useState<Mago[]>([]);

    const fetchHouses = async () => {
        const response = await fetch('https://wizard-world-api.herokuapp.com/Wizards');
        const data = await response.json();
        setMago(data);
    }

    useEffect(() => {
        fetchHouses();
    }, [mago]);

    if ((mago.length === 0)) return (
        <div className="spinner-screen">
            <div className="spinner">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
            </div>
        </div>
    );

    return (
        <div className='fondo'>
            <h1 className="tituloMagos">MAGOS</h1>
            {mago.map((mago) => (
                <Link className="nombreMagos" style={{ textDecoration: 'none' }} key={mago.id} id={mago.id} href={`/wizard/${mago.id}`} >
                    <div key={mago.id}>
                        <h1>{mago.firstName} {mago.lastName}</h1>
                    </div>
                </Link>
            ))}

        </div>
    )
}




export default MagoComponent;