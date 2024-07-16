import axios from "axios";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "./Card.css";

const Pokedox = () => {
  const [pokemonData, setPokemonData] = useState([]); //Data en başta boş dizi olarak tanımlamız gerekiyor yoksa en başta undifined olduğu için mapleyemez
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0")
      .then((response) => {
        setPokemonData(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filteredPokemon = pokemonData.filter((pokemon) =>
    pokemon.name.includes(searchTerm.toLowerCase())//Burada içerip içermediğine bakıyor içeryorsa onu alır yoksa hiçbiri na
  );

  return (
    <div className="container">
      <h1 className="h1">MODERN POKEDOX</h1>

      <input
        className="input"
        type="text"
        placeholder="Search is pokemon"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      ></input>
      <br></br>
      <br></br>

      {filteredPokemon.map((data, index) => (
        <Card className="pokemon-card"  key={index} >
          <Card.Img
            className="card"
            src={`https://img.pokemondb.net/artwork/${data.name}.jpg`}
          />

          <Card.Body>
            <Card.Title className="cardName">
              {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
            </Card.Title>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};
export default Pokedox;
