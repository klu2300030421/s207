"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Camera, Check, X, AlertTriangle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ScanPage() {
  const [scanState, setScanState] = useState<"initial" | "scanning" | "results">("initial")
  const [searchQuery, setSearchQuery] = useState("")
  const [scanResults, setScanResults] = useState<null | {
    name: string
    safe: boolean
    warning: boolean
    allergens: string[]
    ingredients: string[]
  }>(null)

  const handleScan = () => {
    setScanState("scanning")

    // Simulate scanning delay
    setTimeout(() => {
      // Mock scan results - in a real app, this would come from an API
      if (searchQuery.toLowerCase().includes("peanut") || Math.random() > 0.7) {
        setScanResults({
          name: searchQuery || "Chocolate Chip Cookies",
          safe: false,
          warning: false,
          allergens: ["Peanuts", "Tree Nuts"],
          ingredients: ["Wheat Flour", "Sugar", "Butter", "Chocolate Chips", "Peanuts", "Eggs"],
        })
      } else if (Math.random() > 0.5) {
        setScanResults({
          name: searchQuery || "Organic Granola Bar",
          safe: false,
          warning: true,
          allergens: [],
          ingredients: ["Oats", "Honey", "Sunflower Seeds", "Dried Cranberries", "May contain traces of nuts"],
        })
      } else {
        setScanResults({
          name: searchQuery || "Rice Crackers",
          safe: true,
          warning: false,
          allergens: [],
          ingredients: ["Rice Flour", "Salt", "Vegetable Oil"],
        })
      }
      setScanState("results")
    }, 2000)
  }

  const resetScan = () => {
    setScanState("initial")
    setSearchQuery("")
    setScanResults(null)
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <header className="flex items-center mb-6">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold ml-2">Scan Food Label</h1>
      </header>

      {scanState === "initial" && (
        <>
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4">
                <div className="text-center mb-2">
                  <p className="text-sm text-muted-foreground mb-4">Scan a barcode or search for a product</p>
                  <Button onClick={handleScan} size="lg" className="w-full h-16 mb-4 gap-2">
                    <Camera className="h-5 w-5" />
                    Activate Camera
                  </Button>
                </div>

                <div className="relative">
                  <p className="text-center text-sm text-muted-foreground mb-2">or</p>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Search for a product"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleScan}>Search</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <h2 className="font-medium mb-4">Recent Scans</h2>
            <div className="grid gap-3">
              {["Rice Crackers", "Chocolate Chip Cookies", "Organic Granola Bar"].map((item, i) => (
                <Card key={i} className="cursor-pointer hover:bg-accent/50 transition-colors">
                  <CardContent className="p-4 flex justify-between items-center">
                    <span>{item}</span>
                    <Badge variant={i === 0 ? "success" : i === 1 ? "destructive" : "warning"}>
                      {i === 0 ? "Safe" : i === 1 ? "Unsafe" : "Caution"}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}

      {scanState === "scanning" && (
        <div className="text-center py-12">
          <div className="w-64 h-64 mx-auto border-4 border-primary rounded-lg mb-6 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/10 animate-pulse"></div>
            <Camera className="h-16 w-16 text-primary/50" />
          </div>
          <p className="text-lg font-medium">Scanning...</p>
          <p className="text-sm text-muted-foreground mt-2">Hold steady while we analyze</p>
          <Button variant="outline" className="mt-6" onClick={resetScan}>
            Cancel
          </Button>
        </div>
      )}

      {scanState === "results" && scanResults && (
        <div>
          <Card className="mb-6 overflow-hidden">
            <div
              className={`p-4 text-center text-white font-medium ${
                scanResults.safe ? "bg-green-500" : scanResults.warning ? "bg-amber-500" : "bg-red-500"
              }`}
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                {scanResults.safe ? (
                  <Check className="h-5 w-5" />
                ) : scanResults.warning ? (
                  <AlertTriangle className="h-5 w-5" />
                ) : (
                  <X className="h-5 w-5" />
                )}
                <span>
                  {scanResults.safe ? "Safe to Eat" : scanResults.warning ? "Caution Advised" : "Contains Allergens"}
                </span>
              </div>
              <p className="text-sm opacity-90">
                {scanResults.safe
                  ? "This product appears safe based on your profile"
                  : scanResults.warning
                    ? "May contain traces of allergens"
                    : "This product contains allergens you're sensitive to"}
              </p>
            </div>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">{scanResults.name}</h2>

              <Tabs defaultValue="summary">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="summary" className="flex-1">
                    Summary
                  </TabsTrigger>
                  <TabsTrigger value="ingredients" className="flex-1">
                    Ingredients
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="summary">
                  {!scanResults.safe && !scanResults.warning && (
                    <div className="mb-4">
                      <h3 className="font-medium text-red-500 mb-2">Detected Allergens:</h3>
                      <div className="flex flex-wrap gap-2">
                        {scanResults.allergens.map((allergen, i) => (
                          <Badge key={i} variant="destructive">
                            {allergen}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {scanResults.warning && (
                    <div className="p-3 bg-amber-50 border border-amber-200 rounded-md mb-4">
                      <p className="text-amber-800 text-sm">
                        This product may contain traces of allergens or was produced in a facility that also processes
                        allergens.
                      </p>
                    </div>
                  )}

                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Your Allergen Profile:</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Peanuts</Badge>
                      <Badge variant="outline">Tree Nuts</Badge>
                      <Badge variant="outline">Shellfish</Badge>
                    </div>
                  </div>

                  <Button className="w-full" onClick={resetScan}>
                    Scan Another Product
                  </Button>
                </TabsContent>

                <TabsContent value="ingredients">
                  <div className="mb-4">
                    <h3 className="font-medium mb-2">Ingredients:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {scanResults.ingredients.map((ingredient, i) => {
                        const isAllergen = scanResults.allergens.some((allergen) =>
                          ingredient.toLowerCase().includes(allergen.toLowerCase()),
                        )
                        return (
                          <li key={i} className={isAllergen ? "text-red-600 font-medium" : ""}>
                            {ingredient}
                            {isAllergen && " (allergen)"}
                          </li>
                        )
                      })}
                    </ul>
                  </div>

                  <Button className="w-full" onClick={resetScan}>
                    Scan Another Product
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="text-center">
            <Link href="/restaurants">
              <Button variant="outline" className="w-full">
                Find Safe Restaurants Nearby
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

