import React, { HtmlHTMLAttributes } from 'react';
import { Layout } from 'antd';

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {}

const Content: React.FC<Props> = ({ children, className, style }) => {
  return (
    <Layout.Content className={className} style={style}>
      {children}
    </Layout.Content>
  );
};

export default Content;
