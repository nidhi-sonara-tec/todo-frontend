// This test file is for the ToasterMessage function in a React application. It tests the behavior of the function in generating toasts based on different message types using the react-toastify library.

// Import necessary modules and dependencies
import { ToasterMessage } from './helper/ToasterHelper'; // Replace with the correct path to your file
import { toast } from 'react-toastify';


// Mock the react-toastify library to spy on toast functions
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  },
}));

// Test suite for the ToasterMessage function
describe('ToasterMessage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

   // Test case: It should call toast.success for success type
  it('should call toast.success for success type', () => {
    const message = 'Success message';
    ToasterMessage('success', message);
    expect(toast.success).toHaveBeenCalledWith(message, expect.any(Object));
  });

  
  // Test case: It should call toast.error for error type
  it('should call toast.error for error type', () => {
    const message = 'Error message';
    ToasterMessage('error', message);
    expect(toast.error).toHaveBeenCalledWith(message, expect.any(Object));
  });

  // Test case: It should call toast.warn for warning type
  it('should call toast.warn for warning type', () => {
    const message = 'Warning message';
    ToasterMessage('warning', message);
    expect(toast.warn).toHaveBeenCalledWith(message, expect.any(Object));
  });

  // Test case: It should not call any toast function for unknown type
  it('should not call any toast function for unknown type', () => {
    const message = 'Unknown message';
    ToasterMessage('unknown', message);
    expect(toast.success).not.toHaveBeenCalled();
    expect(toast.error).not.toHaveBeenCalled();
    expect(toast.warn).not.toHaveBeenCalled();
  });
});
