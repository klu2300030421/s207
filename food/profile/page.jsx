"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const COMMON_ALLERGENS = [
  { id: "peanuts", label: "Peanuts" },
  { id: "tree-nuts", label: "Tree Nuts" },
  { id: "milk", label: "Milk" },
  { id: "eggs", label: "Eggs" },
  { id: "fish", label: "Fish" },
  { id: "shellfish", label: "Shellfish" },
  { id: "soy", label: "Soy" },
  { id: "wheat", label: "Wheat" },
  { id: "sesame", label: "Sesame" },
]

export default function ProfilePage() {
  const [selectedAllergens, setSelectedAllergens] = useState(["peanuts", "tree-nuts", "shellfish"])
  const [showAddCustom, setShowAddCustom] = useState(false)
  const [customAllergen, setCustomAllergen] = useState("")
  const [sensitivity, setSensitivity] = useState("high")

  const toggleAllergen = (id: string) => {
    if (selectedAllergens.includes(id)) {
      setSelectedAllergens(selectedAllergens.filter((item) => item !== id))
    } else {
      setSelectedAllergens([...selectedAllergens, id])
    }
  }

  const addCustomAllergen = () => {
    if (customAllergen.trim()) {
      // In a real app, we'd generate a unique ID
      const id = `custom-${customAllergen.toLowerCase().replace(/\s+/g, "-")}`
      setSelectedAllergens([...selectedAllergens, id])
      setCustomAllergen("")
      setShowAddCustom(false)
    }
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <header className="flex items-center mb-6">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold ml-2">My Allergen Profile</h1>
      </header>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Your Allergens</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {COMMON_ALLERGENS.map((allergen) => (
              <div key={allergen.id} className="flex items-center space-x-2">
                <Checkbox
                  id={allergen.id}
                  checked={selectedAllergens.includes(allergen.id)}
                  onCheckedChange={() => toggleAllergen(allergen.id)}
                />
                <Label htmlFor={allergen.id} className="flex-1 cursor-pointer">
                  {allergen.label}
                </Label>
                {selectedAllergens.includes(allergen.id) && (
                  <Badge variant="outline" className="ml-auto">
                    {sensitivity === "high" ? "High" : sensitivity === "medium" ? "Medium" : "Low"}
                  </Badge>
                )}
              </div>
            ))}

            {/* Custom allergens would be listed here */}
            {selectedAllergens
              .filter((id) => !COMMON_ALLERGENS.some((a) => a.id === id))
              .map((id) => {
                const label = id.replace("custom-", "").replace(/-/g, " ")
                return (
                  <div key={id} className="flex items-center space-x-2">
                    <Checkbox id={id} checked={true} onCheckedChange={() => toggleAllergen(id)} />
                    <Label htmlFor={id} className="flex-1 cursor-pointer capitalize">
                      {label}
                    </Label>
                    <Badge variant="outline" className="ml-auto">
                      {sensitivity === "high" ? "High" : sensitivity === "medium" ? "Medium" : "Low"}
                    </Badge>
                  </div>
                )
              })}

            {showAddCustom ? (
              <div className="flex items-center gap-2 mt-4">
                <Input
                  placeholder="Enter allergen name"
                  value={customAllergen}
                  onChange={(e) => setCustomAllergen(e.target.value)}
                  className="flex-1"
                />
                <Button size="sm" onClick={addCustomAllergen}>
                  Add
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setShowAddCustom(false)
                    setCustomAllergen("")
                  }}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" className="mt-4" onClick={() => setShowAddCustom(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Custom Allergen
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Sensitivity Level</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={sensitivity} onValueChange={setSensitivity}>
            <SelectTrigger>
              <SelectValue placeholder="Select sensitivity level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High (Avoid all traces)</SelectItem>
              <SelectItem value="medium">Medium (Small traces may be ok)</SelectItem>
              <SelectItem value="low">Low (Only avoid direct ingredients)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground mt-2">
            This helps us determine how strict to be when analyzing products.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Dietary Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {["vegetarian", "vegan", "gluten-free", "dairy-free"].map((pref) => (
              <div key={pref} className="flex items-center space-x-2">
                <Checkbox id={pref} />
                <Label htmlFor={pref} className="capitalize cursor-pointer">
                  {pref.replace("-", " ")}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button className="w-full mt-6">Save Changes</Button>
    </div>
  )
}

