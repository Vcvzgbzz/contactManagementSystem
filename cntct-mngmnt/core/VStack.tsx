import React, { ReactNode } from "react";
type VStackProps = {
  children: ReactNode;
  spacing?: number;
  align?: "flex-start" | "center" | "flex-end"; // Added align prop
  style?: React.CSSProperties;
};
export const VStack: React.FC<VStackProps> = ({
  children,
  spacing = 8,
  align = "flex-start",
  style,
}) => {
  const stackStyle: React.CSSProperties = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: align,
    gap: `${spacing}px`,
    ...style,
  };

  return (
    <div style={stackStyle} className="VStack">
      {children}
    </div>
  );
};
