import { Link, LinkProps } from '@mui/material';
import React from 'react';

export const ExternalLink: React.FunctionComponent<LinkProps> = ({
  target = '_blank',
  ...rest
}) => <Link underline="none" rel="noopener noreferrer" target={target} {...rest} />;
