import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon"; //エンドポイント
  const [loading, setLoading] = useState(true); //状態変数
  const [pokemonData, setPokemonData] = useState();

  useEffect(() => {
    const fetchPokemonData = async () => {
      //全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      //各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      // console.log(res); //ちゃんと取得できたか確認
      // console.log(res.results); //ちゃんと取得できたか確認
      setLoading(false);
    };
    fetchPokemonData(); //定義した上の関数を実行
  }, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all( //Promise.allは配列に入れる
      data.map((pokemon) => {
        // console.log(pokemon);
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

console.log(pokemonData);

  return (
    <div className="App">
      {loading ? (
        <h1>ロード中・・・</h1>
      ) : (
        <h1>ポケモンデータを取得しました</h1>
      )}
    </div>
  );
}

export default App;
