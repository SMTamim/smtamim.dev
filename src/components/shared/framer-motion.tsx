"use client";

import { Variants } from "framer-motion";

export {
    motion,
    AnimatePresence,
    useAnimation,
    useInView,
    
} from "framer-motion";

export const staggerContainer = (staggerChildren?: number, delayChildren?: number): Variants => ({
    hidden: {},
    visible: {
        transition: {
            staggerChildren,
            delayChildren
        }
    }
});

export const fadeIn = (direction: "up" | "down" | "left" | "right", delay: number): Variants => {
    return {
        hidden: {
            y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
            x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
            opacity: 0
        },
        visible: {
            y: 0,
            x: 0,
            opacity: 1,
            transition: {
                type: "tween",
                duration: 1.2,
                delay,
                ease: [0.25, 0.25, 0.25, 0.75]
            }
        }
    };
};
