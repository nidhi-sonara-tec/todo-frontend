import ApiUtils from "../api/ApiUtils";

export const fetchTaskDataByStatus = async (status: string, action: any, dispatch:any) => {
  try {
    const res = await ApiUtils.getTasksList(status);
    if (res.status === 200) {
      dispatch(action(res.data));
    }
  } catch (err) {
    // Handle error
  }
};
