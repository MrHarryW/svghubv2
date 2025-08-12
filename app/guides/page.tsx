"use client"

import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, Check, ExternalLink } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export default function GuidesPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(id)
      toast.success("Code copied to clipboard!")
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      toast.error("Failed to copy code")
    }
  }

  const CodeBlock = ({ code, language, id }: { code: string; language: string; id: string }) => (
    <div className="relative">
      <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
        <code className={`language-${language}`}>{code}</code>
      </pre>
      <Button
        size="sm"
        variant="outline"
        className="absolute top-2 right-2 bg-transparent"
        onClick={() => copyToClipboard(code, id)}
      >
        {copiedCode === id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Integration Guides</h1>
          <p className="text-muted-foreground text-lg">
            Learn how to use SVG icons in different frameworks and environments. Copy-paste ready code examples.
          </p>
        </div>

        <Tabs defaultValue="react" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
            <TabsTrigger value="react">React</TabsTrigger>
            <TabsTrigger value="vue">Vue.js</TabsTrigger>
            <TabsTrigger value="html">HTML/CSS</TabsTrigger>
            <TabsTrigger value="svelte">Svelte</TabsTrigger>
            <TabsTrigger value="angular">Angular</TabsTrigger>
            <TabsTrigger value="nextjs">Next.js</TabsTrigger>
          </TabsList>

          {/* React Integration */}
          <TabsContent value="react" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  React Integration
                  <Badge variant="secondary">TypeScript Ready</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">1. Direct SVG Component</h3>
                  <p className="text-muted-foreground mb-4">Create reusable icon components:</p>
                  <CodeBlock
                    id="react-component"
                    language="tsx"
                    code={`// components/icons/HomeIcon.tsx
import React from 'react';

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export const HomeIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M9 22V12H15V22" 
      stroke={color} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

// Usage
<HomeIcon size={32} color="#3B82F6" className="hover:scale-110" />`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">2. Dynamic Icon System</h3>
                  <p className="text-muted-foreground mb-4">Build a flexible icon system:</p>
                  <CodeBlock
                    id="react-dynamic"
                    language="tsx"
                    code={`// components/Icon.tsx
import React from 'react';

const iconPaths = {
  home: "M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z M9 22V12H15V22",
  search: "M11 11C11 16.5228 15.4772 21 21 21M21 21L16.65 16.65M21 21V13M21 21H13",
  user: "M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21 M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
};

interface IconProps {
  name: keyof typeof iconPaths;
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className = ""
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d={iconPaths[name]} />
  </svg>
);

// Usage
<Icon name="home" size={24} color="#10B981" />
<Icon name="search" className="text-blue-500 hover:text-blue-700" />
<Icon name="user" strokeWidth={1.5} />`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">3. With React Hook</h3>
                  <p className="text-muted-foreground mb-4">Create a custom hook for icon management:</p>
                  <CodeBlock
                    id="react-hook"
                    language="tsx"
                    code={`// hooks/useIcon.ts
import { useState, useEffect } from 'react';

export const useIcon = (iconName: string) => {
  const [svgContent, setSvgContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching from your SVG library
    const fetchIcon = async () => {
      try {
        // Replace with your actual SVG fetching logic
        const response = await fetch(\`/api/icons/\${iconName}\`);
        const svg = await response.text();
        setSvgContent(svg);
      } catch (error) {
        console.error('Failed to load icon:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIcon();
  }, [iconName]);

  return { svgContent, loading };
};

// Component using the hook
const DynamicIcon = ({ name }: { name: string }) => {
  const { svgContent, loading } = useIcon(name);

  if (loading) return <div className="w-6 h-6 bg-gray-200 animate-pulse rounded" />;

  return (
    <div 
      className="inline-block"
      dangerouslySetInnerHTML={{ __html: svgContent }} 
    />
  );
};`}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vue.js Integration */}
          <TabsContent value="vue" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Vue.js Integration
                  <Badge variant="secondary">Vue 3 + Composition API</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">1. Vue Component</h3>
                  <CodeBlock
                    id="vue-component"
                    language="vue"
                    code={`<!-- components/IconHome.vue -->
<template>
  <svg 
    :width="size" 
    :height="size" 
    viewBox="0 0 24 24" 
    fill="none"
    :class="className"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" 
      :stroke="color" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M9 22V12H15V22" 
      :stroke="color" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  size?: number
  color?: string
  className?: string
}

withDefaults(defineProps<Props>(), {
  size: 24,
  color: 'currentColor',
  className: ''
})
</script>

<!-- Usage -->
<IconHome :size="32" color="#3B82F6" class-name="hover:scale-110" />`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">2. Dynamic Icon Component</h3>
                  <CodeBlock
                    id="vue-dynamic"
                    language="vue"
                    code={`<!-- components/Icon.vue -->
<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    :stroke="color"
    :strokeWidth="strokeWidth"
    strokeLinecap="round"
    strokeLinejoin="round"
    :class="className"
  >
    <path :d="iconPath" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  name: string
  size?: number
  color?: string
  strokeWidth?: number
  className?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
  color: 'currentColor',
  strokeWidth: 2,
  className: ''
})

const iconPaths: Record<string, string> = {
  home: "M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z M9 22V12H15V22",
  search: "M11 11C11 16.5228 15.4772 21 21 21M21 21L16.65 16.65M21 21V13M21 21H13",
  user: "M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21 M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
}

const iconPath = computed(() => iconPaths[props.name] || '')
</script>

<!-- Usage -->
<Icon name="home" :size="24" color="#10B981" />
<Icon name="search" class-name="text-blue-500 hover:text-blue-700" />`}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* HTML/CSS Integration */}
          <TabsContent value="html" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>HTML/CSS Integration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">1. Inline SVG</h3>
                  <CodeBlock
                    id="html-inline"
                    language="html"
                    code={`<!-- Direct inline SVG -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

<!-- With CSS classes -->
<svg class="icon icon-home" viewBox="0 0 24 24">
  <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">2. CSS Styling</h3>
                  <CodeBlock
                    id="html-css"
                    language="css"
                    code={`.icon {
  width: 24px;
  height: 24px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: all 0.2s ease;
}

/* Size variations */
.icon-sm { width: 16px; height: 16px; }
.icon-md { width: 24px; height: 24px; }
.icon-lg { width: 32px; height: 32px; }
.icon-xl { width: 48px; height: 48px; }

/* Color variations */
.icon-primary { color: #3B82F6; }
.icon-success { color: #10B981; }
.icon-warning { color: #F59E0B; }
.icon-danger { color: #EF4444; }

/* Interactive states */
.icon:hover {
  transform: scale(1.1);
  opacity: 0.8;
}

.icon-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.icon-button:hover {
  background: #F9FAFB;
  border-color: #D1D5DB;
}`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">3. SVG Sprite System</h3>
                  <CodeBlock
                    id="html-sprite"
                    language="html"
                    code={`<!-- Define sprite (hidden) -->
<svg style="display: none;">
  <defs>
    <symbol id="icon-home" viewBox="0 0 24 24">
      <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </symbol>
    <symbol id="icon-search" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
      <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </symbol>
  </defs>
</svg>

<!-- Use icons -->
<svg class="icon icon-md">
  <use href="#icon-home"></use>
</svg>

<svg class="icon icon-lg icon-primary">
  <use href="#icon-search"></use>
</svg>`}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Svelte Integration */}
          <TabsContent value="svelte" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Svelte Integration
                  <Badge variant="secondary">Svelte 5 Ready</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">1. Svelte Component</h3>
                  <CodeBlock
                    id="svelte-component"
                    language="svelte"
                    code={`<!-- Icon.svelte -->
<script>
  let { name, size = 24, color = 'currentColor', strokeWidth = 2, className = '' } = $props();
  
  const iconPaths = {
    home: "M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z M9 22V12H15V22",
    search: "M11 11C11 16.5228 15.4772 21 21 21M21 21L16.65 16.65M21 21V13M21 21H13",
    user: "M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21 M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
  };
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke={color}
  strokeWidth={strokeWidth}
  strokeLinecap="round"
  strokeLinejoin="round"
  class={className}
>
  <path d={iconPaths[name]} />
</svg>

<!-- Usage -->
<Icon name="home" size={32} color="#3B82F6" className="hover:scale-110" />
<Icon name="search" className="text-blue-500" />
<Icon name="user" strokeWidth={1.5} />`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">2. With Reactive State</h3>
                  <CodeBlock
                    id="svelte-reactive"
                    language="svelte"
                    code={`<!-- IconButton.svelte -->
<script>
  let { icon, label, onclick } = $props();
  let isHovered = $state(false);
  let isPressed = $state(false);
  
  const iconSize = $derived(isPressed ? 20 : isHovered ? 28 : 24);
  const iconColor = $derived(isPressed ? '#1D4ED8' : isHovered ? '#3B82F6' : 'currentColor');
</script>

<button
  class="icon-button"
  onmouseenter={() => isHovered = true}
  onmouseleave={() => isHovered = false}
  onmousedown={() => isPressed = true}
  onmouseup={() => isPressed = false}
  {onclick}
>
  <Icon name={icon} size={iconSize} color={iconColor} />
  <span>{label}</span>
</button>

<style>
  .icon-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    background: white;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .icon-button:hover {
    background: #f9fafb;
    border-color: #d1d5db;
  }
</style>`}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Angular Integration */}
          <TabsContent value="angular" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Angular Integration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">1. Angular Component</h3>
                  <CodeBlock
                    id="angular-component"
                    language="typescript"
                    code={`// icon.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  template: \`
    <svg
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 24 24"
      fill="none"
      [attr.stroke]="color"
      [attr.stroke-width]="strokeWidth"
      strokeLinecap="round"
      strokeLinejoin="round"
      [class]="className"
    >
      <path [attr.d]="iconPath" />
    </svg>
  \`,
  styleUrls: ['./icon.component.css']
})
export class IconComponent {
  @Input() name: string = '';
  @Input() size: number = 24;
  @Input() color: string = 'currentColor';
  @Input() strokeWidth: number = 2;
  @Input() className: string = '';

  private iconPaths: { [key: string]: string } = {
    home: "M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z M9 22V12H15V22",
    search: "M11 11C11 16.5228 15.4772 21 21 21M21 21L16.65 16.65M21 21V13M21 21H13",
    user: "M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21 M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
  };

  get iconPath(): string {
    return this.iconPaths[this.name] || '';
  }
}

// Usage in template
<app-icon name="home" [size]="32" color="#3B82F6" className="hover-scale"></app-icon>
<app-icon name="search" className="text-blue-500"></app-icon>`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">2. Icon Service</h3>
                  <CodeBlock
                    id="angular-service"
                    language="typescript"
                    code={`// icon.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface IconData {
  name: string;
  path: string;
  viewBox?: string;
}

@Injectable({
  providedIn: 'root'
})
export class IconService {
  private icons: Map<string, IconData> = new Map();

  constructor() {
    this.loadDefaultIcons();
  }

  private loadDefaultIcons(): void {
    const defaultIcons: IconData[] = [
      {
        name: 'home',
        path: 'M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z M9 22V12H15V22'
      },
      {
        name: 'search',
        path: 'M11 11C11 16.5228 15.4772 21 21 21M21 21L16.65 16.65M21 21V13M21 21H13'
      }
    ];

    defaultIcons.forEach(icon => this.icons.set(icon.name, icon));
  }

  getIcon(name: string): Observable<IconData | undefined> {
    return of(this.icons.get(name));
  }

  registerIcon(icon: IconData): void {
    this.icons.set(icon.name, icon);
  }
}

// Usage in component
constructor(private iconService: IconService) {}

ngOnInit() {
  this.iconService.getIcon('home').subscribe(icon => {
    this.homeIcon = icon;
  });
}`}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Next.js Integration */}
          <TabsContent value="nextjs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Next.js Integration
                  <Badge variant="secondary">App Router + Server Components</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">1. Server Component</h3>
                  <CodeBlock
                    id="nextjs-server"
                    language="tsx"
                    code={`// components/Icon.tsx (Server Component)
import { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  name: string;
  size?: number;
}

const iconPaths: Record<string, string> = {
  home: "M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z M9 22V12H15V22",
  search: "M11 11C11 16.5228 15.4772 21 21 21M21 21L16.65 16.65M21 21V13M21 21H13",
  user: "M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21 M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
};

export function Icon({ name, size = 24, ...props }: IconProps) {
  const path = iconPaths[name];
  
  if (!path) {
    console.warn(\`Icon "\${name}" not found\`);
    return null;
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d={path} />
    </svg>
  );
}

// Usage
<Icon name="home" size={24} className="text-blue-500" />
<Icon name="search" size={32} style={{ color: '#10B981' }} />`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">2. Dynamic Import with Suspense</h3>
                  <CodeBlock
                    id="nextjs-dynamic"
                    language="tsx"
                    code={`// components/DynamicIcon.tsx
'use client';

import { Suspense, lazy } from 'react';

const IconComponents = {
  home: lazy(() => import('./icons/HomeIcon')),
  search: lazy(() => import('./icons/SearchIcon')),
  user: lazy(() => import('./icons/UserIcon')),
};

interface DynamicIconProps {
  name: keyof typeof IconComponents;
  size?: number;
  className?: string;
}

function IconFallback({ size = 24 }: { size?: number }) {
  return (
    <div 
      className="animate-pulse bg-gray-200 rounded"
      style={{ width: size, height: size }}
    />
  );
}

export function DynamicIcon({ name, size = 24, className }: DynamicIconProps) {
  const IconComponent = IconComponents[name];

  if (!IconComponent) {
    return <IconFallback size={size} />;
  }

  return (
    <Suspense fallback={<IconFallback size={size} />}>
      <IconComponent size={size} className={className} />
    </Suspense>
  );
}

// Usage
<DynamicIcon name="home" size={24} className="text-blue-500" />
<DynamicIcon name="search" size={32} className="hover:scale-110" />`}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">3. API Route for Icons</h3>
                  <CodeBlock
                    id="nextjs-api"
                    language="typescript"
                    code={`// app/api/icons/[name]/route.ts
import { NextRequest, NextResponse } from 'next/server';

const icons: Record<string, string> = {
  home: \`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"/>
    <path d="M9 22V12H15V22"/>
  </svg>\`,
  search: \`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.35-4.35"/>
  </svg>\`
};

export async function GET(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  const { name } = params;
  const icon = icons[name];

  if (!icon) {
    return NextResponse.json(
      { error: 'Icon not found' },
      { status: 404 }
    );
  }

  return new NextResponse(icon, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}

// Client-side usage
const fetchIcon = async (name: string) => {
  const response = await fetch(\`/api/icons/\${name}\`);
  return response.text();
};`}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Best Practices */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Best Practices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Performance</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Use SVG sprites for multiple icons</li>
                  <li>• Implement lazy loading for large icon sets</li>
                  <li>• Optimize SVG paths and remove unnecessary attributes</li>
                  <li>• Consider icon fonts for very large collections</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Accessibility</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Add aria-label or title for screen readers</li>
                  <li>• Use role="img" for decorative icons</li>
                  <li>• Ensure sufficient color contrast</li>
                  <li>• Provide text alternatives when needed</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Styling</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Use currentColor for flexible theming</li>
                  <li>• Set consistent sizing with CSS custom properties</li>
                  <li>• Add smooth transitions for interactive states</li>
                  <li>• Consider dark mode compatibility</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Organization</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Group icons by category or usage</li>
                  <li>• Use consistent naming conventions</li>
                  <li>• Document icon variants and sizes</li>
                  <li>• Version control your icon library</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resources */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Additional Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/SVG"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="text-sm">MDN SVG Documentation</span>
              </a>
              <a
                href="https://www.w3.org/WAI/ARIA/apg/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="text-sm">ARIA Authoring Practices</span>
              </a>
              <a
                href="https://jakearchibald.github.io/svgomg/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                <span className="text-sm">SVGO Optimizer</span>
              </a>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
