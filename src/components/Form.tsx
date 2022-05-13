import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {
  BaseSyntheticEvent,
  forwardRef,
  Fragment,
  LegacyRef,
  Ref,
  RefObject,
} from 'react';

const Form = (
  {
    term,
    disabled,
    onChange,
    onSubmit,
  }: {
    term: string;
    disabled: boolean;
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
    <Box component="form" noValidate autoComplete="off" onSubmit={onSubmit}>
      <div>
        <TextField
          inputRef={ref}
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

export default forwardRef(Form);
