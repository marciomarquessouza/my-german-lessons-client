import { Box, IconButton } from "@mui/material";

export const CustomAction = ({
  icon,
  onClick,
}: {
  icon: React.ReactElement<any>;
  onClick: () => void;
}) => {
  return (
    <Box>
      <IconButton
        aria-label="open"
        size="small"
        color="primary"
        onClick={onClick}
      >
        {icon}
      </IconButton>
    </Box>
  );
};
