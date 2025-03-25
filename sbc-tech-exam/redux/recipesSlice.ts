import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface Recipe {
    id: string;
    name: string;
    email: string;
    title: string;
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
    console.log('RES', data)
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
    },
    //for create asyncthunk
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipes.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRecipes.fulfilled, (state, action: PayloadAction<Recipe[]>) => {
                console.log('PAYLOAD', action.payload)
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(fetchRecipes.rejected, (state, action) => {
                state.loading = false;
                state.error = 'Failed to fetch recipes';
            })
    }
})

export const { toggleFavorite } = recipesSlice.actions;
export default recipesSlice.reducer;