import React, { useState, useEffect } from "react";
import axios from "axios";
import { Switch, Route } from "react-router-dom";
import KaydedilenlerListesi from "./Filmler/KaydedilenlerListesi";
import FilmListesi from "./Filmler/FilmListesi";
import Film from "./Filmler/Film";
export default function App() {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get("http://localhost:5001/api/filmler") // Burayı Postman'le çalışın
        .then((response) => {
          console.log(response);
          setMovieList(response.data);
          // Bu kısmı log statementlarıyla çalışın
          // ve burdan gelen response'u 'movieList' e aktarın
        })
        .catch((error) => {
          console.error("Sunucu Hatası", error);
        });
    };
    FilmleriAl();
  }, []);

  const KaydedilenlerListesineEkle = (id) => {
    // Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyin
    const varMi = saved.find((film) => film.id === Number(id));
    if (!varMi) {
      const kaydedilecekFilm = movieList.find((film) => film.id === Number(id));
      const kaydedilenlerSon = [...saved, kaydedilecekFilm];
      setSaved(kaydedilenlerSon);
    }
  };

  return (
    <div>
      <KaydedilenlerListesi list={saved} />
      <div>
        <Switch>
          <Route path="/filmler/:id">
            <Film KaydedilenlerListesineEkle={KaydedilenlerListesineEkle} />
          </Route>
          <Route path="/">
            <FilmListesi movies={movieList} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
