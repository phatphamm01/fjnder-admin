import { Navigate as NavigateReact } from "react-router-dom";
import { To } from "~/types/react-router-dom";

export const Navigate = ({
  ...rest
}: Omit<React.ComponentProps<typeof NavigateReact>, "to"> & { to: To }) => {
  return <NavigateReact {...rest} />;
};
