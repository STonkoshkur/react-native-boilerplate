import React, { FC, memo, PropsWithChildren } from 'react';
// components
import Typography, { TypographyProps } from 'src/components/Typography';

const ListItemTitle: FC<PropsWithChildren<TypographyProps>> = ({
  children,
  ...props
}) => {
  return (
    <Typography variant="body" {...props}>
      {children}
    </Typography>
  );
};

export default memo(ListItemTitle);
