
/**
 * Email Service for zsee IoT Platform
 * Handles all email-related API calls to the backend with professional templates
 */

import { 
  sendOtpTemplate, 
  resendOtpTemplate, 
  securityAlertTemplate, 
  welcomeTemplate,
  type EmailTemplateData 
} from './emailTemplates';

// Types for our email service
export interface EmailPayload {
  to: string | string[];
  subject: string;
  body: string;
  html?: string;
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
 * Send OTP verification email with professional template
 */
export const sendOtpEmail = async (
  email: string, 
  otpCode: string, 
  recipientName?: string
): Promise<EmailResponse> => {
  const templateData: EmailTemplateData = {
    recipientName,
    otpCode,
    companyName: 'zsee IoT'
  };

  return sendEmail({
    to: email,
    subject: 'zsee IoT - Your Verification Code',
    body: `Your verification code is: ${otpCode}`, // Fallback text
    html: sendOtpTemplate(templateData),
    template: 'otp-verification',
  });
};

/**
 * Send OTP resend email with professional template
 */
export const resendOtpEmail = async (
  email: string, 
  otpCode: string, 
  recipientName?: string
): Promise<EmailResponse> => {
  const templateData: EmailTemplateData = {
    recipientName,
    otpCode,
    companyName: 'zsee IoT'
  };

  return sendEmail({
    to: email,
    subject: 'zsee IoT - New Verification Code',
    body: `Your new verification code is: ${otpCode}`, // Fallback text
    html: resendOtpTemplate(templateData),
    template: 'otp-resend',
  });
};

/**
 * Send security alert email
 */
export const sendSecurityAlertEmail = async (
  email: string,
  alertType: string,
  recipientName?: string,
  deviceName?: string
): Promise<EmailResponse> => {
  const templateData: EmailTemplateData = {
    recipientName,
    alertType,
    deviceName,
    timestamp: new Date().toLocaleString(),
    companyName: 'zsee IoT',
    loginUrl: `${window.location.origin}/login`
  };

  return sendEmail({
    to: email,
    subject: `zsee IoT - Security Alert: ${alertType}`,
    body: `Security alert: ${alertType} detected on your account.`, // Fallback text
    html: securityAlertTemplate(templateData),
    template: 'security-alert',
  });
};

/**
 * Send welcome email after successful verification
 */
export const sendWelcomeEmail = async (email: string, name: string): Promise<EmailResponse> => {
  const templateData: EmailTemplateData = {
    recipientName: name,
    companyName: 'zsee IoT',
    loginUrl: `${window.location.origin}/dashboard`
  };

  return sendEmail({
    to: email,
    subject: 'Welcome to zsee IoT Platform! 🎉',
    body: `Welcome to zsee IoT, ${name}! Your IoT journey starts now.`,
    html: welcomeTemplate(templateData),
    template: 'welcome',
  });
};

/**
 * Send a verification email to a user
 */
export const sendVerificationEmail = async (email: string, verificationToken: string): Promise<EmailResponse> => {
  // Use the OTP template for verification emails
  return sendOtpEmail(email, verificationToken);
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
