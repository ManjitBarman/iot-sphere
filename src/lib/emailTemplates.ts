
/**
 * Professional Email Templates for zsee IoT Platform
 * Authentication and Security Email Templates
 */

export interface EmailTemplateData {
  recipientName?: string;
  otpCode?: string;
  deviceName?: string;
  alertType?: string;
  timestamp?: string;
  companyName?: string;
  supportEmail?: string;
  loginUrl?: string;
}

/**
 * Base HTML template structure
 */
const getBaseTemplate = (content: string, title: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, #0070f3 0%, #00a2ff 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .tagline {
            font-size: 14px;
            opacity: 0.9;
        }
        .content {
            padding: 40px 30px;
        }
        .greeting {
            font-size: 18px;
            margin-bottom: 20px;
            color: #222;
        }
        .otp-box {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            border: 2px solid #0070f3;
            border-radius: 12px;
            padding: 25px;
            text-align: center;
            margin: 30px 0;
        }
        .otp-code {
            font-size: 32px;
            font-weight: bold;
            color: #0070f3;
            letter-spacing: 8px;
            margin: 10px 0;
            font-family: 'Courier New', monospace;
        }
        .otp-label {
            font-size: 14px;
            color: #666;
            margin-bottom: 10px;
        }
        .alert-box {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 20px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .alert-box.danger {
            background: #f8d7da;
            border-left-color: #dc3545;
        }
        .alert-box.info {
            background: #d1ecf1;
            border-left-color: #17a2b8;
        }
        .button {
            display: inline-block;
            background: linear-gradient(135deg, #0070f3 0%, #00a2ff 100%);
            color: white;
            text-decoration: none;
            padding: 12px 30px;
            border-radius: 6px;
            font-weight: bold;
            margin: 20px 0;
            transition: transform 0.2s;
        }
        .button:hover {
            transform: translateY(-2px);
        }
        .footer {
            background-color: #f8f9fa;
            padding: 30px;
            text-align: center;
            border-top: 1px solid #e9ecef;
        }
        .footer-text {
            font-size: 12px;
            color: #666;
            margin-bottom: 10px;
        }
        .social-links {
            margin: 20px 0;
        }
        .security-notice {
            background: #e3f2fd;
            border: 1px solid #2196f3;
            border-radius: 6px;
            padding: 15px;
            margin: 20px 0;
            font-size: 14px;
        }
        .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent, #ddd, transparent);
            margin: 30px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        ${content}
    </div>
</body>
</html>
`;

/**
 * Send OTP Email Template
 */
export const sendOtpTemplate = (data: EmailTemplateData) => {
    const { recipientName = 'Valued User', otpCode = '123456', companyName = 'zsee IoT' } = data;
    
    const content = `
        <div class="header">
            <div class="logo">${companyName}</div>
            <div class="tagline">Smart IoT Platform</div>
        </div>
        
        <div class="content">
            <div class="greeting">Hello ${recipientName},</div>
            
            <p>Welcome to ${companyName}! To complete your authentication and secure your account, please use the verification code below:</p>
            
            <div class="otp-box">
                <div class="otp-label">Your Verification Code</div>
                <div class="otp-code">${otpCode}</div>
                <div style="font-size: 12px; color: #666; margin-top: 10px;">
                    This code will expire in 10 minutes
                </div>
            </div>
            
            <p>Enter this code in the verification field to activate your account and start managing your IoT devices.</p>
            
            <div class="security-notice">
                <strong>🔒 Security Notice:</strong> For your security, never share this code with anyone. ${companyName} will never ask for your verification code via phone or email.
            </div>
            
            <div class="divider"></div>
            
            <p>If you didn't request this code, please ignore this email or contact our support team if you have concerns about your account security.</p>
        </div>
        
        <div class="footer">
            <div class="footer-text">
                © 2024 ${companyName}. All rights reserved.<br>
                This is an automated message, please do not reply to this email.
            </div>
            <div class="footer-text">
                Need help? Contact us at <a href="mailto:support@zsee.io" style="color: #0070f3;">support@zsee.io</a>
            </div>
        </div>
    `;
    
    return getBaseTemplate(content, `${companyName} - Verification Code`);
};

/**
 * Resend OTP Email Template
 */
export const resendOtpTemplate = (data: EmailTemplateData) => {
    const { recipientName = 'Valued User', otpCode = '123456', companyName = 'zsee IoT' } = data;
    
    const content = `
        <div class="header">
            <div class="logo">${companyName}</div>
            <div class="tagline">Smart IoT Platform</div>
        </div>
        
        <div class="content">
            <div class="greeting">Hello ${recipientName},</div>
            
            <p>You requested a new verification code for your ${companyName} account. Here's your fresh verification code:</p>
            
            <div class="otp-box">
                <div class="otp-label">Your New Verification Code</div>
                <div class="otp-code">${otpCode}</div>
                <div style="font-size: 12px; color: #666; margin-top: 10px;">
                    This code will expire in 10 minutes
                </div>
            </div>
            
            <div class="alert-box info">
                <strong>📝 Note:</strong> Your previous verification code has been invalidated. Please use only this new code to complete your authentication.
            </div>
            
            <p>If you're having trouble with verification, you can:</p>
            <ul style="margin: 15px 0; padding-left: 20px;">
                <li>Check that you're entering the code correctly</li>
                <li>Ensure the code hasn't expired</li>
                <li>Contact our support team for assistance</li>
            </ul>
            
            <div class="security-notice">
                <strong>🔒 Security Reminder:</strong> This code is for your account only. Never share it with anyone, including ${companyName} staff.
            </div>
            
            <div class="divider"></div>
            
            <p>If you didn't request a new code, someone may be trying to access your account. Please secure your account immediately and contact support.</p>
        </div>
        
        <div class="footer">
            <div class="footer-text">
                © 2024 ${companyName}. All rights reserved.<br>
                This is an automated message, please do not reply to this email.
            </div>
            <div class="footer-text">
                Need help? Contact us at <a href="mailto:support@zsee.io" style="color: #0070f3;">support@zsee.io</a>
            </div>
        </div>
    `;
    
    return getBaseTemplate(content, `${companyName} - New Verification Code`);
};

/**
 * Security Alert Email Template
 */
export const securityAlertTemplate = (data: EmailTemplateData) => {
    const { 
        recipientName = 'Valued User', 
        alertType = 'Login Attempt', 
        timestamp = new Date().toLocaleString(),
        deviceName = 'Unknown Device',
        companyName = 'zsee IoT',
        loginUrl = '#'
    } = data;
    
    const content = `
        <div class="header">
            <div class="logo">${companyName}</div>
            <div class="tagline">Smart IoT Platform</div>
        </div>
        
        <div class="content">
            <div class="greeting">Hello ${recipientName},</div>
            
            <p>We detected important activity on your ${companyName} account that requires your attention.</p>
            
            <div class="alert-box danger">
                <strong>🚨 Security Alert: ${alertType}</strong><br>
                <div style="margin-top: 10px; font-size: 14px;">
                    <strong>Time:</strong> ${timestamp}<br>
                    <strong>Device:</strong> ${deviceName}<br>
                    <strong>Activity:</strong> ${alertType}
                </div>
            </div>
            
            <p><strong>What happened?</strong></p>
            <p>We noticed a ${alertType.toLowerCase()} on your account. If this was you, no action is needed. If you don't recognize this activity, please take immediate action to secure your account.</p>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${loginUrl}" class="button">Secure My Account</a>
            </div>
            
            <p><strong>Recommended Actions:</strong></p>
            <ul style="margin: 15px 0; padding-left: 20px;">
                <li>Change your password immediately</li>
                <li>Review your recent account activity</li>
                <li>Enable two-factor authentication if not already enabled</li>
                <li>Check your connected IoT devices for any unauthorized access</li>
            </ul>
            
            <div class="security-notice">
                <strong>🛡️ Security Tips:</strong> Always use strong, unique passwords and enable two-factor authentication. Regularly monitor your account for suspicious activity.
            </div>
            
            <div class="divider"></div>
            
            <p>If you believe your account has been compromised, please contact our security team immediately at <a href="mailto:security@zsee.io" style="color: #dc3545;">security@zsee.io</a></p>
        </div>
        
        <div class="footer">
            <div class="footer-text">
                © 2024 ${companyName}. All rights reserved.<br>
                This is an automated security alert.
            </div>
            <div class="footer-text">
                <strong>Security Team:</strong> <a href="mailto:security@zsee.io" style="color: #0070f3;">security@zsee.io</a> |
                <strong>Support:</strong> <a href="mailto:support@zsee.io" style="color: #0070f3;">support@zsee.io</a>
            </div>
        </div>
    `;
    
    return getBaseTemplate(content, `${companyName} - Security Alert`);
};

/**
 * Welcome Email Template (after successful authentication)
 */
export const welcomeTemplate = (data: EmailTemplateData) => {
    const { 
        recipientName = 'Valued User', 
        companyName = 'zsee IoT',
        loginUrl = '#'
    } = data;
    
    const content = `
        <div class="header">
            <div class="logo">${companyName}</div>
            <div class="tagline">Smart IoT Platform</div>
        </div>
        
        <div class="content">
            <div class="greeting">Welcome to ${companyName}, ${recipientName}! 🎉</div>
            
            <p>Congratulations! Your account has been successfully verified and you're now part of the ${companyName} community.</p>
            
            <div class="alert-box info">
                <strong>🚀 You're all set!</strong><br>
                Your IoT journey begins now. Start connecting your devices and unlock the power of smart automation.
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="${loginUrl}" class="button">Access Dashboard</a>
            </div>
            
            <p><strong>What you can do now:</strong></p>
            <ul style="margin: 15px 0; padding-left: 20px;">
                <li>🔗 Connect your first IoT device</li>
                <li>📊 Create custom dashboards</li>
                <li>⚡ Set up automation rules</li>
                <li>📱 Monitor devices remotely</li>
                <li>🔔 Configure smart alerts</li>
            </ul>
            
            <div class="divider"></div>
            
            <p><strong>Need help getting started?</strong></p>
            <p>Our comprehensive documentation and support team are here to help you every step of the way. Check out our getting started guide or contact support if you have any questions.</p>
            
            <div class="security-notice">
                <strong>🔒 Security First:</strong> Your account is protected with industry-standard security measures. Remember to keep your login credentials safe and enable two-factor authentication for extra security.
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-text">
                © 2024 ${companyName}. All rights reserved.<br>
                Welcome to the future of IoT!
            </div>
            <div class="footer-text">
                <strong>Documentation:</strong> <a href="#" style="color: #0070f3;">docs.zsee.io</a> |
                <strong>Support:</strong> <a href="mailto:support@zsee.io" style="color: #0070f3;">support@zsee.io</a>
            </div>
        </div>
    `;
    
    return getBaseTemplate(content, `Welcome to ${companyName}!`);
};

/**
 * Export all templates
 */
export const emailTemplates = {
    sendOtp: sendOtpTemplate,
    resendOtp: resendOtpTemplate,
    securityAlert: securityAlertTemplate,
    welcome: welcomeTemplate
};
