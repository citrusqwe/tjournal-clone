import React from "react";
import { Dialog, DialogContent, Typography } from "@material-ui/core";

import styles from "./AuthDialog.module.scss";
import { ArrowBack } from "@material-ui/icons";
import { MainForm } from "./forms/Main";
import { LoginForm } from "./forms/Login";
import { RegisterForm } from "./forms/Register";

interface AuthDialogProps {
  handleClose: () => void;
  visible: boolean;
}

export const AuthDialog: React.FC<AuthDialogProps> = ({
  handleClose,
  visible,
}) => {
  const [formType, setFormType] = React.useState<"main" | "login" | "register">(
    "main"
  );

  return (
    <Dialog
      open={visible}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      maxWidth="xs"
      fullWidth
    >
      <DialogContent>
        <div className={styles.content}>
          <Typography className={styles.title}>
            {formType === "main" ? (
              "Вход в TJ"
            ) : (
              <p
                className={styles.backTitle}
                onClick={() => setFormType("main")}
              >
                <ArrowBack /> К авторизации
              </p>
            )}
          </Typography>
          {formType === "main" && (
            <MainForm onOpenLogin={() => setFormType("login")} />
          )}
          {formType === "login" && (
            <LoginForm onOpenRegister={() => setFormType("register")} />
          )}
          {formType === "register" && (
            <RegisterForm
              onOpenRegister={() => setFormType("register")}
              onOpenLogin={() => setFormType("login")}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
