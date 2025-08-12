"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Upload, Download, Copy, Check, ImageIcon, FileText } from "lucide-react"
import { Header } from "@/components/header"
import { useToast } from "@/hooks/use-toast"

export default function ConvertPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [svgOutput, setSvgOutput] = useState<string>("")
  const [isConverting, setIsConverting] = useState(false)
  const [copiedSvg, setCopiedSvg] = useState(false)
  const [settings, setSettings] = useState({
    width: 200,
    height: 200,
    quality: 80,
    colors: 16,
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.type.startsWith("image/")) {
        setSelectedFile(file)
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
        setSvgOutput("")
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select an image file (PNG, JPG, GIF, etc.)",
          variant: "destructive",
        })
      }
    }
  }

  const convertToSVG = async () => {
    if (!selectedFile) return

    setIsConverting(true)
    try {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()

      img.onload = () => {
        canvas.width = settings.width
        canvas.height = settings.height
        ctx?.drawImage(img, 0, 0, settings.width, settings.height)

        const imageData = ctx?.getImageData(0, 0, settings.width, settings.height)
        if (!imageData) return

        const svgContent = createHighQualitySVG(imageData, settings)
        setSvgOutput(svgContent)
        setIsConverting(false)

        toast({
          title: "Conversion complete!",
          description: "Your image has been converted to high-quality SVG format",
        })
      }

      img.onerror = () => {
        setIsConverting(false)
        toast({
          title: "Conversion failed",
          description: "Unable to process the selected image",
          variant: "destructive",
        })
      }

      img.src = previewUrl
    } catch (error) {
      setIsConverting(false)
      toast({
        title: "Conversion failed",
        description: "An error occurred during conversion",
        variant: "destructive",
      })
    }
  }

  const createHighQualitySVG = (imageData: ImageData, settings: any) => {
    const { width, height, colors } = settings
    const data = imageData.data

    let svgContent = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">\n`

    // Create a more accurate representation using rectangles with proper sampling
    const pixelSize = Math.max(1, Math.floor(Math.min(width, height) / 100))

    for (let y = 0; y < height; y += pixelSize) {
      for (let x = 0; x < width; x += pixelSize) {
        const index = (y * width + x) * 4
        const r = data[index]
        const g = data[index + 1]
        const b = data[index + 2]
        const a = data[index + 3] / 255

        // Skip transparent pixels
        if (a < 0.1) continue

        // Quantize colors for cleaner output
        const quantizedR = Math.round(r / (256 / Math.min(colors / 8, 32))) * (256 / Math.min(colors / 8, 32))
        const quantizedG = Math.round(g / (256 / Math.min(colors / 8, 32))) * (256 / Math.min(colors / 8, 32))
        const quantizedB = Math.round(b / (256 / Math.min(colors / 8, 32))) * (256 / Math.min(colors / 8, 32))

        const color = `rgb(${quantizedR},${quantizedG},${quantizedB})`
        const opacity = Math.round(a * 100) / 100

        svgContent += `  <rect x="${x}" y="${y}" width="${pixelSize}" height="${pixelSize}" fill="${color}" opacity="${opacity}"/>\n`
      }
    }

    svgContent += "</svg>"
    return svgContent
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(svgOutput)
      setCopiedSvg(true)
      toast({
        title: "Copied!",
        description: "SVG code copied to clipboard",
      })
      setTimeout(() => setCopiedSvg(false), 2000)
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      })
    }
  }

  const downloadSVG = () => {
    const blob = new Blob([svgOutput], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `converted-${selectedFile?.name?.split(".")[0] || "image"}.svg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Image to SVG Converter</h1>
          <p className="text-muted-foreground text-lg">
            Convert your images to scalable SVG format. Upload an image and customize the conversion settings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload and Settings */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Upload Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {previewUrl ? (
                    <div className="space-y-4">
                      <img
                        src={previewUrl || "/placeholder.svg"}
                        alt="Preview"
                        className="max-w-full max-h-48 mx-auto rounded-lg shadow-sm"
                      />
                      <p className="text-sm text-muted-foreground">{selectedFile?.name}</p>
                      <Button variant="outline" size="sm">
                        Change Image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto" />
                      <div>
                        <p className="text-lg font-medium text-foreground">Drop an image here</p>
                        <p className="text-sm text-muted-foreground">or click to browse</p>
                      </div>
                      <p className="text-xs text-muted-foreground">Supports PNG, JPG, GIF, WebP</p>
                    </div>
                  )}
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conversion Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="width">Width (px)</Label>
                    <Input
                      id="width"
                      type="number"
                      value={settings.width}
                      onChange={(e) => setSettings({ ...settings, width: Number.parseInt(e.target.value) || 200 })}
                      min="50"
                      max="1000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="height">Height (px)</Label>
                    <Input
                      id="height"
                      type="number"
                      value={settings.height}
                      onChange={(e) => setSettings({ ...settings, height: Number.parseInt(e.target.value) || 200 })}
                      min="50"
                      max="1000"
                    />
                  </div>
                </div>

                <div>
                  <Label>Quality: {settings.quality}%</Label>
                  <Slider
                    value={[settings.quality]}
                    onValueChange={(value) => setSettings({ ...settings, quality: value[0] })}
                    max={100}
                    min={10}
                    step={10}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Color Reduction: {settings.colors} colors</Label>
                  <Slider
                    value={[settings.colors]}
                    onValueChange={(value) => setSettings({ ...settings, colors: value[0] })}
                    max={256}
                    min={8}
                    step={8}
                    className="mt-2"
                  />
                </div>

                <Button onClick={convertToSVG} disabled={!selectedFile || isConverting} className="w-full" size="lg">
                  {isConverting ? "Converting..." : "Convert to SVG"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Output */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  SVG Output
                </CardTitle>
              </CardHeader>
              <CardContent>
                {svgOutput ? (
                  <Tabs defaultValue="preview" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                      <TabsTrigger value="code">Code</TabsTrigger>
                    </TabsList>
                    <TabsContent value="preview" className="mt-4">
                      <div className="border rounded-lg p-4 bg-white min-h-[200px] flex items-center justify-center">
                        <div dangerouslySetInnerHTML={{ __html: svgOutput }} />
                      </div>
                    </TabsContent>
                    <TabsContent value="code" className="mt-4">
                      <div className="relative">
                        <pre className="bg-muted p-4 rounded-lg text-sm overflow-auto max-h-[300px] text-foreground">
                          <code>{svgOutput}</code>
                        </pre>
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute top-2 right-2 bg-transparent"
                          onClick={copyToClipboard}
                        >
                          {copiedSvg ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                ) : (
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center min-h-[200px] flex items-center justify-center">
                    <div className="space-y-2">
                      <FileText className="h-8 w-8 text-muted-foreground mx-auto" />
                      <p className="text-muted-foreground">SVG output will appear here</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {svgOutput && (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex gap-2">
                    <Button onClick={copyToClipboard} variant="outline" className="flex-1 bg-transparent">
                      {copiedSvg ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                      Copy SVG
                    </Button>
                    <Button onClick={downloadSVG} className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>How it Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>• Upload any image format (PNG, JPG, GIF, WebP)</p>
              <p>• Adjust dimensions and quality settings</p>
              <p>• The converter creates accurate pixel-based SVG representation</p>
              <p>• Download or copy the generated SVG code</p>
              <p>• Use the SVG in web projects, presentations, or designs</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tips for Best Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>• Use images with clear contrast and defined shapes</p>
              <p>• Higher dimensions preserve more detail</p>
              <p>• More colors create more accurate representation</p>
              <p>• Icons and logos work better than complex photos</p>
              <p>• Adjust quality settings for optimal file size vs detail balance</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
