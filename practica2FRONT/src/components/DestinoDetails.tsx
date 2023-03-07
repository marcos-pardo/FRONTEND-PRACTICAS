import Image from "next/image";
import Link from "next/link";


export type DestinoDetailsProps = {
  id: string;//debe de ser único
  titulo: string;//lugar de destino.Ex: Madrid
  descripcion: string;//descripción corta que no debe superar los 200 caracteres
  descripcion2: string;//descripción larga que debe ser superior a los 500 caracteres
  imagen_corta: string;//imagen descriptiva del viaje.Buscar imágenes libre de uso
  imagen_larga: string;//imagen descriptiva del viaje.Buscar imágenes libre de uso

}

export default function DestinoDetails(props: DestinoDetailsProps) {


  return (
    <div>
      <Link 
      style={{ textDecoration: 'none' }}
        key={props.id}
        id={props.id} href={`/destino/${props.id}`}
      >

        <div className="destinoComponent" >

          <Image key={props.id} className="ImagenCorta" src={props.imagen_corta} alt={props.titulo} width={200} height={200} />
          <div className="ordenarDescripcion">

            <h1 className="a">
              {props.titulo}
            </h1>

            <div className="a">
              {props.descripcion}
            </div>
          </div>
        </div>
      </Link>
    </div>

  )
}
