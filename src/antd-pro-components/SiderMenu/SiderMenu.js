import React, { PureComponent, Suspense } from "react";
import { Layout } from "antd";
import { connect } from "umi";
import classNames from "classnames";
import styles from "./index.less";
import PageLoading from "../PageLoading";
import { getDefaultCollapsedSubMenus } from "./SiderMenuUtils";
import { isExtraUrl } from "../_utils/pathTools";

const BaseMenu = React.lazy(() => import("./BaseMenu"));
const { Sider } = Layout;

let firstMount = true;
@connect(({ user, global }) => ({
  ...global,
  childrenList: global.childrenList || [],
  currentUser: user.currentUser
}))
class SiderMenu extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      openKeys: getDefaultCollapsedSubMenus(props)
    };
  }

  componentDidMount() {
    firstMount = false;
  }

  static getDerivedStateFromProps(props, state) {
    const { pathname, flatMenuKeysLen, search } = state;
    // 如果是任务管理相关的路由，并且路由的query不同，pathname相同时，更新选中的keys数组
    if (
      props.location.pathname !== pathname ||
      props.flatMenuKeys.length !== flatMenuKeysLen ||
      (isExtraUrl(props.location.pathname) &&
        props.location.search !== search &&
        props.location.pathname === pathname)
    ) {
      return {
        pathname: props.location.pathname,
        search: props.location.search,
        flatMenuKeysLen: props.flatMenuKeys.length,
        openKeys: getDefaultCollapsedSubMenus(props)
      };
    }
    return null;
  }

  isMainMenu = key => {
    const { menuData } = this.props;
    return menuData.some(item => {
      if (key) {
        return item.key === key || item.path === key;
      }
      return false;
    });
  };

  // 父菜单展开时change事件
  handleOpenChange = openKeys => {
    // const moreThanOne =
    //   openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: [...openKeys]
    });
  };

  handleSaveMenu = menuItem => {
    const childrenList = (menuItem && menuItem.children) || [];
    if (childrenList && childrenList.length > 0) {
      // eslint-disable-next-line react/destructuring-assignment
      this.props.dispatch({
        type: "global/save",
        payload: {
          childrenList
        }
      });
    }
  };

  render() {
    const { collapsed, fixSiderbar, theme } = this.props;
    const { openKeys } = this.state;
    const defaultProps = collapsed ? {} : { openKeys };

    const siderClassName = classNames(styles.sider, {
      [styles.fixSiderBar]: fixSiderbar,
      [styles.light]: theme === "light"
    });

    return (
      <Sider
        collapsedWidth={70}
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="sm"
        width={230}
        theme={theme}
        className={siderClassName}
      >
        <Suspense fallback={<PageLoading />}>
          <BaseMenu
            className={styles["suspense-menu"]}
            {...this.props}
            mode="inline"
            callbackSaveMenu={this.handleSaveMenu}
            handleOpenChange={this.handleOpenChange}
            onOpenChange={this.handleOpenChange}
            {...defaultProps}
          />
        </Suspense>
      </Sider>
    );
  }
}
export default SiderMenu;
