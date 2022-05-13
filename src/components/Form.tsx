import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { BaseSyntheticEvent } from 'react';

const Form = ({
  term,
  disabled,
  onChange,
  onSubmit,
}: {
  term: string;
  disabled: boolean;
  onChange: (event: BaseSyntheticEvent, letter?: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={onSubmit}>
      <div>
        <TextField
          value={term}
          onChange={onChange}
          disabled={disabled}
          id="standard-basic"
          placeholder="Type or click"
        />
      </div>
    </Box>
  );
};

export default Form;
