// components/MainNav.tsx
import * as React from "react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export function MainNav() {
  return (
    <NavigationMenu className={"p-4"}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="https://the-wolfson.github.io">
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>onCue</NavigationMenuTrigger>
          <NavigationMenuContent>
              <NavigationMenuLink href="">
                Download
              </NavigationMenuLink>
              <NavigationMenuLink href="/">
                Convert
              </NavigationMenuLink>
              <NavigationMenuLink href={"https://the-wolfson.github.io/onCue/privacy-policy"}>
                  Privacy Policy
              </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}