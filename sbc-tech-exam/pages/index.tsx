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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RecipeCard from "@/components/RecipeCard";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite, fetchRecipes } from "@/redux/recipesSlice";
import { AppDispatch } from "@/redux/store";

const Header = () => {
  const recipes = useSelector((state: RootState) => state.recipes.list);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  useEffect(() => {
    console.log("Recipes updated:", recipes);
  }, [recipes]);

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [favoritesFilter, setFavoritesFilter] = useState<null | boolean>(null);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
      if (favoritesFilter === true) return recipe.isFavorite;
      if (favoritesFilter === false) return !recipe.isFavorite;
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") return a.title.localeCompare(b.title);
      if (sortOrder === "desc") return b.title.localeCompare(a.title);
      return 0;
    });
  return (
    <>
      {/*header*/}
      <AppBar position="static" sx={{ backgroundColor: "#445591" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* To push the search to the end of the header*/}
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
                      <SearchIcon />{" "}
                      {/*For the search icon in the search bar */}
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: "flex", padding: 2 }}>
        <Box sx={{ width: 200, p: 2 }}>
          {/* Sort Dropdown */}
          <FormControl fullWidth size="small">
            <InputLabel id="sort-label">Sort by Title</InputLabel>
            <Select
              labelId="sort-label"
              value={sortOrder}
              label="Sort by Title"
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="asc">ASC</MenuItem>
              <MenuItem value="desc">DESC</MenuItem>
            </Select>
          </FormControl>

          {/* Favorites Filter */}
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
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: 2,
            flex: 1,
          }}
        >
          {console.log("FILTERED", filteredAndSorted)}
          {filteredAndSorted.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              image={`/images/${recipe.image}`}
              title={recipe.title}
              description={recipe.instructions}
              addedBy={recipe.name}
              date={recipe.dateAdded}
              isFavorite={recipe.isFavorite}
              onToggleFavorite={() => handleToggleFavorite(recipe.id)}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Header;
