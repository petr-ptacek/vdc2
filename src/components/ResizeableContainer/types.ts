export type ResizeableContainerProps = {
	status?: StatusValue;
	lockedSection?: SectionID;
	ratioPercentage?: RatioValue;
	disableButtons?: boolean;
	behaviour?: BehaviourValue;
};

export type BehaviourValue = "collapse-only" | "expand-only" | "default";

export type SectionID = "left" | "right";

export type RatioValue = [number, number];

export type StatusValue = "collapsed" | "expanded" | "default";

export type ResizeEventType = "start" | "end" | "resizing";
