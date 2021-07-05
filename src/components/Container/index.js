/* eslint-disable operator-assignment,react/no-unused-state */
import React  from 'react';
import classnames from 'classnames';
import { Layout, Icon, Alert } from 'antd';
import { withRouter } from 'react-router-dom';
import Breadcrumb from '../Breadcrumb';
import BreadNav from '../BreadNav';

import styles from './index.less';

const { Content } = Layout;

class BaseContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      minHeight: document.body.clientHeight - 102,
    }
  }

  componentDidMount() {
    const me = this;
    // 浏览器可视区高度换算内容区高度
    me.handleChangeSize();

    // 页面尺寸改变是，重新计算内容区高度
    window.onresize = function() {
      me.handleChangeSize();
    }
  }

  handleChangeSize = () => {
    const {breStates, alertParams={}, footerParams={} } = this.props || {};

    // 根据显示面包屑与否 总高度减去面包屑和顶部导航
    let minHeight = document.body.clientHeight - 102;

    // iframe页面无顶部导航和面包屑
    if(window.location.href.match('/iframePage/')) {
      minHeight += 102;
    }

    // 面包屑
    if (breStates) {
      minHeight = minHeight - 55;
    }

    // 面包屑下方信息展示栏
    if (alertParams.states) {
      minHeight = minHeight - 40;
    }

    // 展示底部按钮区域
    if (footerParams.states) {
      minHeight = minHeight - 50;
    }

    this.setState({
      minHeight,
    })
  }

  render() {
    // 参数说明,详情请查看当前目录中的README.md文档
    const {onBack, breStates, children, alertParams={}, footerParams={}, defaultPadding=!1, isPathParams=!1, isBreVersion=!1, match, breDataSource={}, isSplitBar=!1 } = this.props || {};

    const { minHeight } = this.state || {};

    const maxHeight = minHeight + 48

    return (
      <div className="content-breadcrumb">
        {
          breStates &&
          (
            <div className={`breadcrumb-content ${!alertParams.states ? 'border-bottom' : ''}`}>
              {
                !isBreVersion ? <Breadcrumb onBack={onBack} pathname={window.location.pathname} match={match} isPath={isPathParams} /> : <BreadNav dataSource={breDataSource} />
              }
              { !0 ? '' : <a className='breadcrumb-content-help'><Icon type="question-circle" /> 帮助</a>}
            </div>
          )
        }
        {
          alertParams.states &&
          (
            <div className="breadcrumb-content">
              <Alert className="breadcrumb-content-alert" {...alertParams} showIcon />
            </div>
          )
        }
        <Content style={{minHeight, maxHeight, overflowY:'auto'}} className={classnames(styles['base-container'])}>
          <div id="scroll-container" style={{minHeight, height: isSplitBar ? '100%' : 'auto'}} className={classnames(styles["base-container-content"] , !defaultPadding && styles['base-padding-default'])}>
            {children}
          </div>
        </Content>
        {
          footerParams.states &&
          (
            <div className="content-breadcrumb-footer">
              <div className="content-breadcrumb-footer-container">
                {footerParams.demFooter}
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

export default withRouter(BaseContainer);
