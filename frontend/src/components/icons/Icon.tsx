import React from "react";
// import classNames from "classnames";
import "./Icon.scss";

export type IconProps = React.SVGAttributes<SVGElement> & {
    className?: string;
    color?: 'primary' | 'secondary' | 'green' | 'white';
    filled?: boolean;
};

const Icon: React.FC<IconProps> = ({
  className,
  color,
  width = 24,
  height = 24,
  children,
  ...props
}) => {
  const viewBox = `0 0 ${width} ${height}`;

  return (
    <svg className={className} width={width} height={height} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg" {...props}>
      {children}
    </svg>
  );
};

export default React.memo(Icon);