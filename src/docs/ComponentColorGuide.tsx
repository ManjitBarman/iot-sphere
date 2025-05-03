
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { iotColors } from "./ThemeExport";

export default function ComponentColorGuide() {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">zsee IoT Component Color Guide</h1>
      
      <Tabs defaultValue="palette" className="space-y-4">
        <TabsList>
          <TabsTrigger value="palette">Color Palette</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="elements">UI Elements</TabsTrigger>
          <TabsTrigger value="copy">Quick Copy</TabsTrigger>
        </TabsList>

        <TabsContent value="palette" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Complete Color Palette</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-medium text-lg mb-4">Base Colors</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <ColorSwatch name="Primary" color={iotColors.primary} />
                <ColorSwatch name="Secondary" color={iotColors.secondary} />
                <ColorSwatch name="Accent" color={iotColors.accent} />
                <ColorSwatch name="Dark" color={iotColors.dark} />
                <ColorSwatch name="Light" color={iotColors.light} />
              </div>
              
              <h3 className="font-medium text-lg mb-4 mt-8">Light Theme Variables</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <HslColorSwatch name="Background" hsl="210 40% 98%" />
                <HslColorSwatch name="Foreground" hsl="222.2 84% 4.9%" />
                <HslColorSwatch name="Card" hsl="0 0% 100%" />
                <HslColorSwatch name="Primary" hsl="214 100% 50%" />
                <HslColorSwatch name="Secondary" hsl="210 80% 50%" />
                <HslColorSwatch name="Muted" hsl="210 40% 96.1%" />
                <HslColorSwatch name="Accent" hsl="174 100% 42%" />
                <HslColorSwatch name="Destructive" hsl="0 84.2% 60.2%" />
                <HslColorSwatch name="Border" hsl="214.3 31.8% 91.4%" />
                <HslColorSwatch name="Input" hsl="214.3 31.8% 91.4%" />
                <HslColorSwatch name="Ring" hsl="214 100% 50%" />
              </div>
              
              <h3 className="font-medium text-lg mb-4 mt-8">Dark Theme Variables</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 dark">
                <HslColorSwatch name="Background" hsl="222.2 84% 4.9%" />
                <HslColorSwatch name="Foreground" hsl="210 40% 98%" />
                <HslColorSwatch name="Card" hsl="222.2 84% 4.9%" />
                <HslColorSwatch name="Primary" hsl="214 100% 50%" />
                <HslColorSwatch name="Secondary" hsl="210 80% 50%" />
                <HslColorSwatch name="Muted" hsl="217.2 32.6% 17.5%" />
                <HslColorSwatch name="Accent" hsl="174 100% 42%" />
                <HslColorSwatch name="Destructive" hsl="0 62.8% 30.6%" />
                <HslColorSwatch name="Border" hsl="217.2 32.6% 17.5%" />
                <HslColorSwatch name="Input" hsl="217.2 32.6% 17.5%" />
                <HslColorSwatch name="Ring" hsl="214 100% 50%" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="components" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Component Color Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Component</TableHead>
                    <TableHead>Element</TableHead>
                    <TableHead>Color</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Preview</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Buttons */}
                  <TableRow>
                    <TableCell rowSpan={5} className="align-top font-medium">Button</TableCell>
                    <TableCell>Primary</TableCell>
                    <TableCell><code>hsl(var(--primary))</code></TableCell>
                    <TableCell><code>bg-primary text-primary-foreground</code></TableCell>
                    <TableCell><Button>Primary</Button></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Secondary</TableCell>
                    <TableCell><code>hsl(var(--secondary))</code></TableCell>
                    <TableCell><code>bg-secondary text-secondary-foreground</code></TableCell>
                    <TableCell><Button variant="secondary">Secondary</Button></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Destructive</TableCell>
                    <TableCell><code>hsl(var(--destructive))</code></TableCell>
                    <TableCell><code>bg-destructive text-destructive-foreground</code></TableCell>
                    <TableCell><Button variant="destructive">Destructive</Button></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Outline</TableCell>
                    <TableCell><code>transparent</code></TableCell>
                    <TableCell><code>border border-input bg-background</code></TableCell>
                    <TableCell><Button variant="outline">Outline</Button></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Ghost</TableCell>
                    <TableCell><code>transparent</code></TableCell>
                    <TableCell><code>hover:bg-accent hover:text-accent-foreground</code></TableCell>
                    <TableCell><Button variant="ghost">Ghost</Button></TableCell>
                  </TableRow>
                  
                  {/* Cards */}
                  <TableRow>
                    <TableCell rowSpan={3} className="align-top font-medium">Card</TableCell>
                    <TableCell>Background</TableCell>
                    <TableCell><code>hsl(var(--card))</code></TableCell>
                    <TableCell><code>bg-card</code></TableCell>
                    <TableCell><div className="w-12 h-6 bg-card border rounded"></div></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Border</TableCell>
                    <TableCell><code>hsl(var(--border))</code></TableCell>
                    <TableCell><code>border</code></TableCell>
                    <TableCell><div className="w-12 h-6 border rounded"></div></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Shadow</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell><code>shadow-sm</code></TableCell>
                    <TableCell><div className="w-12 h-6 bg-card border rounded shadow-sm"></div></TableCell>
                  </TableRow>
                  
                  {/* Badges */}
                  <TableRow>
                    <TableCell rowSpan={4} className="align-top font-medium">Badge</TableCell>
                    <TableCell>Default</TableCell>
                    <TableCell><code>hsl(var(--primary))</code></TableCell>
                    <TableCell><code>bg-primary text-primary-foreground</code></TableCell>
                    <TableCell><Badge>Badge</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Secondary</TableCell>
                    <TableCell><code>hsl(var(--secondary))</code></TableCell>
                    <TableCell><code>bg-secondary text-secondary-foreground</code></TableCell>
                    <TableCell><Badge variant="secondary">Badge</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Destructive</TableCell>
                    <TableCell><code>hsl(var(--destructive))</code></TableCell>
                    <TableCell><code>bg-destructive text-destructive-foreground</code></TableCell>
                    <TableCell><Badge variant="destructive">Badge</Badge></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Outline</TableCell>
                    <TableCell><code>transparent</code></TableCell>
                    <TableCell><code>text-foreground</code></TableCell>
                    <TableCell><Badge variant="outline">Badge</Badge></TableCell>
                  </TableRow>
                  
                  {/* Form Elements */}
                  <TableRow>
                    <TableCell rowSpan={2} className="align-top font-medium">Form Elements</TableCell>
                    <TableCell>Input</TableCell>
                    <TableCell><code>hsl(var(--input))</code></TableCell>
                    <TableCell><code>border-input</code></TableCell>
                    <TableCell><input className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm" /></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Checkbox</TableCell>
                    <TableCell><code>hsl(var(--primary))</code></TableCell>
                    <TableCell><code>border-primary data-[state=checked]:bg-primary</code></TableCell>
                    <TableCell><Checkbox /></TableCell>
                  </TableRow>
                  
                  {/* Alert */}
                  <TableRow>
                    <TableCell rowSpan={2} className="align-top font-medium">Alert</TableCell>
                    <TableCell>Default</TableCell>
                    <TableCell><code>hsl(var(--background))</code></TableCell>
                    <TableCell><code>bg-background text-foreground</code></TableCell>
                    <TableCell>
                      <Alert className="w-full h-12 flex items-center">
                        <AlertTitle>Alert</AlertTitle>
                      </Alert>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Destructive</TableCell>
                    <TableCell><code>hsl(var(--destructive))</code></TableCell>
                    <TableCell><code>border-destructive/50 text-destructive</code></TableCell>
                    <TableCell>
                      <Alert variant="destructive" className="w-full h-12 flex items-center">
                        <AlertTitle>Alert</AlertTitle>
                      </Alert>
                    </TableCell>
                  </TableRow>
                  
                  {/* IoT Specific */}
                  <TableRow>
                    <TableCell rowSpan={5} className="align-top font-medium">IoT-specific</TableCell>
                    <TableCell>Logo</TableCell>
                    <TableCell><code>#0070f3 to #00d5bd</code></TableCell>
                    <TableCell><code>bg-gradient-to-r from-iot-primary to-iot-accent</code></TableCell>
                    <TableCell><div className="w-10 h-10 rounded-lg bg-gradient-to-r from-iot-primary to-iot-accent"></div></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Gradient Text</TableCell>
                    <TableCell><code>#0070f3 to #00d5bd</code></TableCell>
                    <TableCell><code>gradient-text</code></TableCell>
                    <TableCell><span className="gradient-text font-bold">Gradient</span></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Data Pulse</TableCell>
                    <TableCell><code>#00d038</code></TableCell>
                    <TableCell><code>data-pulse</code></TableCell>
                    <TableCell><div className="data-pulse p-2">Data</div></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Widget Card</TableCell>
                    <TableCell><code>hsl(var(--card))</code></TableCell>
                    <TableCell><code>widget-card</code></TableCell>
                    <TableCell><div className="widget-card p-2 w-16 h-8">Widget</div></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Pattern BG</TableCell>
                    <TableCell><code>#0070f3</code></TableCell>
                    <TableCell><code>hero-pattern</code></TableCell>
                    <TableCell><div className="hero-pattern w-16 h-8 border rounded"></div></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="elements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>UI Elements & States</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Element</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Color</TableHead>
                    <TableHead>CSS Variable / Class</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Text */}
                  <TableRow>
                    <TableCell rowSpan={3} className="align-top font-medium">Text</TableCell>
                    <TableCell>Default</TableCell>
                    <TableCell><code>hsl(var(--foreground))</code></TableCell>
                    <TableCell><code>text-foreground</code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Muted</TableCell>
                    <TableCell><code>hsl(var(--muted-foreground))</code></TableCell>
                    <TableCell><code>text-muted-foreground</code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Gradient</TableCell>
                    <TableCell><code>from-iot-primary via-iot-secondary to-iot-accent</code></TableCell>
                    <TableCell><code>gradient-text</code></TableCell>
                  </TableRow>
                  
                  {/* Background */}
                  <TableRow>
                    <TableCell rowSpan={3} className="align-top font-medium">Background</TableCell>
                    <TableCell>Default</TableCell>
                    <TableCell><code>hsl(var(--background))</code></TableCell>
                    <TableCell><code>bg-background</code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Muted</TableCell>
                    <TableCell><code>hsl(var(--muted))</code></TableCell>
                    <TableCell><code>bg-muted</code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Accent</TableCell>
                    <TableCell><code>hsl(var(--accent))</code></TableCell>
                    <TableCell><code>bg-accent</code></TableCell>
                  </TableRow>
                  
                  {/* Borders */}
                  <TableRow>
                    <TableCell rowSpan={3} className="align-top font-medium">Borders</TableCell>
                    <TableCell>Default</TableCell>
                    <TableCell><code>hsl(var(--border))</code></TableCell>
                    <TableCell><code>border</code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Input</TableCell>
                    <TableCell><code>hsl(var(--input))</code></TableCell>
                    <TableCell><code>border-input</code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Focus Ring</TableCell>
                    <TableCell><code>hsl(var(--ring))</code></TableCell>
                    <TableCell><code>ring-ring</code></TableCell>
                  </TableRow>
                  
                  {/* Tables */}
                  <TableRow>
                    <TableCell rowSpan={3} className="align-top font-medium">Tables</TableCell>
                    <TableCell>Header</TableCell>
                    <TableCell><code>hsl(var(--muted))</code></TableCell>
                    <TableCell><code>bg-muted</code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Cell Border</TableCell>
                    <TableCell><code>hsl(var(--border))</code></TableCell>
                    <TableCell><code>border-border</code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Row Hover</TableCell>
                    <TableCell><code>hsl(var(--muted))</code></TableCell>
                    <TableCell><code>hover:bg-muted</code></TableCell>
                  </TableRow>
                  
                  {/* Icons */}
                  <TableRow>
                    <TableCell rowSpan={4} className="align-top font-medium">Icons</TableCell>
                    <TableCell>Default</TableCell>
                    <TableCell><code>hsl(var(--foreground))</code></TableCell>
                    <TableCell><code>text-foreground</code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Primary</TableCell>
                    <TableCell><code>hsl(var(--primary))</code></TableCell>
                    <TableCell><code>text-primary</code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Muted</TableCell>
                    <TableCell><code>hsl(var(--muted-foreground))</code></TableCell>
                    <TableCell><code>text-muted-foreground</code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Status</TableCell>
                    <TableCell><code>#10b981</code></TableCell>
                    <TableCell><code>text-green-500</code></TableCell>
                  </TableRow>
                  
                  {/* Animations */}
                  <TableRow>
                    <TableCell rowSpan={3} className="align-top font-medium">Animations</TableCell>
                    <TableCell>Pulse</TableCell>
                    <TableCell><code>#00d038</code></TableCell>
                    <TableCell><code>data-pulse</code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Pulse Slow</TableCell>
                    <TableCell><code>opacity: 0.8 to 1</code></TableCell>
                    <TableCell><code>animate-pulse-slow</code></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Float</TableCell>
                    <TableCell><code>translateY(-10px) to translateY(0)</code></TableCell>
                    <TableCell><code>animate-float</code></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="copy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Copy Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-medium text-lg mb-4">IoT Colors</h3>
              <div className="grid grid-cols-1 gap-2 mb-6">
                <CopyBlock label="Primary Blue" value="#0070f3" />
                <CopyBlock label="Secondary Blue" value="#00a2ff" />
                <CopyBlock label="Accent Teal" value="#00d5bd" />
                <CopyBlock label="Dark" value="#111827" />
                <CopyBlock label="Light" value="#f3f4f6" />
              </div>
              
              <h3 className="font-medium text-lg mb-4 mt-8">Component Classes</h3>
              <div className="grid grid-cols-1 gap-2 mb-6">
                <CopyBlock label="Gradient Text" value="gradient-text" type="class" />
                <CopyBlock label="Widget Card" value="widget-card" type="class" />
                <CopyBlock label="Data Pulse" value="data-pulse" type="class" />
                <CopyBlock label="Hero Pattern" value="hero-pattern" type="class" />
                <CopyBlock label="Pulse Animation" value="animate-pulse-slow" type="class" />
                <CopyBlock label="Float Animation" value="animate-float" type="class" />
                <CopyBlock label="Widget Grid" value="widget-grid" type="class" />
              </div>
              
              <h3 className="font-medium text-lg mb-4 mt-8">CSS Variables</h3>
              <div className="grid grid-cols-1 gap-2">
                <CopyBlock label="Primary" value="hsl(var(--primary))" type="css" />
                <CopyBlock label="Secondary" value="hsl(var(--secondary))" type="css" />
                <CopyBlock label="Background" value="hsl(var(--background))" type="css" />
                <CopyBlock label="Foreground" value="hsl(var(--foreground))" type="css" />
                <CopyBlock label="Muted" value="hsl(var(--muted))" type="css" />
                <CopyBlock label="Accent" value="hsl(var(--accent))" type="css" />
                <CopyBlock label="Border" value="hsl(var(--border))" type="css" />
                <CopyBlock label="Destructive" value="hsl(var(--destructive))" type="css" />
              </div>
              
              <h3 className="font-medium text-lg mb-4 mt-8">Tailwind Config</h3>
              <div className="grid grid-cols-1 gap-2">
                <CopyBlock 
                  label="IoT Colors Config" 
                  value={`iot: {
  primary: '#0070f3',
  secondary: '#00a2ff',
  accent: '#00d5bd',
  dark: '#111827',
  light: '#f3f4f6',
}`} 
                  type="code" 
                />
                <CopyBlock 
                  label="Animation Config" 
                  value={`keyframes: {
  'pulse-slow': {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '0.8' },
  },
  'float': {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-10px)' },
  }
},
animation: {
  'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
  'float': 'float 6s ease-in-out infinite',
}`} 
                  type="code" 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Helper components for the color guide
function ColorSwatch({ name, color }: { name: string; color: string }) {
  const [copied, setCopied] = React.useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div 
      className="border rounded-md overflow-hidden cursor-pointer group" 
      onClick={copyToClipboard}
    >
      <div 
        className="h-16 w-full"
        style={{ backgroundColor: color }}
      />
      <div className="p-2 flex justify-between items-center">
        <span>{name}</span>
        <div className="flex items-center space-x-2">
          <code className="text-xs bg-muted px-1 py-0.5 rounded">{color}</code>
          <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground">
            {copied ? "Copied!" : "Click to copy"}
          </span>
        </div>
      </div>
    </div>
  );
}

function HslColorSwatch({ name, hsl }: { name: string; hsl: string }) {
  const [copied, setCopied] = React.useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`hsl(${hsl})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div 
      className="border rounded-md overflow-hidden cursor-pointer group" 
      onClick={copyToClipboard}
    >
      <div 
        className="h-12 w-full"
        style={{ backgroundColor: `hsl(${hsl})` }}
      />
      <div className="p-2 flex justify-between items-center">
        <span>{name}</span>
        <div className="flex items-center space-x-2">
          <code className="text-xs bg-muted px-1 py-0.5 rounded">{hsl}</code>
          <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground">
            {copied ? "Copied!" : "Click to copy"}
          </span>
        </div>
      </div>
    </div>
  );
}

function CopyBlock({ 
  label, 
  value, 
  type = "color" 
}: { 
  label: string; 
  value: string; 
  type?: "color" | "class" | "css" | "code" 
}) {
  const [copied, setCopied] = React.useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div 
      className="border rounded-md overflow-hidden flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors p-2"
      onClick={copyToClipboard}
    >
      <div className="flex items-center gap-3">
        {type === "color" && (
          <div 
            className="h-6 w-6 rounded border" 
            style={{ backgroundColor: value }}
          ></div>
        )}
        {type === "class" && (
          <div className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">class</div>
        )}
        {type === "css" && (
          <div className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded">CSS</div>
        )}
        {type === "code" && (
          <div className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded">code</div>
        )}
        <span>{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <code className="text-xs bg-muted px-2 py-1 rounded max-w-[180px] md:max-w-none overflow-x-auto whitespace-nowrap">{value}</code>
        <span className="text-xs min-w-16 text-right">
          {copied ? "Copied!" : "Click to copy"}
        </span>
      </div>
    </div>
  );
}
