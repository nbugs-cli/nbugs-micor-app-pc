import React, { Component } from 'react';
import styles from './index.less';

let less_parser = null;
let wwei_editor = null;
let dataType = 0;
let curTabName = '';

export default class WxEditor extends Component {
  componentDidMount() {
    try {
      const { value, onChange, eid = 'wwei_editor' } = this.props;
      less_parser = new window.less.Parser();
      window.ZeroClipboard.config({
        swfPath:
          '//nb-cmsimg.oss-cn-beijing.aliyuncs.com/wxeditor/js/wxeditor/ZeroClipboard.swf',
      });
      // try {
      window.UE.delEditor(eid);
      // } catch (e) {}
      wwei_editor = window.UE.getEditor(eid);
      wwei_editor.ready(function () {
        // const editor_document = wwei_editor.selection.document;

        window.wxEditor.getWxEditorContent();
      });
      this.loadTypes();

      const that = this;
      // 监听富文本数据变化
      wwei_editor.addListener('selectionchange', function (type) {
        const content = this.getContent();
        that.setState({ value });

        if (typeof onChange === 'function') {
          onChange(content);
        }
      });

      window.addEventListener('message', function (e) {
        const res = e;
        const { action } = res.data;
        const { info } = res.data;
        // 判断域名
        if (res.origin == 't.xiaoyuanhao.com') {
          switch (action) {
            case 'setWxEditorContent':
              // content = info;
              break;
            default:
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  componentWillUnmount() {
    less_parser = null;
    wwei_editor = null;
    dataType = 0;
    curTabName = '';
  }

  loadTypes = () => {
    const url = `${busi_servers.wxEditor}allTypes`;
    window.$.get(url, function (json) {
      if (json.code != 0) {
        alert(json.msg);
        return;
      }
      let html = '';
      for (let i = 0; json.rs && json.rs != null && i < json.rs.length; i++) {
        const r = json.rs[i];
        if (i == 0) {
          dataType = r.id;
          curTabName = r.typeName;
        }
        html += `<li ${i == 0 ? 'class="active"' : ''}>`;
        html += `<a class="g_bar" href="javascript:;" data-type="${r.id}">${r.typeName}</a>`;
        if (r.sub && r.sub != null) {
          html += '<div class="g_listdown" style="display:none;">';
          for (let j = 0; j < r.sub.length; j++) {
            const sub = r.sub[j];
            html += '<div class="g_listdown_li">';
            html += `<a href="#temp-title1" data-type="${sub.id}">${sub.typeName}</a>`;
            html += '</div>';
          }
          html += '</div>';
        }
        html += '</li>';
      }
      window.$('#templateTab').html(html);
      window.init(dataType, curTabName);
    });
  };

  render() {
    const { showTemplate = false, eid = 'wwei_editor' } = this.props;
    return (
      <div className={styles.root}>
        {showTemplate && (
          <div className="span5">
            <ul className="nav nav-tabs g_tabhover" id="templateTab" />
            <div className="tab-content template-content">
              <div id="template-loading" className="hide">
                <img
                  src="//nb-cmsimg.oss-cn-beijing.aliyuncs.com/wxeditor/images/loading.gif"
                  alt=""
                />
                加载中...
              </div>
              <div id="temp-list" />
            </div>
          </div>
        )}

        <div className="span7" id="wxcontent" style={{ position: 'relative', zIndex: 2 }}>
          <div>
            <div id={eid} style={{ width: '100%', height: '600px' }} />
          </div>
        </div>
      </div>
    );
  }
}
