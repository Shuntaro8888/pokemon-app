//  データのロードには少々時間がかかることを想定
export const getAllPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json()) //Json形式にして
      .then((data) => resolve(data)); //値を返す
  });
};

export const getPokemon = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => res.json()) //Json形式にして
      .then((data) => resolve(data)); //値を返す
  });
};
