import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import ButtonComponent from "../button/Button";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import arrowrightup from "../../assets/images/arrowrightup.svg";
import {
  Box,
  CardActions,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { style } from "./style";
import { useMediaQuery } from "../../hook/useMediaQuery";

export default function ReusableCard({
  icon,
  title,
  content,
  buttonText,
  onButtonClick,
  lesson,
  lessonTitleIndex,
  type,
  ...rest
}) {
  const isMobile = useMediaQuery("(max-width: 500px)");
  return (
    <Card
      sx={rest.className ? style.cardSliderRoot : style.root}
      className={rest.className}
      onClick={onButtonClick}
    >
      <Box sx={rest.className || rest.list ? style.cardSlider : style.box}>
        {icon}
        <CardHeader
          title={<Typography variant="h4">{title}</Typography>}
          sx={rest.className ? style.lessonModuleheader : style.header}
        />
      </Box>
      {content && (
        <CardContent sx={{ padding: "5px 16px" }}>
          <Box sx={{ maxHeight: 200, overflowY: "auto", padding: "1rem" }}>
            <Typography variant="h5" sx={style.content}>
              {content}
            </Typography>
          </Box>
        </CardContent>
      )}
      {rest.list && (
        <Box
          sx={{
            maxHeight: "20rem",
            height: "16rem",
            overflowY: "auto",
            position: "relative",
            minWidth: "100%",
            top: "0",
          }}
        >
          <List
            sx={{
              maxWidth: isMobile ? "100%" : 360,
              bgcolor: "background.paper",
              // padding: "1.5rem 20px",
              paddingLeft: { xs: "1px", sm: "20px" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              scrollBehavior: "smooth",
            }}
          >
            {rest.list.map((value) => {
              return (
                <ListItem
                  key={value}
                  onClick={() =>
                    rest.handlerClick(value, lesson, lessonTitleIndex)
                  }
                >
                  <ListItemButton>
                    <ListItemIcon>
                      <ArrowForwardIosIcon />
                    </ListItemIcon>
                    <Typography variant="h5">{value}</Typography>
                    <ListItemText />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      )}
      {(rest.list || content) && (
        <CardActions sx={rest.list ? style.listButton : style.cardAction}>
          <ButtonComponent
            onClick={() => rest.onClick(lesson, lessonTitleIndex)}
          >
            {type ? "View Module" : "View Chapters"}
            {
              <img
                src={arrowrightup}
                alt="arrow"
                style={{ marginLeft: "5px" }}
              />
            }
          </ButtonComponent>
        </CardActions>
      )}
    </Card>
  );
}
