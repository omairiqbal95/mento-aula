import React from "react";
import Image from "next/image";
import { teamDetailsContent } from "@/content/inner-pages/team-details";
import PortfolioSection from "./team-details/PortfolioSection";
import ContactSection from "./team-details/ContactSection";

const TeamDetails = () => {
  const { member } = teamDetailsContent;

  return (
    <div className="team-details__area pt-150 pb-150">
      <div className="container">
        <div className="row justify-content-between team-details__card g-4">
          <div className="col-lg-5 col-xl-5 fade_up_anim" data-delay=".2">
            <div className="team-details__card-thumb">
              <Image src={member.image} alt={member.alt} />
            </div>
          </div>
          <div className="col-lg-7 col-xl-6">
            <div className="team-details__card-content">
              <span className="wellcome">{member.welcomeText}</span>
              <h2 className="h2 title">{member.name}</h2>
              <p>{member.description}</p>

              <PortfolioSection 
                title={member.portfolioTitle}
                portfolioLinks={member.portfolioLinks}
              />
              
              <ContactSection 
                title={member.contactTitle}
                contactLinks={member.contactLinks}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;