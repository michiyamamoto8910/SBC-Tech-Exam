// components/Header.tsx
import { AppBar, Toolbar, TextField, InputAdornment, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

const Header = () => {
  const [search, setSearch] = useState("");

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
    </>
  );
};

export default Header;
