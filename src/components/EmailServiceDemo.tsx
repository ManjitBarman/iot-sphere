
import React, { useState } from 'react';
import { useEmail } from '@/hooks/useEmail';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const EmailServiceDemo = () => {
  const { toast } = useToast();
  const { 
    loading, 
    error, 
    success, 
    sendCustomEmail,
    resetState
  } = useEmail();

  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetState();

    if (!recipient || !subject || !message) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const response = await sendCustomEmail({
      to: recipient,
      subject: subject,
      body: message
    });

    if (response.success) {
      toast({
        title: "Email sent",
        description: "Your email has been sent successfully",
      });
      
      // Clear the form
      setRecipient('');
      setSubject('');
      setMessage('');
    } else {
      toast({
        title: "Failed to send email",
        description: response.error || "An unknown error occurred",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-iot-primary">Send Email</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="recipient">Recipient Email</Label>
          <Input
            id="recipient"
            type="email"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="recipient@example.com"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Email subject"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Your message..."
            rows={5}
            required
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Email"}
        </Button>
        
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
        
        {success && (
          <p className="text-green-500 text-sm mt-2">Email sent successfully!</p>
        )}
      </form>
    </div>
  );
};

export default EmailServiceDemo;
