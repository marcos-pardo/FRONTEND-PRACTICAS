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
  const res = await fetch(`https://wizard-world-api.herokuapp.com/Wizards/${id}`);
  const json = await res.json();

  return {
    props: json
  }
}

type CharProps = {
  id: string;
  firstName: string;
  lastName: string;
  elixirs: { id: string, name: string }[];
}

export default function Char(props: CharProps) {

  return (
    <div className='fondoMago'>

      <button onClick={() => window.history.back()}>Back</button>

      <div key={props.id} id={props.id}>
        <h1 className="tituloId">{props.firstName} {props.lastName}</h1>
        {props.elixirs.map((c: any) => (
          <div key={c.id}>
            <Link className="linkElixir" style={{ textDecoration: 'none' }} key={c.id} id={c.id} href={`/elixirs/${c.id}`}>{c.name}</Link>
          </div>
        ))}
      </div>

    </div>
  )
}
