import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { gql } from "@apollo/client";
import { getClientSSR } from "@/utils/apolloclient";
import Link from "next/link";

type Vehicle = { name: string; model: string; vehicleClass: string };
type Vehicles = { vehicles: Array<Vehicle> };
type VehiclesCount = { totalCount: number };

export const getServerSideProps: GetServerSideProps = async () => {
  const QUERY = gql`
    query{
      allVehicles{
        totalCount
        vehicles{
          costInCredits
          name
          model
          length
          passengers
          cargoCapacity
        }
      }
    }
  `;

  const client = getClientSSR();
  const { data } = await client.query<{ allVehicles: VehiclesCount & Vehicles }>({
    query: QUERY,
  });

  return {
    props: { data: data.allVehicles },
  };
};

const Home: NextPage<{ data: VehiclesCount & Vehicles }> = ({ data }) => {
  return (
    <>
      <div className="fondoSwapi">
        <div className="totalCount">Total Vehículos: {data.totalCount}</div>
        <Link href={"/"} >
          <button className="bottonVolver">Back</button>
        </Link>


        <div className="object-list-container">
          {data.vehicles.map((vehicle) => (
            <div className="object-item">
              <h2>{vehicle.name}</h2>
              <div className="object-info">
                <p>Model: {vehicle.model}</p>
                <p>Coste: {vehicle.costInCredits}</p>
                <p>Length: {vehicle.length}</p>
                <p>Passengers: {vehicle.passengers}</p>
                <p>Cargo Capacity: {vehicle.cargoCapacity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  );
};

export default Home;
