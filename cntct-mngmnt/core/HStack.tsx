import React, { ReactNode } from "react";

type HStackProps = {
  children: ReactNode;
  spacing?: number;
  align?: "flex-start" | "center" | "flex-end"; // Added align prop
  style?: React.CSSProperties;
};

export const HStack: React.FC<HStackProps> = ({
  children,
  spacing = 8,
  align = "flex-start",
  style,
}) => {
  const stackStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: align,
    gap: `${spacing}px`,
    ...style,
  };

  return (
    <div style={stackStyle} className="HStack">
      {children}
    </div>
  );
};
