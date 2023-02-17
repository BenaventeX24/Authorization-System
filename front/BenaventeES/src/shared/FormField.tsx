import styled from '@emotion/styled';
import { Popover, Typography } from '@mui/material';
import { Field } from 'formik';
import React from 'react';
import { ZodError } from 'zod';

export const CustomFormField = styled(Field)`
  background: rgba(249, 249, 249, 0.8);

  border: 1px solid #eeeeee;
  border-radius: 4px;
  padding: 8px;

  width: 272px;
  height: 26px;
`;

interface FormFieldProps {
  id?: string;
  name: string;
  type: string;
  placeholder?: string;
  label?: string;
  validation?: any;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  type,
  placeholder,
  label,
  validation,
}: FormFieldProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLInputElement | null>(null);
  const [validationError, setValidationError] = React.useState<ZodError<any> | null>();

  const handleValidation = (value: string) => {
    try {
      validation?.parse(value);
      setValidationError(null);
    } catch (err: any) {
      setValidationError(err);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Typography sx={{ alignSelf: 'flex-start', marginBottom: '-18px' }}>
        {label}
      </Typography>
      <CustomFormField
        onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
          handleValidation(e.currentTarget.value);
          console.log(validationError);
        }}
        aria-describedby={id}
        name={name}
        type={type}
        placeholder={placeholder}
        onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
          setAnchorEl(e.currentTarget);
          handleValidation(e.currentTarget.value);
        }}
      />
      {validationError ? (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          disableAutoFocus={true}
          disableEnforceFocus={true}
        >
          {validationError?.issues.map((issue, index) => {
            return (
              <Typography
                key={index}
                sx={{
                  color: 'blue',
                  fontWeight: '300',
                  fontSize: '.8rem',
                  p: 1,
                }}
              >
                - {issue.message}
              </Typography>
            );
          })}
        </Popover>
      ) : (
        ''
      )}
    </>
  );
};

export default FormField;
