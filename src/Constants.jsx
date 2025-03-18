export const SYS_NAME = "תיעוד ביתי";
export const BASIC_PAGINATION = `page=1&limit=10`;

export const NAVBAR_LINKS = [
  // { name: "תיעוד ביתי", loc: "/HomeDoc", key: "2" },
  // { name: "סנייק", loc: "/Snake", key: "3" },
  // { name: "צוללות", loc: "/Submarine", key: "4" },
  // { name: "מסך הבית", loc: "/", key: "1" },
];

export const STATUSES = {
  IDLE: "idle",
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};

export const HOME_DOC_CATEGORIES = {
  ONE_STORY_HOUSE: "בית חד קומתי",
  RESIDENTIAL_BUILDING: "בניין מגורים",
  MULTI_STORY_HOUSE: "בית רב קומתי",
};

export const HOME_DOC_RESIDENCE_TYPE = {
  PROPERTY: "בית",
  FLOOR: "קומה",
  APARTMENT: "דירה",
  ROOM: "חדר",
};

export const HOME_DOC_CHATTELS_TYPE = {
  FURNITURE: "רהיט",
  STUFF: "חפץ",
  INSTRUMENT: "מכשיר",
};

export const SUB_HOME_DOC_KEY = {
  FLOOR: "מספר הקומה",
  APARTMENT: "מספר הדירה",
  ROOM: "שם החדר",
  FURNITURE: "שם הרהיט",
  STUFF: "שם החפץ",
  INSTRUMENT: "שם המכשיר",
};

export const SUB_HOME_DOC_LIST = {
  FLOOR: "קומות",
  APARTMENT: "דירות",
  ROOM: "חדרים",
  FURNITURE: "רהיטים",
  STUFF: "חפצים",
  INSTRUMENT: "מכשירים",
};

export const HOME_DOC_PAGES_TYPES = {
  RESIDENCE: "Residence",
  CHATTELS: "Chattels",
};

export const HOME_DOC_PAGE_TYPE = {
  PROPERTY: "Residence",
  FLOOR: "Residence",
  APARTMENT: "Residence",
  ROOM: "Residence",
  ROOM_FURNITURE: "Chattels",
  ROOM_STUFF: "Chattels",
  ROOM_INSTRUMENT: "Chattels",
};

export const SUB_HOME_DOC_TYPE = {
  ONE_STORY_HOUSE: {
    PROPERTY: "ROOM",
    ROOM_FURNITURE: "FURNITURE",
    ROOM_STUFF: "STUFF",
    ROOM_INSTRUMENT: "INSTRUMENT",
  },
  RESIDENTIAL_BUILDING: {
    PROPERTY: "FLOOR",
    FLOOR: "APARTMENT",
    APARTMENT: "ROOM",
    ROOM_FURNITURE: "FURNITURE",
    ROOM_STUFF: "STUFF",
    ROOM_INSTRUMENT: "INSTRUMENT",
  },
  MULTI_STORY_HOUSE: {
    PROPERTY: "FLOOR",
    FLOOR: "ROOM",
    ROOM_FURNITURE: "FURNITURE",
    ROOM_STUFF: "STUFF",
    ROOM_INSTRUMENT: "INSTRUMENT",
  },
};
