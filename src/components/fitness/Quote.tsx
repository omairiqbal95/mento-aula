import React from "react";
import { quoteContent } from "@/content/fitness/home/quote";
import QuoteIconFour from "@/icons/QuoteIconFour";
import QuoteIconFive from "@/icons/QuoteIconFive";

const Quote = () => {
  return (
    <div className="quote-fit">
      <div className="quote-fit__blockquote">
        <QuoteIconFour />
        <blockquote
          className="quote-fit__blockquote-content fade_up_anim"
          data-delay=".2"
        >
          {quoteContent.quote}
          <QuoteIconFive />
          <cite className="fade_up_anim" data-delay=".4">
            <span>{quoteContent.author.name}</span>
            <span className="line"></span>
          </cite>
        </blockquote>
      </div>
    </div>
  );
};

export default Quote;
