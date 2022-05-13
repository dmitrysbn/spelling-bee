import refresh from '../images/refresh.svg';
import Button from '@mui/material/Button';

const ControlButtons = ({
  onRefresh,
  onClickEnter,
  onClickDelete,
}: {
  onRefresh: () => void;
  onClickEnter: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClickDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <div className="justify-center my-10 flex flex-row space-x-4">
      <div>
        <Button
          onClick={onClickDelete}
          variant="contained"
          sx={{ fontWeight: 'bold' }}
        >
          Delete
        </Button>
      </div>

      <div>
        <Button
          variant="outlined"
          sx={{ fontWeight: 'bold' }}
          onClick={onRefresh}
        >
          <img src={refresh} alt="" width="26" />
        </Button>
      </div>

      <div>
        <Button
          onClick={onClickEnter}
          variant="contained"
          sx={{ fontWeight: 'bold' }}
        >
          Enter
        </Button>
      </div>
    </div>
  );
};

export default ControlButtons;
