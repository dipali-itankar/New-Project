


const STORAGE_KEY = "attendance_records";

// ✅ Get attendance from localStorage
export const getAttendanceRecords = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// ✅ Save attendance to localStorage
export const saveAttendanceRecords = (records) => {
  localStorage.setItem("attendance_records", JSON.stringify(records));
};
