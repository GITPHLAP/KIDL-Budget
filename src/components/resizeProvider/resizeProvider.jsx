import { Box } from "@mui/material";
import { createContext, useContext, useEffect, useRef, useState } from "react";

// Context to hold the size
const ResizeContext = createContext(null)

export default function ResizeProvider({ children }) {
    const [size, setSize] = useState({ width: 0, height: 0 })
    const ref = useRef()

    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (entry) {
                const { width, height } = entry.contentRect;
                setSize({ width, height });
            }
        });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <ResizeContext.Provider value={size}>
            {/* Padding box */}
            <Box ref={ref} p={2} sx={{ flex: 1, height: "100%", display: "flex" }}>
                {children}
            </Box>
        </ResizeContext.Provider>
    );
}

// Hook to access the size in any child component
export function useResize() {
    return useContext(ResizeContext);
}