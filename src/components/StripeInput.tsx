import React, { useState, useImperativeHandle, FC } from 'react';
import { ReactStripeElements } from 'react-stripe-elements';

import { useTheme, fade } from '@material-ui/core/styles';
import { InputBaseComponentProps } from '@material-ui/core/InputBase';

const StripeInput: FC<InputBaseComponentProps> = props => {
  const {
    component: Component,
    inputRef,
    'aria-invalid': ariaInvalid,
    'aria-describedby': ariaDescribeBy,
    defaultValue,
    required,
    onKeyDown,
    onKeyUp,
    readOnly,
    autoComplete,
    autoFocus,
    type,
    name,
    rows,
    handleCardChange,
    ...other
  } = props;
  const theme = useTheme();
  const [mountNode, setMountNode] = useState();

  useImperativeHandle(
    inputRef,
    () => ({
      focus: () => mountNode.focus(),
    }),
    [mountNode]
  );

  const handleChange = (event: ReactStripeElements.ElementChangeResponse) => {
    handleCardChange(event);
  };

  return (
    <Component
      {...other}
      onReady={setMountNode}
      style={{
        base: {
          color: theme.palette.text.primary,
          fontSize: `${theme.typography.fontSize}px`,
          fontFamily: theme.typography.fontFamily,
          '::placeholder': {
            color: fade(theme.palette.text.primary, 0.42),
          },
        },
        invalid: {
          color: theme.palette.text.primary,
        },
      }}
      onChange={handleChange}
    />
  );
};

export default StripeInput;
