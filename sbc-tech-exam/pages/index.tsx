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
import { useState } from "react";

const Header = () => {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [favoritesFilter, setFavoritesFilter] = useState<null | boolean>(null);

  const handleFavoritesChange = (value: boolean) => {
    setFavoritesFilter((prev) => (prev === value ? null : value));
  };

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
    </>
  );
};

export default Header;
