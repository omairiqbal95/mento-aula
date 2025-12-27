"use client";
import React from "react";

const ContactForm = () => {
  return (
    <div className="contact-us__area pt-150 pb-150">
      <div className="container">
        <div className="row justify-content-between gy-5">
          <div className="col-lg-5 fade_up_anim" data-delay=".2">
            <div className="contact-us__info">
              <h4 className="h4">Contacta con Nosotros</h4>
              <div className="contact-us__info-emailPhoneWrapper">
                <div className="contact-us__info-email">
                  <ul className="custom-ul">
                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M19.5789 2H4.42105C1.52842 2 0 3.58812 0 6.59375V18.4062C0 21.4119 1.52842 23 4.42105 23H19.5789C22.4716 23 24 21.4119 24 18.4062V6.59375C24 3.58812 22.4716 2 19.5789 2ZM22.7368 18.4062C22.7368 20.6756 21.7629 21.6875 19.5789 21.6875H4.42105C2.23705 21.6875 1.26316 20.6756 1.26316 18.4062V6.59375C1.26316 4.32444 2.23705 3.3125 4.42105 3.3125H19.5789C21.7629 3.3125 22.7368 4.32444 22.7368 6.59375V18.4062ZM19.4578 7.52037C19.6624 7.81305 19.6004 8.22388 19.3187 8.43651L13.1142 13.1247C12.7807 13.3767 12.3903 13.5028 12 13.5028C11.6084 13.5028 11.2193 13.3767 10.8858 13.1247L4.68133 8.43651C4.39838 8.22388 4.33762 7.81305 4.54225 7.52037C4.74688 7.22637 5.14351 7.16337 5.42393 7.37599L11.6287 12.0642C11.851 12.2309 12.149 12.2322 12.3713 12.0642L18.5761 7.37599C18.8578 7.16337 19.2531 7.22637 19.4578 7.52037Z"
                          fill="currentColor"
                        />
                      </svg>
                    </li>
                    <li>
                      <span>Email</span>
                    </li>
                    <li>
                      <a href="mailto:info@mentoaula.com">info@mentoaula.com</a>
                    </li>
                  </ul>
                </div>

                <div className="contact-us__info-phone">
                  <ul className="custom-ul">
                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M22.7662 16.1911L19.4279 14.2004C17.9539 13.3212 16.053 13.7507 15.0994 15.1743L13.9856 16.8379C10.9973 15.4522 8.54809 12.9979 7.16253 9.99659L8.81966 8.89515C10.2469 7.94651 10.6814 6.04672 9.80734 4.57135L7.83198 1.23659C7.28635 0.313226 6.21644 -0.162979 5.13906 0.0504946C3.40237 0.397863 1.87283 1.46396 0.941961 2.97344C0.0174111 4.47407 -0.237591 6.22988 0.225947 7.91493C2.33524 15.5899 8.41553 21.6669 16.0936 23.7751C16.643 23.9255 17.1975 24 17.7495 24C18.8925 24 20.0191 23.6804 21.0308 23.0564C22.5388 22.1255 23.6036 20.5958 23.9509 18.8589C24.1606 17.8118 23.6857 16.7394 22.7662 16.1911ZM22.7119 18.6101C22.4328 20.0046 21.579 21.2337 20.3678 21.9814C19.1666 22.7217 17.7647 22.9238 16.4297 22.5574C9.17855 20.5667 3.43546 14.8282 1.4449 7.58018C1.07483 6.23744 1.278 4.83663 2.01814 3.63663C2.76587 2.42526 3.99359 1.56881 5.41073 1.28586C5.49283 1.26944 5.57625 1.26061 5.65834 1.26061C6.09915 1.26061 6.51732 1.49176 6.74593 1.88082L8.72006 5.2143C9.2518 6.11114 8.98773 7.26566 8.11876 7.84293L6.02067 9.23873C5.76932 9.40673 5.6723 9.72881 5.78724 10.008C7.3231 13.6888 10.3052 16.6787 13.9705 18.2122C14.2522 18.3297 14.5729 18.2324 14.7383 17.981L16.1466 15.8779C16.7276 15.0113 17.8807 14.7499 18.78 15.2855L22.1183 17.2762C22.5794 17.5503 22.8168 18.0859 22.7119 18.6101Z"
                          fill="currentColor"
                        />
                      </svg>
                    </li>
                    <li>
                      <span>Teléfono</span>
                    </li>
                    <li>
                      <a href="tel:+34900123456">+34 933 930 435</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="contact-us__info-address">
                <ul className="custom-ul">
                  <li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12.0013 0C5.93505 0 1 4.81642 1 10.7368C1 17.0312 6.99118 20.8939 10.9555 23.4492L11.6415 23.8939C11.7502 23.9647 11.8757 24 12 24C12.1242 24 12.2498 23.9647 12.3585 23.8939L13.0445 23.4492C17.0088 20.8939 23 17.0312 23 10.7368C23.0026 4.81642 18.0675 0 12.0013 0ZM12.3326 22.3958L12.0013 22.6104L11.67 22.3958C7.936 19.9882 2.29427 16.3516 2.29427 10.7368C2.29427 5.51242 6.64819 1.26316 12.0013 1.26316C17.3544 1.26316 21.7083 5.51242 21.7083 10.7368C21.7083 16.3516 16.0666 19.9894 12.3326 22.3958ZM12.0013 6.94737C9.86057 6.94737 8.11848 8.64758 8.11848 10.7368C8.11848 12.8261 9.86057 14.5263 12.0013 14.5263C14.142 14.5263 15.8841 12.8261 15.8841 10.7368C15.8841 8.64758 14.142 6.94737 12.0013 6.94737ZM12.0013 13.2632C10.5737 13.2632 9.41275 12.1301 9.41275 10.7368C9.41275 9.34358 10.5737 8.21053 12.0013 8.21053C13.4289 8.21053 14.5898 9.34358 14.5898 10.7368C14.5898 12.1301 13.4289 13.2632 12.0013 13.2632Z"
                        fill="currentColor"
                      />
                    </svg>
                  </li>
                  <li>
                    <span>Dirección</span>
                  </li>
                  <li>
                    <p>Rda. de Sant Antoni, 8, Ciutat Vella, 08001 Barcelona, Spain</p>
                  </li>
                </ul>
              </div>
              <div className="contact-us__info-social">
                <ul className="custom-ul">
                  <li>
                    <a href="https://www.facebook.com/profile.php?id=100010522573686">
                      <i className="fa-brands fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/ahmed_sardar1?lang=es">
                      <i className="fa-brands fa-x-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.linkedin.com/in/ahmedsardar?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app">
                      <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/ahmedsardar9/profilecard/?igsh=ZHAzbGRvZzJwdDA0">
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-6 fade_up_anim" data-delay=".4">
            <div className="contact-us__form">
              <h4 className="h4">Solicita información</h4>
              <form
                className="contact-us__form-form"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="contact-us__form-namePhoneWrapper">
                  <div className="contact-us__form-name">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Nombre y apellidos"
                    />
                  </div>
                  <div className="contact-us__form-phone">
                    <input
                      type="number"
                      name="phone"
                      id="phone"
                      placeholder="Teléfono"
                    />
                  </div>
                </div>
                <div className="contact-us__form-email">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Correo electrónico"
                  />
                </div>
                <div className="contact-us__form-message">
                  <textarea
                    name="message"
                    id="message"
                    placeholder="¿En qué podemos ayudarte?"
                  ></textarea>
                </div>
                <button className="common-btn outline justify-content-center border-light w-100">
                  <span>Enviar</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;