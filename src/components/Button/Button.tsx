import React from 'react';

import styles from './button.module.css';

type IConButtonProps = React.ComponentPropsWithRef<'button'> & {
  icon?: React.ReactNode;
};

export const Button: React.FC<IConButtonProps> = ({
  icon,
  children,
  ...props
}) => {
  return (
    <button {...props} className={styles.button}>
      {!!icon && <div className={styles.button__icon}>{icon}</div>}
      {children}
    </button>
  );
};
