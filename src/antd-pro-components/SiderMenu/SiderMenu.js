import React, { PureComponent, Suspense } from 'react';
import { Layout } from 'antd';
import { connect } from 'umi';
import classNames from 'classnames';
import styles from './index.less';
import PageLoading from '../PageLoading';
import { getDefaultCollapsedSubMenus } from './SiderMenuUtils';

const BaseMenu = React.lazy(() => import('./BaseMenu'));
const { Sider } = Layout;

let firstMount = true;
@connect(({ user, global }) => ({
  ...global,
  childrenList: global.childrenList || [],
  currentUser: user.currentUser,
}))
class SiderMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: getDefaultCollapsedSubMenus(props),
    };
  }

  componentDidMount() {
    firstMount = false;
  }

  static getDerivedStateFromProps(props, state) {
    const { pathname, flatMenuKeysLen } = state;
    if (props.location.pathname !== pathname || props.flatMenuKeys.length !== flatMenuKeysLen) {
      return {
        pathname: props.location.pathname,
        flatMenuKeysLen: props.flatMenuKeys.length,
        openKeys: getDefaultCollapsedSubMenus(props),
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

  handleOpenChange = openKeys => {
    const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys],
    });
  };

  handleSaveMenu = (menuItem) => {
    const childrenList = menuItem && menuItem.children || [];
    if (childrenList && childrenList.length > 0) {
      this.props.dispatch({
        type: 'global/save',
        payload: {
          childrenList,
        }
      })
    }
  }

  render() {
    const { collapsed, fixSiderbar, theme } = this.props;
    const { openKeys } = this.state;
    const defaultProps = collapsed ? {} : { openKeys };

    const siderClassName = classNames(styles.sider, {
      [styles.fixSiderBar]: fixSiderbar,
      [styles.light]: theme === 'light',
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
            className={styles['suspense-menu']}
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
