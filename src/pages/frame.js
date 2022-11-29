import React from "react";
import "./style.css";

const SongFrame = () => {
  const [data, setData] = React.useState();
  const [url, setURL] = React.useState("");
  const [successPopUp, setSuccessPopUp] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [error, setError] = React.useState(false);

  const musicURL = React.useRef();

  const inputChange = () => {
    musicURL.current.value && fetchData() 
  }

  const fetchData = async () => {
    await fetch(
      `http://127.0.0.1:5000/api2/youtube?url=${musicURL.current.value}`
    )
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.log(err));
    const splitbyword = musicURL.current.value.split("").slice(32, 43).join("");
    const embedURL = `https://www.youtube.com/embed/${splitbyword}`;
    setURL(embedURL);
  };
  
  const downloadVideo = () => {
    if (musicURL.current.value) {
      setLoader(true);
    }
    fetch(
      `http://127.0.0.1:5000/api2/youtube/download?url=${musicURL.current.value}`
    ).then((res) => {
      console.log(res);
      if (res.status === 200) {
        setSuccessPopUp(true);
        setLoader(false);
      } else if (res.status === 500) {
        setError(true);
        setLoader(false);
      }
    });
  }
  ;

  return (
    <>
      {data ? (
        <div className="grid-container">
          <div className="g1">
            <iframe
              className="video"
              src={url}
              height="400"
              width="610"
              title="Iframe Example"
              frameBorder="0"
            ></iframe>
          </div>

          <div className="g2">
            <div className="songName">
              {data.info.title} <br /> <br />
              <span className="author">{data.info.author}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="welcome">
          <b>
            Welcome to the video download site with youtube link. Paste the link
            of the youtube video you want to download into the box below. Then
            you can listen to the video by pressing the green box and you can
            download the video by pressing the blue box. The video you
            downloaded will save to the desktop.
          </b>
        </div>
      )}

      {successPopUp && (
        <div className="successPop">
          <div className="success">
            <img
              className="success-icon"
              src="https://www.shareicon.net/data/2016/08/20/817720_check_395x512.png"
              alt="success"
            />
            <button
              onClick={() => {
                setSuccessPopUp(false);
              }}
              className="close-button"
            >
              <img
                className="close-icon"
                src="https://cdn-icons-png.flaticon.com/512/61/61155.png"
                alt="close-icon"
              />
            </button>
            <span className="afterdownloadText">
              Video has been downloaded on your desktop!
            </span>
          </div>
        </div>
      )}

      {loader && (
        <div className="successPop">
          <div className="success">
            <div class="lds-facebook">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="successPop">
          <div className="success">
            <button
              onClick={() => {
                setError(false);
              }}
              className="close-button"
            >
              <img
                className="close-icon2"
                src="https://cdn-icons-png.flaticon.com/512/61/61155.png"
                alt="close-icon2"
              />
            </button>
            <span className="afterdownloadText2">
              Please check the URL and try it again.
            </span>
          </div>
        </div>
      )}

      <input ref={musicURL} onChange={inputChange} className="input-box" type="text" />
    
      <button onClick={fetchData} className="fetchButton">
        Generate
      </button>

      <button onClick={downloadVideo} className="downloadButton">
        Download
      </button>
    </>
  );
};

export default SongFrame;
