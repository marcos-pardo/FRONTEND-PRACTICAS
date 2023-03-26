import { useRouter } from 'next/router'
import Link from "next/link";
import Image from "next/image";

type ServerSideProps = {
  params: {
    id: string
  }
}

export async function getServerSideProps(props: ServerSideProps) {

  const id = props.params.id;
  const res = await fetch(`https://wizard-world-api.herokuapp.com/Elixirs/${id}`);
  const json = await res.json();

  return {
    props: json
  }
}

type CharProps = {
  id: string;
  name: string;
  effect: string;
  sideEffect: string;
  characteristics: string;
  time: any;
  difficulty: string;
  ingredients: { id: string, name: string }[];
  inventors: { id: string, firstName: string, lastName: string }[];
  manufacturer: any;
}

export default function Char(props: CharProps) {
  return (
    <div className='fondo' >
      <div className='contenedor'>
        <button onClick={() => window.history.back()}>Back</button>

        <div key={props.id} id={props.id}>

          <h1 className="tituloId2">{props.name}</h1>
          <h2>Efecto: {props.effect}</h2>
          <h2>Efectos Secundarios: {props.sideEffect}</h2>
          <h2>Caracteristicas: {props.characteristics}</h2>
          <h2>Tiempo: {props.time}</h2>
          <h2>Dificultad: {props.difficulty}</h2>


          <h2>Ingredientes: </h2>
          {props.ingredients.map((c: any) => (
            <div key={c.id}>
              <div>{c.name}</div>
            </div>
          ))}

          <h2>Inventors:</h2>
          {props.inventors.map((c: any) => (
            <div key={c.id}>
              <div>{c.firstName} {c.lastName}</div>
            </div>
          ))}

          <h2>{props.manufacturer}</h2>

        </div>
      </div>
    </div>
  )
}
