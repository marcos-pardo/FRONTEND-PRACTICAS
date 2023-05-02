import { getClientSSR } from "@/utils/apolloclient"
import { gql } from "@apollo/client"
import { GetServerSideProps, NextPage } from "next"
import Link from "next/link"
import { useRouter } from 'next/router';


function Volver() {//Funcion para volver a la pagina anterior y no a la principal
  const router = useRouter();

  function handleVolver() {
    router.back();
  }
  return (
    <button className="bottonVolver" onClick={handleVolver}>
      Back
    </button>
  );
}


function convertToRoman(num: number): string {//Funcion para convertir  a numero romano
  const romanNums: { [key: string]: number } = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
  };

  let roman = "";

  for (let i in romanNums) {
    while (num >= romanNums[i]) {
      roman += i;
      num -= romanNums[i];
    }
  }

  return roman;
}

type Character = { name: string, id: string }
type Characters = { characters: Array<Character> }
type Film = { episodeId: number, director: string, title: string, releaseDate: string, characterConnection: Characters }

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const QUERY = gql`
  query($id: ID!){
    film(id: $id){
      episodeID
      director
      title
      releaseDate
      characterConnection{
        characters{
          name
          id
        }
      }
    }
  } 
  `

  const client = getClientSSR();
  const { data } = await client.query<{ film: Film }>({
    query: QUERY,
    variables: { id: params?.id }
  })

  return {
    props: { data: data.film }
  }
}

const Pelicula: NextPage<{ data: Film }> = ({ data }) => {
  return (
    <>
      <div className="container-labels">
        <Volver />

        <label htmlFor="episode-id">
          Episode:{" "}
          <span id="episode-id">{convertToRoman(data.episodeID)}</span>
        </label>
        <br />
        <label htmlFor="film-title">
          Title: <span id="film-title">{data.title}</span>
        </label>
        <br />
        <label htmlFor="director">
          Director: <span id="director">{data.director}</span>
        </label>
        <br />
        <label htmlFor="release-date">
          Release Date: <span id="release-date">{data.releaseDate}</span>
        </label>
        <br />
        <br />
        <label>Characters:</label>
        <ul>
          {data.characterConnection.characters.map((character) => (
            <h4 key={character.id}>
              <Link style={{ textDecoration: 'none', color: "#252529" }} href={`/autor/${character.id}`}>
                <div>* {character.name}</div>
              </Link>
            </h4>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Pelicula;

