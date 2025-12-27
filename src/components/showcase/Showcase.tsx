import React from "react";
import { showcaseContent } from "@/content/showcase/home/showcase";
import SocialLinks from "./SocialLinks";
import ShowcaseInteractive from "./ShowcaseInteractive";

const Showcase = () => {
  return (
    <div className="showcase-v2 overflow-hidden">
      <div className="container-fluid p-0">
        <div className="row">
          <div className="col-12">
            <div className="showcase-v2__wrapper">
              <SocialLinks socialLinks={showcaseContent.socialLinks} />
              <ShowcaseInteractive items={showcaseContent.showcaseItems} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
