import React, { useState } from "react";
import { AiFillPlayCircle, AiFillStop } from "react-icons/ai";

export default function CustomAudio({ source, refrence, playerI }) {
  const [playAud, setPlayAud] = useState(false);

  const stopAudFunc = () => {
    playerI.pause();
    playerI.currentTime = 0;
    return setPlayAud(!playAud);
  };

  const playAudFunc = () => {
    playerI.play();
    return setPlayAud(!playAud);
  };

  return (
    <div className="w-full">
      <audio
        src={source}
        ref={refrence}
        onEnded={() => setPlayAud(!playAud)}
      ></audio>
      {playAud ? (
        <AiFillStop className="text-primary text-3xl" onClick={stopAudFunc} />
      ) : (
        <AiFillPlayCircle
          className="text-primary text-3xl"
          onClick={playAudFunc}
        />
      )}
    </div>
  );
}
