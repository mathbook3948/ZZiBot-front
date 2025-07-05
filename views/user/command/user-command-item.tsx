'use client'

import { useState } from 'react'
import { CommandGroup, Command } from '@/types/command-interface'

const UserCommandItem = ({ cmd }: { cmd: CommandGroup }) => {
    return (
        <div className="space-y-2">
            <h2 className="text-xl font-semibold border-b pb-1">{cmd.name}</h2>
            <ul className="space-y-1">
                {cmd.commands.map((command, idx) => (
                    <CommandItem key={`command-${idx}`} command={command} />
                ))}
            </ul>
        </div>
    )
}

const CommandItem = ({ command }: { command: Command }) => {
    const [open, setOpen] = useState(false)

    return (
        <li className="bg-gray-50 border rounded px-4 py-2">
            <div className="flex justify-between items-center">
                <p className="font-mono font-medium text-blue-600">{command.command}</p>
                {command.detailDescription && (
                    <button
                        onClick={() => setOpen(!open)}
                        className="text-sm text-blue-500 underline"
                    >
                        {open ? '닫기' : '자세히 보기'}
                    </button>
                )}
            </div>
            {command.description && (
                <p className="mt-2 text-sm text-gray-600">{command.description}</p>
            )}
            {open && command.detailDescription && (
                <p className="mt-2 text-sm text-gray-500 whitespace-pre-wrap">{command.detailDescription}</p>
            )}
        </li>
    )
}

export default UserCommandItem
