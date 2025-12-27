import React from 'react';
import { breadcrumbContent } from '@/content/common/breadcrumb';
import { BreadcrumbProps } from '@/types/common/breadcrumb';

const Breadcrumb: React.FC<BreadcrumbProps> = ({ 
  title = breadcrumbContent.title, 
  backgroundImage = breadcrumbContent.backgroundImage 
}) => {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
      }}
      className="breadcrumb-area faq position-relative overflow-hidden"
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1
              className="h1 breadcrumb-area__title fade_up_anim"
              data-delay=".2"
            >
              {title}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;