import { Button } from "@/components/ui/button";
import { UpdateIcon } from "@radix-ui/react-icons";

type ButtonLoadingProps = {
  children: React.ReactNode;
};

export function ButtonLoading(props: ButtonLoadingProps) {
  return (
    <Button disabled>
      <UpdateIcon className="mr-2 h-4 w-4 animate-spin" />
      {props.children}
    </Button>
  );
}
