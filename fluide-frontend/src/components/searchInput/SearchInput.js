import { useState } from "react";

import {
  Box,
  FormHelperText,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { style } from "./style";

const SearchInput = ({ value, onChange, onKeyDown, error ,placeholder,styling}) => {
  return (
    <TextField
      required
      sx={styling ? style.styling: style.textfield}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
   
  );
};

export default SearchInput;
