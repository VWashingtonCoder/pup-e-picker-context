import React, { useContext, useState } from "react";
import { addDogToDb } from "../fetch/add-dog";
import { deleteDogFromDb } from "../fetch/delete-dog-from-db";
import { updateFavoriteForDog } from "../fetch/update-favorite";

export const DogContext = React.createContext();

const DogProvider = ({ children }) => {
  const [showComponent, setShowComponent] = useState("all-dogs");
  const [dogs, setDogs] = useState([]);

  const refetchDogs = () => {
    fetch("http://localhost:3000/dogs")
      .then((response) => response.json())
      .then(setDogs);
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

  const contextValue = {
    dogs,
    refetchDogs,
    addDog,
    deleteDog,
    unfavoriteDog,
    favoriteDog,
  };

  return (
    <DogContext.Provider value={contextValue}>{children}</DogContext.Provider>
  );
};

export default DogProvider;
