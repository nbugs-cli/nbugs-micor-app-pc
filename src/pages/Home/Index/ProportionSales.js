import React, { memo } from 'react';
import { Card } from 'antd';
import { formatMessage } from 'umi';
import styles from './index.less';
import { Pie } from '@/antd-pro-components/Charts';

const ProportionSales = memo(({ salesPieData }) => (
  <Card
    className={styles.salesCard}
    bordered={false}
    title=""
    bodyStyle={{ padding: 24 }}
    extra=""
    style={{ marginTop: 24 }}
  >
    <Pie
      hasLegend
      subTitle={formatMessage({ id: 'app.analysis.all-month', defaultMessage:'all-month' })}
      total={() => <div>考勤汇总</div>}
      data={salesPieData}
      valueFormat={() => null}
      height={270}
      lineWidth={4}
      style={{ padding: '8px 0' }}
    />
  </Card>
));

export default ProportionSales;
