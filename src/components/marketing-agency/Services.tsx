"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Services as ServiceType } from "@/types/marketing-agency/services";
import { CONSTANT_SERVICES } from "@/content/marketing-agency/home/services";

interface ServiceItemProps extends ServiceType {
    isActive: boolean;
    onMouseEnter: (id: string | number) => void;
  }

const ServiceItem: React.FC<ServiceItemProps> = ({ id, name, href, imageSrc, delay, isActive, onMouseEnter }) => {
  const delayString = delay > 0 ? `.${delay * 10}s` : undefined;

  return (
    <li className={`fade_up_anim ${isActive ? "active" : ""}`}
      data-delay={delayString}
      onMouseEnter={() => onMouseEnter(id)}>
      <h3 className="h3 service-name">
        <Link href={href}>{name}</Link>
      </h3>
      <Image src={imageSrc} alt={`service-thumb for ${name}`} />
    </li>
  );
};

const Services = () => {
    const [activeServiceId, setActiveServiceId] = useState<string | number | null>(CONSTANT_SERVICES.length > 0 ? CONSTANT_SERVICES[0].id : null);

    const handleMouseEnter = (id: string | number) => {
      setActiveServiceId(id);
    };
  
    useEffect(() => {
      if (CONSTANT_SERVICES.length > 0) {
        setActiveServiceId(CONSTANT_SERVICES[0].id);
      }
    }, []);
    
  return (
    <div className="services-mar__area pt-150 pb-150">
      <div className="container">
        <div className="row text-center">
          <div className="col-12">
            <span className="section__header-sub-title-v11 fade_up_anim">
              Qué hacemos
            </span>
            <h2
              className="h2 section__header-title-v11 fade_up_anim"
              data-delay=".4"
            >
              Nuestros Servicios
            </h2>
          </div>
        </div>

        <div className="row justify-content-between pt-100">
          <div className="col-12">
            <ul className="custom-ul services-mar__services">
              {CONSTANT_SERVICES.map((service) => (
                <ServiceItem
                key={service.id}
                {...service}
                isActive={service.id === activeServiceId}
                onMouseEnter={handleMouseEnter}
              />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;