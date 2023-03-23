import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Modal,
  Rating,
  Typography,
} from "@mui/material";
import { FaRegWindowClose } from "react-icons/fa";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
};

function GuidenceModal({ gOpen, setGOpen }) {
  //closeProduct modal
  const handleGClose = () => {
    setGOpen(false);
  };

  return (
    <Modal
      open={gOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Card sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <IconButton onClick={handleGClose}>
            <FaRegWindowClose />
          </IconButton>
        </Box>

        <Box
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <Box>Hi guidence</Box>
        </Box>
      </Card>
    </Modal>
  );
}

export default GuidenceModal;
