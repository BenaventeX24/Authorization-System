import styled from '@emotion/styled';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, IconButton, InputAdornment } from '@mui/material';
import { Field } from 'formik';
import React from 'react';

export const CustomFormFieldPassword = styled(Field)`
  background: rgba(249, 249, 249, 0.8);
  border: none;
  &:focus {
    outline: none;
  }
`;

interface FormFieldPasswordProps {
  children?: React.ReactNode;
  id?: string;
  name: string;
  placeholder?: string;
  label?: string;
  handleValidation: any;
  setAnchorEl: React.Dispatch<HTMLInputElement | null>;
}

export const PasswordField: React.FC<FormFieldPasswordProps> = ({
  id,
  name,
  placeholder,
  handleValidation,
  setAnchorEl,
}: FormFieldPasswordProps) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'rgba(249, 249, 249, 0.8)',
          border: '1px solid #eeeeee',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          width: '272px',
          padding: '8px',
          height: '26px',
        }}
      >
        <CustomFormFieldPassword
          aria-describedby={id}
          name={name}
          onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
            setAnchorEl(e.currentTarget);
            handleValidation(e.currentTarget.value);
          }}
          onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) =>
            handleValidation(e.currentTarget.value)
          }
          placeholder={placeholder}
          type={showPassword ? 'text' : 'password'}
          sx={{
            borderRight: 'none',
          }}
        />
        <InputAdornment sx={{ marginLeft: 'auto', marginRight: '4px' }} position="end">
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment>
      </Box>
    </>
  );
};
