import Link from "next/link";
import DestinoDetails from "@/components/DestinoDetails";
import data from "@/data/data.json";
const blue = "blue";

export default function Home() {//Esto es lenguaje  tsx
  return (
    <>
      <div>
        {data.destinos.map(
          (n) => {
            return (<DestinoDetails key={n.id}
              id={n.id} titulo={n.titulo} descripcion={n.descripcion} descripcion2={n.descripcion2} imagen_corta={n.imagen_corta} imagen_larga={n.imagen_larga} ></DestinoDetails>
            )
          }
        )}
      </div>
    </>)

}