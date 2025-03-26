import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { updateRecipe, deleteRecipe } from "@/redux/recipesSlice";

const EditRecipe = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = router.query;

  const recipe = useSelector((state: RootState) =>
    state.recipes.list.find((r) => r.id === id)
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    if (recipe) {
      setValue("name", recipe.name);
      setValue("email", recipe.email);
      setValue("title", recipe.title);
      setValue("description", recipe.description);
      setValue("instructions", recipe.instructions);
    }
  }, [recipe, setValue]);

  const onSubmit = (data: any) => {
    if (!recipe) return;

    const updated = {
      ...recipe,
      ...data,
    };

    dispatch(updateRecipe(updated));
    setToastOpen(true);

    setTimeout(() => {
      router.push("/");
    }, 1500);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this recipe?")) {
      dispatch(deleteRecipe(id));
      router.push("/");
    }
  };

  if (!recipe) {
    return <Typography sx={{ p: 4 }}>Recipe not found.</Typography>;
  }

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
      <Box sx={{ padding: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", gap: 4 }}>
          <Box sx={{ width: 300 }}>
            <Box
              component="img"
              src={`/images/${recipe.image}`}
              alt={recipe.title}
              sx={{
                width: "100%",
                height: 200,
                objectFit: "cover",
                borderRadius: 2,
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
              {...register("title")}
              InputProps={{ readOnly: true }}
            />
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              multiline
              rows={2}
              {...register("description")}
            />
           
            <TextField
              label="Instructions"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              {...register("instructions")}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 3,
              }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(recipe.id)}
              >
                Delete
              </Button>
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
    </Box>
  );
};

export default EditRecipe;
