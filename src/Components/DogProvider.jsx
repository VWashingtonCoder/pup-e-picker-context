import React, { useContext, useState } from "react";
import { addDogToDb } from "../fetch/add-dog";
import { deleteDogFromDb } from "../fetch/delete-dog-from-db";
import { updateFavoriteForDog } from "../fetch/update-favorite";

export const DogContext = React.createContext();

const DogProvider = ({ children }) => {
  const [showComponent, setShowComponent] = useState("all-dogs");
  const [dogs, setDogs] = useState([]);
  const dogData = {
    ["all-dogs"]: dogs,
    ["favorite-dogs"]: dogs.filter((dog) => dog.isFavorite === true),
    ["unfavorite-dogs"]: dogs.filter((dog) => dog.isFavorite === false),
  };

  const refetchDogs = () => {
    fetch("http://localhost:3000/dogs")
      .then((response) => response.json())
      .then((res) => {
        setDogs(res);
      });
  };

  const addDog = (dog) => {
    addDogToDb({
      name: dog.name,
      description: dog.description,
      image: dog.image,
    }).then(() => {
      refetchDogs();
    });
  };

  const deleteDog = (dogId) => {
    deleteDogFromDb(dogId).then(() => refetchDogs());
  };

  const unfavoriteDog = (dogId) => {
    updateFavoriteForDog({ dogId, isFavorite: false }).then(() =>
      refetchDogs()
    );
  };

  const favoriteDog = (dogId) => {
    updateFavoriteForDog({ dogId, isFavorite: true }).then(() => refetchDogs());
  };

  const onClickFavorited = () => {
    showComponent === "favorite-dogs"
      ? setShowComponent("all-dogs")
      : setShowComponent("favorite-dogs");
  };

  const onClickUnfavorited = () => {
    showComponent === "unfavorite-dogs"
      ? setShowComponent("all-dogs")
      : setShowComponent("unfavorite-dogs");
  };

  const onClickCreateDog = () => {
    showComponent === "create-dog-form"
      ? setShowComponent("all-dogs")
      : setShowComponent("create-dog-form");
  };

  const contextValue = {
    dogs: dogData[showComponent],
    refetchDogs,
    addDog,
    deleteDog,
    unfavoriteDog,
    favoriteDog,
    onClickFavorited,
    onClickUnfavorited,
    onClickCreateDog,
    showComponent,
    favoriteDogCount: dogData["favorite-dogs"].length,
    unfavoriteDogCount: dogData["unfavorite-dogs"].length,
  };

  return (
    <DogContext.Provider value={contextValue}>{children}</DogContext.Provider>
  );
};

export default DogProvider;
