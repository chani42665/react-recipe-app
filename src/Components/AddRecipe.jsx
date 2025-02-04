import { Box, Button, Container, CssBaseline, Input, Typography, Grid } from "@mui/material";
import Textarea from '@mui/joy/Textarea';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRecipe } from "../Store/RecipeSlice";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useForm } from "react-hook-form";









const inputStyles = {
  border: "1px solid #CF885B",
  backgroundColor: "black",
  color: "#b47904",
  "& .MuiInputBase-input": {
    color: "#A9A9A9",
  },
  "&::placeholder": {
    color: "#A9A9A9",
  },
  "&:focus": {
    outline: "none", // ביטול קו הפוקוס
    boxShadow: "none", // ביטול הצללים
  },
  "& .MuiOutlinedInput-root.Mui-focused": {
    borderColor: "#CF885B", // צבע גבול בזמן פוקוס
    boxShadow: "none", // ביטול הצללים
    outline: "none", // ביטול קו הפוקוס
  },
  "& .MuiInputBase-root": {
    boxShadow: "none", // ביטול הצללים
  },
  "--joy-palette-focusVisible": "#CF885B", // שינוי הצבע של הפוקוס
};











const AddRecipe = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipeSlice.Recipes);
  const nextId = recipes.length + 1;

  const { register, formState: { errors }, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      id: nextId,
      name: "",
      time: "",
      category: "",
      description: "",
      img: null,
      ingredientGroups: []
    },
  });

  const MySwal = withReactContent(Swal);

  const [img, setImg] = useState(null);
  const [ingredientGroups, setIngredientGroups] = useState([]);
  const [groupTitle, setGroupTitle] = useState("");
  const [ingredients, setIngredients] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImg(imageUrl);
    }
  };

  const handleAddIngredientGroup = () => {
    if (!groupTitle.trim() || !ingredients.trim())
      return;

    const newGroup = {
      title: groupTitle,
      ingredientsList: ingredients.split("\n").map(item => item.trim()).filter(item => item !== ""),
    };

    setIngredientGroups([...ingredientGroups, newGroup]);
    setValue("ingredientGroups", [...ingredientGroups, newGroup]);
    setGroupTitle("");
    setIngredients("");
  };

  const onSubmit = (data) => {
    const recipe = {
      id: nextId,
      name: data.name,
      time: data.time,
      ingredients: ingredientGroups,
      description: data.description,
      category: data.category,
      favorite: false,
      img: img || "/Images/default.png",
    };

    dispatch(addRecipe(recipe));

    MySwal.fire({
      icon: "success",
      title: "המתכון נוסף בהצלחה!",
      showConfirmButton: false,
      timer: 1500
    });

    reset();
    setIngredientGroups([]);
    setGroupTitle("");
    setIngredients("");
    setImg(null);
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{ backgroundColor: "#1a1a1a", borderRadius: "10px", p: 4 }}>
        <Grid container>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid item>
              <Typography variant="h5" color="#CF885B" align="center" gutterBottom>הוספת מתכון</Typography>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Input {...register("name", { required: "שם המתכון הוא שדה חובה" })} placeholder="שם המתכון" sx={{ ...inputStyles, outline: 'none' }} fullWidth />
                {errors.name && <Typography sx={{ color: "#CF885B" }}>שדה זה חובה</Typography>}
              </Grid>

              <Grid item xs={12}>
                <Input {...register("time", { required: "שדה חובה" })} placeholder="זמן הכנה" sx={inputStyles} fullWidth />
                {errors.time && <Typography sx={{ color: "#CF885B" }}>שדה זה חובה</Typography>}
              </Grid>

              <Grid item xs={12}>
                <Select {...register("category", { required: "יש לבחור קטגוריה" })} placeholder="בחר קטגוריה" indicator={<KeyboardArrowDown />} sx={inputStyles} fullWidth>
                  <Option value="חלבי">חלבי</Option>
                  <Option value="פרווה">פרווה</Option>
                </Select>
                {errors.category && <Typography sx={{ color: "#CF885B" }}>יש לבחור קטגוריה</Typography>}
              </Grid>

              <Grid item xs={12}>
                <Input placeholder="כותרת קבוצת רכיבים" value={groupTitle} onChange={(e) => setGroupTitle(e.target.value)} sx={inputStyles} fullWidth />
              </Grid>
              <Grid item xs={12}>
                <Textarea minRows={2} placeholder="רשימת רכיבים (שורה לכל רכיב)" value={ingredients} onChange={(e) => setIngredients(e.target.value)} sx={
                  inputStyles
                } fullWidth />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" sx={{ backgroundColor: '#b47904', color: 'black' }} onClick={handleAddIngredientGroup}>
                  הוסף קבוצה של רכיבים
                </Button>
              </Grid>

              {ingredientGroups.length > 0 && (
                <Grid item xs={12}>
                  <Typography color="#b47904">קבוצות רכיבים שנוספו:</Typography>
                  {ingredientGroups.map((group, index) => (
                    <Box key={index} sx={{ mt: 1, p: 1, border: "1px solid #b47904", borderRadius: "5px" }}>
                      <Typography color="#b47904">{group.title}</Typography>
                      <ul>
                        {group.ingredientsList.map((item, i) => (
                          <li key={i} style={{ color: "#A9A9A9" }}>{item}</li>
                        ))}
                      </ul>
                    </Box>
                  ))}
                </Grid>
              )}

              {/* אופן הכנה */}
              <Grid item xs={12}>
                <Textarea
                  {...register("description", { required: "שדה חובה" })}
                  minRows={3}
                  placeholder="אופן הכנה"
                  sx={
                    inputStyles
                  }
                  fullWidth
                />











                {errors.description && <Typography sx={{ color: "#CF885B" }}>שדה זה חובה</Typography>}
              </Grid>

              {/* העלאת תמונה */}
              <Grid item xs={12}>
                <Input type="file" accept="image/*" onChange={handleImageUpload} sx={inputStyles} fullWidth />
                {img && <Box sx={{ mt: 2 }}><img src={img} alt="Uploaded Preview" style={{ maxWidth: "200px" }} /></Box>}
              </Grid>

              <Grid item xs={12}>
                <Button variant="contained" type="submit" sx={{ backgroundColor: '#b47904', color: 'black' }}>
                  הוסף מתכון
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Container>
    </>
  );
};

export default AddRecipe;
