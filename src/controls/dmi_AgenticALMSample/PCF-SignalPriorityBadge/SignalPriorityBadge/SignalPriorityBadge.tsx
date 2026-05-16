import * as React from "react";

interface SignalPriorityBadgeProps {
    priority: number | null;
}

interface PriorityConfig {
    label: string;
    color: string;
    background: string;
}

const PRIORITY_CONFIG: Record<number, PriorityConfig> = {
    100000000: { label: "High",   color: "#ffffff", background: "#d13438" },
    100000001: { label: "Medium", color: "#000000", background: "#f7a948" },
    100000002: { label: "Low",    color: "#ffffff", background: "#107c10" },
};

export const SignalPriorityBadgeComponent = ({ priority }: SignalPriorityBadgeProps): React.ReactElement => {
    if (priority === null || priority === undefined) {
        return React.createElement("span", null);
    }

    const config = PRIORITY_CONFIG[priority];

    if (!config) {
        return React.createElement("span", null);
    }

    const style: React.CSSProperties = {
        display: "inline-block",
        padding: "4px 12px",
        borderRadius: "12px",
        background: config.background,
        color: config.color,
        fontWeight: 600,
        fontSize: "13px",
        letterSpacing: "0.02em",
        boxShadow: "0 1px 3px rgba(0,0,0,0.18)",
        userSelect: "none",
    };

    return React.createElement("span", { style }, config.label);
};
