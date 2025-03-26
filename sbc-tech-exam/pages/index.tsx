import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Paper,
  Box,
  AppBar,
  Toolbar,
  TextField,
  InputAdornment,
  Fab,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RecipeCard from "@/components/RecipeCard";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { toggleFavorite, fetchRecipes } from "@/redux/recipesSlice";
import { AppDispatch } from "@/redux/store";
import AddIcon from "@mui/icons-material/Add";

const Header = () => {
  const recipes = useSelector((state: RootState) => state.recipes.list);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!recipes.length) {
      dispatch(fetchRecipes());
    }
  }, [dispatch]);

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [favoritesFilter, setFavoritesFilter] = useState<null | boolean>(null);

  const handleSortChange = (e: any) => {
    setSortOrder(e.target.value);
  };

  const handleToggleFavorite = (id: string) => {
    dispatch(toggleFavorite(id));
  };

  const handleFavoritesChange = (value: boolean) => {
    setFavoritesFilter((prev) => (prev === value ? null : value));
  };

  const filteredAndSorted = recipes
    .filter((recipe) => {
      // Favorites
      if (favoritesFilter === true && !recipe.isFavorite) return false;
      if (favoritesFilter === false && recipe.isFavorite) return false;

      // Search
      return recipe.title.toLowerCase().includes(search.toLowerCase());
    })
    .sort((a, b) => {
      if (sortOrder === "asc") return a.title.localeCompare(b.title);
      if (sortOrder === "desc") return b.title.localeCompare(a.title);
      return 0;
    });

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#445591" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ width: 300 }}>
            <TextField
              placeholder="Search here..."
              size="small"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                backgroundColor: "#e0e0e0",
                borderRadius: 2,
                "& fieldset": { border: "none" },
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: "flex", padding: 2 }}>
        {/* Filters */}
        <Box sx={{ width: 200, p: 2 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="sort-label">Sort by Title</InputLabel>
            <Select
              labelId="sort-label"
              value={sortOrder}
              label="Sort by Title"
              onChange={handleSortChange}
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="asc">ASC</MenuItem>
              <MenuItem value="desc">DESC</MenuItem>
            </Select>
          </FormControl>

          <Paper
            elevation={2}
            sx={{ p: 2, mt: 3, borderRadius: 2, backgroundColor: "#e0e0e0" }}
          >
            <Box sx={{ mb: 1, fontWeight: 500 }}>Favorites?</Box>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={favoritesFilter === true}
                    onChange={() => handleFavoritesChange(true)}
                  />
                }
                label="Yes"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={favoritesFilter === false}
                    onChange={() => handleFavoritesChange(false)}
                  />
                }
                label="No"
              />
            </FormGroup>
          </Paper>
        </Box>

        <Box
          sx={{
            position: "relative",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: 2,
          }}
        >
          {/* Floating Add Button */}
          <Fab
            sx={{
              position: "absolute",
              top: -12,
              right: 5,
              backgroundColor: "#445591",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#2e3d5c",
              },
            }}
            size="large"
            onClick={() => router.push("/createRecipe")}
          >
            <AddIcon />
          </Fab>

          {/* Recipe Cards or Fallback */}
          {filteredAndSorted.length > 0 ? (
            filteredAndSorted.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                id={recipe.id}
                image={`/images/${recipe.image}`}
                title={recipe.title}
                description={recipe.description}
                instructions={recipe.instructions}
                addedBy={recipe.name}
                date={recipe.dateAdded}
                isFavorite={recipe.isFavorite}
                onToggleFavorite={() => handleToggleFavorite(recipe.id)}
              />
            ))
          ) : (
            <Box
              sx={{
                backgroundColor: "#fff",
                p: 8,
                borderRadius: 2,
                boxShadow: 2,
                textAlign: "center",
                flex: 1,
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                No Record Found!
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Header;
