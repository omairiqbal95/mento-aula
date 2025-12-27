import React from "react";
import Image from "next/image";
import Link from "next/link";
import ArrowRightIcon from "@/icons/ArrowRightIcon";
import type { ResourceItem } from "@/types/consultant-agency/resources";

interface ResourceSliderItemProps {
  resource: ResourceItem;
}

const ResourceSliderItem = ({ resource }: ResourceSliderItemProps) => {
  return (
    <div className="resources-ca__slider-item-wrapper">
      <div className="resources-ca__slider-thumb">
        <Image
          src={resource.image}
          alt={resource.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>

      <div className="resources-ca__slider-content">
        <div className="resources-ca__slider-content-wrapper">
          <div className="resources-ca__slider-meta">
            <span className="content-type">{resource.type}</span>
            <span className="content-date">{resource.date}</span>
          </div>
          <h6 className="h6 resources-ca__slider-title">
            {resource.title}
          </h6>
          <p className="resources-ca__slider-desc">
            {resource.description}
          </p>
          <div className="resources-ca__slider-tags">
            {resource.tags.map((tag) => (
              <Link key={tag.id} href={tag.url}>
                {tag.name}
              </Link>
            ))}
          </div>
          <Link href={resource.readMoreUrl} className="read-more-btn">
            Read More
            <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResourceSliderItem;
