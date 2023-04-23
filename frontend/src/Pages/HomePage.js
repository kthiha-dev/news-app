import React, { useEffect, useMemo, useState } from "react";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Pagination,
  Typography,
  Box,
  Stack,
  CircularProgress,
  Chip,
  InputLabel,
  MenuItem,
  FormControl,
  Grid,
  Select,
  TextField,
} from "@mui/material";
import { useIsSmallScreen } from "../helpers/Helper";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import Contents from "./Components/Contents";
import Copyright from "./Components/Copyright";

import axios from "axios";
import _ from "lodash";

import { useHistory, useParams } from "react-router-dom";
import { useLocQuery } from "../helpers/Helper";
const DETAULT_PAGE_SIZE = 10;
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

// require to handle page number on page refresh
// mobile responsive design
// Read more
// save preference

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  //const [categoryValue] = useLocQuery() || "";
  const isLogIn = localStorage.getItem("isLoggedIn");
  const [defaultPreferences, setDefaultPreferences] = useState({});
  const [articles, setArticles] = useState({});
  const [searchParams, setSearchParams] = useState("politic");
  const isMobile = useIsSmallScreen();
  const history = useHistory();
  const parm = useLocQuery();

  const [page, setPage] = useState(1);
  const [newSouce, setNewSouce] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/get_app_data`)
      .then((res) => {
        setDefaultPreferences(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useMemo(() => {
    if (_.isEmpty(defaultPreferences)) return;
    setLoading(true);
    const preference = _.find(
      defaultPreferences.preferences.sources,
      (source) => {
        if (source.isPrefer) return source;
      }
    );

    setNewSouce(_.get(preference, "name"));

    axios
      .get(
        `${preference.url}/everything?q=${searchParams}&pageSize=${DETAULT_PAGE_SIZE}&page=${page}&apiKey=${preference.apiKey}`
      )
      .then((res) => {
        setLoading(false);
        if (res.status === 200) setArticles(res.data);
      })
      .catch((err) => {
        // handle error
        setLoading(false);
        console.log(err);
      });
  }, [defaultPreferences, searchParams, page]);

  const handleClick = (e, number) => {
    setPage(number);
  };

  const [category, setCategory] = useState(null);
  const handleSourceChange = (e) => {
    setNewSouce(e.target.value);
  };

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    const params = new URLSearchParams();
    if (category) {
      params.append("name", category);
    } else {
      params.delete("name");
    }
    history.push({ search: params.toString(), _keep: true });
  }, [category, history]);

  return (
    <Contents>
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
                {_.map(defaultPreferences?.preferences?.sources, (source) => {
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
      {loading ? (
        <>
          <Box sx={{ justifyContent: "center", textAlign: "center" }}>
            <CircularProgress />
            <Typography>Fetching....</Typography>
          </Box>
        </>
      ) : (
        <>
          {/* <Filters
            sources={defaultPreferences.preferences?.sources}
            userSelectedCategory={null}
          /> */}
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {_.map(articles.articles, (article) => {
              return (
                <>
                  <ListItem
                    alignItems="flex-start"
                    key={`${article.source.name}-${article.author}`}
                  >
                    {!isMobile && (
                      <ListItemAvatar>
                        <Avatar
                          alt={article.author}
                          src={article.urlToImage}
                          sx={{ width: 150, height: 150, borderRadius: 2 }}
                          variant="square"
                        />
                      </ListItemAvatar>
                    )}
                    <ListItemText
                      sx={{ marginLeft: isMobile ? "none" : 2 }}
                      primary={article.title}
                      secondary={
                        <>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="caption"
                            color="text.primary"
                            display="block"
                          >
                            Author - {article.author}
                          </Typography>
                          <Typography
                            sx={{ display: "inline", marginLeft: 0.2 }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {article.description}
                          </Typography>
                          <Box sx={{ marginTop: 0.5 }}>
                            {article.author && <Chip label={article.author} />}
                          </Box>
                        </>
                      }
                    />
                  </ListItem>
                  <Divider
                    variant="middle"
                    component="li"
                    key={`${article.source.name}-${article.author}`}
                  />
                </>
              );
            })}
          </List>
        </>
      )}
      <Stack alignItems="center">
        <Pagination
          count={articles.totalResults}
          color="primary"
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={(e, n) => handleClick(e, n)}
        />
      </Stack>
      <Copyright />
    </Contents>
  );
};

export default HomePage;
