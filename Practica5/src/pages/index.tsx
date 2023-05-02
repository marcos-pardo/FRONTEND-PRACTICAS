import { GetServerSideProps, NextPage } from "next"
import Link from "next/link";

export default function Home() {

  return (
    <>

      <div className="inicio">

        <div className="conjunto">
          <div className="totalCount">SWAPI</div>
          <Link href={"/peliculas"}>
            <button className="boton">Peliculas 🎬</button>
          </Link>

          <Link href={"/planetas"}>
            <button className="boton">Planetas 🪐</button>
          </Link>

          <Link href={"/vehiculos"}>
            <button className="boton">Vehículos 🚀</button>
          </Link>
        </div>


      </div>



    </>
  )
}