"use client"

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle, Trash2 } from "lucide-react"

export function CreatePoll() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Create New Poll</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="question">Question</Label>
          <Input id="question" placeholder="e.g., Best time for practice?" />
        </div>
        <div className="space-y-2">
          <Label>Options</Label>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Input placeholder="Option 1" />
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Input placeholder="Option 2" />
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" className="w-full">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Option
        </Button>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Publish Poll</Button>
      </CardFooter>
    </Card>
  )
}
