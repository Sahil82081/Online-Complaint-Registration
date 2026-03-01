const Domain = import.meta.env.VITE_DOMAIN_URL;

export const signup = `${Domain}/api/signup`;
export const login = `${Domain}/api/login`;
export const submit_complaint = `${Domain}/api/submit_complaint`;
export const get_complaints = `${Domain}/api/get_complaints`;
export const adminlogin = `${Domain}/api/adminlogin`;
export const addofficer = `${Domain}/api/addofficer`;
export const getAdminDashboard = `${Domain}/api/get_admin_dashboard`;
export const officerlogin = `${Domain}/api/officerlogin`;
export const get_all_complaints = `${Domain}/api/get_all_complaints`;
export const update_complaint_status = `${Domain}/api/update_complaint`;
export const complaint_status = `${Domain}/api/complaint_status`;