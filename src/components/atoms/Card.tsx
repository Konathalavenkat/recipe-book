import React from "react";
import {
  Card as MuiCard,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

interface CardProps {
  imageUrl: string;
  title: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ imageUrl, title, children, onClick }) => {
  return (
    <MuiCard sx={{ display: "flex", flexDirection: "column" }} onClick={onClick}>
      <CardMedia component="img" height="300" image={imageUrl} alt={title} sx={{ objectFit: "cover", height: "300px" }} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
      </CardContent>
    </MuiCard>
  );
};

export default Card;
