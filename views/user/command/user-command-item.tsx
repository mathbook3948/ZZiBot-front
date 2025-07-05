'use client'

import {useState} from 'react'
import {Command, CommandGroup} from '@/types/command-interface'
import {Button} from "@/components/ui/button";

const UserCommandItem = ({cmd}: { cmd: CommandGroup }) => {
    return (
        <div className="space-y-2">
            <h2 className="text-xl font-semibold border-b border-border pb-1 text-foreground">{cmd.name}</h2>
            <ul className="space-y-1">
                {cmd.commands.map((command, idx) => (
                    <CommandItem key={`command-${idx}`} command={command}/>
                ))}
            </ul>
        </div>
    )
}

const CommandItem = ({command}: { command: Command }) => {
    const [open, setOpen] = useState(false)

    return (
        <li className="bg-card border border-border rounded px-4 py-2 text-foreground">
            <div className="flex justify-between items-center">
                <p className="font-mono font-bold text-blue-600 dark:text-primary">{command.command}</p>
                {command.detailDescription && (
                    <button
                        onClick={() => setOpen(!open)}
                        className="text-sm text-blue-600 dark:text-primary underline"
                    >
                        {open ? '닫기' : '자세히 보기'}
                    </button>
                )}
            </div>
            {command.description && (
                <p className="mt-2 text-sm text-muted-foreground">{command.description}</p>
            )}
            {open && command.detailDescription && (
                <p className="mt-2 text-sm text-muted-foreground whitespace-pre-wrap">
                    {command.detailDescription}
                </p>
            )}
        </li>
    )
}

export default UserCommandItem
