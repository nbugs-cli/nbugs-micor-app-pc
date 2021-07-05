import React, { Component } from "react";
import { connect } from "umi";
import { Row, Col, Card, Calendar, Modal } from "antd";
import { GetQueryString } from "../../../utils/utils";
import ContainerDom from "@/components/Container";
import { getUserInfo } from '@/services/fetchUserInfo'
import { fetchIsContact } from '@/services/user'
import BackImg from "../../../assets/image@2x.png";
import styles from "./index.less";


const version = GetQueryString("version");

@connect(({ user }) => ({
  currentUser: user.currentUser
}))
class Index extends Component {
  state = {
    url: '',
    showName: true,
  };

  componentDidMount() {
    const noShowModal = localStorage.getItem("noShowModal");
    if (!noShowModal && version === 'v3') {
      Modal.info({
        className: styles.indexModal,
        content: this.renderModalContent(),
        icon: null,
        okText: "知道了",
        centered: true,
      });
      localStorage.setItem("noShowModal", true);
    }

    getUserInfo(org => {
      fetchIsContact({ orgid: org.user.orgId }).then(res => {
        if (!!res) {
          this.setState({
            showName: false
          })
        }
      });
    })

  }

  thisonPanelChange(value, mode) {
    console.log(value, mode);
  }

  renderModalContent = () => {
    return (
      <div>
        <div className="headerBackImg">
          <img src={BackImg} alt="" />
        </div>
        <div className="modalContentTxt">
          <div className="titleTxt">
            <p>亲爱的老师，感谢您一直以来对校园号的支持！</p>
            <p>
              为了给您提供更好的服务，对校园号管理后台进行了升级，升级主要内容如下：
            </p>
          </div>
          <div className="introTxt">
            <div className="introTxtItem">
              <p className="introTxtTitle">1、</p>
              <span className="introTxtContent">
                对界面进行了美化，全新的UI交互，平台性能更加稳定高效；
              </span>
            </div>
            <div className="introTxtItem">
              <p className="introTxtTitle">2、</p>
              <span className="introTxtContent">
                对菜单进行了归类，分为协同办公、宣传管理、平安校园、通讯录等几大类；
              </span>
            </div>
            <div className="introTxtItem">
              <p className="introTxtTitle">3、</p>
              <span className="introTxtContent">
                对应用进行了迭代，在原有功能基础上，丰富了业务场景，为您提供更专业更聚焦的校园服务。
              </span>
            </div>
          </div>
          <div className="moreDetail">
            <p>
              关于更多详细内容，可拨打平台客服热线{" "}
              <span style={{ color: "#1785EC" }}>400 8018 588 </span>
              或者联系您本地的服务人员进行咨询。
            </p>
            <p>由此给您带来的不便敬请谅解！</p>
          </div>
          <div className="endTxt">
            <p>校园号团队</p>
            <p>2020年5月</p>
          </div>
        </div>
      </div>
    );
  };

  funDownload = (url) => {
    const canvas = document.createElement('canvas');
    const img = document.createElement('img');
    img.setAttribute("crossOrigin", 'Anonymous');
    img.src = url;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const context = canvas.getContext('2d');
      context.drawImage(img, 0, 0, img.width, img.height);
      // window.navigator.msSaveBlob(canvas.msToBlob(),'image.jpg');
      // saveAs(imageDataUrl, '附件');
      canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
      canvas.toBlob((blob) => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = '关注码';
        link.click();
      }, "image/jpeg");
    }
  };

  render() {
    const { currentUser } = this.props;
    const { url, showName } = this.state;

    return (
      <ContainerDom breStates={!1} version={2}>
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card className={styles.personalDeatils}>
              <div
                className="headIcon"
                style={{ backgroundImage: `url('${currentUser.avatar}')` }}
              />
              {
                showName && <div className="name">{currentUser.name}</div>
              }

              <div className="dotLine" />
              <div className="deptName">
                {
                  showName &&   <div>{currentUser.userInfo.roles[0].deptName}</div>
                }
                <div className="role">
                  {currentUser.userInfo.roles[0].roleName}
                </div>
                <div className="bgImg" />
              </div>
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.calendarCard}
              title="日历"
              style={{ marginBottom: 20 }}
            >
              <Calendar
                fullscreen={false}
                onPanelChange={this.thisonPanelChange.bind(this)}
              />
            </Card>
            {currentUser.enOrgType !== "general_school" ? (
              ""
            ) : (
                <Card className={styles.qrCodeCard}>
                  <div className="qrCodeBg">
                    <div
                      id='qr-dode'
                      className="qrCode"
                      style={{
                        backgroundImage: `url('${`//classpic.oss-cn-hangzhou.aliyuncs.com/parent/qrCode/${currentUser.orgId}.jpg`}')`
                      }}
                    />
                  </div>
                  <div>
                    微信扫码关注
                  <span className="schoolName">
                      &quot;{currentUser.schoolName}&quot;
                  </span>
                  家长关注二维
                </div>
                  <div style={{ textAlign: 'center' }} onClick={() => this.funDownload(`//classpic-oss.xiaoyuanhao.com/parent/qrCode/${currentUser.orgId}.jpg`)}>
                    <a
                      // href={`//classpic-oss.xiaoyuanhao.com/parent/qrCode/${currentUser.orgId}.jpg`}
                      download='关注码'
                      target='_blank'
                    >
                      下载关注码
                  </a>
                  </div>
                </Card>
              )}
          </Col>
        </Row>
      </ContainerDom>
    );
  }
}

export default Index;
