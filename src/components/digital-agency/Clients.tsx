import React from "react";
import Image from "next/image";
import { clientsData } from "@/content/digital-agency/home/clients";

const Clients = () => {
  return (
    <div className="clients-digital pt-150 pb-150">
      <div className="container container-mini">
        <div className="row">
          <div className="col-12">
            <div className="section__header-v12">
              <span className="section__header-sub-title-v12 fade_up_anim">
                {clientsData.sectionSubtitle}
              </span>
              <h2
                className="h2 section__header-title-v12 fade_up_anim"
                data-delay=".4"
              >
                {clientsData.sectionTitle}
              </h2>
            </div>
          </div>
        </div>
        <div className="row pt-100">
          <div className="col-12">
            <div className="clients-digital__items">
              {clientsData.clients.map((client) => (
                <div
                  key={client.id}
                  className="item-box fade_up_anim"
                  data-delay={client.delay}
                >
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={150}
                    height={80}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clients;
