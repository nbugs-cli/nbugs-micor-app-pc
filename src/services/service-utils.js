/* eslint-disable import/prefer-default-export */
const ENV = (document.querySelector('meta[name="x-server-env"]') || { content: 'dev' }).content;

const urlCollect = {
  // 开发环境
  dev: {
    mock: "/mock",
    menu: "//dev.xiaoyuanhao.com/menu",
    user: "//aly-test.api.xiaoyuanhao.com/sh-user-center-test",
    auth: "//test.xiaoyuanhao.com:39003/auth/xyhauth",
    recruit: "http://dev.xiaoyuanhao.com/cx/cx-nbugs-activity/web/county",
    meetingSign: "//aly-test.api.xiaoyuanhao.com/yunzhi-notice-test/web",
    studentAttendance: "//aly-test.api.xiaoyuanhao.com/yunzhi-safety-test",
    fileApi: "//file.xiaoyuanhao.com",
    webApi: "//test-deploy.api.xiaoyuanhao.com",
    settingApi: "//test.xiaoyuanhao.com:39027/sentinel",
    noticeApi: "//dev18.xiaoyuanhao.com/jdm_notice/web", // 通知公告api
    bridgeApi: "//test-deploy.api.xiaoyuanhao.com/nbugs-bridge-test-qa", // 通知鹊桥api
    countAPI:
      "//test-deploy.api.xiaoyuanhao.com/counter-static-jar-qa/counter-static", // 阅读统计
    contacts: "//test-deploy.api.xiaoyuanhao.com/cloud-contacts-test",
    tool: "https://aly-test.api.xiaoyuanhao.com/xyh-job-center-test",
    exceptionTeachers: "https://aly-test.api.xiaoyuanhao.com/xyh-job-center-test",
    tags: "//test-deploy.api.xiaoyuanhao.com/tag-manage-qa",
    log: "http://test-deploy.api.xiaoyuanhao.com/operation-log-component-test",
    url: "http://test-deploy.api.xiaoyuanhao.com/cloud-contacts-test",
    safeClock: "//dev18.xiaoyuanhao.com/jdm_notice/web", // 平安钟api
    authApi: "//test-deploy.api.xiaoyuanhao.com/nbugs-auth-center-qa", // 用户中心获取应用接口域名
    salaryApi: "//aly-test.api.xiaoyuanhao.com/yunzhi-notice-test/web", // 工资条
    dataReport:
      "//test-deploy.api.xiaoyuanhao.com/yunzhi-questionnaire-test/web", // 数据填报api
    dataReportV3:
      "//test-deploy.api.xiaoyuanhao.com/yunzhi-questionnaire-test/web", // 数据填报api
    o2oa: "//sloa.api.xiaoyuanhao.com:40194", // o2oa
    activitySign:
      "//test-deploy.api.xiaoyuanhao.com/yunzhi-interaction-test/web", // 活动打卡
    read: "//aly-test.api.xiaoyuanhao.com/yunzhi-statistic-module-test/web", // 阅读组件
    workFlow: "//aly-test.api.xiaoyuanhao.com/yunzhi-data-test/web", // 工作流
    supervisionTeamSetting:
      "//aly-test.api.xiaoyuanhao.com/yunzhi-supervise-test",
    workFlowData: "//aly-test.api.xiaoyuanhao.com/yunzhi-data-test/web", // 工作流数据
    workFlowCompose: "//aly-test.api.xiaoyuanhao.com/yunzhi-workflow-test/web", // 工作流套件
    securityPatrol: "//aly-qa.api.xiaoyuanhao.com/safety-platform-qa/web", // 保安巡查
    dangerManage: "//aly-test.api.xiaoyuanhao.com/safety-platform-test/web", // 隐患管理
    aliyunOSS: "//aly-qa.api.xiaoyuanhao.com/safety-platform-qa/web", // 阿里云oss
    teacherEvaluation:
      "//aly-test.api.xiaoyuanhao.com/yunzhi-evaluate-test/web", // 教师发展性评价
    authWorkApi: "//aly-test.api-auth.xiaoyuanhao.com", // 判断是否展示姓名
    doubleTeacherClass: 'http://aly-test.api.xiaoyuanhao.com/yunzhi-live-test', // 双师课堂
    teachercare: '//aly-test.api.xiaoyuanhao.com/yunzhi-remindcare-test/web'// 教师关怀
  },
  // 测试环境
  test: {
    mock: '/mock',
    menu: '//aly-test.api.xiaoyuanhao.com/nbugs-permission-center-test',
    user: '//aly-test.api.xiaoyuanhao.com/sh-user-center-test',
    auth: '//aly-test.api.xiaoyuanhao.com/nbugs-auth-center-test/xyhauth',
    // 教育扶贫
    poor: '//dev.xiaoyuanhao.com/nbugs_activity',
    // 鹊桥
    qq: '//dev.xiaoyuanhao.com/bridge',
    recruit: '//test-deploy.api.xiaoyuanhao.com/nbugs-activity-recruit-qa/web/county',
    meetingSign: '//aly-test.api.xiaoyuanhao.com/yunzhi-notice-test/web',
    studentAttendance: '//aly-test.api.xiaoyuanhao.com/yunzhi-safety-test',
    // studentAttendance: '//dev18.xiaoyuanhao.com/sh-attendance3',
    fileApi: "//file.xiaoyuanhao.com",
    webApi: "//test-deploy.api.xiaoyuanhao.com",
    settingApi: "//test.xiaoyuanhao.com:39027/sentinel",
    noticeApi: "//aly-test.api.xiaoyuanhao.com/yunzhi-notice-test/web", // 通知公告api
    bridgeApi: "//test-deploy.api.xiaoyuanhao.com/nbugs-bridge-test-qa", // 通知鹊桥api
    countAPI:
      "//aly-test.api.xiaoyuanhao.com/counter-static-test/counter-static", // 阅读统计
    contacts: "//aly-test.api.xiaoyuanhao.com/cloud-contacts-test",
    tool: "https://aly-test.api.xiaoyuanhao.com/xyh-job-center-test",
    exceptionTeachers: "https://aly-test.api.xiaoyuanhao.com/xyh-job-center-test",
    tags: "//aly-test.api.xiaoyuanhao.com/tag-manage-test",
    log: "http://aly-test.api.xiaoyuanhao.com/operation-log-component-test",
    url: "http://aly-test.api.xiaoyuanhao.com/cloud-contacts-test",
    safeClock: "//aly-test.api.xiaoyuanhao.com/yunzhi-notice-test/web", // 平安钟api
    authApi: "//aly-test.api.xiaoyuanhao.com/nbugs-auth-center-test", // 用户中心获取应用接口域名
    dataReport: "//aly-test.api.xiaoyuanhao.com/yunzhi-questionnaire-test/web", // 数据填报api
    dataReportV3:
      "//aly-test.api.xiaoyuanhao.com/yunzhi-questionnaire-test/web", // 数据填报api
    salaryApi: "//aly-test.api.xiaoyuanhao.com/yunzhi-notice-test/web", // 工资条
    o2oa: "//sloa.api.xiaoyuanhao.com:40194", // o2oa
    activitySign: "//aly-test.api.xiaoyuanhao.com/yunzhi-interaction-test/web", // 活动打卡
    read: "//aly-test.api.xiaoyuanhao.com/yunzhi-statistic-module-test/web", // 阅读组件
    workFlow: "//aly-test.api.xiaoyuanhao.com/yunzhi-data-test/web", // 工作流
    supervisionTeamSetting:
      "//aly-test.api.xiaoyuanhao.com/yunzhi-supervise-test",
    workFlowData: "//aly-test.api.xiaoyuanhao.com/yunzhi-data-test/web", // 工作流数据
    workFlowCompose: "//aly-test.api.xiaoyuanhao.com/yunzhi-workflow-test/web", // 工作流套件（灰度发布）
    securityPatrol: "//aly-qa.api.xiaoyuanhao.com/safety-platform-qa/web", // 保安巡查
    dangerManage: "//aly-test.api.xiaoyuanhao.com/safety-platform-test/web", // 隐患管理
    teacherEvaluation:
      "//aly-test.api.xiaoyuanhao.com/yunzhi-evaluate-test/web", // 教师发展性评价
    authWorkApi: "//aly-test.api-auth.xiaoyuanhao.com", // 判断是否展示姓名
    doubleTeacherClass: 'http://aly-test.api.xiaoyuanhao.com/yunzhi-live-test',// 双师课堂
    teachercare: '//aly-test.api.xiaoyuanhao.com/yunzhi-remindcare-test/web'// 教师关怀
  },
  // 生产环境
  production: {
    mock: '/mock',
    menu: '//perm.api.xiaoyuanhao.com',
    user: '//user.api.xiaoyuanhao.com',
    auth: '//auth.xiaoyuanhao.com/xyhauth',
    // 教育扶贫
    poor: '//help-poor.api.xiaoyuanhao.com',
    // 鹊桥
    qq: "//bridge.api.xiaoyuanhao.com",
    recruit: "//recruit.api.xiaoyuanhao.com/web/county",
    meetingSign: "//notice.api.xiaoyuanhao.com/web",
    studentAttendance: "//safety.api.xiaoyuanhao.com",
    fileApi: "//file.xiaoyuanhao.com",
    webApi: "//microsit.xiaoyuanhao.com/wz",
    settingApi: "//sentinel.api.xiaoyuanhao.com",
    noticeApi: "//notice.api.xiaoyuanhao.com/web", // 通知公告api
    bridgeApi: "//bridge.api.xiaoyuanhao.com", // 通知鹊桥api
    countAPI: "//counter.api.xiaoyuanhao.com/counter-static", // 阅读统计
    contacts: "//gateway.api.xiaoyuanhao.com/contacts",
    tool: "https://sync-task.api.xiaoyuanhao.com",
    exceptionTeachers: "https://sync-task.api.xiaoyuanhao.com",
    tags: "//tag.api.xiaoyuanhao.com",
    log: "https://gateway.api.xiaoyuanhao.com/operation-log",
    url: "https://gateway.api.xiaoyuanhao.com/contacts",
    safeClock: "//notice.api.xiaoyuanhao.com/web", // 平安钟api
    authApi: "//auth.xiaoyuanhao.com", // 用户中心获取应用接口域名
    salaryApi: "//notice.api.xiaoyuanhao.com/web", // 工资条
    dataReport: "//yunzhi-questionnaire.api.xiaoyuanhao.com/web", // 数据填报api
    dataReportV3: "//yunzhi-questionnaire.api.xiaoyuanhao.com/web", // 数据填报独立部署api
    o2oa: "//sloa.api.xiaoyuanhao.com:40194", // o2oa
    activitySign: "//clock2.api.xiaoyuanhao.com/yunzhi-interaction/web", // 活动打卡
    read: "//yunzhi-statistic-module.api.xiaoyuanhao.com/web", // 阅读组件
    supervisionTeamSetting: "//yunzhi-supervise.api.xiaoyuanhao.com",
    workFlowData: "//yunzhi-data.api.xiaoyuanhao.com/web", // 工作流导出统计
    workFlow: "//yunzhi-data.api.xiaoyuanhao.com/web", // 工作流
    workFlowCompose: "//formflow.api.xiaoyuanhao.com/web", // 工作流套件
    securityPatrol: "//safety-platform.api.xiaoyuanhao.com/web", // 保安巡查
    dangerManage: "//safety-platform.api.xiaoyuanhao.com/web", // 保安巡查
    teacherEvaluation: "//yunzhi-evaluate.api.xiaoyuanhao.com/web", // 教师发展性评价
    authWorkApi: "//auth.xiaoyuanhao.com", // 判断是否展示姓名
    doubleTeacherClass: '//live.api.xiaoyuanhao.com', // 双师课堂
    teachercare: '//remind.api.xiaoyuanhao.com/web'// 教师关怀
  }
};

export const url = urlCollect[ENV];
