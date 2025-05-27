import BounceLoader from "react-spinners/BounceLoader";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog";

interface LoadingDialogProps {
  show: boolean;
}
const LoadingDialog: React.FC<LoadingDialogProps> = ({ show }) => {
  return (
    <Dialog open={show}>
      <DialogContent className="sm:max-w-[200px] [&>button]:hidden">
        <DialogHeader>
          <DialogTitle>Please wait . . .</DialogTitle>
        </DialogHeader>
        <div className="w-full flex justify-center">
          <BounceLoader color="var(--color-orange-500)" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoadingDialog;
