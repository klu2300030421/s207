"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, MapPin, Search, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock restaurant data
const RESTAURANTS = [
  {
    id: 1,
    name: "Allergy-Friendly Cafe",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.8,
    reviews: 124,
    distance: "0.3 miles",
    address: "123 Main St",
    safetyScore: 95,
    allergenOptions: ["Gluten-Free", "Nut-Free", "Dairy-Free"],
    categories: ["Cafe", "Breakfast"],
  },
  {
    id: 2,
    name: "Pure Eats Restaurant",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.5,
    reviews: 89,
    distance: "0.7 miles",
    address: "456 Oak Ave",
    safetyScore: 90,
    allergenOptions: ["Gluten-Free", "Dairy-Free"],
    categories: ["American", "Lunch"],
  },
  {
    id: 3,
    name: "Safe Bites Bistro",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.7,
    reviews: 156,
    distance: "1.2 miles",
    address: "789 Pine St",
    safetyScore: 98,
    allergenOptions: ["Nut-Free", "Shellfish-Free", "Gluten-Free"],
    categories: ["Italian", "Dinner"],
  },
  {
    id: 4,
    name: "Conscious Kitchen",
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.3,
    reviews: 67,
    distance: "1.5 miles",
    address: "101 Elm St",
    safetyScore: 85,
    allergenOptions: ["Dairy-Free", "Soy-Free"],
    categories: ["Vegan", "Healthy"],
  },
]

export default function RestaurantsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRestaurants = RESTAURANTS.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.categories.some((cat) => cat.toLowerCase().includes(searchQuery.toLowerCase())) ||
      restaurant.allergenOptions.some((opt) => opt.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <header className="flex items-center mb-6">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold ml-2">Safe Restaurants</h1>
      </header>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search restaurants, cuisines..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="nearby" className="mb-6">
        <TabsList className="w-full">
          <TabsTrigger value="nearby" className="flex-1">
            Nearby
          </TabsTrigger>
          <TabsTrigger value="saved" className="flex-1">
            Saved
          </TabsTrigger>
          <TabsTrigger value="recommended" className="flex-1">
            Recommended
          </TabsTrigger>
        </TabsList>

        <TabsContent value="nearby" className="mt-4">
          <div className="space-y-4">
            {filteredRestaurants.length > 0 ? (
              filteredRestaurants.map((restaurant) => (
                <Link href={`/restaurants/${restaurant.id}`} key={restaurant.id}>
                  <Card className="hover:bg-accent/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="relative h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={restaurant.image || "/placeholder.svg"}
                            alt={restaurant.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium">{restaurant.name}</h3>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              {restaurant.safetyScore}% Safe
                            </Badge>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400 mr-1" />
                            <span>{restaurant.rating}</span>
                            <span className="mx-1">•</span>
                            <span>{restaurant.reviews} reviews</span>
                            <span className="mx-1">•</span>
                            <span>{restaurant.distance}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {restaurant.allergenOptions.map((option, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {option}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No restaurants found matching your criteria</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="saved">
          <div className="text-center py-8">
            <p className="text-muted-foreground">You haven't saved any restaurants yet</p>
            <Button variant="outline" className="mt-4">
              Browse Nearby Restaurants
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="recommended">
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Recommendations will appear based on your allergen profile and dining history
            </p>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex items-center justify-center">
        <Button variant="outline" className="gap-2">
          <MapPin className="h-4 w-4" />
          View Map
        </Button>
      </div>
    </div>
  )
}

