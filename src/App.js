import React, { useEffect, useState } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import Item from "./components/Item";
import FavItem from "./components/FavItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnother } from "./actions";

export default function App() {
  const dispatch = useDispatch();
  const current = useSelector((store) => store.current);
  const unis = useSelector((store) => store.unis);
  const loading = useSelector((store) => store.loading);
  const favs = [];

  const itemPerPage = 10;
  const [page, setPage] = useState(1);

  function arttir() {
    setPage(page + 1);
  }
  const azalt = () => {
    setPage(page - 1);
  };

  function addToFavs() {}
  useEffect(() => {
    dispatch(fetchAnother());
  }, []);

  return (
    <div className="wrapper max-w-xl mx-auto px-4">
      <nav className="flex text-2xl pb-6 pt-8 gap-2 justify-center">
        <NavLink
          to="/"
          exact
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Rastgele
        </NavLink>
        <NavLink
          to="/favs"
          className="py-3 px-6 "
          activeClassName="bg-white shadow-sm text-blue-600"
        >
          Favoriler
        </NavLink>
      </nav>

      <Switch>
        <Route exact path="/">
          {loading && (
            <div className="bg-white p-6 text-center shadow-md">YÜKLENİYOR</div>
          )}
          {current && <Item data={current} />}

          <div className="flex gap-3 justify-end py-3">
            <button className="select-none px-4 py-2 border border-blue-700 text-blue-700 hover:border-blue-500 hover:text-blue-500">
              Başka bir tane
            </button>
            <button
              onClick={addToFavs}
              className="select-none px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white"
            >
              Favorilere ekle
            </button>
          </div>
          <div className="block">
            <button
              onClick={arttir}
              className="select-none px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white"
            >
              +
            </button>
            ---page---
            <button
              onClick={azalt}
              className="select-none px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white"
            ></button>
            {unis.length &&
              unis
                .splice(itemPerPage * (page - 1, itemPerPage * page))
                .map((uni, index) => (
                  <div
                    key={uni.id}
                    className="select-none px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white"
                  >
                    {itemPerPage * (page - 1) + index + 1} {uni.name}
                  </div>
                ))}
          </div>
        </Route>

        <Route path="/favs">
          <div className="flex flex-col gap-3">
            {favs.length > 0 ? (
              favs.map((item) => (
                <FavItem key={item.key} id={item.key} title={item.activity} />
              ))
            ) : (
              <div className="bg-white p-6 text-center shadow-md">
                Henüz bir favoriniz yok
              </div>
            )}
          </div>
        </Route>
      </Switch>
    </div>
  );
}
