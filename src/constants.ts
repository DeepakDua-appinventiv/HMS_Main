export const DEFAULT_PAGE = 1;
export const DEFAULT_ITEMS_PER_PAGE = 5; 

export const SUCCESS_MESSAGES = {
    LOGIN_SUCCESS: 'Login successful',
    LOGOUT_SUCCESS: 'Logout successful',
    ADMIT_SUCCESS: 'Patient Admitted successfully',
    DISCHARGE_SUCCESS: 'Patient Discharged successfully',
    ADD_INVENTORY: 'Item added successfully',
    UPDATE_INVENTORY: 'Item updated successfully',
    OTP_SUCCESS: 'OTP sent successfully',
    RESET_SUCCESS: 'Password reset successfully',
    ADD_STAFF_SUCCESS: 'Staff Added Successfully',
    DELETE_SUCCESS: 'profile deleted successfully',
    APPOINTMENT_BOOKED: 'Appointment booked successfully',
    APPOINTMENT_UPDATED: 'Appointment updated successfully',
    APPOINTMENT_CANCELLED: 'Appointment cancelled successfully',
    MEDHISTORY_SUCCESS: 'Medical history added successfully',
    MEDHISTORY_UPDATED: 'Medical history updated successfully',
    MEDBILL_SUCCESS: 'Medication Bill Generated Successfully',
    REGISTRATION_SUCCESS: 'Your registration has been successfull. Please verify your mail!',
    PROFILE_UPDATED: 'Profile updated successfully',
    PROFILE_DELETED: 'Profile deleted successfully',
    PROFILE_UPLOADED: 'Profile uploaded successfully',
};
  
export const ERROR_MESSAGES = {
    NO_DATA:'NO_DATA',
    ADMIN_NOT_FOUND:'Admin not found',
    APPOINTMENT_NOT_FOUND: 'Appointment not found',
    MEDHISTORY_NOT_FOUND: 'Medical history not found',
    MEDICATION_NOT_FOUND: 'Medication not found',
    APPOINTMENT_STATUS_NOT_PENDING: 'Appointment cannot be updated/cancelled as the status is not pending',
    FAILED_TO_UPDATE_APPOINTMENT: 'Failed to update appointment',
    FAILED_TO_CANCEL_APPOINTMENT: 'Failed to cancel appointment',
    PASSWORD_MISMATCH: 'Password Mismatch',
    INVALID_OTP: 'Invalid OTP',
    PATIENT_NOT_FOUND: 'User/Patient not found',
    STAFF_NOT_FOUND: 'User/Staff not found',
    USER_NOT_LOGGEDIN: 'User not logged in',
    PROFILE_NOT_FOUND: 'Profile not found',
    INVENTORY_NOT_FOUND: 'Inventory not found',
    INVALID_CREDENTIALS: 'Invalid credentials',
    REGISTRATION_FAILED: 'Your registration has been failed!'
};

export const REQUIRED_MESSAGES = {
    ROLE_REQUIRED: 'Role parameter is required',
    SPECIALIZATION_REQUIRED: 'Specialization parameter is required',
};

export const RESPONSE_MESSAGES = {
    SERVER_ERROR: 'Something went wrong',
    NOT_FOUND: 'Resource not found',
    DUPLICATE: 'Already exists',
};

export const RESPONSE_STATUS = {
    success: 200,
    unauthorized: 401,
    internalServerError: 500,
    notFound: 404,
    badRequest: 400,
    alreadyExist: 409,
}