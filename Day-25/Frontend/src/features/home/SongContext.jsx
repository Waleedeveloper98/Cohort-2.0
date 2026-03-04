import { useState } from "react";
import { createContext } from "react";

export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {
  const [song, setSong] = useState({
    url: "https://ik.imagekit.io/todbuwbsb/cohort-2/moodify/songs/Rab_Ne_Kiya_Faisala__DOWNLOAD_MING___qSINRki3.mp3",
    posterUrl:
      "https://ik.imagekit.io/todbuwbsb/cohort-2/moodify/posters/Rab_Ne_Kiya_Faisala__DOWNLOAD_MING__nweXBMOYM.jpeg",
    title: "Rab Ne Kiya Faisala [DOWNLOAD MING]",
    mood: "sad",
  });
  const [loading, setLoading] = useState(false);

  return (
    <SongContext.Provider value={{ song, setSong, loading, setLoading }}>
      {children}
    </SongContext.Provider>
  );
};
