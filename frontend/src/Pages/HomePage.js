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
} from "@mui/material";
import Contents from "./Components/Contents";
import Copyright from "./Components/Copyright";
import axios from "axios";
import _ from "lodash";

const DETAULT_PAGE_SIZE = 10;

// require to handle page number on page refresh
// mobile responsive design
// Read more
// save preference

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [defaultPreferences, setDefaultPreferences] = useState({});
  const [articles, setArticles] = useState({});
  const [searchParam, setSearchParam] = useState("bitcoin");
  //const [pageSize, setPageSize] = useState(DETAULT_PAGE_SIZE);
  const [page, setPage] = useState(1);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/get_app_data")
      .then((res) => {
        // handle success
        setDefaultPreferences(res.data);
      })
      .catch((err) => {
        // handle error
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

    axios
      .get(
        `${preference.url}/everything?q=${searchParam}&pageSize=${DETAULT_PAGE_SIZE}&page=${page}&apiKey=${preference.apiKey}`
      )
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        if (res.status === 200) setArticles(res.data);
      })
      .catch((err) => {
        // handle error
        setLoading(false);
        console.log(err);
      });
  }, [defaultPreferences, searchParam, page]);

  const handleClick = (e, number) => {
    setPage(number);
  };
  return (
    <Contents>
      {loading ? (
        <>
          <Box sx={{ justifyContent: "center", textAlign: "center" }}>
            <CircularProgress />
            <Typography>Fetching....</Typography>
          </Box>
        </>
      ) : (
        <>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {_.map(articles.articles, (article) => {
              return (
                <>
                  <ListItem
                    alignItems="flex-start"
                    key={`${article.author}-${article.source.name}`}
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt={article.author}
                        src={article.urlToImage}
                        sx={{ width: 150, height: 150, borderRadius: 2 }}
                        variant="square"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      sx={{ marginLeft: 2 }}
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

                  <Divider variant="middle" component="li" />
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
