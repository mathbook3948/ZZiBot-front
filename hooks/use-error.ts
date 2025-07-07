import {parseAsString, useQueryState} from "nuqs";

export const useError = () => {
    const [error, setError] = useQueryState('error', parseAsString)

    return {
        error,
        setError
    }
}