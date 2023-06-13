import React, { useContext, useState } from "react";
import { addDogToDb } from "../fetch/add-dog";

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

  const contextValue = {
    refetchDogs,
    addDog,
  };

  return (
    <DogContext.Provider value={contextValue}>{children}</DogContext.Provider>
  );
};

export default DogProvider;
