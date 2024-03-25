import ReactPlayer from "react-player";

export function Modal({ videoURL, handleModal }) {
  return (
    <div className="videoPlayer">
      <button className="btn-close" onClick={handleModal}>
        X
      </button>
      <ReactPlayer
        url={videoURL}
        controls={true}
        height="58rem"
        width="100rem"
      />
    </div>
  );
}
