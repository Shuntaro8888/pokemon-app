import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon";
import Card from "./components/Card/Card";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon"; //エンドポイント
  const [loading, setLoading] = useState(true); //状態変数
  const [pokemonData, setPokemonData] = useState([]);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      //全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      setCurrentUrl(res);
      //各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      setLoading(false);
    };
    fetchPokemonData(); //定義した上の関数を実行
  }, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      //Promise.allは配列に入れる
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  const handlePrevPage = async () => {
    if (currentUrl.previous) {
      setLoading(true);
      let data = await getAllPokemon(currentUrl.previous);
      setCurrentUrl(data);
      await loadPokemon(data.results);
      setLoading(false);
    }
  };

  const handleNextPage = async () => {
    if (!currentUrl.next) return;
      setLoading(true);
      let data = await getAllPokemon(currentUrl.next);
      setCurrentUrl(data);
      await loadPokemon(data.results);
      setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>ロード中・・・</h1>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                //iはインデックス
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
            <div className="btn">
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
