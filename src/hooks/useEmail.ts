
import { useState } from 'react';
import { 
  sendEmail, 
  sendOtpEmail,
  resendOtpEmail,
  sendSecurityAlertEmail,
  sendVerificationEmail, 
  sendPasswordResetEmail, 
  sendWelcomeEmail, 
  sendNotificationEmail,
  type EmailPayload, 
  type EmailResponse 
} from '@/lib/emailService';

/**
 * React hook to use the email service in components
 */
export const useEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const resetState = () => {
    setError(null);
    setSuccess(false);
  };

  /**
   * Send a custom email
   */
  const sendCustomEmail = async (payload: EmailPayload) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const response = await sendEmail(payload);
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to send email');
      }
      
      setSuccess(true);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Send OTP verification email
   */
  const handleSendOtpEmail = async (email: string, otpCode: string, recipientName?: string) => {
    setLoading(true);
    resetState();
    
    try {
      const response = await sendOtpEmail(email, otpCode, recipientName);
      setSuccess(response.success);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Resend OTP verification email
   */
  const handleResendOtpEmail = async (email: string, otpCode: string, recipientName?: string) => {
    setLoading(true);
    resetState();
    
    try {
      const response = await resendOtpEmail(email, otpCode, recipientName);
      setSuccess(response.success);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Send security alert email
   */
  const handleSendSecurityAlert = async (
    email: string, 
    alertType: string, 
    recipientName?: string, 
    deviceName?: string
  ) => {
    setLoading(true);
    resetState();
    
    try {
      const response = await sendSecurityAlertEmail(email, alertType, recipientName, deviceName);
      setSuccess(response.success);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Send a verification email
   */
  const handleSendVerificationEmail = async (email: string, token: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await sendVerificationEmail(email, token);
      setSuccess(response.success);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Send a password reset email
   */
  const handleSendPasswordResetEmail = async (email: string, token: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await sendPasswordResetEmail(email, token);
      setSuccess(response.success);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Send a welcome email
   */
  const handleSendWelcomeEmail = async (email: string, name: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await sendWelcomeEmail(email, name);
      setSuccess(response.success);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Send a notification email
   */
  const handleSendNotificationEmail = async (email: string, subject: string, message: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await sendNotificationEmail(email, subject, message);
      setSuccess(response.success);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    sendCustomEmail,
    sendOtpEmail: handleSendOtpEmail,
    resendOtpEmail: handleResendOtpEmail,
    sendSecurityAlert: handleSendSecurityAlert,
    sendVerificationEmail: handleSendVerificationEmail,
    sendPasswordResetEmail: handleSendPasswordResetEmail,
    sendWelcomeEmail: handleSendWelcomeEmail,
    sendNotificationEmail: handleSendNotificationEmail,
    resetState
  };
};
