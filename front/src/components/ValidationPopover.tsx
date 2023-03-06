import { Popover, Typography } from '@mui/material';
import React from 'react';
import { ZodError } from 'zod';

interface ValidationPopoverProps {
  id?: string;
  validationError: ZodError<any> | null;
  setAnchorEl: React.Dispatch<HTMLInputElement | null>;
  anchorEl: HTMLInputElement | null;
}

const ValidationPopover: React.FC<ValidationPopoverProps> = ({
  id,
  validationError,
  anchorEl,
  setAnchorEl,
}: ValidationPopoverProps) => {
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
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
          data-testid="validation-popover"
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

export default ValidationPopover;
