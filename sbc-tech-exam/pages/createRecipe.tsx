import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { addRecipe } from "@/redux/recipesSlice";

const CreateRecipe = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const recipes = useSelector((state: RootState) => state.recipes.list);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    if (!imageFile) {
      alert("Please select an image.");
      return;
    }

    const isDuplicate = recipes.some((r) => r.title === data.title);
    if (isDuplicate) {
      setErrorSnackbarOpen(true);
      return;
    }

    const newRecipe = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      title: data.title,
      description: data.description,
      instructions: data.instructions,
      image: "avocado_toast.jpg",
      dateAdded: new Date().toISOString().split("T")[0],
      isFavorite: false,
    };

    dispatch(addRecipe(newRecipe));
    router.push("/");
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 3,
          color: "#fff",
          background: "#445591",
          p: 2,
        }}
      >
        <IconButton onClick={() => router.back()}>
          <ArrowBackIcon sx={{ color: "white" }} />
        </IconButton>
        <Typography variant="h6" sx={{ ml: 1 }}>
          Back
        </Typography>
      </Box>

      <Box sx={{ padding: 4 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", gap: 4 }}>
            <Box sx={{ width: 300 }}>
              <Box
                sx={{
                  width: "100%",
                  height: 200,
                  border: "1px dashed gray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                  overflow: "hidden",
                }}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="preview"
                    style={{ height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Upload Preview
                  </Typography>
                )}
              </Box>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setImageFile(file);
                    setImagePreview(URL.createObjectURL(file));
                  }
                }}
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              <TextField
                label="Your Name"
                fullWidth
                margin="normal"
                {...register("name", { required: "Name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />

              <TextField
                label="Email Address"
                fullWidth
                margin="normal"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email format",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <TextField
                label="Title"
                fullWidth
                margin="normal"
                {...register("title", { required: "Title is required" })}
                error={!!errors.title}
                helperText={errors.title?.message}
              />

              <TextField
                label="Description"
                fullWidth
                margin="normal"
                multiline
                rows={2}
                {...register("description", {
                  required: "Description is required",
                })}
                error={!!errors.description}
                helperText={errors.description?.message}
              />

              <TextField
                label="Instructions"
                fullWidth
                margin="normal" 
                multiline
                rows={4}
                {...register("instructions", {
                  required: "Instructions are required",
                })}
                error={!!errors.instructions}
                helperText={errors.instructions?.message}
              />

              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ backgroundColor: "#445591" }}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </Box>
        </form>
      </Box>
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={3000}
        onClose={() => setErrorSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setErrorSnackbarOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Title already exists! Please use a unique title.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateRecipe;
