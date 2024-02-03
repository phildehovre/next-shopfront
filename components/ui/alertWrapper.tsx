import React from "react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";

type AlertProps = {
  title: string;
  description?: string;
  type?: "destructive";
};

const AlertWrapper: React.FC<AlertProps> = ({ title, description, type }) => {
  return (
    <Alert variant={type}>
      {type === "destructive" ? (
        <CrossCircledIcon className="h-4 w-4" />
      ) : (
        <CheckCircledIcon className="h-4 w-4 stroke-green-400" />
      )}
      <AlertTitle>
        {type === "destructive" ? "Error" : ""} {title}
      </AlertTitle>
      {description && <AlertDescription>{description}</AlertDescription>}
    </Alert>
  );
};

export default AlertWrapper;
