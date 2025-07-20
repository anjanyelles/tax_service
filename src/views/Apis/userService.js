// src/api/userService.js
import { sendRequest } from './request';

export const addEmployee = async (employeeData) => {
  return await sendRequest({
    method: 'POST',
    url: 'auth/addemployee',
    data: employeeData,
  });
};

export const addAdminOrManager = async (adminData) => {
  return await sendRequest({
    method: 'POST',
    url: 'auth/addadminormanager',
    data: adminData,
  });
};

export const fetchAllUsers = async () => {
  return await sendRequest({
    method: 'GET',
    url: 'auth/getallemployessadminsandmanagers',
  });
};
