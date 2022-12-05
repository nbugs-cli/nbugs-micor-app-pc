/* eslint-disable import/extensions */
import React from "react";
import { ConfigProvider, Layout } from "antd";
import DocumentTitle from "react-document-title";
import { connect } from "umi";
import { ContainerQuery } from "react-container-query";
import classNames from "classnames";
import Media from "react-media";
import zhCN from "antd/es/locale/zh_CN";
import moment from "moment";
import "moment/dist/locale/zh-cn";
import SiderMenu from "@/antd-pro-components/SiderMenu";
import getPageTitle from "@/utils/getPageTitle";
import ErrorBoundary from "@/components/ErrorBoundary";
import Context from "./MenuContext";
import styles from "./BasicLayout.less";

moment.locale("zh-cn");

const query = {
  "screen-xs": {
    maxWidth: 575
  },
  "screen-sm": {
    minWidth: 576,
    maxWidth: 767
  },
  "screen-md": {
    minWidth: 768,
    maxWidth: 991
  },
  "screen-lg": {
    minWidth: 992,
    maxWidth: 1199
  },
  "screen-xl": {
    minWidth: 1200,
    maxWidth: 1599
  },
  "screen-xxl": {
    minWidth: 1600
  }
};

class BasicLayout extends React.Component {
  getContext() {
    const { location, breadcrumbNameMap } = this.props;
    return {
      location,
      breadcrumbNameMap
    };
  }

  getLayoutStyle = () => {
    const { fixSiderbar, isMobile, collapsed, layout } = this.props;
    if (fixSiderbar && layout !== "topmenu" && !isMobile) {
      return {
        paddingLeft: collapsed ? "80px" : "256px"
      };
    }
    return null;
  };

  handleMenuCollapse = collapsed => {
    const { dispatch } = this.props;
    dispatch({
      type: "global/changeLayoutCollapsed",
      payload: collapsed
    });
  };

  render() {
    const {
      navTheme,
      layout: PropsLayout,
      children,
      location: { pathname },
      isMobile,
      menuData,
      breadcrumbNameMap,
      currentUser
    } = this.props;

    let logoUrl;
    if (currentUser.orgId) {
      logoUrl = `http://classpic.oss-cn-hangzhou.aliyuncs.com/avatar/${currentUser.orgId}.jpg`;
    }

    const isTop = PropsLayout === "topmenu";
    const isHome = window.location.pathname === "/";

    const layout = (
      <div className="wrapper">
        <Layout className={styles["wrapper-layout"]}>
          <Layout className="wrapper-layout-body">
            {(isTop && !isMobile) || isHome ? null : (
              <SiderMenu
                className={styles["home-sider"]}
                logo={logoUrl}
                theme={navTheme}
                menuData={menuData}
                isMobile={isMobile}
                {...this.props}
              />
            )}
            <ErrorBoundary>
              <Layout className="wrapper-layout-body-content">
                {menuData.length !== 0 && children}
              </Layout>
            </ErrorBoundary>
          </Layout>
        </Layout>
      </div>
    );
    return (
      <ConfigProvider locale={zhCN}>
        <React.Fragment>
          <DocumentTitle
            title={
              getPageTitle(pathname, breadcrumbNameMap) ||
              currentUser.schoolName ||
              ""
            }
          >
            <ContainerQuery query={query}>
              {params => (
                <Context.Provider value={this.getContext()}>
                  <div
                    style={{ overflowX: "auto", height: "100%" }}
                    id="width-scroll-container"
                    className={classNames(params)}
                  >
                    {layout}
                  </div>
                </Context.Provider>
              )}
            </ContainerQuery>
          </DocumentTitle>
        </React.Fragment>
      </ConfigProvider>
    );
  }
}

export default connect(({ global, setting, menu: menuModel, user }) => ({
  collapsed: global.collapsed,
  layout: setting.layout,
  menuData: menuModel.menuData,
  breadcrumbNameMap: menuModel.breadcrumbNameMap,
  currentUser: user.currentUser,
  ...setting
}))(props => (
  <Media query="(max-width: 599px)">
    {isMobile => <BasicLayout {...props} isMobile={isMobile} />}
  </Media>
));
