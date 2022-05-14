import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { BaseSyntheticEvent, forwardRef, RefObject } from 'react';

const Form = (
  {
    term,
    error,
    onChange,
    onSubmit,
  }: {
    term: string;
    error: string;
    onChange: (event: BaseSyntheticEvent, letter?: string) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  },
  ref:
    | ((instance: HTMLDivElement | null) => void)
    | RefObject<HTMLDivElement>
    | null
    | undefined
) => {
  return (
    <div className="flex justify-center h-1/6">
      <div className="flex flex-col justify-end">
        <div className="text-center align-bottom mb-5">{error}</div>
        <Box component="form" noValidate autoComplete="off" onSubmit={onSubmit}>
          <TextField
            inputRef={ref}
            value={term}
            onChange={onChange}
            disabled={!!error}
            id="standard-basic"
            placeholder="Type or click"
          />
        </Box>
      </div>
    </div>
  );
};

export default forwardRef(Form);
