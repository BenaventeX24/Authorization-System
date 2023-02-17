import { Button } from '@mui/material';
import { useFormikContext } from 'formik';
import React, { useState } from 'react';
import { AnyZodObject } from 'zod';

interface ButtonProps {
  initialValues: any;
  schema: AnyZodObject;
}
const SendButton: React.FC<ButtonProps> = ({ initialValues, schema }: ButtonProps) => {
  const [readyToSend, setReadyToSend] = useState<boolean>(false);
  const { values } = useFormikContext<typeof initialValues>() ?? {};

  React.useEffect(() => {
    try {
      console.log(values);
      schema.parse(values);
      setReadyToSend(true);
    } catch (err: any) {
      setReadyToSend(false);
    }
  }, [values]);

  return (
    <>
      <Button
        sx={{ width: '272px', fontWeight: '700' }}
        type="submit"
        variant="contained"
        disabled={!readyToSend}
      >
        Log in
      </Button>
    </>
  );
};

export default SendButton;
