import {
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useRouter } from "next/router";
import { useState } from "react";

interface RecipeCardProps {
  id: number;
  image: string;
  title: string;
  description: string;
  instructions: string;
  addedBy: string;
  date: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  id,
  image,
  title,
  description,  
  instructions,
  addedBy,
  date,
  isFavorite,
  onToggleFavorite,
}) => {
  const router = useRouter();
  const [showFull, setShowFull] = useState(false);

  const toggleShowFull = () => {
    setShowFull((prev) => !prev);
  };

  const truncatedDescription =
    description.length > 100 && !showFull
      ? description.slice(0, 100) + "..."
      : description;

  return (
    <Card
      sx={{
        display: "flex",
        p: 1,
        borderRadius: 2,
        boxShadow: 1,
        mb: 2,
        alignItems: "flex-start",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{ width: 180, height: 120, borderRadius: 2 }}
        />
        <IconButton
          onClick={onToggleFavorite}
          sx={{
            position: "absolute",
            top: 5,
            right: 5,
            color: "gold",
            backgroundColor: "white",
            borderRadius: "50%",
          }}
        >
          {isFavorite ? <StarIcon /> : <StarBorderIcon />}
        </IconButton>
      </Box>

      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {truncatedDescription}
        </Typography>

        {description.length > 100 && (
          <Typography
            variant="body2"
            sx={{ mt: 1, fontWeight: "bold", cursor: "pointer", color: "primary.main" }}
            onClick={toggleShowFull}
          >
            {showFull ? "See less" : "See more"}
          </Typography>
        )}

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Typography variant="body2">Added by: {addedBy}</Typography>
          <Typography variant="body2">Date: {date}</Typography>
        </Box>

        <Box>
          <Button onClick={() => router.push(`/edit/${id}`)}>Edit</Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
