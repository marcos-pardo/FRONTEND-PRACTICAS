import React from "react"
import { GetServerSideProps, NextPage } from "next"
import { gql } from "@apollo/client"
import { getClientSSR } from "@/utils/apolloclient";
import Link from "next/link";


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

type Movies = { films: Array<{ title: string, episodeID: number, id: string }> }

export const getServerSideProps: GetServerSideProps = async () => {
  const QUERY = gql`	
    query {
      allFilms {
        films {
          title
          episodeID
          id
        }
      }
    }
  `


  const client = getClientSSR();
  const { data } = await client.query<{ allFilms: Movies }>(
    { query: QUERY }
  )



  return {
    props: { data: data.allFilms },
  }
}

const Home: NextPage<{ data: Movies }> = ({ data }) => {
  return (
    <>
      <div className="fondoSwapi">
        <div className="totalCount">Movies</div>
        <Link href={"/"} >
          <button className="bottonVolver">Back</button>
        </Link>

        <div className="pelicula-list-container">
          {data.films.map((film) => (

            <Link style={{ textDecoration: 'none' }} key={film.id} href={`/pelicula/${film.id}`} >
              <div key={film.id} className="pelicula-item">
                <div className="numeroRomano">{film.episodeID} - {convertToRoman(film.episodeID)} </div>
                <div className="object-info">
                  <p style={{ color: "#252529" }}>{film.title}</p>
                </div>
              </div>
            </Link>

          ))}
        </div>
      </div>
    </>
  )
}


export default Home;