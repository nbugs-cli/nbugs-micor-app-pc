import React, { useEffect, useState } from "react";
import { Radio } from "antd";
import ListSvg from "@/assets/svg/switch-list-n.svg";
import ListActiveSvg from "@/assets/svg/switch-list-p.svg";
import ModuleSvg from "@/assets/svg/switch-module-n.svg";
import ModuleActiveSvg from "@/assets/svg/switch-module-p.svg";
import styles from './index.less';

const { Group, Button } = Radio;

// 卡片列表切换radio组件
const ListStyleSwitch = props => {
  const { value, onChange } = props;
  const [listStyle, setListStyle] = useState(value || "card");

  useEffect(() => {
    setListStyle(value);
  }, [value]);

  return (
    <div className={styles.root}>
      <Group
        value={listStyle}
        buttonStyle="solid"
        onChange={e => {
          setListStyle(e.target.value);
          if (typeof onChange === "function") {
            onChange(e.target.value);
          }
        }}
      >
        <Button value="card">
          <img
            alt=""
            src={listStyle === "card" ? ModuleActiveSvg : ModuleSvg}
          />
        </Button>
        <Button value="list">
          <img alt="" src={listStyle === "list" ? ListActiveSvg : ListSvg} />
        </Button>
      </Group>
    </div>
  );
};

export default ListStyleSwitch;
