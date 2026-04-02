import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { style } from "./style";

function Dropdown({
  options,
  defaultOption,
  onChange,
  name,
  selectedValue,
  disabledOptions,
}) {
  return (
    <FormControl sx={style.formControl}>
      <InputLabel
        shrink={false}
        sx={{
          width: "100%",
          marginLeft: "-2px",
          "&.Mui-focused": { color: "text.primary" },
        }}
      >
        <Typography
          sx={{
            marginRight: "1.5rem",
          }}
          variant="h6"
        >
          {!selectedValue && defaultOption}
        </Typography>
      </InputLabel>
      <Select
        variant="outlined"
        MenuProps={{
          sx: style.menuProp,
          PaperProps: {
            style: {
              maxHeight: 48 * 4.5 + 8,
              width: 250,
            },
          },
        }}
        sx={style.select}
        value={selectedValue}
        onChange={onChange}
        autoWidth
        label={defaultOption}
        name={name}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            disabled={disabledOptions?.includes(option?.value)}
            value={option.value}
          >
            <Typography variant="h6">{option.label}</Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default Dropdown;
