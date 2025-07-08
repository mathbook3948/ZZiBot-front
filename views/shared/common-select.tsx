import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

export interface SelectNode {
    value: string
    label: string
    data?: never
}

interface CommonSelectProps {
    options: SelectNode[]
    value: string
    onChange: (value: string) => void
}

const CommonSelect = ({value, onChange, options}: CommonSelectProps) => {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="min-w-[120px]">
                <SelectValue placeholder="선택" />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

export default CommonSelect