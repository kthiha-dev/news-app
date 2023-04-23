import React, { useState, useMemo } from "react";
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Grid,
  Container,
  Select,
  TextField,
} from "@mui/material";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useIsSmallScreen } from "../../helpers/Helper";
import _ from "lodash";
const CATEGORIES = [
  "Business",
  "Entertainment",
  "General",
  "Politic",
  "Health",
  "Sience",
  "Sports",
  "Technology",
];
const Filters = ({ sources, userSelectedCategory }) => {
  const [newSouce, setNewSouce] = useState(
    _.get(
      _.find(sources, (source) => {
        if (source.isPrefer) return source;
      }),
      "name"
    )
  );

  const [category, setCategory] = useState(userSelectedCategory);

  const [value, onChange] = useState(new Date());

  const isMobile = useIsSmallScreen();
  const handleSourceChange = (e) => {
    setNewSouce(e.target.value);
  };

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <Container sx={{ marginLeft: 1 }}>
      <Grid
        container
        rowSpacing={5}
        columnSpacing={{ xs: 2, sm: 2, md: 3 }}
        sx={{ marginTop: 1 }}
      >
        <Grid item md={4} xs={12} sm={12}>
          <Box>
            <FormControl sx={{ mt: 1, minWidth: "100%" }}>
              <InputLabel id="label-source">Source</InputLabel>
              <Select
                labelId="label-source"
                id="label-source"
                value={newSouce}
                label="Source"
                onChange={handleSourceChange}
              >
                {_.map(sources, (source) => {
                  return (
                    <MenuItem value={source.name}>{source.alias}</MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item md={4} xs={12} sm={12}>
          <Box>
            <FormControl
              sx={{
                mt: 1,
                marginLeft: !isMobile ? 2.5 : "none",
                minWidth: "100%",
              }}
            >
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="label-category"
                id="label-category"
                value={category}
                label="Category"
                onChange={handleChange}
              >
                {_.map(CATEGORIES, (category, index) => {
                  return <MenuItem value={index}>{category}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid item md={4} xs={12} sm={12}>
          <Box>
            <FormControl
              sx={{ marginLeft: isMobile ? "none" : 5, minWidth: "100%" }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DesktopDatePicker
                    id="label-date"
                    label="MM/DD/YYYY"
                    renderInput={(params) => <TextField {...params} />}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Filters;
