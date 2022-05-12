import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { BaseSyntheticEvent } from 'react';

const Form = ({
  term,
  onChange,
  onSubmit,
}: {
  term: string;
  onChange: (event: BaseSyntheticEvent, letter?: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={onSubmit}>
      <div>
        <TextField value={term} onChange={onChange} id="standard-basic" />
      </div>
    </Box>
  );
};

export default Form;
