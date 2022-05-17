import refresh from '../images/refresh.svg';
import Button from '@mui/material/Button';

const ControlButtons = ({
  onRefresh,
  onSubmit,
  onClickDelete,
}: {
  onRefresh: () => void;
  onSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClickDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <div className="justify-center my-10 flex flex-row space-x-4">
      <div>
        <Button
          onClick={onClickDelete}
          variant="contained"
          sx={{ fontWeight: 'normal' }}
        >
          Delete
        </Button>
      </div>

      <div>
        <Button
          variant="outlined"
          sx={{ fontWeight: 'normal' }}
          onClick={onRefresh}
          aria-label="refresh"
        >
          <img src={refresh} alt="" width="26" />
        </Button>
      </div>

      <div>
        <Button
          onClick={onSubmit}
          variant="contained"
          sx={{ fontWeight: 'normal' }}
        >
          Enter
        </Button>
      </div>
    </div>
  );
};

export default ControlButtons;
