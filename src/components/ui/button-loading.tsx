import { Loader2 } from "lucide-react";
import { Button } from "./button";

type ButtonProps = React.ComponentPropsWithoutRef<typeof Button>;

interface ButtonLoadingProps extends ButtonProps {
  isLoading: boolean;
}
const ButtonLoading: React.FC<ButtonLoadingProps> = ({
  isLoading,
  children,
  ...props
}) => {
  return (
    <Button disabled={isLoading} {...props}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
};

export default ButtonLoading;
