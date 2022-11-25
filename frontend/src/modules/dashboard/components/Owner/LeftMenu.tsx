import React from "react";

import { Tab, Tabs } from "@mui/material";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";
import DescriptionIcon from "@mui/icons-material/Description";

interface LeftMenuProps {
  activeTab: number;
  setActiveTab: (value: number) => void;
}
export const LeftMenu = ({ activeTab, setActiveTab }: LeftMenuProps) => {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Tabs
      value={activeTab}
      onChange={handleChange}
      orientation="vertical"
      sx={{
        width: "400px",
        height: "800px",
        borderRight: 1,
        borderColor: "divider",
      }}
    >
      <Tab
        iconPosition="start"
        icon={<HourglassFullIcon />}
        label="ACTIVE LEASES"
        sx={{
          marginBottom: "24px",
          display: "flex",
          justifyContent: "flex-start",
          fontSize: "18px",
        }}
      />
      <Tab
        iconPosition="start"
        icon={<DescriptionIcon />}
        label="ARCHIVED LEASES"
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          fontSize: "18px",
        }}
      />
    </Tabs>
  );
};
