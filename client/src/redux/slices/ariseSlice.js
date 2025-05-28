  // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
  // import logo from "../../assets/img/Arise-logo.webp";
  // import axios from "axios";

  // // // Fetch blog posts from backend
  // // export const getAllBlogs = createAsyncThunk("arise/getAllBlogs", async (_, { rejectWithValue }) => {
  // //   try {
  // //     const response = await axios.get("http://localhost:3030/blog/all");
  // //     return response.data;
  // //   } catch (error) {
  // //     console.error("Error fetching blogs:", error.response || error);
  // //     return rejectWithValue(error.response?.data?.message || "Failed to fetch blogs");
  // //   }
  // // });

  // // Fetch mega menu from backend
  // export const getMegaMenu = createAsyncThunk(
  //   "arise/getMegaMenu",
  //   async (_, { rejectWithValue }) => {
  //     try {
  //       const response = await axios.get("http://localhost:3030/mega-menu/all");
  //       return response.data;
  //     } catch (error) {
  //       console.error("Error fetching mega menu:", error.response || error);
  //       return rejectWithValue(error.response?.data?.message || "Failed to fetch mega menu");
  //     }
  //   }
  // );

  // // Add a new category to mega menu
  // export const addMegaMenu = createAsyncThunk(
  //   "arise/addMegaMenu",
  //   async (category, { rejectWithValue }) => {
  //     try {
  //       const response = await axios.post("http://localhost:3030/mega-menu/add", { category });
  //       return response.data;
  //     } catch (error) {
  //       console.error("Error adding mega menu:", error.response || error);
  //       return rejectWithValue(error.response?.data?.message || "Failed to add mega menu");
  //     }
  //   }
  // );

  // // Update mega menu
  // export const updateMegaMenu = createAsyncThunk(
  //   "arise/updateMegaMenu",
  //   async ({ categories, catIndex, itemIndex }, { rejectWithValue }) => {
  //     try {
  //       const response = await axios.post("http://localhost:3030/mega-menu/update", {
  //         categories,
  //         catIndex,
  //         itemIndex,
  //       });
  //       return response.data;
  //     } catch (error) {
  //       console.error("Error updating mega menu:", error.response || error);
  //       return rejectWithValue(error.response?.data?.message || "Failed to fetch mega menu");
  //     }
  //   }
  // );

  // const initialState = {
  //   logo,
  //   menuItems: [
  //     { name: "Home", path: "/" },
  //     { name: "Blog", path: "/blogUs" },
  //     { megaMenu: [] },
  //     { name: "Contact Us", path: "/contactUs" },
  //   ],
  //   teamMembers: [
  //     {
  //       id: 1,
  //       name: "Full Name",
  //       role: "Message Physio Therapist",
  //       image: "img/team-1.jpg",
  //       delay: "0.1s",
  //     },
  //     {
  //       id: 2,
  //       name: "Full Name",
  //       role: "Rehabilitation Therapist",
  //       image: "img/team-2.jpg",
  //       delay: "0.3s",
  //     },
  //     {
  //       id: 3,
  //       name: "Full Name",
  //       role: "Doctor of Physical Therapy",
  //       image: "img/team-3.jpg",
  //       delay: "0.5s",
  //     },
  //     {
  //       id: 4,
  //       name: "Full Name",
  //       role: "Doctor of Physical Therapy",
  //       image: "img/team-4.jpg",
  //       delay: "0.7s",
  //     },
  //   ],
  //   blogPosts: [],
  //   megaMenuStatus: "idle",
  //   megaMenuError: null,
  // };

  // const ariseSlice = createSlice({
  //   name: "arise",
  //   initialState,
  //   reducers: {
  //     setLogo: (state, action) => {
  //       state.logo = action.payload;
  //     },
  //     addMenuItem: (state, action) => {
  //       state.menuItems.push(action.payload);
  //     },
  //     removeMenuItem: (state, action) => {
  //       state.menuItems = state.menuItems.filter((item) => item.name !== action.payload);
  //     },
  //     updateMenuItem: (state, action) => {
  //       const { oldName, newItem } = action.payload;
  //       const index = state.menuItems.findIndex((item) => item.name === oldName);
  //       if (index !== -1) {
  //         state.menuItems[index] = newItem;
  //       }
  //     },
  //     updateFormData: (state, action) => {
  //       state.formData = { ...state.formData, ...action.payload };
  //     },
  //   },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(getAllBlogs.pending, (state) => {
  //         state.blogStatus = "loading";
  //       })
  //       .addCase(getAllBlogs.fulfilled, (state, action) => {
  //         state.blogStatus = "succeeded";
  //         state.blogPosts = action.payload;
  //       })
  //       .addCase(getAllBlogs.rejected, (state, action) => {
  //         state.blogStatus = "failed";
  //         state.blogError = action.payload;
  //       })
  //       .addCase(getMegaMenu.pending, (state) => {
  //         state.megaMenuStatus = "loading";
  //         state.megaMenuError = null;
  //       })
  //       .addCase(getMegaMenu.fulfilled, (state, action) => {
  //         state.megaMenuStatus = "succeeded";
  //         const megaMenuIndex = state.menuItems.findIndex((item) => item.megaMenu);
  //         if (megaMenuIndex !== -1) {
  //           state.menuItems[megaMenuIndex].megaMenu = action.payload;
  //         } else {
  //           state.menuItems.push({ megaMenu: action.payload });
  //         }
  //       })
  //       .addCase(getMegaMenu.rejected, (state, action) => {
  //         state.megaMenuStatus = "failed";
  //         state.megaMenuError = action.payload;
  //       })
  //       .addCase(addMegaMenu.pending, (state) => {
  //         state.megaMenuStatus = "loading";
  //         state.megaMenuError = null;
  //       })
  //       .addCase(addMegaMenu.fulfilled, (state, action) => {
  //         state.megaMenuStatus = "succeeded";
  //         const megaMenuIndex = state.menuItems.findIndex((item) => item.megaMenu);
  //         if (megaMenuIndex !== -1) {
  //           state.menuItems[megaMenuIndex].megaMenu = action.payload;
  //         } else {
  //           state.menuItems.push({ megaMenu: action.payload });
  //         }
  //       })
  //       .addCase(addMegaMenu.rejected, (state, action) => {
  //         state.megaMenuStatus = "failed";
  //         state.megaMenuError = action.payload;
  //       })
  //       .addCase(updateMegaMenu.pending, (state) => {
  //         state.megaMenuStatus = "loading";
  //         state.megaMenuError = null;
  //       })
  //       .addCase(updateMegaMenu.fulfilled, (state, action) => {
  //         state.megaMenuStatus = "succeeded";
  //         const megaMenuIndex = state.menuItems.findIndex((item) => item.megaMenu);
  //         if (megaMenuIndex !== -1) {
  //           state.menuItems[megaMenuIndex].megaMenu = action.payload;
  //         } else {
  //           state.menuItems.push({ megaMenu: action.payload });
  //         }
  //       })
  //       .addCase(updateMegaMenu.rejected, (state, action) => {
  //         state.megaMenuStatus = "failed";
  //         state.megaMenuError = action.payload;
  //       });
  //   },
  // });

  // export const {
  //   setLogo,
  //   addMenuItem,
  //   removeMenuItem,
  //   updateMenuItem,
  //   updateFormData,
  // } = ariseSlice.actions;

  // export default ariseSlice.reducer;


  import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import logo from "../../assets/img/Arise-logo.webp";
import axios from "axios";

// Fetch mega menu from backend
export const getMegaMenu = createAsyncThunk(
  "arise/getMegaMenu",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3030/mega-menu/all");
      return response.data;
    } catch (error) {
      console.error("Error fetching mega menu:", error.response || error);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch mega menu");
    }
  }
);

// Add a new category to mega menu
export const addMegaMenu = createAsyncThunk(
  "arise/addMegaMenu",
  async (category, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3030/mega-menu/add", { category });
      return response.data;
    } catch (error) {
      console.error("Error adding mega menu:", error.response || error);
      return rejectWithValue(error.response?.data?.message || "Failed to add mega menu");
    }
  }
);

// Update mega menu
export const updateMegaMenu = createAsyncThunk(
  "arise/updateMegaMenu",
  async ({ categories, catIndex, itemIndex }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3030/mega-menu/update", {
        categories,
        catIndex,
        itemIndex,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating mega menu:", error.response || error);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch mega menu");
    }
  }
);

const initialState = {
  logo,
  menuItems: [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blogUs" },
    { megaMenu: [] },
    { name: "Contact Us", path: "/contactUs" },
  ],
  teamMembers: [
    {
      id: 1,
      name: "Full Name",
      role: "Message Physio Therapist",
      image: "img/team-1.jpg",
      delay: "0.1s",
    },
    {
      id: 2,
      name: "Full Name",
      role: "Rehabilitation Therapist",
      image: "img/team-2.jpg",
      delay: "0.3s",
    },
    {
      id: 3,
      name: "Full Name",
      role: "Doctor of Physical Therapy",
      image: "img/team-3.jpg",
      delay: "0.5s",
    },
    {
      id: 4,
      name: "Full Name",
      role: "Doctor of Physical Therapy",
      image: "img/team-4.jpg",
      delay: "0.7s",
    },
  ],
  megaMenuStatus: "idle",
  megaMenuError: null,
};

const ariseSlice = createSlice({
  name: "arise",
  initialState,
  reducers: {
    setLogo: (state, action) => {
      state.logo = action.payload;
    },
    addMenuItem: (state, action) => {
      state.menuItems.push(action.payload);
    },
    removeMenuItem: (state, action) => {
      state.menuItems = state.menuItems.filter((item) => item.name !== action.payload);
    },
    updateMenuItem: (state, action) => {
      const { oldName, newItem } = action.payload;
      const index = state.menuItems.findIndex((item) => item.name === oldName);
      if (index !== -1) {
        state.menuItems[index] = newItem;
      }
    },
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMegaMenu.pending, (state) => {
        state.megaMenuStatus = "loading";
        state.megaMenuError = null;
      })
      .addCase(getMegaMenu.fulfilled, (state, action) => {
        state.megaMenuStatus = "succeeded";
        const megaMenuIndex = state.menuItems.findIndex((item) => item.megaMenu);
        if (megaMenuIndex !== -1) {
          state.menuItems[megaMenuIndex].megaMenu = action.payload;
        } else {
          state.menuItems.push({ megaMenu: action.payload });
        }
      })
      .addCase(getMegaMenu.rejected, (state, action) => {
        state.megaMenuStatus = "failed";
        state.megaMenuError = action.payload;
      })
      .addCase(addMegaMenu.pending, (state) => {
        state.megaMenuStatus = "loading";
        state.megaMenuError = null;
      })
      .addCase(addMegaMenu.fulfilled, (state, action) => {
        state.megaMenuStatus = "succeeded";
        const megaMenuIndex = state.menuItems.findIndex((item) => item.megaMenu);
        if (megaMenuIndex !== -1) {
          state.menuItems[megaMenuIndex].megaMenu = action.payload;
        } else {
          state.menuItems.push({ megaMenu: action.payload });
        }
      })
      .addCase(addMegaMenu.rejected, (state, action) => {
        state.megaMenuStatus = "failed";
        state.megaMenuError = action.payload;
      })
      .addCase(updateMegaMenu.pending, (state) => {
        state.megaMenuStatus = "loading";
        state.megaMenuError = null;
      })
      .addCase(updateMegaMenu.fulfilled, (state, action) => {
        state.megaMenuStatus = "succeeded";
        const megaMenuIndex = state.menuItems.findIndex((item) => item.megaMenu);
        if (megaMenuIndex !== -1) {
          state.menuItems[megaMenuIndex].megaMenu = action.payload;
        } else {
          state.menuItems.push({ megaMenu: action.payload });
        }
      })
      .addCase(updateMegaMenu.rejected, (state, action) => {
        state.megaMenuStatus = "failed";
        state.megaMenuError = action.payload;
      });
  },
});

export const {
  setLogo,
  addMenuItem,
  removeMenuItem,
  updateMenuItem,
  updateFormData,
} = ariseSlice.actions;

export default ariseSlice.reducer;
