import { useEffect, useRef, useState } from "react";
import { detect, init } from "../../utils/utils";
import "../style/faceExpression.scss";

export default function FaceExpression({ onClick = () => {} }) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState("Detecting...");

  const handleClick = () => {
    const expression = detect({ landmarkerRef, videoRef, setExpression });
    onClick(expression)
  };

  useEffect(() => {
    init({ landmarkerRef, videoRef, streamRef });

    return () => {
      if (landmarkerRef.current) {
        landmarkerRef.current.close();
      }

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="face-expression">
      <video ref={videoRef} playsInline />
      <h2>{expression}</h2>
      <button onClick={handleClick}>Detect expression</button>
    </div>
  );
}
