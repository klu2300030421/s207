import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, History, MapPin, Settings, User } from "lucide-react"

export default function Home() {
  return (
    <div className="container max-w-md mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary">AllergyGuard</h1>
        <p className="text-muted-foreground mt-2">Your food safety companion</p>
      </header>

      <Card className="mb-8 bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="text-center">
            <Link href="/scan">
              <Button size="lg" className="w-full h-16 mb-2 gap-2">
                <Camera className="h-5 w-5" />
                Scan Food Label
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground">Scan a product barcode or ingredients list</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <Link href="/restaurants" className="block">
          <Card className="h-full hover:bg-accent/50 transition-colors">
            <CardContent className="flex flex-col items-center justify-center p-6 h-full">
              <MapPin className="h-8 w-8 mb-2 text-primary" />
              <h2 className="font-medium text-center">Safe Restaurants</h2>
            </CardContent>
          </Card>
        </Link>
        <Link href="/history" className="block">
          <Card className="h-full hover:bg-accent/50 transition-colors">
            <CardContent className="flex flex-col items-center justify-center p-6 h-full">
              <History className="h-8 w-8 mb-2 text-primary" />
              <h2 className="font-medium text-center">Scan History</h2>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Link href="/profile" className="block">
          <Card className="h-full hover:bg-accent/50 transition-colors">
            <CardContent className="flex flex-col items-center justify-center p-6 h-full">
              <User className="h-8 w-8 mb-2 text-primary" />
              <h2 className="font-medium text-center">My Profile</h2>
            </CardContent>
          </Card>
        </Link>
        <Link href="/settings" className="block">
          <Card className="h-full hover:bg-accent/50 transition-colors">
            <CardContent className="flex flex-col items-center justify-center p-6 h-full">
              <Settings className="h-8 w-8 mb-2 text-primary" />
              <h2 className="font-medium text-center">Settings</h2>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

