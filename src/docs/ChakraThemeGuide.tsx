
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { chakraColors, createChakraTheme, ChakraUIUsageGuide, componentColorReference } from "./ChakraThemeExport";

const ChakraThemeGuide = () => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopy = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };
  
  const formatForDisplay = (obj: any, indent = 2) => {
    return JSON.stringify(obj, null, indent);
  };

  return (
    <div className="container py-8 max-w-6xl">
      <header className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <Link to="/" className="text-sm font-medium flex items-center mb-4">
            &larr; Back to Home
          </Link>
          <Link to="/theme-docs" className="text-sm font-medium hover:text-primary transition-colors">
            View Theme Documentation
          </Link>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2 gradient-text">Chakra UI Theme Export</h1>
        <p className="text-lg text-muted-foreground mb-4">
          Use this guide to implement the zsee IoT theme in your Chakra UI projects
        </p>
      </header>

      <Tabs defaultValue="usage" className="space-y-4">
        <TabsList>
          <TabsTrigger value="usage">Usage Guide</TabsTrigger>
          <TabsTrigger value="colors">Color Tokens</TabsTrigger>
          <TabsTrigger value="components">Component Colors</TabsTrigger>
          <TabsTrigger value="theme">Full Theme</TabsTrigger>
        </TabsList>

        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>How to Use the Theme in Chakra UI</CardTitle>
              <CardDescription>
                Follow these steps to implement the zsee IoT theme in your Chakra UI project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="p-4 rounded-md bg-muted overflow-x-auto">{ChakraUIUsageGuide}</pre>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => handleCopy(ChakraUIUsageGuide, "usage")}
                >
                  {copiedSection === "usage" ? <Check size={16} /> : <Copy size={16} />}
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                First, import the theme from ChakraThemeExport.ts, then use it with Chakra UI's ChakraProvider.
              </p>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Installation Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Make sure you have Chakra UI installed in your project:</p>
              <div className="relative">
                <pre className="p-4 rounded-md bg-muted overflow-x-auto">npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion</pre>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => handleCopy("npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion", "install")}
                >
                  {copiedSection === "install" ? <Check size={16} /> : <Copy size={16} />}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="colors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Brand Colors</CardTitle>
              <CardDescription>Primary color palette for your application</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(chakraColors.brand).map(([name, value]) => (
                  <div key={name} className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-md border"
                      style={{ backgroundColor: value as string }}
                    />
                    <div>
                      <p className="font-medium">{name}</p>
                      <p className="text-sm text-muted-foreground">{value as string}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="ml-auto"
                      onClick={() => handleCopy(value as string, `brand-${name}`)}
                    >
                      {copiedSection === `brand-${name}` ? <Check size={16} /> : <Copy size={16} />}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Action Colors</CardTitle>
              <CardDescription>Colors for different actions and states</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(chakraColors.action).map(([name, value]) => (
                  <div key={name} className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-md border"
                      style={{ backgroundColor: value as string }}
                    />
                    <div>
                      <p className="font-medium">{name}</p>
                      <p className="text-sm text-muted-foreground">{value as string}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="ml-auto"
                      onClick={() => handleCopy(value as string, `action-${name}`)}
                    >
                      {copiedSection === `action-${name}` ? <Check size={16} /> : <Copy size={16} />}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Light Theme Colors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <div className="relative">
                  <pre className="p-4 rounded-md bg-muted overflow-x-auto">{formatForDisplay(chakraColors.light)}</pre>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => handleCopy(JSON.stringify(chakraColors.light), "light-theme")}
                  >
                    {copiedSection === "light-theme" ? <Check size={16} /> : <Copy size={16} />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dark Theme Colors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <div className="relative">
                  <pre className="p-4 rounded-md bg-muted overflow-x-auto">{formatForDisplay(chakraColors.dark)}</pre>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => handleCopy(JSON.stringify(chakraColors.dark), "dark-theme")}
                  >
                    {copiedSection === "dark-theme" ? <Check size={16} /> : <Copy size={16} />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="components" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Component Color Reference</CardTitle>
              <CardDescription>Color tokens for each UI element and component</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(componentColorReference).map(([category, colors]) => (
                <div key={category} className="space-y-2">
                  <h3 className="font-medium text-lg capitalize">{category}</h3>
                  <div className="relative">
                    <pre className="p-4 rounded-md bg-muted overflow-x-auto">{formatForDisplay(colors)}</pre>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => handleCopy(JSON.stringify(colors), `comp-${category}`)}
                    >
                      {copiedSection === `comp-${category}` ? <Check size={16} /> : <Copy size={16} />}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="theme" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Complete Chakra UI Theme</CardTitle>
              <CardDescription>The full theme object ready to use with extendTheme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="p-4 rounded-md bg-muted overflow-x-auto text-sm max-h-[600px]">
                  {formatForDisplay(createChakraTheme())}
                </pre>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => handleCopy(JSON.stringify(createChakraTheme()), "full-theme")}
                >
                  {copiedSection === "full-theme" ? <Check size={16} /> : <Copy size={16} />}
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => handleCopy(`import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { createChakraTheme } from "./path/to/ChakraThemeExport";

const theme = extendTheme(createChakraTheme());

function App() {
  return (
    <ChakraProvider theme={theme}>
      <YourApp />
    </ChakraProvider>
  );
}`, "theme-usage")}
                className="ml-auto"
              >
                {copiedSection === "theme-usage" ? <Check size={16} className="mr-2" /> : <Copy size={16} className="mr-2" />}
                Copy Usage Example
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Raw Theme Export</CardTitle>
              <CardDescription>Copy the entire ChakraThemeExport.ts file</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-8">
              <Button 
                onClick={() => handleCopy(`
/**
 * zsee IoT Theme - Chakra UI Export
 * 
 * This file exports all theme colors in a format compatible with Chakra UI.
 * Use this file to maintain consistent branding across projects using Chakra UI.
 */

/**
 * Theme colors formatted for Chakra UI
 */
export const chakraColors = ${JSON.stringify(chakraColors, null, 2)};

/**
 * Creates a complete Chakra UI theme object with the zsee IoT colors
 */
export const createChakraTheme = () => {
  return ${JSON.stringify(createChakraTheme(), null, 2)};
};

/**
 * Sample usage for Chakra UI global theme object
 */
export const ChakraUIUsageGuide = \`${ChakraUIUsageGuide}\`;

/**
 * Color tokens reference for each UI element and component
 */
export const componentColorReference = ${JSON.stringify(componentColorReference, null, 2)};
`, "raw-file")}
                className="mx-auto"
              >
                {copiedSection === "raw-file" ? <Check size={16} className="mr-2" /> : <Copy size={16} className="mr-2" />}
                Copy Entire File Content
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChakraThemeGuide;
