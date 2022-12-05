# Table组件中操作栏渲染组件

## 功能
1. 操作栏菜单展示
2. 超过一定数量显示更多下拉菜单

## 入参
参数名 | 类型 | 说明
:---:|:---:|:---:
data | Array<Object> | 菜单列表数据
showMoreLen | Number | 超过几项菜单展示更多

## 示例

```
// 通知发布失败 状态下 操作
  renderFailedAction = ({ id }) => {
    const data = [
      {
        // text可以为string或者ReactNode
        text: <a onClick={()=>{}}>删除</a>,
      },
      {
        text: '重新发布',
        // onClick 回调方法，非必填
        onClick: () => this.handleFetchRequest({ id, fetchType: 'rePublish' }),
      }
    ];
    return (
      <OperateDropdown data={data} />
    );
  };
```
