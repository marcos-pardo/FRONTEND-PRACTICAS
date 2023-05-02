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

type Species = { name: string }
type Homeworld = { name: string }
type Person = { name: string, birthYear: string, eyeColor: string, gender: string, height: number, homeworld: Homeworld, species: Species }

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const QUERY = gql`
    query($id: ID!){
        person(id: $id){
            name
            birthYear
            eyeColor
            gender
            height
            homeworld{
                name
            }
            species{
                name
            }
        }
  
    }
`

  const client = getClientSSR();
  const { data } = await client.query<{ person: Person }>({
    query: QUERY,
    variables: { id: params?.id }
  })

  return {
    props: { data: data.person }
  }
}

const Autor: NextPage<{ data: Person }> = ({ data }) => {
  return (
    <>
      <div className="container-labels">
        <Volver />

        <label htmlFor="name">
          Name: <span id="name">{data.name}</span>
        </label>
        <br />
        <label htmlFor="birth-year">
          Birth Year: <span id="birth-year">{data.birthYear}</span>
        </label>
        <br />
        <label htmlFor="eye-color">
          Eye Color: <span id="eye-color">{data.eyeColor}</span>
        </label>
        <br />
        <label htmlFor="gender">
          Gender: <span id="gender">{data.gender}</span>
        </label>
        <br />
        <label htmlFor="height">
          Height: <span id="height">{data.height}</span>
        </label>
        <br />
        <label htmlFor="homeworld">
          Homeworld: <span id="homeworld">{data.homeworld.name}</span>
        </label>
        <br />
        <label htmlFor="species">
          Species: <span id="species">{data.species?.name ?? 'Unknown'}</span>
        </label>
      </div>
    </>
  )
}

export default Autor;