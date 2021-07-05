/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { history } from "umi";
import { Breadcrumb } from "antd";
import styles from "./index.less";

const { Item } = Breadcrumb;

export default class BreadNav extends React.Component {
  render() {
    const { dataSource = [] } = this.props;

    return (
      <Breadcrumb className={styles["content-breadcrumb"]}>
        <Item>
          <a
            onClick={() => {
              console.log('history-----dsds',history);
              history.goBack();
            }}
            className={styles["breadcrumb-go-back"]}
          >
            返回
          </a>
        </Item>
        {(dataSource || []).map(({ context, path }, index) => {
          const meClass =
            styles[
              `content-breadcrumb-${
                dataSource.length - 1 === index ? "default" : "pointer"
              }`
            ];

          return (
            // 使用 Breadcrumb 自带的href功能提供的跳转会导致整个页面刷新，故而弃用
            <Item
              key={context}
              className={meClass}
              onClick={() => !!path && history.push(path)}
            >
              <span>{context}</span>
            </Item>
          );
        })}
      </Breadcrumb>
    );
  }
}
