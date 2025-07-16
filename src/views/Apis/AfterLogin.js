import axios from 'axios';

// ======= CONFIGURATION =======
const environment = 'local'; // Change this if needed

const BASE_URL =
  environment === 'local'
    ? 'https://asoft.click/api/incometax-service/'
    : 'http://ec2-43-204-235-24.ap-south-1.compute.amazonaws.com:8686/api/incometax-service/';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
    withCredentials: true
});

const getToken = () => localStorage.getItem('token') || null;

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// ======= ✅ GENERIC API CALL =======
export const sendRequest = async ({ method = 'POST', url, data = {} }) => {
  try {
    const response = await api({
      method,
      url,
      data,
    });
    return response.data;
  } catch (error) {
    const msg = error?.response?.data?.message || error.message || 'Unknown error';
    throw new Error(msg);
  }
};

// ======= ✅ FETCH ALL USERS =======
export const fetchAllEmployeesAndManagers = async () => {
  try {
    const response = await api.get('auth/getallemployessadminsandmanagers');
    return response.data;
  } catch (error) {
    const msg = error?.response?.data?.message || error.message || 'Failed to fetch data';
    throw new Error(msg);
  }
};

export const fetchAllEmployeesoFaManager = async () => {

  const managerId = sessionStorage.getItem('userId');
  try {
    const response = await api.get(`auth/getallemployessadminsandmanagers?managerId=${managerId}`);
    return response.data;
  } catch (error) {
    const msg = error?.response?.data?.message || error.message || 'Failed to fetch data';
    throw new Error(msg);
  }
};


export const getAllManagers=async()=>{

  try {
    const response = await api.get('auth/allmanagers');
    return response.data;
  }

  catch (error) {
    const msg = error?.response?.data?.message || error.message || 'Failed to fetch managers';
    throw new Error(msg);
  }
}


export const fetchLeadsForAdmin = async ({ page = 0, size = 10, unassigned = false, managerId = '' }) => {
  // const params = new URLSearchParams();
  // params.append("page", page);
  // params.append("size", size);
  // if (unassigned) params.append("unassigned", "true");
  // if (userId) params.append("userId", userId);

  // const url = `leads/getallleadsforadmin?${params.toString()}`;


  let url = `leads/getallleadsforadmin?page=${page}&size=${size}`;
  if (unassigned) url += `&unassigned=true`;
  if (managerId) url += `&managerId=${managerId}`;
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    const msg = error?.response?.data?.message || error.message || "Failed to fetch leads";
    throw new Error(msg);
  }
};


// views/Apis/AfterLogin.js or wherever your API helpers are defined

export const fetchLeadsForManager = async ({
  page = 0,
  size = 10,
  managerId = "",
  assignedOnly = false,
  unassignedOnly = false,
  userId = ""
}) => {
  let url = `leads/getallleadsformanager?page=${page}&size=${size}`;

  if (managerId){
     url += `&managerId=${managerId}`;
  }

  if (assignedOnly) {
    url += `&unassigned=true`; // means: show only assigned
  } else if (unassignedOnly) {
    url += `&unassigned=false`; // means: show only unassigned
  }


  if (userId) {
    url += `&userId=${userId}`;

  }
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    const msg =
      error?.response?.data?.message ||
      error.message ||
      "Failed to fetch leads for manager";
    throw new Error(msg);
  }
};




export const assignLeadsToManager = async (data) => {

  try {
    const response = await api({
      method: 'POST',
      url: 'leads/assign-leads-manager',
      data,
    });
    return response.data;
  } catch (error) {
    const msg = error?.response?.data?.message || error.message || 'Unknown error';
    throw new Error(msg);
  }


}


export const assignLeadsToEmployee = async (data) => {

  try {
    const response = await api({
      method: 'POST',
      url: 'leads/assign-leads-employee',
      data,
    });
    return response.data;
  } catch (error) {
    const msg = error?.response?.data?.message || error.message || 'Unknown error';
    throw new Error(msg);
  }


}



export const fetchEmplyeeDetails = async (employeeId) => {
  try {
    const response = await api.get(`auth/allemployess?employeeId=${employeeId}`);
    return response.data;
  } catch (error) {
    const msg = error?.response?.data?.message || error.message || 'Failed to fetch employee details';
    throw new Error(msg);
  }
}


export const fetchLeadsOfEmployee = async (employeeId, page = 0, size = 10) => {
  try {
    const response = await api.get(`/leads/getallleadsforemployee?page=${page}&size=${size}&employeeId=${employeeId}`);
    return response.data;
  }

  catch (error) {
    const msg = error?.response?.data?.message || error.message || 'Failed to fetch leads of employee';
    throw new Error(msg);
  }
}