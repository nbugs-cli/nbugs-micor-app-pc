import React, { Component } from "react";
import { Divider, Dropdown, Menu } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import styles from "./index.less";

/* eslint-disable react/no-array-index-key */

const MenuItem = Menu.Item;

/**
 * antd Table组件中操作栏展示样式
 * @param data 数据源
 * @param showMoreLen 超过几条数据展示更多下拉菜单Dropdown,默认2条
 */
class OperateDropdown extends Component {
  state = {
    visible: false
  };

  onVisibleChange = visible => {
    this.setState({ visible });
  };

  render() {
    const { visible } = this.state;
    const { data = [], showMoreLen = 3 } = this.props;

    const noop = () => {};

    const showData =
      data.length === showMoreLen
        ? data.slice(0, showMoreLen)
        : data.slice(0, showMoreLen - 1);
    const overlayData =
      data.length > showMoreLen && data.slice(showMoreLen - 1);

    const menu = () => (
      <Menu>
        {overlayData &&
          overlayData.map((item, index) => {
            const { text, onClick } = item;
            return (
              <MenuItem key={index}>
                {typeof onClick !== "function" ? (
                  text
                ) : (
                  <a
                    onClick={e => {
                      if (onClick) {
                        onClick();
                      }
                      e.stopPropagation();
                    }}
                  >
                    {text}
                  </a>
                )}
              </MenuItem>
            );
          })}
      </Menu>
    );

    return (
      <div className={styles.root} onClick={e => e.stopPropagation()}>
        {showData.map((item, index) => {
          const { text, onClick } = item;
          return (
            <span key={index}>
              <a onClick={onClick || noop}>{text}</a>
              {index !== showData.length - 1 ||
              (overlayData && overlayData.length) ? (
                <Divider type="vertical" />
              ) : null}
            </span>
          );
        })}
        {overlayData && overlayData.length ? (
          <Dropdown
            visible={visible}
            onVisibleChange={this.onVisibleChange}
            trigger={["click"]}
            dropdownRender={menu}
            overlayStyle={{ zIndex: 10 }}
          >
            <a>
              <EllipsisOutlined />
            </a>
          </Dropdown>
        ) : null}
      </div>
    );
  }
}

export default OperateDropdown;
