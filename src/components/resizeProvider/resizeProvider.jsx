import { Box } from "@mui/material";
import { createContext, useContext, useEffect, useRef, useState } from "react";

// Context to hold the size
const ResizeContext = createContext(null)

export default function ResizeProvider({ children }) {
    const [size, setSize] = useState({ width: 0, height: 0 })
    const ref = useRef()

    useEffect(() => {
        if (!ref.current) return;
        
        let resizeTimeout = null;
        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (entry) {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    const { width, height } = entry.contentRect;
                    setSize({ width, height });
                }, 100)
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
            <Box id="padding-box" ref={ref} p={2} sx={{ flex: 1, display: "flex" }}>
                <Box id="invisible-box" sx={{ overflow: "visible", height: "0px", width: "0px" }}>
                    <Box id="size-box" height={size.height} width={size.width} maxHeight={size.height} >
                        {children}
                    </Box>
                </Box>
            </Box>
        </ResizeContext.Provider>
    );
}

// Hook to access the size in any child component
export function useResize() {
    return useContext(ResizeContext);
}