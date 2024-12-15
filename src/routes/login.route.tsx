import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Avatar,
  Button,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { FormattedMessage } from "react-intl";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      Etienne Rivard {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

function Login() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();

  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (loading) return;
    if (user) navigate(from, { replace: true });
  }, [user, loading, navigate, from]);

  const validateForm = (email: string, password: string) => {
    const errors: { email?: string; password?: string } = {};

    if (!email) {
      errors.email = "login.errors.missingEmail";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "login.errors.invalidEmail";
    }

    if (!password) {
      errors.password = "login.errors.missingPassword";
    } else if (password.length < 6) {
      errors.password = "login.errors.shortPassword";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGeneralError(null); // Réinitialiser l'erreur générale

    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    if (!validateForm(email, password)) return;

    logInWithEmailAndPassword(email, password).catch((err) => {
      setGeneralError(err.message);
    });
  };

  const handleCancel = () => {
    navigate(-1); // Retour à la page précédente
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1e1e2f",
        }}
      >
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            borderRadius: 2,
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#fdfdfd",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
            <FormattedMessage id="login.title" defaultMessage="S'authentifier" />
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              width: "100%",
              mt: 1,
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              autoComplete="email"
              autoFocus
              label={<FormattedMessage id="login.email" defaultMessage="Courriel" />}
              error={!!formErrors.email}
              helperText={
                formErrors.email && (
                  <FormattedMessage id={formErrors.email} defaultMessage="Email is invalid" />
                )
              }
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              id="password"
              type="password"
              autoComplete="current-password"
              label={<FormattedMessage id="login.password" defaultMessage="Mot de passe" />}
              error={!!formErrors.password}
              helperText={
                formErrors.password && (
                  <FormattedMessage id={formErrors.password} defaultMessage="Password is invalid" />
                )
              }
            />

            {generalError && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                <FormattedMessage id="login.errors.general" defaultMessage="An error occurred." />: {generalError}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#125a9b" },
              }}
            >
              <FormattedMessage id="login.submit" defaultMessage="S'authentifier" />
            </Button>
          </Box>

          <Button
            onClick={handleCancel}
            fullWidth
            variant="outlined"
            sx={{
              mt: 1,
              color: "#1976d2",
              borderColor: "#1976d2",
              "&:hover": { backgroundColor: "#e3f2fd", borderColor: "#125a9b" },
            }}
          >
            <FormattedMessage id="login.cancel" defaultMessage="Annuler" />
          </Button>

          <Copyright sx={{ mt: 3 }} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;
