import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import JobPost  from '../types/JobPost';

interface BookmarkState {
  bookmarks: {id: string}[];
}

const initialState: BookmarkState = {
  bookmarks: [],
};

const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    addBookmark: (state, action: PayloadAction<{id: string}>) => {
      state.bookmarks.push(action.payload);
    },
    removeBookmark: (state, action: PayloadAction<string>) => {
      state.bookmarks = state.bookmarks.filter(bookmark => bookmark.id !== action.payload);
    },
    setBookmarks: (state, action: PayloadAction<{id: string}[]>) => {
      state.bookmarks = action.payload;
    },
  },
});

export const { addBookmark, removeBookmark, setBookmarks } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
