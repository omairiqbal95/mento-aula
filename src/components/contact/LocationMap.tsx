import React from "react";

const LocationMap = () => {
  return (
    <div className="google-map__area">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 p-0">
            <div className="google-map__map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4430811.394107611!2d-104.47826476833465!3d39.9273903666735!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sbd!4v1720412261550!5m2!1sen!2sbd"
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
