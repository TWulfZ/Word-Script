import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { InfoIcon } from "lucide-react"

interface InfoProps {
  title: string,
  children: React.ReactNode,
  className?: string
}

export default function Info({title, children, className }: InfoProps) {
  return (
    <div className={`flex items-center space-x-2${className}`}>
      <HoverCard>
        <HoverCardTrigger asChild>
          <InfoIcon className="h-5 w-5 text-muted-foreground cursor-help" />
        </HoverCardTrigger>
        <HoverCardContent className="w-[420px] mx-4">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">{title}</h4>
            <p className="text-sm text-muted-foreground">
              {children}
            </p>
            <a href="#" className="text-sm text-primary hover:underline">Saber más</a>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}