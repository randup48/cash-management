import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import Modal from "@mui/material/Modal/Modal";
import Typography from "@mui/material/Typography";

interface paramModal {
  openModal: boolean;
  closeModal: () => void;
  ontap: () => void;
}

export function modalDelete(param: paramModal) {
  return (
    <Modal
      open={param.openModal}
      onClose={param.closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        id="ModalDelete"
        component="form"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          width: "80vw",
          p: "24px 32px",
          borderRadius: "10px",
          textAlign: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="body1" style={{ marginBottom: "24px" }}>
          Apakah anda yakin ingin menghapus data bulan ini?
        </Typography>

        <div
          style={{
            display: "grid",
            gap: "16px",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          <Button onClick={param.closeModal}>Batal</Button>
          <Button
            onClick={param.ontap}
            variant="contained"
            sx={{ alignSelf: "flex-start" }}
            color="error"
          >
            Hapus
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
