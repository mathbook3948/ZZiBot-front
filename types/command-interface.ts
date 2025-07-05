export interface CommandGroup {
    name: string
    commands: Command[]
}

export interface Command {
    command: string
    description?: string
    detailDescription?: string
    requiredAdmin: boolean
}