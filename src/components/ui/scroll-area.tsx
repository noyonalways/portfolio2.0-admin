import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "@/lib/utils";

const ScrollArea = ScrollAreaPrimitive.Root;

const ScrollBar = ScrollAreaPrimitive.ScrollAreaScrollbar;

const ScrollThumb = ScrollAreaPrimitive.Thumb;

const ScrollViewport = ScrollAreaPrimitive.Viewport;

export { ScrollArea, ScrollBar, ScrollThumb, ScrollViewport };
