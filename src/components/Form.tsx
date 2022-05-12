import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Dispatch, SetStateAction } from 'react';

const Form = ({
  term,
  setTerm,
  onSubmit,
}: {
  term: string;
  setTerm: Dispatch<SetStateAction<string>>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) => {
  const onChange = (event: { target: { value: SetStateAction<string> } }) => {
    setTerm(event.target.value);
  };

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={onSubmit}>
      <div>
        <TextField value={term} onChange={onChange} id="standard-basic" />
      </div>
    </Box>
  );
};

export default Form;
