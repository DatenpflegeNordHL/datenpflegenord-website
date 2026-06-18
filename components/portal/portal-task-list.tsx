import { CircleDot, ListChecks } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { PortalTask } from "@/lib/portal/tasks"

type PortalTaskListProps = {
  tasks: PortalTask[]
}

function statusLabel(status: PortalTask["status"]): string {
  if (status === "done") return "erledigt"
  if (status === "planned") return "geplant"
  return "offen"
}

export function PortalTaskList({ tasks }: PortalTaskListProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/8">
              <ListChecks className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-accent">
                Maßnahmenplan
              </p>
              <CardTitle className="mt-2 text-xl leading-tight">Konkrete nächste Aufgaben</CardTitle>
            </div>
          </div>
          <Badge variant="outline">{tasks.length} Aufgaben</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {tasks.slice(0, 8).map((task) => (
            <div key={task.id} className="rounded-lg border border-border bg-card p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                  <CircleDot className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{task.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{task.description}</p>
                  </div>
                </div>
                <Badge variant={task.priority === "hoch" ? "default" : "secondary"}>
                  {task.priority}
                </Badge>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 pl-7">
                <Badge variant="outline">Kategorie: {task.category}</Badge>
                <Badge variant="outline">Status: {statusLabel(task.status)}</Badge>
                <Badge variant="outline">Aufwand: {task.effort}</Badge>
                <Badge variant="outline">Wirkung: {task.impact}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
