/* eslint-disable react/jsx-no-target-blank,import/no-extraneous-dependencies,react/destructuring-assignment,prefer-destructuring,no-unused-expressions */
import React, { PureComponent } from 'react';
import { Link } from 'umi';
import classNames from 'classnames';
import queryString from 'query-string';
import { Menu, Spin } from 'antd';
import { putOperation } from '@/services/menu';
import { urlToList } from '../_utils/pathTools';
import { getMenuMatches } from './SiderMenuUtils';
import styles from './index.less';
// import { handleUserAgent } from '../../utils/utils'

const query = queryString.parse(window.location.search);
const { SubMenu } = Menu;

class BaseMenu extends PureComponent {
  /**
   * 获得菜单子节点
   * @memberof SiderMenu
   */
  getNavMenuItems = (menusData, level = 2) => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => this.getSubMenuOrItem(item, level))
      .filter(item => item);
  };

  // Get the currently selected menu
  getSelectedMenuKeys = pathname => {
    const { flatMenuKeys } = this.props;
    return urlToList(pathname).map(itemPath =>
      getMenuMatches(flatMenuKeys, itemPath).pop()
    );
  };

  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem = (item, level) => {
    const { location } = this.props;
    // 在企微访问时，仅展示左侧一级分组，同级分组不展示  仅对（handleUserAgent）企微内核浏览器访问生效 handleUserAgent()
    if (
      query?.parentUri &&
      item.path.indexOf(query.parentUri) !== 0 &&
      level !== 3
    ) {
      return null;
    }

    const localPath =
      (item.path && item.path.substring(0, item.path.indexOf('?'))) ||
      item.path;
    if (
      item.children &&
      !item.hideChildrenInMenu &&
      item.children.some(child => child.name)
    ) {
      return (
        <SubMenu
          popupClassName="popup-classname"
          className={
            item.parentId !== 0
              ? 'parent-menu-style submenu-default-item'
              : 'submenu-default-item'
          }
          title={
            <span>
              {/* {item.icon && <Icon type="menu" />} */}
              {item.icon && (
                <img alt="" src={item.icon} className="menu-icon" />
              )}

              <span>{item.name}</span>
            </span>
          }
          key={item.path}
        >
          {this.getNavMenuItems(item.children, 3)}
        </SubMenu>
      );
    }
    return localPath === location.pathname ? (
      <Menu.Item className={styles['menu-active-item']} key={item.path}>
        {this.getMenuItemPath(item)}
      </Menu.Item>
    ) : (
      <Menu.Item className={styles['menu-default-item']} key={item.path}>
        {this.getMenuItemPath(item)}
      </Menu.Item>
    );
  };

  // 获取父级链路
  findParents = (treeData, menuId) => {
    if (treeData.length === 0) return;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < treeData.length; i++) {
      if (treeData[i].menuId === menuId) {
        // eslint-disable-next-line consistent-return
        return [];
      }
      if (treeData[i].children) {
        const res = this.findParents(treeData[i].children, menuId);
        if (res !== undefined) {
          const arr = res.concat(treeData[i].name);
          // eslint-disable-next-line consistent-return
          return arr.reverse();
        }
      }
    }
  };

  // 点击子菜单，添加历史记录
  menuItemClick = item => {
    const { menuData } = this.props;
    const routeUrl = `/${item.path.split('/')[1]}`;
    const preMenu = this.findParents(menuData, item.menuId).join('-');
    putOperation({
      icon: item.icon,
      menuId: item.menuId,
      menuName: item.name,
      menuUrl: item.path,
      routeUrl,
      preMenu
    });
  };

  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  getMenuItemPath = item => {
    const { name } = item;
    const itemPath = this.conversionPath(item.path);
    const { target } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target="_blank">
          {/* {icon} */}
          {/* <Icon className={styles["menu-icon"]} type="menu" /> */}
          {item.icon && <img alt="" src={item.icon} className="menu-icon" />}

          <span>{name}</span>
        </a>
      );
    }
    const { location, isMobile, onCollapse } = this.props;
    const parentUri = query?.parentUri;
    // eslint-disable-next-line no-nested-ternary
    const newitemPath = !parentUri
      ? itemPath
      : itemPath?.indexOf('?') === -1
      ? `${itemPath}?parentUri=${parentUri}`
      : `${itemPath}&parentUri=${parentUri}`;
    return (
      <Link
        to={newitemPath}
        target={target}
        replace={itemPath === location.pathname}
        onClick={
          isMobile
            ? () => {
                onCollapse(true);
              }
            : () => this.menuItemClick(item) // 新增代码
        }
      >
        {/* {icon} */}
        {/* {item.icon && <Icon type="menu" />} */}
        {item.icon && (
          <img
            alt=""
            src={item.icon}
            className="menu-icon"
            style={{ width: '22px', marginRight: '10px' }}
          />
        )}

        <span>{name}</span>
      </Link>
    );
  };

  conversionPath = path => {
    if (path && path.indexOf('http') === 0) {
      return path;
    }
    return `/${path || ''}`.replace(/\/+/g, '/');
  };

  handleDefaultChild = () => {
    const pathname = this.props.history.location.pathname;
    const arrayPathName = (pathname && pathname.split('/')) || [];
    if (arrayPathName.length > 2) {
      this.ergodicMenu(arrayPathName);
    }
  };

  ergodicMenu = pathName => {
    const { menuData, callbackSaveMenu } = this.props;
    let resList = [];
    pathName &&
      pathName.forEach(array => {
        if (!array) {
          return !1;
        }
        resList = menuData.filter(item => item.path === array);
        return !0;
      });

    if (resList.length === 0 && pathName.length >= 2) {
      resList = menuData.filter(item => item.path === `/${pathName[1]}`);
    } else if (resList.length === 0 && pathName.length >= 3) {
      resList = menuData.filter(
        item => item.path === `/${pathName[1]}/${pathName[2]}`
      );
    }

    if (resList.length !== 0) {
      callbackSaveMenu(resList[0]);
    }
  };

  render() {
    const {
      openKeys,
      theme,
      mode,
      location,
      className,
      collapsed
    } = this.props;
    // if pathname can't match, use the nearest parent's key
    let selectedKeys = this.getSelectedMenuKeys(location);
    if (!selectedKeys.length && openKeys) {
      selectedKeys = [openKeys[openKeys.length - 1]];
    }
    let props = {};
    if (openKeys && !collapsed) {
      props = {
        openKeys: openKeys.length === 0 ? [...selectedKeys] : openKeys
      };
    }
    const { handleOpenChange, style, menuData, childrenList = [] } = this.props;
    if (menuData.length > 0 && childrenList.length === 0) {
      this.handleDefaultChild();
    }
    const cls = classNames(
      className,
      {
        'top-nav-menu': mode === 'horizontal'
      },
      styles['base-menu']
    );

    return (
      <Spin className={cls} spinning={menuData.length === 0}>
        <Menu
          key="Menu"
          mode={mode}
          theme={theme}
          onOpenChange={handleOpenChange}
          selectedKeys={selectedKeys}
          style={style}
          className={cls}
          {...props}
        >
          {this.getNavMenuItems(childrenList)}
        </Menu>
      </Spin>
    );
  }
}

export default BaseMenu;
