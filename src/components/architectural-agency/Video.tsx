const Video = () => {
  return (
    <div className="video-ad__area">
      <div className="video-wrapper">
        <video autoPlay muted loop playsInline className="full-width-video">
          <source src="/assets/video/home2video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};
export default Video;
