import {
    NavigationMenu, NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList, NavigationMenuTrigger
} from "@/components/ui/navigation-menu";

export function MainNav() {
    const navGroups = [
        {
            name: "onCue",
            items: [
                { name: "Convert", href: "/" },
                { name: "Privacy Policy", href: "/onCue/privacy-policy" },
                { name: "Feedback", href: "https://bw-studios.notion.site/18e923382aec80fba1c6c5f6ec0c8fec" }
            ]
        }
    ]
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink href="/">
                        Home
                    </NavigationMenuLink>
                </NavigationMenuItem>
                {navGroups.map((group) => (
                    <NavigationMenuItem key={group.name}>
                        <NavigationMenuTrigger>{group.name}</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            {group.items.map((item) => (
                                <NavigationMenuLink key={item.name} href={item.href}>
                                    {item.name}
                                </NavigationMenuLink>
                            ))}
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    )
}