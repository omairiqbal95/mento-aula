"use client";
import React, { useState, useCallback } from "react";
import Link from "next/link";
import Accordion from "react-bootstrap/Accordion";
import type { AccordionEventKey } from "react-bootstrap/esm/AccordionContext";
import type {
  MenuItem,
  SubMenu,
  DirectNavItem,
  NestedAccordionProps,
} from "@/types/common/sidebar";

const MenuItemList = ({
  items,
  className = "d-inline-block py-1 text-decoration-none",
}: {
  items: MenuItem[];
  className?: string;
}) => (
  <ul className="list-unstyled">
    {items.map((item, index) => (
      <li key={index}>
        <Link href={item.href} className={className}>
          {item.title}
        </Link>
      </li>
    ))}
  </ul>
);

const AccordionButton = ({
  title,
  href,
  noIcon = false,
}: {
  title: string;
  href: string;
  noIcon?: boolean;
}) => (
  <div className="accordion-item">
    <Link href={href} className="accordion-header text-decoration-none">
      <button
        className={`accordion-button collapsed pointer-events-none ${noIcon ? "no-after" : ""}`}
        type="button"
      >
        {title}
      </button>
    </Link>
  </div>
);

const SubMenuSection = ({
  subMenus,
  parentId,
  activeKey,
  onSelect,
}: {
  subMenus: SubMenu[];
  parentId: string;
  activeKey: string | null;
  onSelect: (eventKey: AccordionEventKey) => void;
}) => (
  <Accordion
    className="nested-accordion"
    activeKey={activeKey}
    onSelect={onSelect}
  >
    {subMenus.map((subMenu, index) =>
      subMenu.items.length === 1 ? (
        <AccordionButton
          key={index}
          title={subMenu.title}
          href={subMenu.items[0].href}
        />
      ) : (
        <Accordion.Item eventKey={`${parentId}-sub-${index}`} key={index}>
          <Accordion.Header>{subMenu.title}</Accordion.Header>
          <Accordion.Body>
            <MenuItemList items={subMenu.items} />
          </Accordion.Body>
        </Accordion.Item>
      )
    )}
  </Accordion>
);

const DirectNavSection = ({ items }: { items: DirectNavItem[] }) => (
  <>
    {items.map((item, index) => (
      <Accordion.Item eventKey={`direct-${index}`} key={`direct-${index}`}>
        <Link
          href={item.href}
          className="text-decoration-none"
        >
          <div className="accordion-header">
            <button
              className="accordion-button collapsed no-after pointer-events-none"
              type="button"
            >
              {item.title}
            </button>
          </div>
        </Link>
      </Accordion.Item>
    ))}
  </>
);

const NestedAccordion = ({ items, directNavItems }: NestedAccordionProps) => {
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [nestedActiveKeys, setNestedActiveKeys] = useState<
    Record<string, string | null>
  >({});

  const normalizeEventKey = useCallback(
    (eventKey: AccordionEventKey): string | null =>
      Array.isArray(eventKey) ? eventKey[0] || null : eventKey || null,
    []
  );

  const handleAccordionSelect = useCallback(
    (eventKey: AccordionEventKey) => {
      const normalizedKey = normalizeEventKey(eventKey);
      setActiveKey(normalizedKey);
      if (!normalizedKey || normalizedKey !== activeKey) {
        setNestedActiveKeys({});
      }
    },
    [activeKey, normalizeEventKey]
  );

  const handleNestedSelect = useCallback(
    (parentKey: string) => (eventKey: AccordionEventKey) => {
      const normalizedKey = normalizeEventKey(eventKey);
      setNestedActiveKeys((prev) => ({ ...prev, [parentKey]: normalizedKey }));
    },
    [normalizeEventKey]
  );

  return (
    <nav className="mobile-menu">
      <Accordion activeKey={activeKey} onSelect={handleAccordionSelect}>
        {items.map((item) => (
          <Accordion.Item eventKey={item.id} key={item.id}>
            <Accordion.Header>{item.title}</Accordion.Header>
            <Accordion.Body>
              {item.subMenus?.length && (
                <SubMenuSection
                  subMenus={item.subMenus}
                  parentId={item.id}
                  activeKey={nestedActiveKeys[item.id] || null}
                  onSelect={handleNestedSelect(item.id)}
                />
              )}

              {item.items?.length && (
                <MenuItemList
                  items={item.items}
                  className="d-inline-block py-2 text-decoration-none"
                />
              )}

              {item.additionalItems?.length && (
                <>
                  {item.additionalItems.map((additionalItem, index) => (
                    <AccordionButton
                      key={index}
                      title={additionalItem.title}
                      href={additionalItem.href}
                      noIcon={true}
                    />
                  ))}
                </>
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}

        {directNavItems?.length && <DirectNavSection items={directNavItems} />}
      </Accordion>
    </nav>
  );
};

export default NestedAccordion;
