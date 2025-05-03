
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, Copy, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ChakraThemeExport = () => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleDownload = () => {
    // Create theme file content - we're importing it from src/exports/theme.js
    const fileContent = require('@/exports/theme').default;
    const fileStr = `// zsee IoT Chakra UI Theme\n${JSON.stringify(fileContent, null, 2)}`;
    
    // Create a blob to download
    const blob = new Blob([fileStr], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    
    // Create download link and simulate click
    const link = document.createElement('a');
    link.href = url;
    link.download = 'zsee-chakra-theme.js';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Theme file downloaded",
      description: "The Chakra UI theme file has been downloaded successfully"
    });
  };

  const copyToClipboard = async () => {
    try {
      // Get file contents
      const fileContent = require('@/exports/theme').default;
      const fileStr = `// zsee IoT Chakra UI Theme\n${JSON.stringify(fileContent, null, 2)}`;
      
      await navigator.clipboard.writeText(fileStr);
      setCopied(true);
      
      toast({
        title: "Theme copied to clipboard",
        description: "You can now paste it into your project"
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again or download the theme file",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container py-8 max-w-6xl mx-auto">
      <header className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <Link to="/" className="text-sm font-medium flex items-center mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2 gradient-text">
          Chakra UI Theme Export
        </h1>
        <p className="text-lg text-muted-foreground mb-4">
          Download or copy the zsee IoT theme for use in your Chakra UI projects
        </p>
      </header>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Theme Export</CardTitle>
            <CardDescription>
              Get the zsee IoT theme for use in your Chakra UI projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              This theme includes:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-6">
              <li>Complete color palette for light and dark modes</li>
              <li>Component-specific styling for buttons, cards, inputs, and tables</li>
              <li>Semantic color tokens for consistent design</li>
              <li>Typography settings</li>
            </ul>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              onClick={copyToClipboard}
              className="flex items-center"
            >
              {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
              {copied ? 'Copied!' : 'Copy Theme'}
            </Button>
            
            <Button 
              variant="outline"
              onClick={handleDownload}
              className="flex items-center"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Theme File
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage Instructions</CardTitle>
            <CardDescription>
              How to integrate the zsee IoT theme in your Chakra UI project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">1. Install Chakra UI:</h3>
                <pre className="p-3 bg-muted rounded-md overflow-x-auto text-sm mt-1">
                  npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
                </pre>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">2. Import the theme:</h3>
                <pre className="p-3 bg-muted rounded-md overflow-x-auto text-sm mt-1">
                  {`import { ChakraProvider } from '@chakra-ui/react';
import zseeTheme from './path/to/zsee-chakra-theme';`}
                </pre>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">3. Wrap your app with the theme:</h3>
                <pre className="p-3 bg-muted rounded-md overflow-x-auto text-sm mt-1">
{`function App() {
  return (
    <ChakraProvider theme={zseeTheme}>
      <YourAppComponent />
    </ChakraProvider>
  );
}`}
                </pre>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">4. Use theme colors and components:</h3>
                <pre className="p-3 bg-muted rounded-md overflow-x-auto text-sm mt-1">
{`import { Box, Button, Text } from '@chakra-ui/react';

function Component() {
  return (
    <Box bg="brand.primary" p={4} color="white">
      <Text>zsee IoT Theme</Text>
      <Button variant="outline">Outline Button</Button>
      <Button variant="danger" ml={2}>Danger Button</Button>
    </Box>
  );
}`}
                </pre>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/chakra-theme" className="w-full">
              <Button variant="secondary" className="w-full">
                View Detailed Chakra Theme Guide
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ChakraThemeExport;
