import { Card, CardMedia, CardContent, Typography, Box, IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

interface RecipeCardProps {
  image: string;
  title: string;
  description: string;
  addedBy: string;
  date: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  image,
  title,
  description,
  addedBy,
  date,
  isFavorite,
  onToggleFavorite,
}) => {
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
        {/* Star icon */}
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

      {/* Text */}
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>

        <Typography variant="body2" sx={{ mt: 1, fontWeight: "bold" }}>
          See more
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Typography variant="body2">Added by: {addedBy}</Typography>
          <Typography variant="body2">Date: {date}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
