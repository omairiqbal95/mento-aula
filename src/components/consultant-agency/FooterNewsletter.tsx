"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import MailIconTwo from "@/icons/MailIconTwo";
import ArrowRightIcon from "@/icons/ArrowRightIcon";
import type { NewsletterForm } from "@/types/consultant-agency/footer";

interface FooterNewsletterProps {
  newsletter: NewsletterForm;
  delay?: string;
}

const FooterNewsletter = ({ newsletter, delay }: FooterNewsletterProps) => {
  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();
  }, []);

  return (
    <div className="col-sm-6 col-md-3 fade_up_anim" data-delay={delay}>
      <ul className="custom-ul footer-common__body-nav-links footer-common__body-nav-links-light nav-three">
        <li>{newsletter.title}</li>
        <li>
          <form
            action={newsletter.action}
            method={newsletter.method}
            className="newsletter"
            onSubmit={handleSubmit}
          >
            <ul className="custom-ul">
              <li>
                <div className="newsletter-email">
                  <MailIconTwo />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder={newsletter.emailPlaceholder}
                  />
                  <button type="submit">
                    <ArrowRightIcon />
                  </button>
                </div>
              </li>
              <li>
                <div className="newsletter-agreement">
                  <input type="checkbox" id="agree" name="agree" required />
                  <label htmlFor="agree">
                    {newsletter.agreementText}{" "}
                    <Link href={newsletter.privacyPolicyUrl}>
                      privacy policy
                    </Link>
                  </label>
                </div>
              </li>
            </ul>
          </form>
        </li>
      </ul>
    </div>
  );
};

export default FooterNewsletter;
