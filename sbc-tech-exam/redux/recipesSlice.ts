import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface Recipe {
    id: string;
    name: string;
    email: string;
    title: string;
    description: string;
    instructions: string;
    image: string;
    dateAdded: string;
    isFavorite: string;
}

interface RecipesState {
    list: Recipe[];
    loading: boolean;
    error: string | null;
}

const initialState: RecipesState = {
    list: [],
    loading: false,
    error: null
}

export const fetchRecipes = createAsyncThunk('recipes/fetch', async () => {
    const res = await fetch('/recipes.json');
    const data = await res.json();
    return data
})

const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            const recipe = state.list.find((r) => r.id === id);
            if (recipe) {
                recipe.isFavorite = !recipe.isFavorite;
            }
        },
        addRecipe: (state, action: PayloadAction<Recipe>) => {
            console.log('action.payload', action.payload)
            state.list.unshift(action.payload);
          },
          updateRecipe: (state, action: PayloadAction<Recipe>) => {
            const index = state.list.findIndex((r) => r.id === action.payload.id);
            if (index !== -1) {
              state.list[index] = action.payload;
            }
          },
          deleteRecipe: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter((r) => r.id !== action.payload);
          },
    },
    //for create asyncthunk
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRecipes.fulfilled, (state, action: PayloadAction<Recipe[]>) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(fetchRecipes.rejected, (state, action) => {
                state.loading = false;
                state.error = 'Failed to fetch recipes';
            })
    }
})

export const { toggleFavorite, addRecipe, updateRecipe, deleteRecipe   } = recipesSlice.actions;
export default recipesSlice.reducer;