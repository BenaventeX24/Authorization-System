import styled from '@emotion/styled';
import { FormControlLabel, Typography } from '@mui/material';
import { Field } from 'formik';
import React from 'react';
import { ZodError } from 'zod';

import { PasswordField } from './PasswordField';
import ValidationPopover from './ValidationPopover';

export const CustomFormField = styled(Field)`
  background: rgba(249, 249, 249, 0.8);

  border: 1px solid #eeeeee;
  border-radius: 4px;
  padding: 8px;

  width: 272px;
  height: 26px;

  display: flex;
  justify-content: space-between;
`;

interface FormFieldProps {
  name: string;
  type?: string;
  placeholder?: string;
  label?: string | JSX.Element;
  validation?: any;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  type = 'text',
  placeholder,
  label,
  validation,
}: FormFieldProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLInputElement | null>(null);
  const [validationError, setValidationError] = React.useState<ZodError<any> | null>(
    null,
  );

  const handleValidation = (value: string | boolean) => {
    try {
      validation?.parse(value);
      setValidationError(null);
    } catch (err: any) {
      setValidationError(err);
    }
  };

  return (
    <>
      {type !== 'checkbox' && (
        <Typography sx={{ alignSelf: 'flex-start', marginBottom: '-10px' }}>
          {label}
        </Typography>
      )}
      {type === 'password' ? (
        <PasswordField name={name} placeholder={placeholder} validation={validation} />
      ) : type === 'checkbox' ? (
        <>
          <FormControlLabel
            sx={{
              marginLeft: '12px',
              marginTop: '10px',
            }}
            control={<Field name={name} type="checkbox" />}
            label={label}
          />
        </>
      ) : (
        <>
          <CustomFormField
            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
              handleValidation(e.currentTarget.value)
            }
            aria-describedby={name}
            name={name}
            type={type}
            placeholder={placeholder}
            onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
              setAnchorEl(e.currentTarget);
              handleValidation(e.currentTarget.value);
            }}
            onBlur={() => setAnchorEl(null)}
          />
          {validationError && anchorEl && (
            <ValidationPopover
              id={name}
              validationError={validationError}
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
            />
          )}
        </>
      )}
    </>
  );
};

export default FormField;
