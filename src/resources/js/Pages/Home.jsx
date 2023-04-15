import React from "react";
import Guest from "../Layouts/Guest";

import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import _ from "lodash";
export default function Home({ news }) {
  console.log(news);
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {_.map(news.sources, (data) => {
        return (
          <>
            <ListItem alignItems="flex-start" key={data.id}>
              <ListItemText
                primary={data.name}
                secondary={
                  <>
                    {data.description}
                    <br />
                    <Chip label={data.category}></Chip>
                  </>
                }
              />
            </ListItem>
            <Divider variant="middle" component="li" />
          </>
        );
      })}
    </List>
    // <>
    //   <div className="container">
    //     <div className="card">
    //       <div className="card-body">Your home page</div>
    //     </div>
    //   </div>
    // </>
  );
}

Home.layout = (page) => <Guest children={page} title={"Home"} />;
