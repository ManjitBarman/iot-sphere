
/**
 * Email Service for zsee IoT Platform
 * Handles all email-related API calls to the backend
 */

// Types for our email service
export interface EmailPayload {
  to: string | string[];
  subject: string;
  body: string;
  template?: string;
  attachments?: Array<{
    filename: string;
    content: string | Buffer;
    contentType?: string;
  }>;
  cc?: string | string[];
  bcc?: string | string[];
}

export interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

// Base API URL - replace with your actual backend URL
const API_BASE_URL = process.env.API_URL || 'http://localhost:5000/api';

/**
 * Send an email using the platform's email service
 */
export const sendEmail = async (payload: EmailPayload): Promise<EmailResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/email/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add auth headers if required by your backend
        // 'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to send email');
    }
    
    return {
      success: true,
      messageId: data.messageId,
    };
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

/**
 * Send a verification email to a user
 */
export const sendVerificationEmail = async (email: string, verificationToken: string): Promise<EmailResponse> => {
  // You could use a template ID here if your backend supports templated emails
  return sendEmail({
    to: email,
    subject: 'Verify your zsee IoT account',
    body: `Please verify your account by clicking this link: ${window.location.origin}/verify?token=${verificationToken}`,
    template: 'verification',
  });
};

/**
 * Send a password reset email
 */
export const sendPasswordResetEmail = async (email: string, resetToken: string): Promise<EmailResponse> => {
  return sendEmail({
    to: email,
    subject: 'Reset your zsee IoT password',
    body: `Reset your password by clicking this link: ${window.location.origin}/reset-password?token=${resetToken}`,
    template: 'password-reset',
  });
};

/**
 * Send a welcome email to new users
 */
export const sendWelcomeEmail = async (email: string, name: string): Promise<EmailResponse> => {
  return sendEmail({
    to: email,
    subject: 'Welcome to zsee IoT Platform',
    body: `Hello ${name}, welcome to the zsee IoT platform! Get started by exploring our dashboard.`,
    template: 'welcome',
  });
};

/**
 * Send a notification email
 */
export const sendNotificationEmail = async (
  email: string, 
  subject: string, 
  message: string
): Promise<EmailResponse> => {
  return sendEmail({
    to: email,
    subject: subject,
    body: message,
    template: 'notification',
  });
};
