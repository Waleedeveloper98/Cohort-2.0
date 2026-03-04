import React from "react";
import useAuth from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import FaceExpression from "../../Expression/components/FaceExpression";
import Player from "../components/Player";
import "../style/home.scss";
import Logo from "../../shared/components/ui/logo/Logo";
import { useSong } from "../hooks/useSong";

const Home = () => {
  const { handleGetSong } = useSong();


  return (
    <section className="home">
      <div className="left">
        <Logo />
        <FaceExpression
          onClick={(expression) => handleGetSong({ mood: expression })}
        />
      </div>
      <div className="right">
        <Player />
      </div>
    </section>
  );
};

export default Home;
