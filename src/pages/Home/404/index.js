/* eslint-disable react/sort-comp */
import React from 'react';
import { Button } from 'antd';
import Error404 from '../../../assets/sys/error_icon@2x.png';
import styles from './index.less';

export default class baseError extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      countTime: 3,
    };
    this.recordTime = null;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.history.location.pathname !== this.props.location.pathname) {
      clearInterval(this.recordTime);
      this.setState(
        {
          countTime: 3,
        },
        () => {
          this.recordTime = null;
          this.componentDidMount();
        }
      );
    }
  }

  componentDidMount() {
    // this.recordTime = setInterval(this.countDown, 1000);
  }

  componentWillUnmount() {
    // 卸载异步操作设置状态
    // clearInterval(this.recordTime);
  }

  countDown = () => {
    const { countTime } = this.state;
    if (countTime !== 1) {
      this.setState({
        countTime: countTime - 1,
      });
    }
    if (countTime === 1 && this.recordTime) {
      clearInterval(this.recordTime);
      this.recordTime = null;
      this.handleReload();
      // sessionStorage.setItem('timeLoad', !0);
    }
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    return (
      <div className={styles['base-error']}>
        <div className={styles['base-error-img']}>
          <img className={styles.img} alt="img" src={Error404} />
        </div>
        <div className={styles['base-error-container']}>
          <h1 className={styles.subtitle}>404</h1>
          <div className={styles['error-info']}>抱歉，你访问的页面不存在</div>
          {/* <div className={styles['error-time']}>
            <span>{this.state.countTime}s</span> <span>后将自动刷新页面</span>
          </div> */}
          <Button type="primary" onClick={this.handleReload}>
            刷新
          </Button>
        </div>
      </div>
    );
  }
}
