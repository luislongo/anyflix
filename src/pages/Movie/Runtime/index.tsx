import React from 'react';
import { runtimeFormatter } from '../../../utils/runtimeFormatter';

export type RuntimeProps = {
  runtime?: number;
};

export const Runtime: React.FC<RuntimeProps> = ({ runtime = 0 }) => {
  return <h3 className="text-white font-light">{runtimeFormatter(runtime)}</h3>;
};
