import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUSES } from "../../Constants";
import { toast } from "../utils/toast";

const initialState = {
  entity: { id: null },
  stats: null,
  success: null,
  status: STATUSES.IDLE,
  error: null,
  searchEntityResults: [],
};

const backendURL = import.meta.env.VITE_API_GATEWAY_URL;
const getURL = (route) => new URL(route, backendURL).toString();

const name = "home";

const fetchHomeDoc = createAsyncThunk(
  `${name}/fetch/HomeDoc`,
  async ({ id, pageType }, { rejectWithValue }) => {
    try {
      const pageTypeParam = pageType ? `${pageType}/` : "";
      const url = getURL(`api/HomeDocs/typed/${pageTypeParam}${id}`);

      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const fetchHomeDocStats = createAsyncThunk(
  `${name}/stats/HomeDoc`,
  async ({ interiorEntityKey }, { rejectWithValue }) => {
    try {
      const url = getURL(
        `api/HomeDocs/stats?${
          interiorEntityKey ? `interiorEntityKey=${interiorEntityKey}` : ""
        }`
      );

      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const searchHomeDocs = createAsyncThunk(
  `${name}/fetch/HomeDocs`,
  async ({ query }, { rejectWithValue }) => {
    try {
      const url = getURL(`api/HomeDocs${query}`);
      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const updateCurrentHomeDoc = createAsyncThunk(
  `${name}/update/HomeDoc`,
  async ({ id, pageType, HomeDocData }, { rejectWithValue }) => {
    try {
      const url = getURL(`api/HomeDocs/typed/${pageType}/${id}`);

      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(HomeDocData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const createHomeDoc = createAsyncThunk(
  `${name}/create/HomeDoc`,
  async (newHomeDoc, { rejectWithValue }) => {
    try {
      const url = getURL(`api/HomeDocs`);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newHomeDoc),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const createSubHomeDoc = createAsyncThunk(
  `${name}/create/subHomeDoc`,
  async ({ fatherId, subHomeDocInfo }, { rejectWithValue }) => {
    try {
      const url = getURL(`api/HomeDocs/HomeDoc/${fatherId}/subHomeDoc`);

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subHomeDocInfo),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const deleteHomeDoc = createAsyncThunk(
  `${name}/delete/HomeDoc`,
  async ({ id }, { rejectWithValue }) => {
    try {
      const url = getURL(`api/HomeDocs/${id}`);

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const homeDocSlice = createSlice({
  name: name,
  initialState: initialState,
  reducers: {
    clearSucces: (state) => {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchHomeDocs.pending, (state) => {
        state.error = null;
        state.status = STATUSES.PENDING;
      })
      .addCase(searchHomeDocs.fulfilled, (state, action) => {
        state.searchEntityResults =
          action.payload.data.homeDocs == null
            ? []
            : action.payload.data.homeDocs;
        state.entity = initialState.entity;
        state.status = STATUSES.FULFILLED;
      })
      .addCase(searchHomeDocs.rejected, (state, action) => {
        state.error = action.payload;
        state.status = STATUSES.PENDING;
      })
      .addCase(fetchHomeDoc.pending, (state) => {
        state.error = null;
        state.success = null;
        state.status = STATUSES.PENDING;
      })
      .addCase(fetchHomeDoc.fulfilled, (state, action) => {
        state.entity =
          action.payload.data.homeDoc == null
            ? initialState.entity
            : action.payload.data.homeDoc;
        state.status = STATUSES.FULFILLED;
      })
      .addCase(fetchHomeDoc.rejected, (state, action) => {
        state.error = action.payload;
        state.status = STATUSES.PENDING;
      })
      .addCase(fetchHomeDocStats.pending, (state) => {
        state.error = null;
        state.success = null;
        state.status = STATUSES.PENDING;
      })
      .addCase(fetchHomeDocStats.fulfilled, (state, action) => {
        state.stats =
          action.payload.data.stats == null ? null : action.payload.data.stats;
        state.status = STATUSES.FULFILLED;
        state.success = null;
      })
      .addCase(fetchHomeDocStats.rejected, (state, action) => {
        state.error = action.payload;
        state.status = STATUSES.PENDING;
      })
      .addCase(createHomeDoc.pending, (state) => {
        state.error = null;
        state.success = null;
        state.status = STATUSES.PENDING;
      })
      .addCase(createHomeDoc.fulfilled, (state, action) => {
        const newTotalCount = 1 * state.stats.totalCount + 1;
        const newStats = {
          ...state.stats,
          totalCount: newTotalCount,
          categoryStats: state.stats.categoryStats.map((item) => {
            if (item.category === action.payload.data.HomeDoc.category) {
              return { ...item, countHomes: item.countHomes + 1 };
            }
            return item;
          }),
        };

        state.searchEntityResults = [
          ...action.payload.data.HomeDoc,
          ...state.searchEntityResults,
        ];
        state.stats = newStats;
        state.success = true;
        state.status = STATUSES.FULFILLED;
        toast(" נוצר בהצלחה! ", "success");
      })
      .addCase(createHomeDoc.rejected, (state, action) => {
        state.error = action.payload;
        state.success = false;
        state.status = STATUSES.PENDING;
        toast(" יצירה נכשלה! ", "error");
      })
      .addCase(updateCurrentHomeDoc.pending, (state) => {
        state.error = null;
        state.success = null;
        state.status = STATUSES.PENDING;
      })
      .addCase(updateCurrentHomeDoc.fulfilled, (state, action) => {
        state.entity = {
          ...state.entity,
          ...action.payload.data.updatedHomeDoc,
        };

        state.success = true;
        state.status = STATUSES.FULFILLED;
        toast(" עודכן בהצלחה! ", "success");
      })
      .addCase(updateCurrentHomeDoc.rejected, (state, action) => {
        state.error = action.payload;
        state.success = false;
        state.status = STATUSES.REJECTED;
        toast(" עדכון נכשל! ", "success");
      })
      .addCase(createSubHomeDoc.pending, (state) => {
        state.error = null;
        state.success = null;
        state.status = STATUSES.PENDING;
      })
      .addCase(createSubHomeDoc.fulfilled, (state, action) => {
        state.entity.subEntities = [
          ...state.entity.subEntities,
          {
            id: action.payload.data.newHomeDocRelation.subHomeDocId,
            interiorEntityKey: action.payload.data.newHomeDoc.interiorEntityKey,
            type: action.payload.data.newHomeDoc.type,
          },
        ];

        state.success = true;
        state.status = STATUSES.FULFILLED;
        toast(" נוצר בהצלחה! ", "success");
      })
      .addCase(createSubHomeDoc.rejected, (state, action) => {
        state.error = action.payload;
        state.success = false;
        state.status = STATUSES.REJECTED;
        toast(" יצירה נכשלה! ", "error");
      })
      .addCase(deleteHomeDoc.pending, (state) => {
        state.error = null;
        state.success = null;
        state.status = STATUSES.PENDING;
      })
      .addCase(deleteHomeDoc.fulfilled, (state, action) => {
        state.entity = null;
        state.success = true;
        state.status = STATUSES.FULFILLED;
        toast(" מחיקה בהצלחה! ", "success");
      })
      .addCase(deleteHomeDoc.rejected, (state, action) => {
        state.error = action.payload;
        state.success = false;
        state.status = STATUSES.PENDING;
        toast(" מחיקה נכשלה! ", "error");
      });
  },
});

export const selectHomeDoc = (state) => state.home.entity;
export const selectHomeDocStats = (state) => state.home.stats;
export const selectHomeDocResults = (state) => state.home.searchEntityResults;
export const selectHomeDocStatus = (state) => state.home.status;
export const selectHomeDocIsSuccess = (state) => state.home.success;
export const selectHomeDocEntityType = (state) => state.home.entity?.type;
export const selectHomeDocEntityCategory = (state) =>
  state.home.entity?.category;
export const selectHomeDocsubEntities = (state) =>
  state.home.entity?.subEntities;
export const selectHomeDocInteriorEntityKey = (state) =>
  state.home.entity?.interiorEntityKey;

export const { clearSucces } = homeDocSlice.actions;

export default homeDocSlice.reducer;

export {
  searchHomeDocs,
  fetchHomeDoc,
  fetchHomeDocStats,
  updateCurrentHomeDoc,
  createHomeDoc,
  createSubHomeDoc,
  deleteHomeDoc,
};
