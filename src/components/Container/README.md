#Container-参数说明
  
##一、示例代码及说明
```
/* eslint-disable import/extensions */
import React from 'react';
import { Button } from 'antd'
import Container from '@/components/Container';
import styles from './index.less'

class BasicForm extends React.Component {
  // 底部按钮点击事件
  handleBtnClick = () => {
    console.log('测试按钮点击')
  }

  render() {
    // 面包屑下方提示内容条
    const alertParams = {
      states: !0, // true为展示 false不展示
      type: 'error', // 错误类型（success info warning error）四种，默认为warning类型
      message: '测试内容测试内容测试内容测试内容', // 展示的内容
    }

    // 底部按钮区域属性，demFooter中的Button间距由框架样式去做
    const footerParams = {
      states: !0, // 是否展示底部按钮区域，默认为false 不展示
      demFooter: (
        <>
          <Button type='default'>按钮-测试1</Button>
          <Button onClick={this.handleBtnClick} type='primary'>按钮-测试2</Button>
          <Button type='default'>按钮-测试3</Button>
        </>
      )
    }

    return (
      <Container breStates={!0} version={2} alertParams={alertParams} footerParams={footerParams}>
        <div className={styles["test-after"]}>基础信息搜索区域</div>
      </Container>
    );
  }
}

export default BasicForm;

```

##二、具体参数说明
```
 1 breStates Bool       是否显示面包屑（默认无）
 
 2 defaultPadding Bool  应用传入参数true则无内边距离（默认有）
 
 3 children Dom         内容区域标签
 
 4 alertParams Object   面包屑下方内容区域【支持三种类型success info warning error】（默认无）
 
 5 footerParams Object  底部全局区域按钮（默认无）
 
 6 isPathParams Bool    点击面包屑跳转路由是否带上地址栏参数（默认不带）
 
 7 isBreVersion Bool    对应面包屑版本（默认无）若传入true则显示V2版本中的面包屑，反之则显示最新版本面包屑
 
 8 breDataSource Object 面包屑对象（与V2中的面包屑dataSource格式保持一致即可）
 
 8 isSplitBar Bool      页面中搜索区域和编辑页面中灰色分割条

```


##三、效果展示访问地址
```
  测试环境地址：http://u-test.xiaoyuanhao.com/home/settings/basi
  
  线上环境1：http://t.xiaoyuanhao.com/home/settings/basic
  
  线上环境2：http://x.xiaoyuanhao.com/settings/basic
  
  查看方式需先登录后并选择所属学校，再将对应环境的地址贴入地址栏，即可查看效果
```

