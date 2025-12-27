import React from "react";

const LocationMap = () => {
  return (
    <div className="google-map__area">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 p-0">
            <div className="google-map__map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2993.764983783823!2d2.1633864!3d41.3791905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a35f9db09fc1%3A0x6ee6c91f238784f1!2sGestoria%20Barcelona%20Sahel%20%7C%20Tr%C3%A1mites%20De%20Extranjer%C3%ADa%20En%20Barcelona!5e0!3m2!1sen!2suk!4v1766852822121!5m2!1sen!2suk"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;