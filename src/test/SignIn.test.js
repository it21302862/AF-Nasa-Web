import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SignIn from '../pages/SignIn';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../context/AuthContext', () => ({
  UserAuth: jest.fn(),
}));

describe('SignIn component', () => {
  beforeEach(() => {
    UserAuth.mockReturnValue({
      googleSignIn: jest.fn(),
      user: null, // or mock the user object as needed for other test cases
    });
    useNavigate.mockReturnValue(jest.fn());
  });

  it('renders without crashing', () => {
    render(<SignIn />);
  });

  it('calls googleSignIn function when "Log in with Google" button is clicked', async () => {
    const googleSignInMock = jest.fn();
    UserAuth.mockReturnValueOnce({
      googleSignIn: googleSignInMock,
      user: null,
    });

    const { getByText } = render(<SignIn />);
    const loginButton = getByText('Log in with Google');
    fireEvent.click(loginButton);

    expect(googleSignInMock).toHaveBeenCalledTimes(1);
  });

  it('navigates to home page after successful sign-in', async () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    UserAuth.mockReturnValueOnce({
      googleSignIn: jest.fn().mockResolvedValueOnce(),
      user: { id: '123', name: 'Test User' }, // Mock signed-in user data
    });

    const { getByText } = render(<SignIn />);
    const loginButton = getByText('Log in with Google');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('handles sign-in failure gracefully', async () => {
    const errorMessage = 'Failed to sign in';
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const googleSignInMock = jest.fn().mockRejectedValueOnce(new Error(errorMessage));
    UserAuth.mockReturnValueOnce({
      googleSignIn: googleSignInMock,
      user: null,
    });

    const { getByText } = render(<SignIn />);
    const loginButton = getByText('Log in with Google');
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(new Error(errorMessage));
    });

    consoleErrorSpy.mockRestore();
  });
});
