"use client";

import React, { useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import { TabItem } from "@/types/financial-advisor/choose-us";

interface TabsSectionProps {
  tabs: TabItem[];
}

const TabsSection = ({ tabs }: TabsSectionProps) => {
  const initialActiveKey = tabs.find(tab => tab.isActive)?.id || tabs[0]?.id;
  const [activeKey, setActiveKey] = useState(initialActiveKey);

  return (
    <div className="choose-us-fin__tabs">
      <Tab.Container 
        id="pills-tab" 
        activeKey={activeKey}
        onSelect={(k) => k && setActiveKey(k)}
      >
        <Nav variant="pills" className="mb-3">
          {tabs.map((tab) => (
            <Nav.Item key={tab.id}>
              <Nav.Link as="button" eventKey={tab.id}>
                {tab.title}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        <Tab.Content>
          {tabs.map((tab) => (
            <Tab.Pane key={tab.id} eventKey={tab.id}>
              {tab.content}
            </Tab.Pane>
          ))}
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default TabsSection;
