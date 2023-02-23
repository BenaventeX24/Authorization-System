import { Button } from '@mui/material';
import { useFormikContext } from 'formik';
import React, { useState } from 'react';
import { AnyZodObject } from 'zod';

interface ButtonProps {
  initialValues: any;
  schema?: AnyZodObject;
  children: string;
}
const SendButton: React.FC<ButtonProps> = ({
  children,
  initialValues,
  schema,
}: ButtonProps) => {
  const [readyToSend, setReadyToSend] = useState<boolean>(false);
  const { values } = useFormikContext<typeof initialValues>() ?? {};

  React.useEffect(() => {
    try {
      schema?.parse(values);
      setReadyToSend(true);
    } catch (err: any) {
      setReadyToSend(false);
    }
  }, [values]);

  return (
    <>
      <Button
        sx={{ width: '272px', fontWeight: '700', marginTop: '8px' }}
        type="submit"
        variant="contained"
        disabled={!readyToSend}
      >
        {children}
      </Button>
    </>
  );
};

export default SendButton;
