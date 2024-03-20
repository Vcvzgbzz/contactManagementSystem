type Props = {
  tabs: Array<string>;
  selectedTab: number;
  setSelectedTab: (tab: number) => void;
};

const TabBar = ({ tabs, selectedTab, setSelectedTab }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
        borderBottom: "1px solid black",
        borderTop: "1px solid black",
        paddingBottom: "3px",
      }}
    >
      {tabs.map((tab, index) => (
        <div
          key={index}
          onClick={() => setSelectedTab(index)}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
            borderBottom:
              selectedTab === index
                ? "2px solid blue"
                : "2px solid transparent",
            fontWeight: selectedTab === index ? "bold" : "normal",
            color: selectedTab === index ? "blue" : "black",
          }}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};
export default TabBar;
