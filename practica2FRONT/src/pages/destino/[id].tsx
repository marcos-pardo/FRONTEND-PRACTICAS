import { useRouter } from 'next/router'
import data from "@/data/data.json";
import Link from "next/link";
import Image from "next/image";


const pantallaDestino = () => {
  const router = useRouter();
  const { id } = router.query;
  


  return (

    <div>
      
      <Image
        className="imagenLarga"
        src={data.destinos.find((d) => d.id === id)?.imagen_larga || ""}
        alt={data.destinos.find((d) => d.id === id)?.titulo || ""}
        width={1000}
        height={500}
      />
      <Link href={"/"} >
        <button className="bottonExit">Exit</button>
      </Link>
      <h1 className="titulo2">
        {data.destinos.find((d) => d.id === id)?.titulo}{" "}
      </h1>
      <div className="descripcion2">
        {data.destinos.find((d) => d.id === id)?.descripcion2}{" "}
      </div>

    
    </div>
  );
}

export default pantallaDestino
