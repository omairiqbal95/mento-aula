"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import ClientItem from "./ClientItem";
import { clientsContent } from "@/content/legal-advisor/home/clients";
import { ClientItem as ClientItemType } from "@/types/legal-advisor/clients";

const Clients = () => {
  const duplicatedItems = [...clientsContent.items, ...clientsContent.items];

  return (
    <div className="clients-la__area pb-150">
      <div className="container-fluid p-0">
        <div className="row">
          <div className="col-12">
            <h6 className="clients-la__title fade_up_anim" data-delay=".2">
              {clientsContent.title}
            </h6>
          </div>
        </div>
        <div className="clients-la__items pt-100">
          <Swiper
            slidesPerView={1}
            speed={3000}
            autoplay={{
              delay: 1,
              disableOnInteraction: false,
            }}
            loop={true}
            modules={[Autoplay]}
            breakpoints={{
              425: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              992: {
                slidesPerView: 4,
              },
              1200: {
                slidesPerView: 5,
              },
              1300: {
                slidesPerView: 6,
              },
            }}
            className="clients-la__items"
          >
            {duplicatedItems.map((item: ClientItemType, index: number) => (
              <SwiperSlide key={`${item.id}-${index}`}>
                <ClientItem item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Clients;
