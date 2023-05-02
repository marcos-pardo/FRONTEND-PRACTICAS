import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { gql } from "@apollo/client";
import { getClientSSR } from "@/utils/apolloclient";
import Link from "next/link";

function getPopulationColor(population: number): string {//Función para el color dependiendo de la población
  if (population >= 0 && population < 6000000) {
    return "red";
  } else if (population >= 6000000 && population < 4500000000) {
    return "green";
  } else {
    return "purple";
  }
}

type Planet = { population: number; name: string; gravity: string, id: string };
type Planets = { planets: Array<Planet> };
type PlanetsCount = { totalCount: number };

export const getServerSideProps: GetServerSideProps = async () => {
  const QUERY = gql`
    query {
      allPlanets {
        totalCount
        planets {
          population
          name
          gravity
          id
        }
      }
    }
  `;

  const client = getClientSSR();
  const { data } = await client.query<{ allPlanets: PlanetsCount & Planets }>({
    query: QUERY,
  });



  return {
    props: { data: data.allPlanets },
  };
};

const Home: NextPage<{ data: PlanetsCount & Planets }> = ({ data }) => {
  return (

    <>
      <div className="fondoSwapi">
        <div className="totalCount">Total Planetas: {data.totalCount}</div>
        <Link href={"/"} >
          <button className="bottonVolver">Back</button>
        </Link>

        <div className="object-list-container">
          {data.planets.map((planet) => (

            <div className="object-item">
              <div style={{ width: "20px", height: "20px", backgroundColor: getPopulationColor(planet.population), borderRadius: "50%" }}></div>
              <h2>{planet.name}</h2>
              <div className="object-info">
                <p>Gravity: {planet.gravity}</p>
                <p> Population: {planet.population}</p>
              </div>
            </div>

          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
