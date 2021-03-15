import React, { FC, memo, PropsWithChildren } from 'react';
// components
import Typography, { TypographyProps } from 'src/components/Typography';

const ListItemSubtitle: FC<PropsWithChildren<TypographyProps>> = ({
  children,
  ...props
}) => {
  return (
    <Typography variant="subhead" appearance="muted" {...props}>
      {children}
    </Typography>
  );
};

export default memo(ListItemSubtitle);
