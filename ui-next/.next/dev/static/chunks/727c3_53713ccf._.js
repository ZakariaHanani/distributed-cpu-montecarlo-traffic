(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "mergeClasses",
    ()=>mergeClasses,
    "toKebabCase",
    ()=>toKebabCase
]);
const toKebabCase = (string)=>string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const mergeClasses = (...classes)=>classes.filter((className, index, array)=>{
        return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
    }).join(" ").trim();
;
 //# sourceMappingURL=utils.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/defaultAttributes.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>defaultAttributes
]);
var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
};
;
 //# sourceMappingURL=defaultAttributes.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/Icon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Icon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$defaultAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/defaultAttributes.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-client] (ecmascript)");
;
;
;
const Icon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref)=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])("svg", {
        ref,
        ...__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$defaultAttributes$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeClasses"])("lucide", className),
        ...rest
    }, [
        ...iconNode.map(([tag, attrs])=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(tag, attrs)),
        ...Array.isArray(children) ? children : [
            children
        ]
    ]);
});
;
 //# sourceMappingURL=Icon.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>createLucideIcon
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/shared/src/utils.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/Icon.js [app-client] (ecmascript)");
;
;
;
const createLucideIcon = (iconName, iconNode)=>{
    const Component = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(({ className, ...props }, ref)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$Icon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            ref,
            iconNode,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeClasses"])(`lucide-${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$shared$2f$src$2f$utils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toKebabCase"])(iconName)}`, className),
            ...props
        }));
    Component.displayName = `${iconName}`;
    return Component;
};
;
 //# sourceMappingURL=createLucideIcon.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/cpu.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Cpu
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Cpu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Cpu", [
    [
        "rect",
        {
            width: "16",
            height: "16",
            x: "4",
            y: "4",
            rx: "2",
            key: "14l7u7"
        }
    ],
    [
        "rect",
        {
            width: "6",
            height: "6",
            x: "9",
            y: "9",
            rx: "1",
            key: "5aljv4"
        }
    ],
    [
        "path",
        {
            d: "M15 2v2",
            key: "13l42r"
        }
    ],
    [
        "path",
        {
            d: "M15 20v2",
            key: "15mkzm"
        }
    ],
    [
        "path",
        {
            d: "M2 15h2",
            key: "1gxd5l"
        }
    ],
    [
        "path",
        {
            d: "M2 9h2",
            key: "1bbxkp"
        }
    ],
    [
        "path",
        {
            d: "M20 15h2",
            key: "19e6y8"
        }
    ],
    [
        "path",
        {
            d: "M20 9h2",
            key: "19tzq7"
        }
    ],
    [
        "path",
        {
            d: "M9 2v2",
            key: "165o2o"
        }
    ],
    [
        "path",
        {
            d: "M9 20v2",
            key: "i2bqo8"
        }
    ]
]);
;
 //# sourceMappingURL=cpu.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/cpu.js [app-client] (ecmascript) <export default as Cpu>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Cpu",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cpu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cpu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/cpu.js [app-client] (ecmascript)");
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>ArrowRight
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const ArrowRight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("ArrowRight", [
    [
        "path",
        {
            d: "M5 12h14",
            key: "1ays0h"
        }
    ],
    [
        "path",
        {
            d: "m12 5 7 7-7 7",
            key: "xquz4c"
        }
    ]
]);
;
 //# sourceMappingURL=arrow-right.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArrowRight",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript)");
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Play
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Play = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Play", [
    [
        "polygon",
        {
            points: "6 3 20 12 6 21 6 3",
            key: "1oa8hb"
        }
    ]
]);
;
 //# sourceMappingURL=play.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Play",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript)");
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Zap
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Zap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Zap", [
    [
        "path",
        {
            d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
            key: "1xq2db"
        }
    ]
]);
;
 //# sourceMappingURL=zap.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Zap",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript)");
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/globe.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Globe
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Globe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Globe", [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ],
    [
        "path",
        {
            d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",
            key: "13o1zl"
        }
    ],
    [
        "path",
        {
            d: "M2 12h20",
            key: "9i4pu4"
        }
    ]
]);
;
 //# sourceMappingURL=globe.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/globe.js [app-client] (ecmascript) <export default as Globe>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Globe",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/globe.js [app-client] (ecmascript)");
}),
"[project]/Desktop/project/ui-react/node_modules/@radix-ui/react-compose-refs/dist/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// packages/react/compose-refs/src/composeRefs.tsx
__turbopack_context__.s([
    "composeRefs",
    ()=>composeRefs,
    "useComposedRefs",
    ()=>useComposedRefs
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
function setRef(ref, value) {
    if (typeof ref === "function") {
        return ref(value);
    } else if (ref !== null && ref !== void 0) {
        ref.current = value;
    }
}
function composeRefs(...refs) {
    return (node)=>{
        let hasCleanup = false;
        const cleanups = refs.map((ref)=>{
            const cleanup = setRef(ref, node);
            if (!hasCleanup && typeof cleanup == "function") {
                hasCleanup = true;
            }
            return cleanup;
        });
        if (hasCleanup) {
            return ()=>{
                for(let i = 0; i < cleanups.length; i++){
                    const cleanup = cleanups[i];
                    if (typeof cleanup == "function") {
                        cleanup();
                    } else {
                        setRef(refs[i], null);
                    }
                }
            };
        }
    };
}
function useComposedRefs(...refs) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"](composeRefs(...refs), refs);
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/Desktop/project/ui-react/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// packages/react/slot/src/Slot.tsx
__turbopack_context__.s([
    "Root",
    ()=>Root,
    "Slot",
    ()=>Slot,
    "Slottable",
    ()=>Slottable
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/@radix-ui/react-compose-refs/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
;
;
;
var Slot = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"]((props, forwardedRef)=>{
    const { children, ...slotProps } = props;
    const childrenArray = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Children"].toArray(children);
    const slottable = childrenArray.find(isSlottable);
    if (slottable) {
        const newElement = slottable.props.children;
        const newChildren = childrenArray.map((child)=>{
            if (child === slottable) {
                if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Children"].count(newElement) > 1) return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Children"].only(null);
                return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidElement"](newElement) ? newElement.props.children : null;
            } else {
                return child;
            }
        });
        return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(SlotClone, {
            ...slotProps,
            ref: forwardedRef,
            children: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidElement"](newElement) ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cloneElement"](newElement, void 0, newChildren) : null
        });
    }
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(SlotClone, {
        ...slotProps,
        ref: forwardedRef,
        children
    });
});
Slot.displayName = "Slot";
var SlotClone = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"]((props, forwardedRef)=>{
    const { children, ...slotProps } = props;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidElement"](children)) {
        const childrenRef = getElementRef(children);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cloneElement"](children, {
            ...mergeProps(slotProps, children.props),
            // @ts-ignore
            ref: forwardedRef ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$compose$2d$refs$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["composeRefs"])(forwardedRef, childrenRef) : childrenRef
        });
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Children"].count(children) > 1 ? __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Children"].only(null) : null;
});
SlotClone.displayName = "SlotClone";
var Slottable = ({ children })=>{
    return /* @__PURE__ */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsx"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children
    });
};
function isSlottable(child) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isValidElement"](child) && child.type === Slottable;
}
function mergeProps(slotProps, childProps) {
    const overrideProps = {
        ...childProps
    };
    for(const propName in childProps){
        const slotPropValue = slotProps[propName];
        const childPropValue = childProps[propName];
        const isHandler = /^on[A-Z]/.test(propName);
        if (isHandler) {
            if (slotPropValue && childPropValue) {
                overrideProps[propName] = (...args)=>{
                    childPropValue(...args);
                    slotPropValue(...args);
                };
            } else if (slotPropValue) {
                overrideProps[propName] = slotPropValue;
            }
        } else if (propName === "style") {
            overrideProps[propName] = {
                ...slotPropValue,
                ...childPropValue
            };
        } else if (propName === "className") {
            overrideProps[propName] = [
                slotPropValue,
                childPropValue
            ].filter(Boolean).join(" ");
        }
    }
    return {
        ...slotProps,
        ...overrideProps
    };
}
function getElementRef(element) {
    let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
    let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
    if (mayWarn) {
        return element.ref;
    }
    getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
    mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
    if (mayWarn) {
        return element.props.ref;
    }
    return element.props.ref || element.ref;
}
var Root = Slot;
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/Desktop/project/ui-react/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clsx",
    ()=>clsx,
    "default",
    ()=>__TURBOPACK__default__export__
]);
function r(e) {
    var t, f, n = "";
    if ("string" == typeof e || "number" == typeof e) n += e;
    else if ("object" == typeof e) if (Array.isArray(e)) {
        var o = e.length;
        for(t = 0; t < o; t++)e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else for(f in e)e[f] && (n && (n += " "), n += f);
    return n;
}
function clsx() {
    for(var e, t, f = 0, n = "", o = arguments.length; f < o; f++)(e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
    return n;
}
const __TURBOPACK__default__export__ = clsx;
}),
"[project]/Desktop/project/ui-react/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Copyright 2022 Joe Bell. All rights reserved.
 *
 * This file is licensed to you under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR REPRESENTATIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */ __turbopack_context__.s([
    "cva",
    ()=>cva,
    "cx",
    ()=>cx
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
;
const falsyToString = (value)=>typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
const cx = __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"];
const cva = (base, config)=>(props)=>{
        var _config_compoundVariants;
        if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
        const { variants, defaultVariants } = config;
        const getVariantClassNames = Object.keys(variants).map((variant)=>{
            const variantProp = props === null || props === void 0 ? void 0 : props[variant];
            const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
            if (variantProp === null) return null;
            const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
            return variants[variant][variantKey];
        });
        const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param)=>{
            let [key, value] = param;
            if (value === undefined) {
                return acc;
            }
            acc[key] = value;
            return acc;
        }, {});
        const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param)=>{
            let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
            return Object.entries(compoundVariantOptions).every((param)=>{
                let [key, value] = param;
                return Array.isArray(value) ? value.includes({
                    ...defaultVariants,
                    ...propsWithoutUndefined
                }[key]) : ({
                    ...defaultVariants,
                    ...propsWithoutUndefined
                })[key] === value;
            }) ? [
                ...acc,
                cvClass,
                cvClassName
            ] : acc;
        }, []);
        return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
    };
}),
"[project]/Desktop/project/ui-react/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Concatenates two arrays faster than the array spread operator.
 */ __turbopack_context__.s([
    "createTailwindMerge",
    ()=>createTailwindMerge,
    "extendTailwindMerge",
    ()=>extendTailwindMerge,
    "fromTheme",
    ()=>fromTheme,
    "getDefaultConfig",
    ()=>getDefaultConfig,
    "mergeConfigs",
    ()=>mergeConfigs,
    "twJoin",
    ()=>twJoin,
    "twMerge",
    ()=>twMerge,
    "validators",
    ()=>validators
]);
const concatArrays = (array1, array2)=>{
    // Pre-allocate for better V8 optimization
    const combinedArray = new Array(array1.length + array2.length);
    for(let i = 0; i < array1.length; i++){
        combinedArray[i] = array1[i];
    }
    for(let i = 0; i < array2.length; i++){
        combinedArray[array1.length + i] = array2[i];
    }
    return combinedArray;
};
// Factory function ensures consistent object shapes
const createClassValidatorObject = (classGroupId, validator)=>({
        classGroupId,
        validator
    });
// Factory ensures consistent ClassPartObject shape
const createClassPartObject = (nextPart = new Map(), validators = null, classGroupId)=>({
        nextPart,
        validators,
        classGroupId
    });
const CLASS_PART_SEPARATOR = '-';
const EMPTY_CONFLICTS = [];
// I use two dots here because one dot is used as prefix for class groups in plugins
const ARBITRARY_PROPERTY_PREFIX = 'arbitrary..';
const createClassGroupUtils = (config)=>{
    const classMap = createClassMap(config);
    const { conflictingClassGroups, conflictingClassGroupModifiers } = config;
    const getClassGroupId = (className)=>{
        if (className.startsWith('[') && className.endsWith(']')) {
            return getGroupIdForArbitraryProperty(className);
        }
        const classParts = className.split(CLASS_PART_SEPARATOR);
        // Classes like `-inset-1` produce an empty string as first classPart. We assume that classes for negative values are used correctly and skip it.
        const startIndex = classParts[0] === '' && classParts.length > 1 ? 1 : 0;
        return getGroupRecursive(classParts, startIndex, classMap);
    };
    const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier)=>{
        if (hasPostfixModifier) {
            const modifierConflicts = conflictingClassGroupModifiers[classGroupId];
            const baseConflicts = conflictingClassGroups[classGroupId];
            if (modifierConflicts) {
                if (baseConflicts) {
                    // Merge base conflicts with modifier conflicts
                    return concatArrays(baseConflicts, modifierConflicts);
                }
                // Only modifier conflicts
                return modifierConflicts;
            }
            // Fall back to without postfix if no modifier conflicts
            return baseConflicts || EMPTY_CONFLICTS;
        }
        return conflictingClassGroups[classGroupId] || EMPTY_CONFLICTS;
    };
    return {
        getClassGroupId,
        getConflictingClassGroupIds
    };
};
const getGroupRecursive = (classParts, startIndex, classPartObject)=>{
    const classPathsLength = classParts.length - startIndex;
    if (classPathsLength === 0) {
        return classPartObject.classGroupId;
    }
    const currentClassPart = classParts[startIndex];
    const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
    if (nextClassPartObject) {
        const result = getGroupRecursive(classParts, startIndex + 1, nextClassPartObject);
        if (result) return result;
    }
    const validators = classPartObject.validators;
    if (validators === null) {
        return undefined;
    }
    // Build classRest string efficiently by joining from startIndex onwards
    const classRest = startIndex === 0 ? classParts.join(CLASS_PART_SEPARATOR) : classParts.slice(startIndex).join(CLASS_PART_SEPARATOR);
    const validatorsLength = validators.length;
    for(let i = 0; i < validatorsLength; i++){
        const validatorObj = validators[i];
        if (validatorObj.validator(classRest)) {
            return validatorObj.classGroupId;
        }
    }
    return undefined;
};
/**
 * Get the class group ID for an arbitrary property.
 *
 * @param className - The class name to get the group ID for. Is expected to be string starting with `[` and ending with `]`.
 */ const getGroupIdForArbitraryProperty = (className)=>className.slice(1, -1).indexOf(':') === -1 ? undefined : (()=>{
        const content = className.slice(1, -1);
        const colonIndex = content.indexOf(':');
        const property = content.slice(0, colonIndex);
        return property ? ARBITRARY_PROPERTY_PREFIX + property : undefined;
    })();
/**
 * Exported for testing only
 */ const createClassMap = (config)=>{
    const { theme, classGroups } = config;
    return processClassGroups(classGroups, theme);
};
// Split into separate functions to maintain monomorphic call sites
const processClassGroups = (classGroups, theme)=>{
    const classMap = createClassPartObject();
    for(const classGroupId in classGroups){
        const group = classGroups[classGroupId];
        processClassesRecursively(group, classMap, classGroupId, theme);
    }
    return classMap;
};
const processClassesRecursively = (classGroup, classPartObject, classGroupId, theme)=>{
    const len = classGroup.length;
    for(let i = 0; i < len; i++){
        const classDefinition = classGroup[i];
        processClassDefinition(classDefinition, classPartObject, classGroupId, theme);
    }
};
// Split into separate functions for each type to maintain monomorphic call sites
const processClassDefinition = (classDefinition, classPartObject, classGroupId, theme)=>{
    if (typeof classDefinition === 'string') {
        processStringDefinition(classDefinition, classPartObject, classGroupId);
        return;
    }
    if (typeof classDefinition === 'function') {
        processFunctionDefinition(classDefinition, classPartObject, classGroupId, theme);
        return;
    }
    processObjectDefinition(classDefinition, classPartObject, classGroupId, theme);
};
const processStringDefinition = (classDefinition, classPartObject, classGroupId)=>{
    const classPartObjectToEdit = classDefinition === '' ? classPartObject : getPart(classPartObject, classDefinition);
    classPartObjectToEdit.classGroupId = classGroupId;
};
const processFunctionDefinition = (classDefinition, classPartObject, classGroupId, theme)=>{
    if (isThemeGetter(classDefinition)) {
        processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
        return;
    }
    if (classPartObject.validators === null) {
        classPartObject.validators = [];
    }
    classPartObject.validators.push(createClassValidatorObject(classGroupId, classDefinition));
};
const processObjectDefinition = (classDefinition, classPartObject, classGroupId, theme)=>{
    const entries = Object.entries(classDefinition);
    const len = entries.length;
    for(let i = 0; i < len; i++){
        const [key, value] = entries[i];
        processClassesRecursively(value, getPart(classPartObject, key), classGroupId, theme);
    }
};
const getPart = (classPartObject, path)=>{
    let current = classPartObject;
    const parts = path.split(CLASS_PART_SEPARATOR);
    const len = parts.length;
    for(let i = 0; i < len; i++){
        const part = parts[i];
        let next = current.nextPart.get(part);
        if (!next) {
            next = createClassPartObject();
            current.nextPart.set(part, next);
        }
        current = next;
    }
    return current;
};
// Type guard maintains monomorphic check
const isThemeGetter = (func)=>'isThemeGetter' in func && func.isThemeGetter === true;
// LRU cache implementation using plain objects for simplicity
const createLruCache = (maxCacheSize)=>{
    if (maxCacheSize < 1) {
        return {
            get: ()=>undefined,
            set: ()=>{}
        };
    }
    let cacheSize = 0;
    let cache = Object.create(null);
    let previousCache = Object.create(null);
    const update = (key, value)=>{
        cache[key] = value;
        cacheSize++;
        if (cacheSize > maxCacheSize) {
            cacheSize = 0;
            previousCache = cache;
            cache = Object.create(null);
        }
    };
    return {
        get (key) {
            let value = cache[key];
            if (value !== undefined) {
                return value;
            }
            if ((value = previousCache[key]) !== undefined) {
                update(key, value);
                return value;
            }
        },
        set (key, value) {
            if (key in cache) {
                cache[key] = value;
            } else {
                update(key, value);
            }
        }
    };
};
const IMPORTANT_MODIFIER = '!';
const MODIFIER_SEPARATOR = ':';
const EMPTY_MODIFIERS = [];
// Pre-allocated result object shape for consistency
const createResultObject = (modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition, isExternal)=>({
        modifiers,
        hasImportantModifier,
        baseClassName,
        maybePostfixModifierPosition,
        isExternal
    });
const createParseClassName = (config)=>{
    const { prefix, experimentalParseClassName } = config;
    /**
   * Parse class name into parts.
   *
   * Inspired by `splitAtTopLevelOnly` used in Tailwind CSS
   * @see https://github.com/tailwindlabs/tailwindcss/blob/v3.2.2/src/util/splitAtTopLevelOnly.js
   */ let parseClassName = (className)=>{
        // Use simple array with push for better performance
        const modifiers = [];
        let bracketDepth = 0;
        let parenDepth = 0;
        let modifierStart = 0;
        let postfixModifierPosition;
        const len = className.length;
        for(let index = 0; index < len; index++){
            const currentCharacter = className[index];
            if (bracketDepth === 0 && parenDepth === 0) {
                if (currentCharacter === MODIFIER_SEPARATOR) {
                    modifiers.push(className.slice(modifierStart, index));
                    modifierStart = index + 1;
                    continue;
                }
                if (currentCharacter === '/') {
                    postfixModifierPosition = index;
                    continue;
                }
            }
            if (currentCharacter === '[') bracketDepth++;
            else if (currentCharacter === ']') bracketDepth--;
            else if (currentCharacter === '(') parenDepth++;
            else if (currentCharacter === ')') parenDepth--;
        }
        const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.slice(modifierStart);
        // Inline important modifier check
        let baseClassName = baseClassNameWithImportantModifier;
        let hasImportantModifier = false;
        if (baseClassNameWithImportantModifier.endsWith(IMPORTANT_MODIFIER)) {
            baseClassName = baseClassNameWithImportantModifier.slice(0, -1);
            hasImportantModifier = true;
        } else if (/**
     * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
     * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
     */ baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER)) {
            baseClassName = baseClassNameWithImportantModifier.slice(1);
            hasImportantModifier = true;
        }
        const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : undefined;
        return createResultObject(modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition);
    };
    if (prefix) {
        const fullPrefix = prefix + MODIFIER_SEPARATOR;
        const parseClassNameOriginal = parseClassName;
        parseClassName = (className)=>className.startsWith(fullPrefix) ? parseClassNameOriginal(className.slice(fullPrefix.length)) : createResultObject(EMPTY_MODIFIERS, false, className, undefined, true);
    }
    if (experimentalParseClassName) {
        const parseClassNameOriginal = parseClassName;
        parseClassName = (className)=>experimentalParseClassName({
                className,
                parseClassName: parseClassNameOriginal
            });
    }
    return parseClassName;
};
/**
 * Sorts modifiers according to following schema:
 * - Predefined modifiers are sorted alphabetically
 * - When an arbitrary variant appears, it must be preserved which modifiers are before and after it
 */ const createSortModifiers = (config)=>{
    // Pre-compute weights for all known modifiers for O(1) comparison
    const modifierWeights = new Map();
    // Assign weights to sensitive modifiers (highest priority, but preserve order)
    config.orderSensitiveModifiers.forEach((mod, index)=>{
        modifierWeights.set(mod, 1000000 + index); // High weights for sensitive mods
    });
    return (modifiers)=>{
        const result = [];
        let currentSegment = [];
        // Process modifiers in one pass
        for(let i = 0; i < modifiers.length; i++){
            const modifier = modifiers[i];
            // Check if modifier is sensitive (starts with '[' or in orderSensitiveModifiers)
            const isArbitrary = modifier[0] === '[';
            const isOrderSensitive = modifierWeights.has(modifier);
            if (isArbitrary || isOrderSensitive) {
                // Sort and flush current segment alphabetically
                if (currentSegment.length > 0) {
                    currentSegment.sort();
                    result.push(...currentSegment);
                    currentSegment = [];
                }
                result.push(modifier);
            } else {
                // Regular modifier - add to current segment for batch sorting
                currentSegment.push(modifier);
            }
        }
        // Sort and add any remaining segment items
        if (currentSegment.length > 0) {
            currentSegment.sort();
            result.push(...currentSegment);
        }
        return result;
    };
};
const createConfigUtils = (config)=>({
        cache: createLruCache(config.cacheSize),
        parseClassName: createParseClassName(config),
        sortModifiers: createSortModifiers(config),
        ...createClassGroupUtils(config)
    });
const SPLIT_CLASSES_REGEX = /\s+/;
const mergeClassList = (classList, configUtils)=>{
    const { parseClassName, getClassGroupId, getConflictingClassGroupIds, sortModifiers } = configUtils;
    /**
   * Set of classGroupIds in following format:
   * `{importantModifier}{variantModifiers}{classGroupId}`
   * @example 'float'
   * @example 'hover:focus:bg-color'
   * @example 'md:!pr'
   */ const classGroupsInConflict = [];
    const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
    let result = '';
    for(let index = classNames.length - 1; index >= 0; index -= 1){
        const originalClassName = classNames[index];
        const { isExternal, modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition } = parseClassName(originalClassName);
        if (isExternal) {
            result = originalClassName + (result.length > 0 ? ' ' + result : result);
            continue;
        }
        let hasPostfixModifier = !!maybePostfixModifierPosition;
        let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
        if (!classGroupId) {
            if (!hasPostfixModifier) {
                // Not a Tailwind class
                result = originalClassName + (result.length > 0 ? ' ' + result : result);
                continue;
            }
            classGroupId = getClassGroupId(baseClassName);
            if (!classGroupId) {
                // Not a Tailwind class
                result = originalClassName + (result.length > 0 ? ' ' + result : result);
                continue;
            }
            hasPostfixModifier = false;
        }
        // Fast path: skip sorting for empty or single modifier
        const variantModifier = modifiers.length === 0 ? '' : modifiers.length === 1 ? modifiers[0] : sortModifiers(modifiers).join(':');
        const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
        const classId = modifierId + classGroupId;
        if (classGroupsInConflict.indexOf(classId) > -1) {
            continue;
        }
        classGroupsInConflict.push(classId);
        const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
        for(let i = 0; i < conflictGroups.length; ++i){
            const group = conflictGroups[i];
            classGroupsInConflict.push(modifierId + group);
        }
        // Tailwind class not in conflict
        result = originalClassName + (result.length > 0 ? ' ' + result : result);
    }
    return result;
};
/**
 * The code in this file is copied from https://github.com/lukeed/clsx and modified to suit the needs of tailwind-merge better.
 *
 * Specifically:
 * - Runtime code from https://github.com/lukeed/clsx/blob/v1.2.1/src/index.js
 * - TypeScript types from https://github.com/lukeed/clsx/blob/v1.2.1/clsx.d.ts
 *
 * Original code has MIT license: Copyright (c) Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)
 */ const twJoin = (...classLists)=>{
    let index = 0;
    let argument;
    let resolvedValue;
    let string = '';
    while(index < classLists.length){
        if (argument = classLists[index++]) {
            if (resolvedValue = toValue(argument)) {
                string && (string += ' ');
                string += resolvedValue;
            }
        }
    }
    return string;
};
const toValue = (mix)=>{
    // Fast path for strings
    if (typeof mix === 'string') {
        return mix;
    }
    let resolvedValue;
    let string = '';
    for(let k = 0; k < mix.length; k++){
        if (mix[k]) {
            if (resolvedValue = toValue(mix[k])) {
                string && (string += ' ');
                string += resolvedValue;
            }
        }
    }
    return string;
};
const createTailwindMerge = (createConfigFirst, ...createConfigRest)=>{
    let configUtils;
    let cacheGet;
    let cacheSet;
    let functionToCall;
    const initTailwindMerge = (classList)=>{
        const config = createConfigRest.reduce((previousConfig, createConfigCurrent)=>createConfigCurrent(previousConfig), createConfigFirst());
        configUtils = createConfigUtils(config);
        cacheGet = configUtils.cache.get;
        cacheSet = configUtils.cache.set;
        functionToCall = tailwindMerge;
        return tailwindMerge(classList);
    };
    const tailwindMerge = (classList)=>{
        const cachedResult = cacheGet(classList);
        if (cachedResult) {
            return cachedResult;
        }
        const result = mergeClassList(classList, configUtils);
        cacheSet(classList, result);
        return result;
    };
    functionToCall = initTailwindMerge;
    return (...args)=>functionToCall(twJoin(...args));
};
const fallbackThemeArr = [];
const fromTheme = (key)=>{
    const themeGetter = (theme)=>theme[key] || fallbackThemeArr;
    themeGetter.isThemeGetter = true;
    return themeGetter;
};
const arbitraryValueRegex = /^\[(?:(\w[\w-]*):)?(.+)\]$/i;
const arbitraryVariableRegex = /^\((?:(\w[\w-]*):)?(.+)\)$/i;
const fractionRegex = /^\d+\/\d+$/;
const tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
const lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
const colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/;
// Shadow always begins with x and y offset separated by underscore optionally prepended by inset
const shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
const imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
const isFraction = (value)=>fractionRegex.test(value);
const isNumber = (value)=>!!value && !Number.isNaN(Number(value));
const isInteger = (value)=>!!value && Number.isInteger(Number(value));
const isPercent = (value)=>value.endsWith('%') && isNumber(value.slice(0, -1));
const isTshirtSize = (value)=>tshirtUnitRegex.test(value);
const isAny = ()=>true;
const isLengthOnly = (value)=>// `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
    // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
    // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
    lengthUnitRegex.test(value) && !colorFunctionRegex.test(value);
const isNever = ()=>false;
const isShadow = (value)=>shadowRegex.test(value);
const isImage = (value)=>imageRegex.test(value);
const isAnyNonArbitrary = (value)=>!isArbitraryValue(value) && !isArbitraryVariable(value);
const isArbitrarySize = (value)=>getIsArbitraryValue(value, isLabelSize, isNever);
const isArbitraryValue = (value)=>arbitraryValueRegex.test(value);
const isArbitraryLength = (value)=>getIsArbitraryValue(value, isLabelLength, isLengthOnly);
const isArbitraryNumber = (value)=>getIsArbitraryValue(value, isLabelNumber, isNumber);
const isArbitraryPosition = (value)=>getIsArbitraryValue(value, isLabelPosition, isNever);
const isArbitraryImage = (value)=>getIsArbitraryValue(value, isLabelImage, isImage);
const isArbitraryShadow = (value)=>getIsArbitraryValue(value, isLabelShadow, isShadow);
const isArbitraryVariable = (value)=>arbitraryVariableRegex.test(value);
const isArbitraryVariableLength = (value)=>getIsArbitraryVariable(value, isLabelLength);
const isArbitraryVariableFamilyName = (value)=>getIsArbitraryVariable(value, isLabelFamilyName);
const isArbitraryVariablePosition = (value)=>getIsArbitraryVariable(value, isLabelPosition);
const isArbitraryVariableSize = (value)=>getIsArbitraryVariable(value, isLabelSize);
const isArbitraryVariableImage = (value)=>getIsArbitraryVariable(value, isLabelImage);
const isArbitraryVariableShadow = (value)=>getIsArbitraryVariable(value, isLabelShadow, true);
// Helpers
const getIsArbitraryValue = (value, testLabel, testValue)=>{
    const result = arbitraryValueRegex.exec(value);
    if (result) {
        if (result[1]) {
            return testLabel(result[1]);
        }
        return testValue(result[2]);
    }
    return false;
};
const getIsArbitraryVariable = (value, testLabel, shouldMatchNoLabel = false)=>{
    const result = arbitraryVariableRegex.exec(value);
    if (result) {
        if (result[1]) {
            return testLabel(result[1]);
        }
        return shouldMatchNoLabel;
    }
    return false;
};
// Labels
const isLabelPosition = (label)=>label === 'position' || label === 'percentage';
const isLabelImage = (label)=>label === 'image' || label === 'url';
const isLabelSize = (label)=>label === 'length' || label === 'size' || label === 'bg-size';
const isLabelLength = (label)=>label === 'length';
const isLabelNumber = (label)=>label === 'number';
const isLabelFamilyName = (label)=>label === 'family-name';
const isLabelShadow = (label)=>label === 'shadow';
const validators = /*#__PURE__*/ Object.defineProperty({
    __proto__: null,
    isAny,
    isAnyNonArbitrary,
    isArbitraryImage,
    isArbitraryLength,
    isArbitraryNumber,
    isArbitraryPosition,
    isArbitraryShadow,
    isArbitrarySize,
    isArbitraryValue,
    isArbitraryVariable,
    isArbitraryVariableFamilyName,
    isArbitraryVariableImage,
    isArbitraryVariableLength,
    isArbitraryVariablePosition,
    isArbitraryVariableShadow,
    isArbitraryVariableSize,
    isFraction,
    isInteger,
    isNumber,
    isPercent,
    isTshirtSize
}, Symbol.toStringTag, {
    value: 'Module'
});
const getDefaultConfig = ()=>{
    /**
   * Theme getters for theme variable namespaces
   * @see https://tailwindcss.com/docs/theme#theme-variable-namespaces
   */ /***/ const themeColor = fromTheme('color');
    const themeFont = fromTheme('font');
    const themeText = fromTheme('text');
    const themeFontWeight = fromTheme('font-weight');
    const themeTracking = fromTheme('tracking');
    const themeLeading = fromTheme('leading');
    const themeBreakpoint = fromTheme('breakpoint');
    const themeContainer = fromTheme('container');
    const themeSpacing = fromTheme('spacing');
    const themeRadius = fromTheme('radius');
    const themeShadow = fromTheme('shadow');
    const themeInsetShadow = fromTheme('inset-shadow');
    const themeTextShadow = fromTheme('text-shadow');
    const themeDropShadow = fromTheme('drop-shadow');
    const themeBlur = fromTheme('blur');
    const themePerspective = fromTheme('perspective');
    const themeAspect = fromTheme('aspect');
    const themeEase = fromTheme('ease');
    const themeAnimate = fromTheme('animate');
    /**
   * Helpers to avoid repeating the same scales
   *
   * We use functions that create a new array every time they're called instead of static arrays.
   * This ensures that users who modify any scale by mutating the array (e.g. with `array.push(element)`) don't accidentally mutate arrays in other parts of the config.
   */ /***/ const scaleBreak = ()=>[
            'auto',
            'avoid',
            'all',
            'avoid-page',
            'page',
            'left',
            'right',
            'column'
        ];
    const scalePosition = ()=>[
            'center',
            'top',
            'bottom',
            'left',
            'right',
            'top-left',
            // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
            'left-top',
            'top-right',
            // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
            'right-top',
            'bottom-right',
            // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
            'right-bottom',
            'bottom-left',
            // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
            'left-bottom'
        ];
    const scalePositionWithArbitrary = ()=>[
            ...scalePosition(),
            isArbitraryVariable,
            isArbitraryValue
        ];
    const scaleOverflow = ()=>[
            'auto',
            'hidden',
            'clip',
            'visible',
            'scroll'
        ];
    const scaleOverscroll = ()=>[
            'auto',
            'contain',
            'none'
        ];
    const scaleUnambiguousSpacing = ()=>[
            isArbitraryVariable,
            isArbitraryValue,
            themeSpacing
        ];
    const scaleInset = ()=>[
            isFraction,
            'full',
            'auto',
            ...scaleUnambiguousSpacing()
        ];
    const scaleGridTemplateColsRows = ()=>[
            isInteger,
            'none',
            'subgrid',
            isArbitraryVariable,
            isArbitraryValue
        ];
    const scaleGridColRowStartAndEnd = ()=>[
            'auto',
            {
                span: [
                    'full',
                    isInteger,
                    isArbitraryVariable,
                    isArbitraryValue
                ]
            },
            isInteger,
            isArbitraryVariable,
            isArbitraryValue
        ];
    const scaleGridColRowStartOrEnd = ()=>[
            isInteger,
            'auto',
            isArbitraryVariable,
            isArbitraryValue
        ];
    const scaleGridAutoColsRows = ()=>[
            'auto',
            'min',
            'max',
            'fr',
            isArbitraryVariable,
            isArbitraryValue
        ];
    const scaleAlignPrimaryAxis = ()=>[
            'start',
            'end',
            'center',
            'between',
            'around',
            'evenly',
            'stretch',
            'baseline',
            'center-safe',
            'end-safe'
        ];
    const scaleAlignSecondaryAxis = ()=>[
            'start',
            'end',
            'center',
            'stretch',
            'center-safe',
            'end-safe'
        ];
    const scaleMargin = ()=>[
            'auto',
            ...scaleUnambiguousSpacing()
        ];
    const scaleSizing = ()=>[
            isFraction,
            'auto',
            'full',
            'dvw',
            'dvh',
            'lvw',
            'lvh',
            'svw',
            'svh',
            'min',
            'max',
            'fit',
            ...scaleUnambiguousSpacing()
        ];
    const scaleColor = ()=>[
            themeColor,
            isArbitraryVariable,
            isArbitraryValue
        ];
    const scaleBgPosition = ()=>[
            ...scalePosition(),
            isArbitraryVariablePosition,
            isArbitraryPosition,
            {
                position: [
                    isArbitraryVariable,
                    isArbitraryValue
                ]
            }
        ];
    const scaleBgRepeat = ()=>[
            'no-repeat',
            {
                repeat: [
                    '',
                    'x',
                    'y',
                    'space',
                    'round'
                ]
            }
        ];
    const scaleBgSize = ()=>[
            'auto',
            'cover',
            'contain',
            isArbitraryVariableSize,
            isArbitrarySize,
            {
                size: [
                    isArbitraryVariable,
                    isArbitraryValue
                ]
            }
        ];
    const scaleGradientStopPosition = ()=>[
            isPercent,
            isArbitraryVariableLength,
            isArbitraryLength
        ];
    const scaleRadius = ()=>[
            // Deprecated since Tailwind CSS v4.0.0
            '',
            'none',
            'full',
            themeRadius,
            isArbitraryVariable,
            isArbitraryValue
        ];
    const scaleBorderWidth = ()=>[
            '',
            isNumber,
            isArbitraryVariableLength,
            isArbitraryLength
        ];
    const scaleLineStyle = ()=>[
            'solid',
            'dashed',
            'dotted',
            'double'
        ];
    const scaleBlendMode = ()=>[
            'normal',
            'multiply',
            'screen',
            'overlay',
            'darken',
            'lighten',
            'color-dodge',
            'color-burn',
            'hard-light',
            'soft-light',
            'difference',
            'exclusion',
            'hue',
            'saturation',
            'color',
            'luminosity'
        ];
    const scaleMaskImagePosition = ()=>[
            isNumber,
            isPercent,
            isArbitraryVariablePosition,
            isArbitraryPosition
        ];
    const scaleBlur = ()=>[
            // Deprecated since Tailwind CSS v4.0.0
            '',
            'none',
            themeBlur,
            isArbitraryVariable,
            isArbitraryValue
        ];
    const scaleRotate = ()=>[
            'none',
            isNumber,
            isArbitraryVariable,
            isArbitraryValue
        ];
    const scaleScale = ()=>[
            'none',
            isNumber,
            isArbitraryVariable,
            isArbitraryValue
        ];
    const scaleSkew = ()=>[
            isNumber,
            isArbitraryVariable,
            isArbitraryValue
        ];
    const scaleTranslate = ()=>[
            isFraction,
            'full',
            ...scaleUnambiguousSpacing()
        ];
    return {
        cacheSize: 500,
        theme: {
            animate: [
                'spin',
                'ping',
                'pulse',
                'bounce'
            ],
            aspect: [
                'video'
            ],
            blur: [
                isTshirtSize
            ],
            breakpoint: [
                isTshirtSize
            ],
            color: [
                isAny
            ],
            container: [
                isTshirtSize
            ],
            'drop-shadow': [
                isTshirtSize
            ],
            ease: [
                'in',
                'out',
                'in-out'
            ],
            font: [
                isAnyNonArbitrary
            ],
            'font-weight': [
                'thin',
                'extralight',
                'light',
                'normal',
                'medium',
                'semibold',
                'bold',
                'extrabold',
                'black'
            ],
            'inset-shadow': [
                isTshirtSize
            ],
            leading: [
                'none',
                'tight',
                'snug',
                'normal',
                'relaxed',
                'loose'
            ],
            perspective: [
                'dramatic',
                'near',
                'normal',
                'midrange',
                'distant',
                'none'
            ],
            radius: [
                isTshirtSize
            ],
            shadow: [
                isTshirtSize
            ],
            spacing: [
                'px',
                isNumber
            ],
            text: [
                isTshirtSize
            ],
            'text-shadow': [
                isTshirtSize
            ],
            tracking: [
                'tighter',
                'tight',
                'normal',
                'wide',
                'wider',
                'widest'
            ]
        },
        classGroups: {
            // --------------
            // --- Layout ---
            // --------------
            /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */ aspect: [
                {
                    aspect: [
                        'auto',
                        'square',
                        isFraction,
                        isArbitraryValue,
                        isArbitraryVariable,
                        themeAspect
                    ]
                }
            ],
            /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */ container: [
                'container'
            ],
            /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */ columns: [
                {
                    columns: [
                        isNumber,
                        isArbitraryValue,
                        isArbitraryVariable,
                        themeContainer
                    ]
                }
            ],
            /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */ 'break-after': [
                {
                    'break-after': scaleBreak()
                }
            ],
            /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */ 'break-before': [
                {
                    'break-before': scaleBreak()
                }
            ],
            /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */ 'break-inside': [
                {
                    'break-inside': [
                        'auto',
                        'avoid',
                        'avoid-page',
                        'avoid-column'
                    ]
                }
            ],
            /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */ 'box-decoration': [
                {
                    'box-decoration': [
                        'slice',
                        'clone'
                    ]
                }
            ],
            /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */ box: [
                {
                    box: [
                        'border',
                        'content'
                    ]
                }
            ],
            /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */ display: [
                'block',
                'inline-block',
                'inline',
                'flex',
                'inline-flex',
                'table',
                'inline-table',
                'table-caption',
                'table-cell',
                'table-column',
                'table-column-group',
                'table-footer-group',
                'table-header-group',
                'table-row-group',
                'table-row',
                'flow-root',
                'grid',
                'inline-grid',
                'contents',
                'list-item',
                'hidden'
            ],
            /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */ sr: [
                'sr-only',
                'not-sr-only'
            ],
            /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */ float: [
                {
                    float: [
                        'right',
                        'left',
                        'none',
                        'start',
                        'end'
                    ]
                }
            ],
            /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */ clear: [
                {
                    clear: [
                        'left',
                        'right',
                        'both',
                        'none',
                        'start',
                        'end'
                    ]
                }
            ],
            /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */ isolation: [
                'isolate',
                'isolation-auto'
            ],
            /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */ 'object-fit': [
                {
                    object: [
                        'contain',
                        'cover',
                        'fill',
                        'none',
                        'scale-down'
                    ]
                }
            ],
            /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */ 'object-position': [
                {
                    object: scalePositionWithArbitrary()
                }
            ],
            /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */ overflow: [
                {
                    overflow: scaleOverflow()
                }
            ],
            /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */ 'overflow-x': [
                {
                    'overflow-x': scaleOverflow()
                }
            ],
            /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */ 'overflow-y': [
                {
                    'overflow-y': scaleOverflow()
                }
            ],
            /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */ overscroll: [
                {
                    overscroll: scaleOverscroll()
                }
            ],
            /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */ 'overscroll-x': [
                {
                    'overscroll-x': scaleOverscroll()
                }
            ],
            /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */ 'overscroll-y': [
                {
                    'overscroll-y': scaleOverscroll()
                }
            ],
            /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */ position: [
                'static',
                'fixed',
                'absolute',
                'relative',
                'sticky'
            ],
            /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */ inset: [
                {
                    inset: scaleInset()
                }
            ],
            /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */ 'inset-x': [
                {
                    'inset-x': scaleInset()
                }
            ],
            /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */ 'inset-y': [
                {
                    'inset-y': scaleInset()
                }
            ],
            /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */ start: [
                {
                    start: scaleInset()
                }
            ],
            /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */ end: [
                {
                    end: scaleInset()
                }
            ],
            /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */ top: [
                {
                    top: scaleInset()
                }
            ],
            /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */ right: [
                {
                    right: scaleInset()
                }
            ],
            /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */ bottom: [
                {
                    bottom: scaleInset()
                }
            ],
            /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */ left: [
                {
                    left: scaleInset()
                }
            ],
            /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */ visibility: [
                'visible',
                'invisible',
                'collapse'
            ],
            /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */ z: [
                {
                    z: [
                        isInteger,
                        'auto',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            // ------------------------
            // --- Flexbox and Grid ---
            // ------------------------
            /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */ basis: [
                {
                    basis: [
                        isFraction,
                        'full',
                        'auto',
                        themeContainer,
                        ...scaleUnambiguousSpacing()
                    ]
                }
            ],
            /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */ 'flex-direction': [
                {
                    flex: [
                        'row',
                        'row-reverse',
                        'col',
                        'col-reverse'
                    ]
                }
            ],
            /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */ 'flex-wrap': [
                {
                    flex: [
                        'nowrap',
                        'wrap',
                        'wrap-reverse'
                    ]
                }
            ],
            /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */ flex: [
                {
                    flex: [
                        isNumber,
                        isFraction,
                        'auto',
                        'initial',
                        'none',
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */ grow: [
                {
                    grow: [
                        '',
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */ shrink: [
                {
                    shrink: [
                        '',
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */ order: [
                {
                    order: [
                        isInteger,
                        'first',
                        'last',
                        'none',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */ 'grid-cols': [
                {
                    'grid-cols': scaleGridTemplateColsRows()
                }
            ],
            /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */ 'col-start-end': [
                {
                    col: scaleGridColRowStartAndEnd()
                }
            ],
            /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */ 'col-start': [
                {
                    'col-start': scaleGridColRowStartOrEnd()
                }
            ],
            /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */ 'col-end': [
                {
                    'col-end': scaleGridColRowStartOrEnd()
                }
            ],
            /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */ 'grid-rows': [
                {
                    'grid-rows': scaleGridTemplateColsRows()
                }
            ],
            /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */ 'row-start-end': [
                {
                    row: scaleGridColRowStartAndEnd()
                }
            ],
            /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */ 'row-start': [
                {
                    'row-start': scaleGridColRowStartOrEnd()
                }
            ],
            /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */ 'row-end': [
                {
                    'row-end': scaleGridColRowStartOrEnd()
                }
            ],
            /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */ 'grid-flow': [
                {
                    'grid-flow': [
                        'row',
                        'col',
                        'dense',
                        'row-dense',
                        'col-dense'
                    ]
                }
            ],
            /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */ 'auto-cols': [
                {
                    'auto-cols': scaleGridAutoColsRows()
                }
            ],
            /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */ 'auto-rows': [
                {
                    'auto-rows': scaleGridAutoColsRows()
                }
            ],
            /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */ gap: [
                {
                    gap: scaleUnambiguousSpacing()
                }
            ],
            /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */ 'gap-x': [
                {
                    'gap-x': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */ 'gap-y': [
                {
                    'gap-y': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */ 'justify-content': [
                {
                    justify: [
                        ...scaleAlignPrimaryAxis(),
                        'normal'
                    ]
                }
            ],
            /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */ 'justify-items': [
                {
                    'justify-items': [
                        ...scaleAlignSecondaryAxis(),
                        'normal'
                    ]
                }
            ],
            /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */ 'justify-self': [
                {
                    'justify-self': [
                        'auto',
                        ...scaleAlignSecondaryAxis()
                    ]
                }
            ],
            /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */ 'align-content': [
                {
                    content: [
                        'normal',
                        ...scaleAlignPrimaryAxis()
                    ]
                }
            ],
            /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */ 'align-items': [
                {
                    items: [
                        ...scaleAlignSecondaryAxis(),
                        {
                            baseline: [
                                '',
                                'last'
                            ]
                        }
                    ]
                }
            ],
            /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */ 'align-self': [
                {
                    self: [
                        'auto',
                        ...scaleAlignSecondaryAxis(),
                        {
                            baseline: [
                                '',
                                'last'
                            ]
                        }
                    ]
                }
            ],
            /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */ 'place-content': [
                {
                    'place-content': scaleAlignPrimaryAxis()
                }
            ],
            /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */ 'place-items': [
                {
                    'place-items': [
                        ...scaleAlignSecondaryAxis(),
                        'baseline'
                    ]
                }
            ],
            /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */ 'place-self': [
                {
                    'place-self': [
                        'auto',
                        ...scaleAlignSecondaryAxis()
                    ]
                }
            ],
            // Spacing
            /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */ p: [
                {
                    p: scaleUnambiguousSpacing()
                }
            ],
            /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */ px: [
                {
                    px: scaleUnambiguousSpacing()
                }
            ],
            /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */ py: [
                {
                    py: scaleUnambiguousSpacing()
                }
            ],
            /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */ ps: [
                {
                    ps: scaleUnambiguousSpacing()
                }
            ],
            /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */ pe: [
                {
                    pe: scaleUnambiguousSpacing()
                }
            ],
            /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */ pt: [
                {
                    pt: scaleUnambiguousSpacing()
                }
            ],
            /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */ pr: [
                {
                    pr: scaleUnambiguousSpacing()
                }
            ],
            /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */ pb: [
                {
                    pb: scaleUnambiguousSpacing()
                }
            ],
            /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */ pl: [
                {
                    pl: scaleUnambiguousSpacing()
                }
            ],
            /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */ m: [
                {
                    m: scaleMargin()
                }
            ],
            /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */ mx: [
                {
                    mx: scaleMargin()
                }
            ],
            /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */ my: [
                {
                    my: scaleMargin()
                }
            ],
            /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */ ms: [
                {
                    ms: scaleMargin()
                }
            ],
            /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */ me: [
                {
                    me: scaleMargin()
                }
            ],
            /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */ mt: [
                {
                    mt: scaleMargin()
                }
            ],
            /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */ mr: [
                {
                    mr: scaleMargin()
                }
            ],
            /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */ mb: [
                {
                    mb: scaleMargin()
                }
            ],
            /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */ ml: [
                {
                    ml: scaleMargin()
                }
            ],
            /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */ 'space-x': [
                {
                    'space-x': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */ 'space-x-reverse': [
                'space-x-reverse'
            ],
            /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */ 'space-y': [
                {
                    'space-y': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */ 'space-y-reverse': [
                'space-y-reverse'
            ],
            // --------------
            // --- Sizing ---
            // --------------
            /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */ size: [
                {
                    size: scaleSizing()
                }
            ],
            /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */ w: [
                {
                    w: [
                        themeContainer,
                        'screen',
                        ...scaleSizing()
                    ]
                }
            ],
            /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */ 'min-w': [
                {
                    'min-w': [
                        themeContainer,
                        'screen',
                        /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */ 'none',
                        ...scaleSizing()
                    ]
                }
            ],
            /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */ 'max-w': [
                {
                    'max-w': [
                        themeContainer,
                        'screen',
                        'none',
                        /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */ 'prose',
                        /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */ {
                            screen: [
                                themeBreakpoint
                            ]
                        },
                        ...scaleSizing()
                    ]
                }
            ],
            /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */ h: [
                {
                    h: [
                        'screen',
                        'lh',
                        ...scaleSizing()
                    ]
                }
            ],
            /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */ 'min-h': [
                {
                    'min-h': [
                        'screen',
                        'lh',
                        'none',
                        ...scaleSizing()
                    ]
                }
            ],
            /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */ 'max-h': [
                {
                    'max-h': [
                        'screen',
                        'lh',
                        ...scaleSizing()
                    ]
                }
            ],
            // ------------------
            // --- Typography ---
            // ------------------
            /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */ 'font-size': [
                {
                    text: [
                        'base',
                        themeText,
                        isArbitraryVariableLength,
                        isArbitraryLength
                    ]
                }
            ],
            /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */ 'font-smoothing': [
                'antialiased',
                'subpixel-antialiased'
            ],
            /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */ 'font-style': [
                'italic',
                'not-italic'
            ],
            /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */ 'font-weight': [
                {
                    font: [
                        themeFontWeight,
                        isArbitraryVariable,
                        isArbitraryNumber
                    ]
                }
            ],
            /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */ 'font-stretch': [
                {
                    'font-stretch': [
                        'ultra-condensed',
                        'extra-condensed',
                        'condensed',
                        'semi-condensed',
                        'normal',
                        'semi-expanded',
                        'expanded',
                        'extra-expanded',
                        'ultra-expanded',
                        isPercent,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */ 'font-family': [
                {
                    font: [
                        isArbitraryVariableFamilyName,
                        isArbitraryValue,
                        themeFont
                    ]
                }
            ],
            /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */ 'fvn-normal': [
                'normal-nums'
            ],
            /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */ 'fvn-ordinal': [
                'ordinal'
            ],
            /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */ 'fvn-slashed-zero': [
                'slashed-zero'
            ],
            /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */ 'fvn-figure': [
                'lining-nums',
                'oldstyle-nums'
            ],
            /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */ 'fvn-spacing': [
                'proportional-nums',
                'tabular-nums'
            ],
            /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */ 'fvn-fraction': [
                'diagonal-fractions',
                'stacked-fractions'
            ],
            /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */ tracking: [
                {
                    tracking: [
                        themeTracking,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */ 'line-clamp': [
                {
                    'line-clamp': [
                        isNumber,
                        'none',
                        isArbitraryVariable,
                        isArbitraryNumber
                    ]
                }
            ],
            /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */ leading: [
                {
                    leading: [
                        /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */ themeLeading,
                        ...scaleUnambiguousSpacing()
                    ]
                }
            ],
            /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */ 'list-image': [
                {
                    'list-image': [
                        'none',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */ 'list-style-position': [
                {
                    list: [
                        'inside',
                        'outside'
                    ]
                }
            ],
            /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */ 'list-style-type': [
                {
                    list: [
                        'disc',
                        'decimal',
                        'none',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */ 'text-alignment': [
                {
                    text: [
                        'left',
                        'center',
                        'right',
                        'justify',
                        'start',
                        'end'
                    ]
                }
            ],
            /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */ 'placeholder-color': [
                {
                    placeholder: scaleColor()
                }
            ],
            /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */ 'text-color': [
                {
                    text: scaleColor()
                }
            ],
            /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */ 'text-decoration': [
                'underline',
                'overline',
                'line-through',
                'no-underline'
            ],
            /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */ 'text-decoration-style': [
                {
                    decoration: [
                        ...scaleLineStyle(),
                        'wavy'
                    ]
                }
            ],
            /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */ 'text-decoration-thickness': [
                {
                    decoration: [
                        isNumber,
                        'from-font',
                        'auto',
                        isArbitraryVariable,
                        isArbitraryLength
                    ]
                }
            ],
            /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */ 'text-decoration-color': [
                {
                    decoration: scaleColor()
                }
            ],
            /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */ 'underline-offset': [
                {
                    'underline-offset': [
                        isNumber,
                        'auto',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */ 'text-transform': [
                'uppercase',
                'lowercase',
                'capitalize',
                'normal-case'
            ],
            /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */ 'text-overflow': [
                'truncate',
                'text-ellipsis',
                'text-clip'
            ],
            /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */ 'text-wrap': [
                {
                    text: [
                        'wrap',
                        'nowrap',
                        'balance',
                        'pretty'
                    ]
                }
            ],
            /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */ indent: [
                {
                    indent: scaleUnambiguousSpacing()
                }
            ],
            /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */ 'vertical-align': [
                {
                    align: [
                        'baseline',
                        'top',
                        'middle',
                        'bottom',
                        'text-top',
                        'text-bottom',
                        'sub',
                        'super',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */ whitespace: [
                {
                    whitespace: [
                        'normal',
                        'nowrap',
                        'pre',
                        'pre-line',
                        'pre-wrap',
                        'break-spaces'
                    ]
                }
            ],
            /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */ break: [
                {
                    break: [
                        'normal',
                        'words',
                        'all',
                        'keep'
                    ]
                }
            ],
            /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */ wrap: [
                {
                    wrap: [
                        'break-word',
                        'anywhere',
                        'normal'
                    ]
                }
            ],
            /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */ hyphens: [
                {
                    hyphens: [
                        'none',
                        'manual',
                        'auto'
                    ]
                }
            ],
            /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */ content: [
                {
                    content: [
                        'none',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            // -------------------
            // --- Backgrounds ---
            // -------------------
            /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */ 'bg-attachment': [
                {
                    bg: [
                        'fixed',
                        'local',
                        'scroll'
                    ]
                }
            ],
            /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */ 'bg-clip': [
                {
                    'bg-clip': [
                        'border',
                        'padding',
                        'content',
                        'text'
                    ]
                }
            ],
            /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */ 'bg-origin': [
                {
                    'bg-origin': [
                        'border',
                        'padding',
                        'content'
                    ]
                }
            ],
            /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */ 'bg-position': [
                {
                    bg: scaleBgPosition()
                }
            ],
            /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */ 'bg-repeat': [
                {
                    bg: scaleBgRepeat()
                }
            ],
            /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */ 'bg-size': [
                {
                    bg: scaleBgSize()
                }
            ],
            /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */ 'bg-image': [
                {
                    bg: [
                        'none',
                        {
                            linear: [
                                {
                                    to: [
                                        't',
                                        'tr',
                                        'r',
                                        'br',
                                        'b',
                                        'bl',
                                        'l',
                                        'tl'
                                    ]
                                },
                                isInteger,
                                isArbitraryVariable,
                                isArbitraryValue
                            ],
                            radial: [
                                '',
                                isArbitraryVariable,
                                isArbitraryValue
                            ],
                            conic: [
                                isInteger,
                                isArbitraryVariable,
                                isArbitraryValue
                            ]
                        },
                        isArbitraryVariableImage,
                        isArbitraryImage
                    ]
                }
            ],
            /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */ 'bg-color': [
                {
                    bg: scaleColor()
                }
            ],
            /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */ 'gradient-from-pos': [
                {
                    from: scaleGradientStopPosition()
                }
            ],
            /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */ 'gradient-via-pos': [
                {
                    via: scaleGradientStopPosition()
                }
            ],
            /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */ 'gradient-to-pos': [
                {
                    to: scaleGradientStopPosition()
                }
            ],
            /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */ 'gradient-from': [
                {
                    from: scaleColor()
                }
            ],
            /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */ 'gradient-via': [
                {
                    via: scaleColor()
                }
            ],
            /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */ 'gradient-to': [
                {
                    to: scaleColor()
                }
            ],
            // ---------------
            // --- Borders ---
            // ---------------
            /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */ rounded: [
                {
                    rounded: scaleRadius()
                }
            ],
            /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-s': [
                {
                    'rounded-s': scaleRadius()
                }
            ],
            /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-e': [
                {
                    'rounded-e': scaleRadius()
                }
            ],
            /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-t': [
                {
                    'rounded-t': scaleRadius()
                }
            ],
            /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-r': [
                {
                    'rounded-r': scaleRadius()
                }
            ],
            /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-b': [
                {
                    'rounded-b': scaleRadius()
                }
            ],
            /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-l': [
                {
                    'rounded-l': scaleRadius()
                }
            ],
            /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-ss': [
                {
                    'rounded-ss': scaleRadius()
                }
            ],
            /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-se': [
                {
                    'rounded-se': scaleRadius()
                }
            ],
            /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-ee': [
                {
                    'rounded-ee': scaleRadius()
                }
            ],
            /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-es': [
                {
                    'rounded-es': scaleRadius()
                }
            ],
            /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-tl': [
                {
                    'rounded-tl': scaleRadius()
                }
            ],
            /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-tr': [
                {
                    'rounded-tr': scaleRadius()
                }
            ],
            /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-br': [
                {
                    'rounded-br': scaleRadius()
                }
            ],
            /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */ 'rounded-bl': [
                {
                    'rounded-bl': scaleRadius()
                }
            ],
            /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */ 'border-w': [
                {
                    border: scaleBorderWidth()
                }
            ],
            /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */ 'border-w-x': [
                {
                    'border-x': scaleBorderWidth()
                }
            ],
            /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */ 'border-w-y': [
                {
                    'border-y': scaleBorderWidth()
                }
            ],
            /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */ 'border-w-s': [
                {
                    'border-s': scaleBorderWidth()
                }
            ],
            /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */ 'border-w-e': [
                {
                    'border-e': scaleBorderWidth()
                }
            ],
            /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */ 'border-w-t': [
                {
                    'border-t': scaleBorderWidth()
                }
            ],
            /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */ 'border-w-r': [
                {
                    'border-r': scaleBorderWidth()
                }
            ],
            /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */ 'border-w-b': [
                {
                    'border-b': scaleBorderWidth()
                }
            ],
            /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */ 'border-w-l': [
                {
                    'border-l': scaleBorderWidth()
                }
            ],
            /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */ 'divide-x': [
                {
                    'divide-x': scaleBorderWidth()
                }
            ],
            /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */ 'divide-x-reverse': [
                'divide-x-reverse'
            ],
            /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */ 'divide-y': [
                {
                    'divide-y': scaleBorderWidth()
                }
            ],
            /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */ 'divide-y-reverse': [
                'divide-y-reverse'
            ],
            /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */ 'border-style': [
                {
                    border: [
                        ...scaleLineStyle(),
                        'hidden',
                        'none'
                    ]
                }
            ],
            /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */ 'divide-style': [
                {
                    divide: [
                        ...scaleLineStyle(),
                        'hidden',
                        'none'
                    ]
                }
            ],
            /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */ 'border-color': [
                {
                    border: scaleColor()
                }
            ],
            /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */ 'border-color-x': [
                {
                    'border-x': scaleColor()
                }
            ],
            /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */ 'border-color-y': [
                {
                    'border-y': scaleColor()
                }
            ],
            /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */ 'border-color-s': [
                {
                    'border-s': scaleColor()
                }
            ],
            /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */ 'border-color-e': [
                {
                    'border-e': scaleColor()
                }
            ],
            /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */ 'border-color-t': [
                {
                    'border-t': scaleColor()
                }
            ],
            /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */ 'border-color-r': [
                {
                    'border-r': scaleColor()
                }
            ],
            /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */ 'border-color-b': [
                {
                    'border-b': scaleColor()
                }
            ],
            /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */ 'border-color-l': [
                {
                    'border-l': scaleColor()
                }
            ],
            /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */ 'divide-color': [
                {
                    divide: scaleColor()
                }
            ],
            /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */ 'outline-style': [
                {
                    outline: [
                        ...scaleLineStyle(),
                        'none',
                        'hidden'
                    ]
                }
            ],
            /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */ 'outline-offset': [
                {
                    'outline-offset': [
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */ 'outline-w': [
                {
                    outline: [
                        '',
                        isNumber,
                        isArbitraryVariableLength,
                        isArbitraryLength
                    ]
                }
            ],
            /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */ 'outline-color': [
                {
                    outline: scaleColor()
                }
            ],
            // ---------------
            // --- Effects ---
            // ---------------
            /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */ shadow: [
                {
                    shadow: [
                        // Deprecated since Tailwind CSS v4.0.0
                        '',
                        'none',
                        themeShadow,
                        isArbitraryVariableShadow,
                        isArbitraryShadow
                    ]
                }
            ],
            /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */ 'shadow-color': [
                {
                    shadow: scaleColor()
                }
            ],
            /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */ 'inset-shadow': [
                {
                    'inset-shadow': [
                        'none',
                        themeInsetShadow,
                        isArbitraryVariableShadow,
                        isArbitraryShadow
                    ]
                }
            ],
            /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */ 'inset-shadow-color': [
                {
                    'inset-shadow': scaleColor()
                }
            ],
            /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */ 'ring-w': [
                {
                    ring: scaleBorderWidth()
                }
            ],
            /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */ 'ring-w-inset': [
                'ring-inset'
            ],
            /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */ 'ring-color': [
                {
                    ring: scaleColor()
                }
            ],
            /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */ 'ring-offset-w': [
                {
                    'ring-offset': [
                        isNumber,
                        isArbitraryLength
                    ]
                }
            ],
            /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */ 'ring-offset-color': [
                {
                    'ring-offset': scaleColor()
                }
            ],
            /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */ 'inset-ring-w': [
                {
                    'inset-ring': scaleBorderWidth()
                }
            ],
            /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */ 'inset-ring-color': [
                {
                    'inset-ring': scaleColor()
                }
            ],
            /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */ 'text-shadow': [
                {
                    'text-shadow': [
                        'none',
                        themeTextShadow,
                        isArbitraryVariableShadow,
                        isArbitraryShadow
                    ]
                }
            ],
            /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */ 'text-shadow-color': [
                {
                    'text-shadow': scaleColor()
                }
            ],
            /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */ opacity: [
                {
                    opacity: [
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */ 'mix-blend': [
                {
                    'mix-blend': [
                        ...scaleBlendMode(),
                        'plus-darker',
                        'plus-lighter'
                    ]
                }
            ],
            /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */ 'bg-blend': [
                {
                    'bg-blend': scaleBlendMode()
                }
            ],
            /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */ 'mask-clip': [
                {
                    'mask-clip': [
                        'border',
                        'padding',
                        'content',
                        'fill',
                        'stroke',
                        'view'
                    ]
                },
                'mask-no-clip'
            ],
            /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */ 'mask-composite': [
                {
                    mask: [
                        'add',
                        'subtract',
                        'intersect',
                        'exclude'
                    ]
                }
            ],
            /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */ 'mask-image-linear-pos': [
                {
                    'mask-linear': [
                        isNumber
                    ]
                }
            ],
            'mask-image-linear-from-pos': [
                {
                    'mask-linear-from': scaleMaskImagePosition()
                }
            ],
            'mask-image-linear-to-pos': [
                {
                    'mask-linear-to': scaleMaskImagePosition()
                }
            ],
            'mask-image-linear-from-color': [
                {
                    'mask-linear-from': scaleColor()
                }
            ],
            'mask-image-linear-to-color': [
                {
                    'mask-linear-to': scaleColor()
                }
            ],
            'mask-image-t-from-pos': [
                {
                    'mask-t-from': scaleMaskImagePosition()
                }
            ],
            'mask-image-t-to-pos': [
                {
                    'mask-t-to': scaleMaskImagePosition()
                }
            ],
            'mask-image-t-from-color': [
                {
                    'mask-t-from': scaleColor()
                }
            ],
            'mask-image-t-to-color': [
                {
                    'mask-t-to': scaleColor()
                }
            ],
            'mask-image-r-from-pos': [
                {
                    'mask-r-from': scaleMaskImagePosition()
                }
            ],
            'mask-image-r-to-pos': [
                {
                    'mask-r-to': scaleMaskImagePosition()
                }
            ],
            'mask-image-r-from-color': [
                {
                    'mask-r-from': scaleColor()
                }
            ],
            'mask-image-r-to-color': [
                {
                    'mask-r-to': scaleColor()
                }
            ],
            'mask-image-b-from-pos': [
                {
                    'mask-b-from': scaleMaskImagePosition()
                }
            ],
            'mask-image-b-to-pos': [
                {
                    'mask-b-to': scaleMaskImagePosition()
                }
            ],
            'mask-image-b-from-color': [
                {
                    'mask-b-from': scaleColor()
                }
            ],
            'mask-image-b-to-color': [
                {
                    'mask-b-to': scaleColor()
                }
            ],
            'mask-image-l-from-pos': [
                {
                    'mask-l-from': scaleMaskImagePosition()
                }
            ],
            'mask-image-l-to-pos': [
                {
                    'mask-l-to': scaleMaskImagePosition()
                }
            ],
            'mask-image-l-from-color': [
                {
                    'mask-l-from': scaleColor()
                }
            ],
            'mask-image-l-to-color': [
                {
                    'mask-l-to': scaleColor()
                }
            ],
            'mask-image-x-from-pos': [
                {
                    'mask-x-from': scaleMaskImagePosition()
                }
            ],
            'mask-image-x-to-pos': [
                {
                    'mask-x-to': scaleMaskImagePosition()
                }
            ],
            'mask-image-x-from-color': [
                {
                    'mask-x-from': scaleColor()
                }
            ],
            'mask-image-x-to-color': [
                {
                    'mask-x-to': scaleColor()
                }
            ],
            'mask-image-y-from-pos': [
                {
                    'mask-y-from': scaleMaskImagePosition()
                }
            ],
            'mask-image-y-to-pos': [
                {
                    'mask-y-to': scaleMaskImagePosition()
                }
            ],
            'mask-image-y-from-color': [
                {
                    'mask-y-from': scaleColor()
                }
            ],
            'mask-image-y-to-color': [
                {
                    'mask-y-to': scaleColor()
                }
            ],
            'mask-image-radial': [
                {
                    'mask-radial': [
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            'mask-image-radial-from-pos': [
                {
                    'mask-radial-from': scaleMaskImagePosition()
                }
            ],
            'mask-image-radial-to-pos': [
                {
                    'mask-radial-to': scaleMaskImagePosition()
                }
            ],
            'mask-image-radial-from-color': [
                {
                    'mask-radial-from': scaleColor()
                }
            ],
            'mask-image-radial-to-color': [
                {
                    'mask-radial-to': scaleColor()
                }
            ],
            'mask-image-radial-shape': [
                {
                    'mask-radial': [
                        'circle',
                        'ellipse'
                    ]
                }
            ],
            'mask-image-radial-size': [
                {
                    'mask-radial': [
                        {
                            closest: [
                                'side',
                                'corner'
                            ],
                            farthest: [
                                'side',
                                'corner'
                            ]
                        }
                    ]
                }
            ],
            'mask-image-radial-pos': [
                {
                    'mask-radial-at': scalePosition()
                }
            ],
            'mask-image-conic-pos': [
                {
                    'mask-conic': [
                        isNumber
                    ]
                }
            ],
            'mask-image-conic-from-pos': [
                {
                    'mask-conic-from': scaleMaskImagePosition()
                }
            ],
            'mask-image-conic-to-pos': [
                {
                    'mask-conic-to': scaleMaskImagePosition()
                }
            ],
            'mask-image-conic-from-color': [
                {
                    'mask-conic-from': scaleColor()
                }
            ],
            'mask-image-conic-to-color': [
                {
                    'mask-conic-to': scaleColor()
                }
            ],
            /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */ 'mask-mode': [
                {
                    mask: [
                        'alpha',
                        'luminance',
                        'match'
                    ]
                }
            ],
            /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */ 'mask-origin': [
                {
                    'mask-origin': [
                        'border',
                        'padding',
                        'content',
                        'fill',
                        'stroke',
                        'view'
                    ]
                }
            ],
            /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */ 'mask-position': [
                {
                    mask: scaleBgPosition()
                }
            ],
            /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */ 'mask-repeat': [
                {
                    mask: scaleBgRepeat()
                }
            ],
            /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */ 'mask-size': [
                {
                    mask: scaleBgSize()
                }
            ],
            /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */ 'mask-type': [
                {
                    'mask-type': [
                        'alpha',
                        'luminance'
                    ]
                }
            ],
            /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */ 'mask-image': [
                {
                    mask: [
                        'none',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            // ---------------
            // --- Filters ---
            // ---------------
            /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */ filter: [
                {
                    filter: [
                        // Deprecated since Tailwind CSS v3.0.0
                        '',
                        'none',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */ blur: [
                {
                    blur: scaleBlur()
                }
            ],
            /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */ brightness: [
                {
                    brightness: [
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */ contrast: [
                {
                    contrast: [
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */ 'drop-shadow': [
                {
                    'drop-shadow': [
                        // Deprecated since Tailwind CSS v4.0.0
                        '',
                        'none',
                        themeDropShadow,
                        isArbitraryVariableShadow,
                        isArbitraryShadow
                    ]
                }
            ],
            /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */ 'drop-shadow-color': [
                {
                    'drop-shadow': scaleColor()
                }
            ],
            /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */ grayscale: [
                {
                    grayscale: [
                        '',
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */ 'hue-rotate': [
                {
                    'hue-rotate': [
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */ invert: [
                {
                    invert: [
                        '',
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */ saturate: [
                {
                    saturate: [
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */ sepia: [
                {
                    sepia: [
                        '',
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */ 'backdrop-filter': [
                {
                    'backdrop-filter': [
                        // Deprecated since Tailwind CSS v3.0.0
                        '',
                        'none',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */ 'backdrop-blur': [
                {
                    'backdrop-blur': scaleBlur()
                }
            ],
            /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */ 'backdrop-brightness': [
                {
                    'backdrop-brightness': [
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */ 'backdrop-contrast': [
                {
                    'backdrop-contrast': [
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */ 'backdrop-grayscale': [
                {
                    'backdrop-grayscale': [
                        '',
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */ 'backdrop-hue-rotate': [
                {
                    'backdrop-hue-rotate': [
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */ 'backdrop-invert': [
                {
                    'backdrop-invert': [
                        '',
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */ 'backdrop-opacity': [
                {
                    'backdrop-opacity': [
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */ 'backdrop-saturate': [
                {
                    'backdrop-saturate': [
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */ 'backdrop-sepia': [
                {
                    'backdrop-sepia': [
                        '',
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            // --------------
            // --- Tables ---
            // --------------
            /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */ 'border-collapse': [
                {
                    border: [
                        'collapse',
                        'separate'
                    ]
                }
            ],
            /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */ 'border-spacing': [
                {
                    'border-spacing': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */ 'border-spacing-x': [
                {
                    'border-spacing-x': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */ 'border-spacing-y': [
                {
                    'border-spacing-y': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */ 'table-layout': [
                {
                    table: [
                        'auto',
                        'fixed'
                    ]
                }
            ],
            /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */ caption: [
                {
                    caption: [
                        'top',
                        'bottom'
                    ]
                }
            ],
            // ---------------------------------
            // --- Transitions and Animation ---
            // ---------------------------------
            /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */ transition: [
                {
                    transition: [
                        '',
                        'all',
                        'colors',
                        'opacity',
                        'shadow',
                        'transform',
                        'none',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */ 'transition-behavior': [
                {
                    transition: [
                        'normal',
                        'discrete'
                    ]
                }
            ],
            /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */ duration: [
                {
                    duration: [
                        isNumber,
                        'initial',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */ ease: [
                {
                    ease: [
                        'linear',
                        'initial',
                        themeEase,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */ delay: [
                {
                    delay: [
                        isNumber,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */ animate: [
                {
                    animate: [
                        'none',
                        themeAnimate,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            // ------------------
            // --- Transforms ---
            // ------------------
            /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */ backface: [
                {
                    backface: [
                        'hidden',
                        'visible'
                    ]
                }
            ],
            /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */ perspective: [
                {
                    perspective: [
                        themePerspective,
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */ 'perspective-origin': [
                {
                    'perspective-origin': scalePositionWithArbitrary()
                }
            ],
            /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */ rotate: [
                {
                    rotate: scaleRotate()
                }
            ],
            /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */ 'rotate-x': [
                {
                    'rotate-x': scaleRotate()
                }
            ],
            /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */ 'rotate-y': [
                {
                    'rotate-y': scaleRotate()
                }
            ],
            /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */ 'rotate-z': [
                {
                    'rotate-z': scaleRotate()
                }
            ],
            /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */ scale: [
                {
                    scale: scaleScale()
                }
            ],
            /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */ 'scale-x': [
                {
                    'scale-x': scaleScale()
                }
            ],
            /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */ 'scale-y': [
                {
                    'scale-y': scaleScale()
                }
            ],
            /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */ 'scale-z': [
                {
                    'scale-z': scaleScale()
                }
            ],
            /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */ 'scale-3d': [
                'scale-3d'
            ],
            /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */ skew: [
                {
                    skew: scaleSkew()
                }
            ],
            /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */ 'skew-x': [
                {
                    'skew-x': scaleSkew()
                }
            ],
            /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */ 'skew-y': [
                {
                    'skew-y': scaleSkew()
                }
            ],
            /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */ transform: [
                {
                    transform: [
                        isArbitraryVariable,
                        isArbitraryValue,
                        '',
                        'none',
                        'gpu',
                        'cpu'
                    ]
                }
            ],
            /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */ 'transform-origin': [
                {
                    origin: scalePositionWithArbitrary()
                }
            ],
            /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */ 'transform-style': [
                {
                    transform: [
                        '3d',
                        'flat'
                    ]
                }
            ],
            /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */ translate: [
                {
                    translate: scaleTranslate()
                }
            ],
            /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */ 'translate-x': [
                {
                    'translate-x': scaleTranslate()
                }
            ],
            /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */ 'translate-y': [
                {
                    'translate-y': scaleTranslate()
                }
            ],
            /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */ 'translate-z': [
                {
                    'translate-z': scaleTranslate()
                }
            ],
            /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */ 'translate-none': [
                'translate-none'
            ],
            // ---------------------
            // --- Interactivity ---
            // ---------------------
            /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */ accent: [
                {
                    accent: scaleColor()
                }
            ],
            /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */ appearance: [
                {
                    appearance: [
                        'none',
                        'auto'
                    ]
                }
            ],
            /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */ 'caret-color': [
                {
                    caret: scaleColor()
                }
            ],
            /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */ 'color-scheme': [
                {
                    scheme: [
                        'normal',
                        'dark',
                        'light',
                        'light-dark',
                        'only-dark',
                        'only-light'
                    ]
                }
            ],
            /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */ cursor: [
                {
                    cursor: [
                        'auto',
                        'default',
                        'pointer',
                        'wait',
                        'text',
                        'move',
                        'help',
                        'not-allowed',
                        'none',
                        'context-menu',
                        'progress',
                        'cell',
                        'crosshair',
                        'vertical-text',
                        'alias',
                        'copy',
                        'no-drop',
                        'grab',
                        'grabbing',
                        'all-scroll',
                        'col-resize',
                        'row-resize',
                        'n-resize',
                        'e-resize',
                        's-resize',
                        'w-resize',
                        'ne-resize',
                        'nw-resize',
                        'se-resize',
                        'sw-resize',
                        'ew-resize',
                        'ns-resize',
                        'nesw-resize',
                        'nwse-resize',
                        'zoom-in',
                        'zoom-out',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */ 'field-sizing': [
                {
                    'field-sizing': [
                        'fixed',
                        'content'
                    ]
                }
            ],
            /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */ 'pointer-events': [
                {
                    'pointer-events': [
                        'auto',
                        'none'
                    ]
                }
            ],
            /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */ resize: [
                {
                    resize: [
                        'none',
                        '',
                        'y',
                        'x'
                    ]
                }
            ],
            /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */ 'scroll-behavior': [
                {
                    scroll: [
                        'auto',
                        'smooth'
                    ]
                }
            ],
            /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */ 'scroll-m': [
                {
                    'scroll-m': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */ 'scroll-mx': [
                {
                    'scroll-mx': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */ 'scroll-my': [
                {
                    'scroll-my': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */ 'scroll-ms': [
                {
                    'scroll-ms': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */ 'scroll-me': [
                {
                    'scroll-me': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */ 'scroll-mt': [
                {
                    'scroll-mt': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */ 'scroll-mr': [
                {
                    'scroll-mr': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */ 'scroll-mb': [
                {
                    'scroll-mb': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */ 'scroll-ml': [
                {
                    'scroll-ml': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */ 'scroll-p': [
                {
                    'scroll-p': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */ 'scroll-px': [
                {
                    'scroll-px': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */ 'scroll-py': [
                {
                    'scroll-py': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */ 'scroll-ps': [
                {
                    'scroll-ps': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */ 'scroll-pe': [
                {
                    'scroll-pe': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */ 'scroll-pt': [
                {
                    'scroll-pt': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */ 'scroll-pr': [
                {
                    'scroll-pr': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */ 'scroll-pb': [
                {
                    'scroll-pb': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */ 'scroll-pl': [
                {
                    'scroll-pl': scaleUnambiguousSpacing()
                }
            ],
            /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */ 'snap-align': [
                {
                    snap: [
                        'start',
                        'end',
                        'center',
                        'align-none'
                    ]
                }
            ],
            /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */ 'snap-stop': [
                {
                    snap: [
                        'normal',
                        'always'
                    ]
                }
            ],
            /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */ 'snap-type': [
                {
                    snap: [
                        'none',
                        'x',
                        'y',
                        'both'
                    ]
                }
            ],
            /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */ 'snap-strictness': [
                {
                    snap: [
                        'mandatory',
                        'proximity'
                    ]
                }
            ],
            /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */ touch: [
                {
                    touch: [
                        'auto',
                        'none',
                        'manipulation'
                    ]
                }
            ],
            /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */ 'touch-x': [
                {
                    'touch-pan': [
                        'x',
                        'left',
                        'right'
                    ]
                }
            ],
            /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */ 'touch-y': [
                {
                    'touch-pan': [
                        'y',
                        'up',
                        'down'
                    ]
                }
            ],
            /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */ 'touch-pz': [
                'touch-pinch-zoom'
            ],
            /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */ select: [
                {
                    select: [
                        'none',
                        'text',
                        'all',
                        'auto'
                    ]
                }
            ],
            /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */ 'will-change': [
                {
                    'will-change': [
                        'auto',
                        'scroll',
                        'contents',
                        'transform',
                        isArbitraryVariable,
                        isArbitraryValue
                    ]
                }
            ],
            // -----------
            // --- SVG ---
            // -----------
            /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */ fill: [
                {
                    fill: [
                        'none',
                        ...scaleColor()
                    ]
                }
            ],
            /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */ 'stroke-w': [
                {
                    stroke: [
                        isNumber,
                        isArbitraryVariableLength,
                        isArbitraryLength,
                        isArbitraryNumber
                    ]
                }
            ],
            /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */ stroke: [
                {
                    stroke: [
                        'none',
                        ...scaleColor()
                    ]
                }
            ],
            // ---------------------
            // --- Accessibility ---
            // ---------------------
            /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */ 'forced-color-adjust': [
                {
                    'forced-color-adjust': [
                        'auto',
                        'none'
                    ]
                }
            ]
        },
        conflictingClassGroups: {
            overflow: [
                'overflow-x',
                'overflow-y'
            ],
            overscroll: [
                'overscroll-x',
                'overscroll-y'
            ],
            inset: [
                'inset-x',
                'inset-y',
                'start',
                'end',
                'top',
                'right',
                'bottom',
                'left'
            ],
            'inset-x': [
                'right',
                'left'
            ],
            'inset-y': [
                'top',
                'bottom'
            ],
            flex: [
                'basis',
                'grow',
                'shrink'
            ],
            gap: [
                'gap-x',
                'gap-y'
            ],
            p: [
                'px',
                'py',
                'ps',
                'pe',
                'pt',
                'pr',
                'pb',
                'pl'
            ],
            px: [
                'pr',
                'pl'
            ],
            py: [
                'pt',
                'pb'
            ],
            m: [
                'mx',
                'my',
                'ms',
                'me',
                'mt',
                'mr',
                'mb',
                'ml'
            ],
            mx: [
                'mr',
                'ml'
            ],
            my: [
                'mt',
                'mb'
            ],
            size: [
                'w',
                'h'
            ],
            'font-size': [
                'leading'
            ],
            'fvn-normal': [
                'fvn-ordinal',
                'fvn-slashed-zero',
                'fvn-figure',
                'fvn-spacing',
                'fvn-fraction'
            ],
            'fvn-ordinal': [
                'fvn-normal'
            ],
            'fvn-slashed-zero': [
                'fvn-normal'
            ],
            'fvn-figure': [
                'fvn-normal'
            ],
            'fvn-spacing': [
                'fvn-normal'
            ],
            'fvn-fraction': [
                'fvn-normal'
            ],
            'line-clamp': [
                'display',
                'overflow'
            ],
            rounded: [
                'rounded-s',
                'rounded-e',
                'rounded-t',
                'rounded-r',
                'rounded-b',
                'rounded-l',
                'rounded-ss',
                'rounded-se',
                'rounded-ee',
                'rounded-es',
                'rounded-tl',
                'rounded-tr',
                'rounded-br',
                'rounded-bl'
            ],
            'rounded-s': [
                'rounded-ss',
                'rounded-es'
            ],
            'rounded-e': [
                'rounded-se',
                'rounded-ee'
            ],
            'rounded-t': [
                'rounded-tl',
                'rounded-tr'
            ],
            'rounded-r': [
                'rounded-tr',
                'rounded-br'
            ],
            'rounded-b': [
                'rounded-br',
                'rounded-bl'
            ],
            'rounded-l': [
                'rounded-tl',
                'rounded-bl'
            ],
            'border-spacing': [
                'border-spacing-x',
                'border-spacing-y'
            ],
            'border-w': [
                'border-w-x',
                'border-w-y',
                'border-w-s',
                'border-w-e',
                'border-w-t',
                'border-w-r',
                'border-w-b',
                'border-w-l'
            ],
            'border-w-x': [
                'border-w-r',
                'border-w-l'
            ],
            'border-w-y': [
                'border-w-t',
                'border-w-b'
            ],
            'border-color': [
                'border-color-x',
                'border-color-y',
                'border-color-s',
                'border-color-e',
                'border-color-t',
                'border-color-r',
                'border-color-b',
                'border-color-l'
            ],
            'border-color-x': [
                'border-color-r',
                'border-color-l'
            ],
            'border-color-y': [
                'border-color-t',
                'border-color-b'
            ],
            translate: [
                'translate-x',
                'translate-y',
                'translate-none'
            ],
            'translate-none': [
                'translate',
                'translate-x',
                'translate-y',
                'translate-z'
            ],
            'scroll-m': [
                'scroll-mx',
                'scroll-my',
                'scroll-ms',
                'scroll-me',
                'scroll-mt',
                'scroll-mr',
                'scroll-mb',
                'scroll-ml'
            ],
            'scroll-mx': [
                'scroll-mr',
                'scroll-ml'
            ],
            'scroll-my': [
                'scroll-mt',
                'scroll-mb'
            ],
            'scroll-p': [
                'scroll-px',
                'scroll-py',
                'scroll-ps',
                'scroll-pe',
                'scroll-pt',
                'scroll-pr',
                'scroll-pb',
                'scroll-pl'
            ],
            'scroll-px': [
                'scroll-pr',
                'scroll-pl'
            ],
            'scroll-py': [
                'scroll-pt',
                'scroll-pb'
            ],
            touch: [
                'touch-x',
                'touch-y',
                'touch-pz'
            ],
            'touch-x': [
                'touch'
            ],
            'touch-y': [
                'touch'
            ],
            'touch-pz': [
                'touch'
            ]
        },
        conflictingClassGroupModifiers: {
            'font-size': [
                'leading'
            ]
        },
        orderSensitiveModifiers: [
            '*',
            '**',
            'after',
            'backdrop',
            'before',
            'details-content',
            'file',
            'first-letter',
            'first-line',
            'marker',
            'placeholder',
            'selection'
        ]
    };
};
/**
 * @param baseConfig Config where other config will be merged into. This object will be mutated.
 * @param configExtension Partial config to merge into the `baseConfig`.
 */ const mergeConfigs = (baseConfig, { cacheSize, prefix, experimentalParseClassName, extend = {}, override = {} })=>{
    overrideProperty(baseConfig, 'cacheSize', cacheSize);
    overrideProperty(baseConfig, 'prefix', prefix);
    overrideProperty(baseConfig, 'experimentalParseClassName', experimentalParseClassName);
    overrideConfigProperties(baseConfig.theme, override.theme);
    overrideConfigProperties(baseConfig.classGroups, override.classGroups);
    overrideConfigProperties(baseConfig.conflictingClassGroups, override.conflictingClassGroups);
    overrideConfigProperties(baseConfig.conflictingClassGroupModifiers, override.conflictingClassGroupModifiers);
    overrideProperty(baseConfig, 'orderSensitiveModifiers', override.orderSensitiveModifiers);
    mergeConfigProperties(baseConfig.theme, extend.theme);
    mergeConfigProperties(baseConfig.classGroups, extend.classGroups);
    mergeConfigProperties(baseConfig.conflictingClassGroups, extend.conflictingClassGroups);
    mergeConfigProperties(baseConfig.conflictingClassGroupModifiers, extend.conflictingClassGroupModifiers);
    mergeArrayProperties(baseConfig, extend, 'orderSensitiveModifiers');
    return baseConfig;
};
const overrideProperty = (baseObject, overrideKey, overrideValue)=>{
    if (overrideValue !== undefined) {
        baseObject[overrideKey] = overrideValue;
    }
};
const overrideConfigProperties = (baseObject, overrideObject)=>{
    if (overrideObject) {
        for(const key in overrideObject){
            overrideProperty(baseObject, key, overrideObject[key]);
        }
    }
};
const mergeConfigProperties = (baseObject, mergeObject)=>{
    if (mergeObject) {
        for(const key in mergeObject){
            mergeArrayProperties(baseObject, mergeObject, key);
        }
    }
};
const mergeArrayProperties = (baseObject, mergeObject, key)=>{
    const mergeValue = mergeObject[key];
    if (mergeValue !== undefined) {
        baseObject[key] = baseObject[key] ? baseObject[key].concat(mergeValue) : mergeValue;
    }
};
const extendTailwindMerge = (configExtension, ...createConfig)=>typeof configExtension === 'function' ? createTailwindMerge(getDefaultConfig, configExtension, ...createConfig) : createTailwindMerge(()=>mergeConfigs(getDefaultConfig(), configExtension), ...createConfig);
const twMerge = /*#__PURE__*/ createTailwindMerge(getDefaultConfig);
;
 //# sourceMappingURL=bundle-mjs.mjs.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/layers.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Layers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Layers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Layers", [
    [
        "path",
        {
            d: "m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z",
            key: "8b97xw"
        }
    ],
    [
        "path",
        {
            d: "m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65",
            key: "dd6zsq"
        }
    ],
    [
        "path",
        {
            d: "m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65",
            key: "ep9fru"
        }
    ]
]);
;
 //# sourceMappingURL=layers.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/layers.js [app-client] (ecmascript) <export default as Layers>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Layers",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/layers.js [app-client] (ecmascript)");
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/git-branch.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>GitBranch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const GitBranch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("GitBranch", [
    [
        "line",
        {
            x1: "6",
            x2: "6",
            y1: "3",
            y2: "15",
            key: "17qcm7"
        }
    ],
    [
        "circle",
        {
            cx: "18",
            cy: "6",
            r: "3",
            key: "1h7g24"
        }
    ],
    [
        "circle",
        {
            cx: "6",
            cy: "18",
            r: "3",
            key: "fqmcym"
        }
    ],
    [
        "path",
        {
            d: "M18 9a9 9 0 0 1-9 9",
            key: "n2h4wq"
        }
    ]
]);
;
 //# sourceMappingURL=git-branch.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/git-branch.js [app-client] (ecmascript) <export default as GitBranch>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GitBranch",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$git$2d$branch$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/git-branch.js [app-client] (ecmascript)");
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>ChartColumn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const ChartColumn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("ChartColumn", [
    [
        "path",
        {
            d: "M3 3v16a2 2 0 0 0 2 2h16",
            key: "c24i48"
        }
    ],
    [
        "path",
        {
            d: "M18 17V9",
            key: "2bz60n"
        }
    ],
    [
        "path",
        {
            d: "M13 17V5",
            key: "1frdt8"
        }
    ],
    [
        "path",
        {
            d: "M8 17v-3",
            key: "17ska0"
        }
    ]
]);
;
 //# sourceMappingURL=chart-column.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-client] (ecmascript) <export default as BarChart3>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BarChart3",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-client] (ecmascript)");
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Shield
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Shield = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Shield", [
    [
        "path",
        {
            d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
            key: "oel41y"
        }
    ]
]);
;
 //# sourceMappingURL=shield.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript) <export default as Shield>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Shield",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/shield.js [app-client] (ecmascript)");
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/cloud.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Cloud
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Cloud = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Cloud", [
    [
        "path",
        {
            d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",
            key: "p7xjir"
        }
    ]
]);
;
 //# sourceMappingURL=cloud.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/cloud.js [app-client] (ecmascript) <export default as Cloud>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Cloud",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/cloud.js [app-client] (ecmascript)");
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/server.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Server
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Server = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Server", [
    [
        "rect",
        {
            width: "20",
            height: "8",
            x: "2",
            y: "2",
            rx: "2",
            ry: "2",
            key: "ngkwjq"
        }
    ],
    [
        "rect",
        {
            width: "20",
            height: "8",
            x: "2",
            y: "14",
            rx: "2",
            ry: "2",
            key: "iecqi9"
        }
    ],
    [
        "line",
        {
            x1: "6",
            x2: "6.01",
            y1: "6",
            y2: "6",
            key: "16zg32"
        }
    ],
    [
        "line",
        {
            x1: "6",
            x2: "6.01",
            y1: "18",
            y2: "18",
            key: "nzw8ys"
        }
    ]
]);
;
 //# sourceMappingURL=server.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/server.js [app-client] (ecmascript) <export default as Server>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Server",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$server$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$server$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/server.js [app-client] (ecmascript)");
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Upload
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Upload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Upload", [
    [
        "path",
        {
            d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
            key: "ih7n3h"
        }
    ],
    [
        "polyline",
        {
            points: "17 8 12 3 7 8",
            key: "t8dd8p"
        }
    ],
    [
        "line",
        {
            x1: "12",
            x2: "12",
            y1: "3",
            y2: "15",
            key: "widbto"
        }
    ]
]);
;
 //# sourceMappingURL=upload.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Upload",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript)");
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Settings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Settings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Settings", [
    [
        "path",
        {
            d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
            key: "1qme2f"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "3",
            key: "1v7zrd"
        }
    ]
]);
;
 //# sourceMappingURL=settings.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Settings",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript)");
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Download
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Download = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Download", [
    [
        "path",
        {
            d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
            key: "ih7n3h"
        }
    ],
    [
        "polyline",
        {
            points: "7 10 12 15 17 10",
            key: "2ggqvy"
        }
    ],
    [
        "line",
        {
            x1: "12",
            x2: "12",
            y1: "15",
            y2: "3",
            key: "1vk2je"
        }
    ]
]);
;
 //# sourceMappingURL=download.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Download",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript)");
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>CircleCheckBig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const CircleCheckBig = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("CircleCheckBig", [
    [
        "path",
        {
            d: "M21.801 10A10 10 0 1 1 17 3.335",
            key: "yps3ct"
        }
    ],
    [
        "path",
        {
            d: "m9 11 3 3L22 4",
            key: "1pflzl"
        }
    ]
]);
;
 //# sourceMappingURL=circle-check-big.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CheckCircle",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript)");
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Copy
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Copy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Copy", [
    [
        "rect",
        {
            width: "14",
            height: "14",
            x: "8",
            y: "8",
            rx: "2",
            ry: "2",
            key: "17jyea"
        }
    ],
    [
        "path",
        {
            d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
            key: "zix9uf"
        }
    ]
]);
;
 //# sourceMappingURL=copy.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Copy",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript)");
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Check
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Check = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Check", [
    [
        "path",
        {
            d: "M20 6 9 17l-5-5",
            key: "1gmf2c"
        }
    ]
]);
;
 //# sourceMappingURL=check.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Check",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript)");
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/database.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Database
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Database = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Database", [
    [
        "ellipse",
        {
            cx: "12",
            cy: "5",
            rx: "9",
            ry: "3",
            key: "msslwz"
        }
    ],
    [
        "path",
        {
            d: "M3 5V19A9 3 0 0 0 21 19V5",
            key: "1wlel7"
        }
    ],
    [
        "path",
        {
            d: "M3 12A9 3 0 0 0 21 12",
            key: "mv7ke4"
        }
    ]
]);
;
 //# sourceMappingURL=database.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/database.js [app-client] (ecmascript) <export default as Database>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Database",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$database$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/database.js [app-client] (ecmascript)");
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Lock
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Lock = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Lock", [
    [
        "rect",
        {
            width: "18",
            height: "11",
            x: "3",
            y: "11",
            rx: "2",
            ry: "2",
            key: "1w4ew1"
        }
    ],
    [
        "path",
        {
            d: "M7 11V7a5 5 0 0 1 10 0v4",
            key: "fwvmzm"
        }
    ]
]);
;
 //# sourceMappingURL=lock.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Lock",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript)");
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/workflow.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Workflow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Workflow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Workflow", [
    [
        "rect",
        {
            width: "8",
            height: "8",
            x: "3",
            y: "3",
            rx: "2",
            key: "by2w9f"
        }
    ],
    [
        "path",
        {
            d: "M7 11v4a2 2 0 0 0 2 2h4",
            key: "xkn7yn"
        }
    ],
    [
        "rect",
        {
            width: "8",
            height: "8",
            x: "13",
            y: "13",
            rx: "2",
            key: "1cgmvn"
        }
    ]
]);
;
 //# sourceMappingURL=workflow.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/workflow.js [app-client] (ecmascript) <export default as Workflow>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Workflow",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$workflow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$workflow$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/workflow.js [app-client] (ecmascript)");
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>TrendingUp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const TrendingUp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("TrendingUp", [
    [
        "polyline",
        {
            points: "22 7 13.5 15.5 8.5 10.5 2 17",
            key: "126l90"
        }
    ],
    [
        "polyline",
        {
            points: "16 7 22 7 22 13",
            key: "kwv8wd"
        }
    ]
]);
;
 //# sourceMappingURL=trending-up.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TrendingUp",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript)");
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Activity
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Activity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Activity", [
    [
        "path",
        {
            d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
            key: "169zse"
        }
    ]
]);
;
 //# sourceMappingURL=activity.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Activity",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript)");
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/chart-pie.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>ChartPie
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const ChartPie = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("ChartPie", [
    [
        "path",
        {
            d: "M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z",
            key: "pzmjnu"
        }
    ],
    [
        "path",
        {
            d: "M21.21 15.89A10 10 0 1 1 8 2.83",
            key: "k2fpak"
        }
    ]
]);
;
 //# sourceMappingURL=chart-pie.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/chart-pie.js [app-client] (ecmascript) <export default as PieChart>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PieChart",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/chart-pie.js [app-client] (ecmascript)");
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>FileText
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const FileText = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("FileText", [
    [
        "path",
        {
            d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
            key: "1rqfz7"
        }
    ],
    [
        "path",
        {
            d: "M14 2v4a2 2 0 0 0 2 2h4",
            key: "tnqrlb"
        }
    ],
    [
        "path",
        {
            d: "M10 9H8",
            key: "b1mrlr"
        }
    ],
    [
        "path",
        {
            d: "M16 13H8",
            key: "t4e002"
        }
    ],
    [
        "path",
        {
            d: "M16 17H8",
            key: "z1uh3a"
        }
    ]
]);
;
 //# sourceMappingURL=file-text.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FileText",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript)");
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/video.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Video
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Video = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Video", [
    [
        "path",
        {
            d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
            key: "ftymec"
        }
    ],
    [
        "rect",
        {
            x: "2",
            y: "6",
            width: "14",
            height: "12",
            rx: "2",
            key: "158x01"
        }
    ]
]);
;
 //# sourceMappingURL=video.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/video.js [app-client] (ecmascript) <export default as Video>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Video",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/video.js [app-client] (ecmascript)");
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/podcast.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Podcast
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Podcast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Podcast", [
    [
        "path",
        {
            d: "M16.85 18.58a9 9 0 1 0-9.7 0",
            key: "d71mpg"
        }
    ],
    [
        "path",
        {
            d: "M8 14a5 5 0 1 1 8 0",
            key: "fc81rn"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "11",
            r: "1",
            key: "1gvufo"
        }
    ],
    [
        "path",
        {
            d: "M13 17a1 1 0 1 0-2 0l.5 4.5a.5.5 0 1 0 1 0Z",
            key: "za5kbj"
        }
    ]
]);
;
 //# sourceMappingURL=podcast.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/podcast.js [app-client] (ecmascript) <export default as Podcast>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Podcast",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$podcast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$podcast$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/podcast.js [app-client] (ecmascript)");
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/github.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Github
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Github = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Github", [
    [
        "path",
        {
            d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",
            key: "tonef"
        }
    ],
    [
        "path",
        {
            d: "M9 18c-4.51 2-5-2-7-2",
            key: "9comsn"
        }
    ]
]);
;
 //# sourceMappingURL=github.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/github.js [app-client] (ecmascript) <export default as Github>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Github",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$github$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$github$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/github.js [app-client] (ecmascript)");
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/linkedin.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Linkedin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Linkedin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Linkedin", [
    [
        "path",
        {
            d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",
            key: "c2jq9f"
        }
    ],
    [
        "rect",
        {
            width: "4",
            height: "12",
            x: "2",
            y: "9",
            key: "mk3on5"
        }
    ],
    [
        "circle",
        {
            cx: "4",
            cy: "4",
            r: "2",
            key: "bt5ra8"
        }
    ]
]);
;
 //# sourceMappingURL=linkedin.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/linkedin.js [app-client] (ecmascript) <export default as Linkedin>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Linkedin",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$linkedin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$linkedin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/linkedin.js [app-client] (ecmascript)");
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/twitter.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Twitter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Twitter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Twitter", [
    [
        "path",
        {
            d: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",
            key: "pff0z6"
        }
    ]
]);
;
 //# sourceMappingURL=twitter.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/twitter.js [app-client] (ecmascript) <export default as Twitter>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Twitter",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$twitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$twitter$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/twitter.js [app-client] (ecmascript)");
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Send
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Send = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Send", [
    [
        "path",
        {
            d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
            key: "1ffxy3"
        }
    ],
    [
        "path",
        {
            d: "m21.854 2.147-10.94 10.939",
            key: "12cjpa"
        }
    ]
]);
;
 //# sourceMappingURL=send.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Send",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript)");
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Mail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Mail = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Mail", [
    [
        "rect",
        {
            width: "20",
            height: "16",
            x: "2",
            y: "4",
            rx: "2",
            key: "18n3k1"
        }
    ],
    [
        "path",
        {
            d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",
            key: "1ocrg3"
        }
    ]
]);
;
 //# sourceMappingURL=mail.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Mail",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript)");
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>MapPin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const MapPin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("MapPin", [
    [
        "path",
        {
            d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
            key: "1r0f0z"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "10",
            r: "3",
            key: "ilqhr7"
        }
    ]
]);
;
 //# sourceMappingURL=map-pin.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MapPin",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript)");
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Phone
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Phone = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Phone", [
    [
        "path",
        {
            d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
            key: "foiqr5"
        }
    ]
]);
;
 //# sourceMappingURL=phone.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as Phone>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Phone",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript)");
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/youtube.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Youtube
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Youtube = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Youtube", [
    [
        "path",
        {
            d: "M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17",
            key: "1q2vi4"
        }
    ],
    [
        "path",
        {
            d: "m10 15 5-3-5-3z",
            key: "1jp15x"
        }
    ]
]);
;
 //# sourceMappingURL=youtube.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/youtube.js [app-client] (ecmascript) <export default as Youtube>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Youtube",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$youtube$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$youtube$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/youtube.js [app-client] (ecmascript)");
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/arrow-up-right.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>ArrowUpRight
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const ArrowUpRight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("ArrowUpRight", [
    [
        "path",
        {
            d: "M7 7h10v10",
            key: "1tivn9"
        }
    ],
    [
        "path",
        {
            d: "M7 17 17 7",
            key: "1vkiza"
        }
    ]
]);
;
 //# sourceMappingURL=arrow-up-right.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/arrow-up-right.js [app-client] (ecmascript) <export default as ArrowUpRight>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArrowUpRight",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/arrow-up-right.js [app-client] (ecmascript)");
}),
"[project]/Desktop/project/ui-react/node_modules/next/dist/shared/lib/image-blur-svg.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * A shared function, used on both client and server, to generate a SVG blur placeholder.
 */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getImageBlurSvg", {
    enumerable: true,
    get: function() {
        return getImageBlurSvg;
    }
});
function getImageBlurSvg({ widthInt, heightInt, blurWidth, blurHeight, blurDataURL, objectFit }) {
    const std = 20;
    const svgWidth = blurWidth ? blurWidth * 40 : widthInt;
    const svgHeight = blurHeight ? blurHeight * 40 : heightInt;
    const viewBox = svgWidth && svgHeight ? `viewBox='0 0 ${svgWidth} ${svgHeight}'` : '';
    const preserveAspectRatio = viewBox ? 'none' : objectFit === 'contain' ? 'xMidYMid' : objectFit === 'cover' ? 'xMidYMid slice' : 'none';
    return `%3Csvg xmlns='http://www.w3.org/2000/svg' ${viewBox}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='${std}'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='${std}'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${preserveAspectRatio}' style='filter: url(%23b);' href='${blurDataURL}'/%3E%3C/svg%3E`;
} //# sourceMappingURL=image-blur-svg.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/next/dist/shared/lib/image-config.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    VALID_LOADERS: null,
    imageConfigDefault: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    VALID_LOADERS: function() {
        return VALID_LOADERS;
    },
    imageConfigDefault: function() {
        return imageConfigDefault;
    }
});
const VALID_LOADERS = [
    'default',
    'imgix',
    'cloudinary',
    'akamai',
    'custom'
];
const imageConfigDefault = {
    deviceSizes: [
        640,
        750,
        828,
        1080,
        1200,
        1920,
        2048,
        3840
    ],
    imageSizes: [
        32,
        48,
        64,
        96,
        128,
        256,
        384
    ],
    path: '/_next/image',
    loader: 'default',
    loaderFile: '',
    /**
   * @deprecated Use `remotePatterns` instead to protect your application from malicious users.
   */ domains: [],
    disableStaticImages: false,
    minimumCacheTTL: 14400,
    formats: [
        'image/webp'
    ],
    maximumRedirects: 3,
    dangerouslyAllowLocalIP: false,
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: `script-src 'none'; frame-src 'none'; sandbox;`,
    contentDispositionType: 'attachment',
    localPatterns: undefined,
    remotePatterns: [],
    qualities: [
        75
    ],
    unoptimized: false
}; //# sourceMappingURL=image-config.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/next/dist/shared/lib/get-img-props.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getImgProps", {
    enumerable: true,
    get: function() {
        return getImgProps;
    }
});
const _warnonce = __turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/next/dist/shared/lib/utils/warn-once.js [app-client] (ecmascript)");
const _imageblursvg = __turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/next/dist/shared/lib/image-blur-svg.js [app-client] (ecmascript)");
const _imageconfig = __turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/next/dist/shared/lib/image-config.js [app-client] (ecmascript)");
const VALID_LOADING_VALUES = [
    'lazy',
    'eager',
    undefined
];
// Object-fit values that are not valid background-size values
const INVALID_BACKGROUND_SIZE_VALUES = [
    '-moz-initial',
    'fill',
    'none',
    'scale-down',
    undefined
];
function isStaticRequire(src) {
    return src.default !== undefined;
}
function isStaticImageData(src) {
    return src.src !== undefined;
}
function isStaticImport(src) {
    return !!src && typeof src === 'object' && (isStaticRequire(src) || isStaticImageData(src));
}
const allImgs = new Map();
let perfObserver;
function getInt(x) {
    if (typeof x === 'undefined') {
        return x;
    }
    if (typeof x === 'number') {
        return Number.isFinite(x) ? x : NaN;
    }
    if (typeof x === 'string' && /^[0-9]+$/.test(x)) {
        return parseInt(x, 10);
    }
    return NaN;
}
function getWidths({ deviceSizes, allSizes }, width, sizes) {
    if (sizes) {
        // Find all the "vw" percent sizes used in the sizes prop
        const viewportWidthRe = /(^|\s)(1?\d?\d)vw/g;
        const percentSizes = [];
        for(let match; match = viewportWidthRe.exec(sizes); match){
            percentSizes.push(parseInt(match[2]));
        }
        if (percentSizes.length) {
            const smallestRatio = Math.min(...percentSizes) * 0.01;
            return {
                widths: allSizes.filter((s)=>s >= deviceSizes[0] * smallestRatio),
                kind: 'w'
            };
        }
        return {
            widths: allSizes,
            kind: 'w'
        };
    }
    if (typeof width !== 'number') {
        return {
            widths: deviceSizes,
            kind: 'w'
        };
    }
    const widths = [
        ...new Set(// > are actually 3x in the green color, but only 1.5x in the red and
        // > blue colors. Showing a 3x resolution image in the app vs a 2x
        // > resolution image will be visually the same, though the 3x image
        // > takes significantly more data. Even true 3x resolution screens are
        // > wasteful as the human eye cannot see that level of detail without
        // > something like a magnifying glass.
        // https://blog.twitter.com/engineering/en_us/topics/infrastructure/2019/capping-image-fidelity-on-ultra-high-resolution-devices.html
        [
            width,
            width * 2 /*, width * 3*/ 
        ].map((w)=>allSizes.find((p)=>p >= w) || allSizes[allSizes.length - 1]))
    ];
    return {
        widths,
        kind: 'x'
    };
}
function generateImgAttrs({ config, src, unoptimized, width, quality, sizes, loader }) {
    if (unoptimized) {
        return {
            src,
            srcSet: undefined,
            sizes: undefined
        };
    }
    const { widths, kind } = getWidths(config, width, sizes);
    const last = widths.length - 1;
    return {
        sizes: !sizes && kind === 'w' ? '100vw' : sizes,
        srcSet: widths.map((w, i)=>`${loader({
                config,
                src,
                quality,
                width: w
            })} ${kind === 'w' ? w : i + 1}${kind}`).join(', '),
        // It's intended to keep `src` the last attribute because React updates
        // attributes in order. If we keep `src` the first one, Safari will
        // immediately start to fetch `src`, before `sizes` and `srcSet` are even
        // updated by React. That causes multiple unnecessary requests if `srcSet`
        // and `sizes` are defined.
        // This bug cannot be reproduced in Chrome or Firefox.
        src: loader({
            config,
            src,
            quality,
            width: widths[last]
        })
    };
}
function getImgProps({ src, sizes, unoptimized = false, priority = false, preload = false, loading, className, quality, width, height, fill = false, style, overrideSrc, onLoad, onLoadingComplete, placeholder = 'empty', blurDataURL, fetchPriority, decoding = 'async', layout, objectFit, objectPosition, lazyBoundary, lazyRoot, ...rest }, _state) {
    const { imgConf, showAltText, blurComplete, defaultLoader } = _state;
    let config;
    let c = imgConf || _imageconfig.imageConfigDefault;
    if ('allSizes' in c) {
        config = c;
    } else {
        const allSizes = [
            ...c.deviceSizes,
            ...c.imageSizes
        ].sort((a, b)=>a - b);
        const deviceSizes = c.deviceSizes.sort((a, b)=>a - b);
        const qualities = c.qualities?.sort((a, b)=>a - b);
        config = {
            ...c,
            allSizes,
            deviceSizes,
            qualities
        };
    }
    if (typeof defaultLoader === 'undefined') {
        throw Object.defineProperty(new Error('images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config'), "__NEXT_ERROR_CODE", {
            value: "E163",
            enumerable: false,
            configurable: true
        });
    }
    let loader = rest.loader || defaultLoader;
    // Remove property so it's not spread on <img> element
    delete rest.loader;
    delete rest.srcSet;
    // This special value indicates that the user
    // didn't define a "loader" prop or "loader" config.
    const isDefaultLoader = '__next_img_default' in loader;
    if (isDefaultLoader) {
        if (config.loader === 'custom') {
            throw Object.defineProperty(new Error(`Image with src "${src}" is missing "loader" prop.` + `\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader`), "__NEXT_ERROR_CODE", {
                value: "E252",
                enumerable: false,
                configurable: true
            });
        }
    } else {
        // The user defined a "loader" prop or config.
        // Since the config object is internal only, we
        // must not pass it to the user-defined "loader".
        const customImageLoader = loader;
        loader = (obj)=>{
            const { config: _, ...opts } = obj;
            return customImageLoader(opts);
        };
    }
    if (layout) {
        if (layout === 'fill') {
            fill = true;
        }
        const layoutToStyle = {
            intrinsic: {
                maxWidth: '100%',
                height: 'auto'
            },
            responsive: {
                width: '100%',
                height: 'auto'
            }
        };
        const layoutToSizes = {
            responsive: '100vw',
            fill: '100vw'
        };
        const layoutStyle = layoutToStyle[layout];
        if (layoutStyle) {
            style = {
                ...style,
                ...layoutStyle
            };
        }
        const layoutSizes = layoutToSizes[layout];
        if (layoutSizes && !sizes) {
            sizes = layoutSizes;
        }
    }
    let staticSrc = '';
    let widthInt = getInt(width);
    let heightInt = getInt(height);
    let blurWidth;
    let blurHeight;
    if (isStaticImport(src)) {
        const staticImageData = isStaticRequire(src) ? src.default : src;
        if (!staticImageData.src) {
            throw Object.defineProperty(new Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(staticImageData)}`), "__NEXT_ERROR_CODE", {
                value: "E460",
                enumerable: false,
                configurable: true
            });
        }
        if (!staticImageData.height || !staticImageData.width) {
            throw Object.defineProperty(new Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(staticImageData)}`), "__NEXT_ERROR_CODE", {
                value: "E48",
                enumerable: false,
                configurable: true
            });
        }
        blurWidth = staticImageData.blurWidth;
        blurHeight = staticImageData.blurHeight;
        blurDataURL = blurDataURL || staticImageData.blurDataURL;
        staticSrc = staticImageData.src;
        if (!fill) {
            if (!widthInt && !heightInt) {
                widthInt = staticImageData.width;
                heightInt = staticImageData.height;
            } else if (widthInt && !heightInt) {
                const ratio = widthInt / staticImageData.width;
                heightInt = Math.round(staticImageData.height * ratio);
            } else if (!widthInt && heightInt) {
                const ratio = heightInt / staticImageData.height;
                widthInt = Math.round(staticImageData.width * ratio);
            }
        }
    }
    src = typeof src === 'string' ? src : staticSrc;
    let isLazy = !priority && !preload && (loading === 'lazy' || typeof loading === 'undefined');
    if (!src || src.startsWith('data:') || src.startsWith('blob:')) {
        // https://developer.mozilla.org/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
        unoptimized = true;
        isLazy = false;
    }
    if (config.unoptimized) {
        unoptimized = true;
    }
    if (isDefaultLoader && !config.dangerouslyAllowSVG && src.split('?', 1)[0].endsWith('.svg')) {
        // Special case to make svg serve as-is to avoid proxying
        // through the built-in Image Optimization API.
        unoptimized = true;
    }
    const qualityInt = getInt(quality);
    if ("TURBOPACK compile-time truthy", 1) {
        if (config.output === 'export' && isDefaultLoader && !unoptimized) {
            throw Object.defineProperty(new Error(`Image Optimization using the default loader is not compatible with \`{ output: 'export' }\`.
  Possible solutions:
    - Remove \`{ output: 'export' }\` and run "next start" to run server mode including the Image Optimization API.
    - Configure \`{ images: { unoptimized: true } }\` in \`next.config.js\` to disable the Image Optimization API.
  Read more: https://nextjs.org/docs/messages/export-image-api`), "__NEXT_ERROR_CODE", {
                value: "E500",
                enumerable: false,
                configurable: true
            });
        }
        if (!src) {
            // React doesn't show the stack trace and there's
            // no `src` to help identify which image, so we
            // instead console.error(ref) during mount.
            unoptimized = true;
        } else {
            if (fill) {
                if (width) {
                    throw Object.defineProperty(new Error(`Image with src "${src}" has both "width" and "fill" properties. Only one should be used.`), "__NEXT_ERROR_CODE", {
                        value: "E96",
                        enumerable: false,
                        configurable: true
                    });
                }
                if (height) {
                    throw Object.defineProperty(new Error(`Image with src "${src}" has both "height" and "fill" properties. Only one should be used.`), "__NEXT_ERROR_CODE", {
                        value: "E115",
                        enumerable: false,
                        configurable: true
                    });
                }
                if (style?.position && style.position !== 'absolute') {
                    throw Object.defineProperty(new Error(`Image with src "${src}" has both "fill" and "style.position" properties. Images with "fill" always use position absolute - it cannot be modified.`), "__NEXT_ERROR_CODE", {
                        value: "E216",
                        enumerable: false,
                        configurable: true
                    });
                }
                if (style?.width && style.width !== '100%') {
                    throw Object.defineProperty(new Error(`Image with src "${src}" has both "fill" and "style.width" properties. Images with "fill" always use width 100% - it cannot be modified.`), "__NEXT_ERROR_CODE", {
                        value: "E73",
                        enumerable: false,
                        configurable: true
                    });
                }
                if (style?.height && style.height !== '100%') {
                    throw Object.defineProperty(new Error(`Image with src "${src}" has both "fill" and "style.height" properties. Images with "fill" always use height 100% - it cannot be modified.`), "__NEXT_ERROR_CODE", {
                        value: "E404",
                        enumerable: false,
                        configurable: true
                    });
                }
            } else {
                if (typeof widthInt === 'undefined') {
                    throw Object.defineProperty(new Error(`Image with src "${src}" is missing required "width" property.`), "__NEXT_ERROR_CODE", {
                        value: "E451",
                        enumerable: false,
                        configurable: true
                    });
                } else if (isNaN(widthInt)) {
                    throw Object.defineProperty(new Error(`Image with src "${src}" has invalid "width" property. Expected a numeric value in pixels but received "${width}".`), "__NEXT_ERROR_CODE", {
                        value: "E66",
                        enumerable: false,
                        configurable: true
                    });
                }
                if (typeof heightInt === 'undefined') {
                    throw Object.defineProperty(new Error(`Image with src "${src}" is missing required "height" property.`), "__NEXT_ERROR_CODE", {
                        value: "E397",
                        enumerable: false,
                        configurable: true
                    });
                } else if (isNaN(heightInt)) {
                    throw Object.defineProperty(new Error(`Image with src "${src}" has invalid "height" property. Expected a numeric value in pixels but received "${height}".`), "__NEXT_ERROR_CODE", {
                        value: "E444",
                        enumerable: false,
                        configurable: true
                    });
                }
                // eslint-disable-next-line no-control-regex
                if (/^[\x00-\x20]/.test(src)) {
                    throw Object.defineProperty(new Error(`Image with src "${src}" cannot start with a space or control character. Use src.trimStart() to remove it or encodeURIComponent(src) to keep it.`), "__NEXT_ERROR_CODE", {
                        value: "E176",
                        enumerable: false,
                        configurable: true
                    });
                }
                // eslint-disable-next-line no-control-regex
                if (/[\x00-\x20]$/.test(src)) {
                    throw Object.defineProperty(new Error(`Image with src "${src}" cannot end with a space or control character. Use src.trimEnd() to remove it or encodeURIComponent(src) to keep it.`), "__NEXT_ERROR_CODE", {
                        value: "E21",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
        }
        if (!VALID_LOADING_VALUES.includes(loading)) {
            throw Object.defineProperty(new Error(`Image with src "${src}" has invalid "loading" property. Provided "${loading}" should be one of ${VALID_LOADING_VALUES.map(String).join(',')}.`), "__NEXT_ERROR_CODE", {
                value: "E357",
                enumerable: false,
                configurable: true
            });
        }
        if (priority && loading === 'lazy') {
            throw Object.defineProperty(new Error(`Image with src "${src}" has both "priority" and "loading='lazy'" properties. Only one should be used.`), "__NEXT_ERROR_CODE", {
                value: "E218",
                enumerable: false,
                configurable: true
            });
        }
        if (preload && loading === 'lazy') {
            throw Object.defineProperty(new Error(`Image with src "${src}" has both "preload" and "loading='lazy'" properties. Only one should be used.`), "__NEXT_ERROR_CODE", {
                value: "E803",
                enumerable: false,
                configurable: true
            });
        }
        if (preload && priority) {
            throw Object.defineProperty(new Error(`Image with src "${src}" has both "preload" and "priority" properties. Only "preload" should be used.`), "__NEXT_ERROR_CODE", {
                value: "E802",
                enumerable: false,
                configurable: true
            });
        }
        if (placeholder !== 'empty' && placeholder !== 'blur' && !placeholder.startsWith('data:image/')) {
            throw Object.defineProperty(new Error(`Image with src "${src}" has invalid "placeholder" property "${placeholder}".`), "__NEXT_ERROR_CODE", {
                value: "E431",
                enumerable: false,
                configurable: true
            });
        }
        if (placeholder !== 'empty') {
            if (widthInt && heightInt && widthInt * heightInt < 1600) {
                (0, _warnonce.warnOnce)(`Image with src "${src}" is smaller than 40x40. Consider removing the "placeholder" property to improve performance.`);
            }
        }
        if (qualityInt && config.qualities && !config.qualities.includes(qualityInt)) {
            (0, _warnonce.warnOnce)(`Image with src "${src}" is using quality "${qualityInt}" which is not configured in images.qualities [${config.qualities.join(', ')}]. Please update your config to [${[
                ...config.qualities,
                qualityInt
            ].sort().join(', ')}].` + `\nRead more: https://nextjs.org/docs/messages/next-image-unconfigured-qualities`);
        }
        if (placeholder === 'blur' && !blurDataURL) {
            const VALID_BLUR_EXT = [
                'jpeg',
                'png',
                'webp',
                'avif'
            ] // should match next-image-loader
            ;
            throw Object.defineProperty(new Error(`Image with src "${src}" has "placeholder='blur'" property but is missing the "blurDataURL" property.
        Possible solutions:
          - Add a "blurDataURL" property, the contents should be a small Data URL to represent the image
          - Change the "src" property to a static import with one of the supported file types: ${VALID_BLUR_EXT.join(',')} (animated images not supported)
          - Remove the "placeholder" property, effectively no blur effect
        Read more: https://nextjs.org/docs/messages/placeholder-blur-data-url`), "__NEXT_ERROR_CODE", {
                value: "E371",
                enumerable: false,
                configurable: true
            });
        }
        if ('ref' in rest) {
            (0, _warnonce.warnOnce)(`Image with src "${src}" is using unsupported "ref" property. Consider using the "onLoad" property instead.`);
        }
        if (!unoptimized && !isDefaultLoader) {
            const urlStr = loader({
                config,
                src,
                width: widthInt || 400,
                quality: qualityInt || 75
            });
            let url;
            try {
                url = new URL(urlStr);
            } catch (err) {}
            if (urlStr === src || url && url.pathname === src && !url.search) {
                (0, _warnonce.warnOnce)(`Image with src "${src}" has a "loader" property that does not implement width. Please implement it or use the "unoptimized" property instead.` + `\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader-width`);
            }
        }
        if (onLoadingComplete) {
            (0, _warnonce.warnOnce)(`Image with src "${src}" is using deprecated "onLoadingComplete" property. Please use the "onLoad" property instead.`);
        }
        for (const [legacyKey, legacyValue] of Object.entries({
            layout,
            objectFit,
            objectPosition,
            lazyBoundary,
            lazyRoot
        })){
            if (legacyValue) {
                (0, _warnonce.warnOnce)(`Image with src "${src}" has legacy prop "${legacyKey}". Did you forget to run the codemod?` + `\nRead more: https://nextjs.org/docs/messages/next-image-upgrade-to-13`);
            }
        }
        if (typeof window !== 'undefined' && !perfObserver && window.PerformanceObserver) {
            perfObserver = new PerformanceObserver((entryList)=>{
                for (const entry of entryList.getEntries()){
                    // @ts-ignore - missing "LargestContentfulPaint" class with "element" prop
                    const imgSrc = entry?.element?.src || '';
                    const lcpImage = allImgs.get(imgSrc);
                    if (lcpImage && lcpImage.loading === 'lazy' && lcpImage.placeholder === 'empty' && !lcpImage.src.startsWith('data:') && !lcpImage.src.startsWith('blob:')) {
                        // https://web.dev/lcp/#measure-lcp-in-javascript
                        (0, _warnonce.warnOnce)(`Image with src "${lcpImage.src}" was detected as the Largest Contentful Paint (LCP). Please add the \`loading="eager"\` property if this image is above the fold.` + `\nRead more: https://nextjs.org/docs/app/api-reference/components/image#loading`);
                    }
                }
            });
            try {
                perfObserver.observe({
                    type: 'largest-contentful-paint',
                    buffered: true
                });
            } catch (err) {
                // Log error but don't crash the app
                console.error(err);
            }
        }
    }
    const imgStyle = Object.assign(fill ? {
        position: 'absolute',
        height: '100%',
        width: '100%',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        objectFit,
        objectPosition
    } : {}, showAltText ? {} : {
        color: 'transparent'
    }, style);
    const backgroundImage = !blurComplete && placeholder !== 'empty' ? placeholder === 'blur' ? `url("data:image/svg+xml;charset=utf-8,${(0, _imageblursvg.getImageBlurSvg)({
        widthInt,
        heightInt,
        blurWidth,
        blurHeight,
        blurDataURL: blurDataURL || '',
        objectFit: imgStyle.objectFit
    })}")` : `url("${placeholder}")` // assume `data:image/`
     : null;
    const backgroundSize = !INVALID_BACKGROUND_SIZE_VALUES.includes(imgStyle.objectFit) ? imgStyle.objectFit : imgStyle.objectFit === 'fill' ? '100% 100%' // the background-size equivalent of `fill`
     : 'cover';
    let placeholderStyle = backgroundImage ? {
        backgroundSize,
        backgroundPosition: imgStyle.objectPosition || '50% 50%',
        backgroundRepeat: 'no-repeat',
        backgroundImage
    } : {};
    if ("TURBOPACK compile-time truthy", 1) {
        if (placeholderStyle.backgroundImage && placeholder === 'blur' && blurDataURL?.startsWith('/')) {
            // During `next dev`, we don't want to generate blur placeholders with webpack
            // because it can delay starting the dev server. Instead, `next-image-loader.js`
            // will inline a special url to lazily generate the blur placeholder at request time.
            placeholderStyle.backgroundImage = `url("${blurDataURL}")`;
        }
    }
    const imgAttributes = generateImgAttrs({
        config,
        src,
        unoptimized,
        width: widthInt,
        quality: qualityInt,
        sizes,
        loader
    });
    const loadingFinal = isLazy ? 'lazy' : loading;
    if ("TURBOPACK compile-time truthy", 1) {
        if (typeof window !== 'undefined') {
            let fullUrl;
            try {
                fullUrl = new URL(imgAttributes.src);
            } catch (e) {
                fullUrl = new URL(imgAttributes.src, window.location.href);
            }
            allImgs.set(fullUrl.href, {
                src,
                loading: loadingFinal,
                placeholder
            });
        }
    }
    const props = {
        ...rest,
        loading: loadingFinal,
        fetchPriority,
        width: widthInt,
        height: heightInt,
        decoding,
        className,
        style: {
            ...imgStyle,
            ...placeholderStyle
        },
        sizes: imgAttributes.sizes,
        srcSet: imgAttributes.srcSet,
        src: overrideSrc || imgAttributes.src
    };
    const meta = {
        unoptimized,
        preload: preload || priority,
        placeholder,
        fill
    };
    return {
        props,
        meta
    };
} //# sourceMappingURL=get-img-props.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/next/dist/shared/lib/side-effect.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return SideEffect;
    }
});
const _react = __turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
const isServer = typeof window === 'undefined';
const useClientOnlyLayoutEffect = isServer ? ()=>{} : _react.useLayoutEffect;
const useClientOnlyEffect = isServer ? ()=>{} : _react.useEffect;
function SideEffect(props) {
    const { headManager, reduceComponentsToState } = props;
    function emitChange() {
        if (headManager && headManager.mountedInstances) {
            const headElements = _react.Children.toArray(Array.from(headManager.mountedInstances).filter(Boolean));
            headManager.updateHead(reduceComponentsToState(headElements));
        }
    }
    if (isServer) {
        headManager?.mountedInstances?.add(props.children);
        emitChange();
    }
    useClientOnlyLayoutEffect({
        "SideEffect.useClientOnlyLayoutEffect": ()=>{
            headManager?.mountedInstances?.add(props.children);
            return ({
                "SideEffect.useClientOnlyLayoutEffect": ()=>{
                    headManager?.mountedInstances?.delete(props.children);
                }
            })["SideEffect.useClientOnlyLayoutEffect"];
        }
    }["SideEffect.useClientOnlyLayoutEffect"]);
    // We need to call `updateHead` method whenever the `SideEffect` is trigger in all
    // life-cycles: mount, update, unmount. However, if there are multiple `SideEffect`s
    // being rendered, we only trigger the method from the last one.
    // This is ensured by keeping the last unflushed `updateHead` in the `_pendingUpdate`
    // singleton in the layout effect pass, and actually trigger it in the effect pass.
    useClientOnlyLayoutEffect({
        "SideEffect.useClientOnlyLayoutEffect": ()=>{
            if (headManager) {
                headManager._pendingUpdate = emitChange;
            }
            return ({
                "SideEffect.useClientOnlyLayoutEffect": ()=>{
                    if (headManager) {
                        headManager._pendingUpdate = emitChange;
                    }
                }
            })["SideEffect.useClientOnlyLayoutEffect"];
        }
    }["SideEffect.useClientOnlyLayoutEffect"]);
    useClientOnlyEffect({
        "SideEffect.useClientOnlyEffect": ()=>{
            if (headManager && headManager._pendingUpdate) {
                headManager._pendingUpdate();
                headManager._pendingUpdate = null;
            }
            return ({
                "SideEffect.useClientOnlyEffect": ()=>{
                    if (headManager && headManager._pendingUpdate) {
                        headManager._pendingUpdate();
                        headManager._pendingUpdate = null;
                    }
                }
            })["SideEffect.useClientOnlyEffect"];
        }
    }["SideEffect.useClientOnlyEffect"]);
    return null;
} //# sourceMappingURL=side-effect.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/next/dist/shared/lib/head.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    defaultHead: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    default: function() {
        return _default;
    },
    defaultHead: function() {
        return defaultHead;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _interop_require_wildcard = __turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _sideeffect = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/next/dist/shared/lib/side-effect.js [app-client] (ecmascript)"));
const _headmanagercontextsharedruntime = __turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/next/dist/shared/lib/head-manager-context.shared-runtime.js [app-client] (ecmascript)");
const _warnonce = __turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/next/dist/shared/lib/utils/warn-once.js [app-client] (ecmascript)");
function defaultHead() {
    const head = [
        /*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
            charSet: "utf-8"
        }, "charset"),
        /*#__PURE__*/ (0, _jsxruntime.jsx)("meta", {
            name: "viewport",
            content: "width=device-width"
        }, "viewport")
    ];
    return head;
}
function onlyReactElement(list, child) {
    // React children can be "string" or "number" in this case we ignore them for backwards compat
    if (typeof child === 'string' || typeof child === 'number') {
        return list;
    }
    // Adds support for React.Fragment
    if (child.type === _react.default.Fragment) {
        return list.concat(_react.default.Children.toArray(child.props.children).reduce((fragmentList, fragmentChild)=>{
            if (typeof fragmentChild === 'string' || typeof fragmentChild === 'number') {
                return fragmentList;
            }
            return fragmentList.concat(fragmentChild);
        }, []));
    }
    return list.concat(child);
}
const METATYPES = [
    'name',
    'httpEquiv',
    'charSet',
    'itemProp'
];
/*
 returns a function for filtering head child elements
 which shouldn't be duplicated, like <title/>
 Also adds support for deduplicated `key` properties
*/ function unique() {
    const keys = new Set();
    const tags = new Set();
    const metaTypes = new Set();
    const metaCategories = {};
    return (h)=>{
        let isUnique = true;
        let hasKey = false;
        if (h.key && typeof h.key !== 'number' && h.key.indexOf('$') > 0) {
            hasKey = true;
            const key = h.key.slice(h.key.indexOf('$') + 1);
            if (keys.has(key)) {
                isUnique = false;
            } else {
                keys.add(key);
            }
        }
        // eslint-disable-next-line default-case
        switch(h.type){
            case 'title':
            case 'base':
                if (tags.has(h.type)) {
                    isUnique = false;
                } else {
                    tags.add(h.type);
                }
                break;
            case 'meta':
                for(let i = 0, len = METATYPES.length; i < len; i++){
                    const metatype = METATYPES[i];
                    if (!h.props.hasOwnProperty(metatype)) continue;
                    if (metatype === 'charSet') {
                        if (metaTypes.has(metatype)) {
                            isUnique = false;
                        } else {
                            metaTypes.add(metatype);
                        }
                    } else {
                        const category = h.props[metatype];
                        const categories = metaCategories[metatype] || new Set();
                        if ((metatype !== 'name' || !hasKey) && categories.has(category)) {
                            isUnique = false;
                        } else {
                            categories.add(category);
                            metaCategories[metatype] = categories;
                        }
                    }
                }
                break;
        }
        return isUnique;
    };
}
/**
 *
 * @param headChildrenElements List of children of <Head>
 */ function reduceComponents(headChildrenElements) {
    return headChildrenElements.reduce(onlyReactElement, []).reverse().concat(defaultHead().reverse()).filter(unique()).reverse().map((c, i)=>{
        const key = c.key || i;
        if ("TURBOPACK compile-time truthy", 1) {
            // omit JSON-LD structured data snippets from the warning
            if (c.type === 'script' && c.props['type'] !== 'application/ld+json') {
                const srcMessage = c.props['src'] ? `<script> tag with src="${c.props['src']}"` : `inline <script>`;
                (0, _warnonce.warnOnce)(`Do not add <script> tags using next/head (see ${srcMessage}). Use next/script instead. \nSee more info here: https://nextjs.org/docs/messages/no-script-tags-in-head-component`);
            } else if (c.type === 'link' && c.props['rel'] === 'stylesheet') {
                (0, _warnonce.warnOnce)(`Do not add stylesheets using next/head (see <link rel="stylesheet"> tag with href="${c.props['href']}"). Use Document instead. \nSee more info here: https://nextjs.org/docs/messages/no-stylesheets-in-head-component`);
            }
        }
        return /*#__PURE__*/ _react.default.cloneElement(c, {
            key
        });
    });
}
/**
 * This component injects elements to `<head>` of your page.
 * To avoid duplicated `tags` in `<head>` you can use the `key` property, which will make sure every tag is only rendered once.
 */ function Head({ children }) {
    const headManager = (0, _react.useContext)(_headmanagercontextsharedruntime.HeadManagerContext);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_sideeffect.default, {
        reduceComponentsToState: reduceComponents,
        headManager: headManager,
        children: children
    });
}
const _default = Head;
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=head.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/next/dist/shared/lib/image-config-context.shared-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ImageConfigContext", {
    enumerable: true,
    get: function() {
        return ImageConfigContext;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _imageconfig = __turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/next/dist/shared/lib/image-config.js [app-client] (ecmascript)");
const ImageConfigContext = _react.default.createContext(_imageconfig.imageConfigDefault);
if ("TURBOPACK compile-time truthy", 1) {
    ImageConfigContext.displayName = 'ImageConfigContext';
} //# sourceMappingURL=image-config-context.shared-runtime.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/next/dist/shared/lib/router-context.shared-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RouterContext", {
    enumerable: true,
    get: function() {
        return RouterContext;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const RouterContext = _react.default.createContext(null);
if ("TURBOPACK compile-time truthy", 1) {
    RouterContext.displayName = 'RouterContext';
} //# sourceMappingURL=router-context.shared-runtime.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/next/dist/shared/lib/find-closest-quality.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "findClosestQuality", {
    enumerable: true,
    get: function() {
        return findClosestQuality;
    }
});
function findClosestQuality(quality, config) {
    const q = quality || 75;
    if (!config?.qualities?.length) {
        return q;
    }
    return config.qualities.reduce((prev, cur)=>Math.abs(cur - q) < Math.abs(prev - q) ? cur : prev, 0);
} //# sourceMappingURL=find-closest-quality.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/next/dist/compiled/picomatch/index.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
(()=>{
    "use strict";
    var t = {
        170: (t, e, u)=>{
            const n = u(510);
            const isWindows = ()=>{
                if (typeof navigator !== "undefined" && navigator.platform) {
                    const t = navigator.platform.toLowerCase();
                    return t === "win32" || t === "windows";
                }
                if (typeof __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== "undefined" && __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].platform) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].platform === "win32";
                }
                return false;
            };
            function picomatch(t, e, u = false) {
                if (e && (e.windows === null || e.windows === undefined)) {
                    e = {
                        ...e,
                        windows: isWindows()
                    };
                }
                return n(t, e, u);
            }
            Object.assign(picomatch, n);
            t.exports = picomatch;
        },
        154: (t)=>{
            const e = "\\\\/";
            const u = `[^${e}]`;
            const n = "\\.";
            const o = "\\+";
            const s = "\\?";
            const r = "\\/";
            const a = "(?=.)";
            const i = "[^/]";
            const c = `(?:${r}|$)`;
            const p = `(?:^|${r})`;
            const l = `${n}{1,2}${c}`;
            const f = `(?!${n})`;
            const A = `(?!${p}${l})`;
            const _ = `(?!${n}{0,1}${c})`;
            const R = `(?!${l})`;
            const E = `[^.${r}]`;
            const h = `${i}*?`;
            const g = "/";
            const b = {
                DOT_LITERAL: n,
                PLUS_LITERAL: o,
                QMARK_LITERAL: s,
                SLASH_LITERAL: r,
                ONE_CHAR: a,
                QMARK: i,
                END_ANCHOR: c,
                DOTS_SLASH: l,
                NO_DOT: f,
                NO_DOTS: A,
                NO_DOT_SLASH: _,
                NO_DOTS_SLASH: R,
                QMARK_NO_DOT: E,
                STAR: h,
                START_ANCHOR: p,
                SEP: g
            };
            const C = {
                ...b,
                SLASH_LITERAL: `[${e}]`,
                QMARK: u,
                STAR: `${u}*?`,
                DOTS_SLASH: `${n}{1,2}(?:[${e}]|$)`,
                NO_DOT: `(?!${n})`,
                NO_DOTS: `(?!(?:^|[${e}])${n}{1,2}(?:[${e}]|$))`,
                NO_DOT_SLASH: `(?!${n}{0,1}(?:[${e}]|$))`,
                NO_DOTS_SLASH: `(?!${n}{1,2}(?:[${e}]|$))`,
                QMARK_NO_DOT: `[^.${e}]`,
                START_ANCHOR: `(?:^|[${e}])`,
                END_ANCHOR: `(?:[${e}]|$)`,
                SEP: "\\"
            };
            const y = {
                alnum: "a-zA-Z0-9",
                alpha: "a-zA-Z",
                ascii: "\\x00-\\x7F",
                blank: " \\t",
                cntrl: "\\x00-\\x1F\\x7F",
                digit: "0-9",
                graph: "\\x21-\\x7E",
                lower: "a-z",
                print: "\\x20-\\x7E ",
                punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
                space: " \\t\\r\\n\\v\\f",
                upper: "A-Z",
                word: "A-Za-z0-9_",
                xdigit: "A-Fa-f0-9"
            };
            t.exports = {
                MAX_LENGTH: 1024 * 64,
                POSIX_REGEX_SOURCE: y,
                REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
                REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
                REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
                REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
                REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
                REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
                REPLACEMENTS: {
                    "***": "*",
                    "**/**": "**",
                    "**/**/**": "**"
                },
                CHAR_0: 48,
                CHAR_9: 57,
                CHAR_UPPERCASE_A: 65,
                CHAR_LOWERCASE_A: 97,
                CHAR_UPPERCASE_Z: 90,
                CHAR_LOWERCASE_Z: 122,
                CHAR_LEFT_PARENTHESES: 40,
                CHAR_RIGHT_PARENTHESES: 41,
                CHAR_ASTERISK: 42,
                CHAR_AMPERSAND: 38,
                CHAR_AT: 64,
                CHAR_BACKWARD_SLASH: 92,
                CHAR_CARRIAGE_RETURN: 13,
                CHAR_CIRCUMFLEX_ACCENT: 94,
                CHAR_COLON: 58,
                CHAR_COMMA: 44,
                CHAR_DOT: 46,
                CHAR_DOUBLE_QUOTE: 34,
                CHAR_EQUAL: 61,
                CHAR_EXCLAMATION_MARK: 33,
                CHAR_FORM_FEED: 12,
                CHAR_FORWARD_SLASH: 47,
                CHAR_GRAVE_ACCENT: 96,
                CHAR_HASH: 35,
                CHAR_HYPHEN_MINUS: 45,
                CHAR_LEFT_ANGLE_BRACKET: 60,
                CHAR_LEFT_CURLY_BRACE: 123,
                CHAR_LEFT_SQUARE_BRACKET: 91,
                CHAR_LINE_FEED: 10,
                CHAR_NO_BREAK_SPACE: 160,
                CHAR_PERCENT: 37,
                CHAR_PLUS: 43,
                CHAR_QUESTION_MARK: 63,
                CHAR_RIGHT_ANGLE_BRACKET: 62,
                CHAR_RIGHT_CURLY_BRACE: 125,
                CHAR_RIGHT_SQUARE_BRACKET: 93,
                CHAR_SEMICOLON: 59,
                CHAR_SINGLE_QUOTE: 39,
                CHAR_SPACE: 32,
                CHAR_TAB: 9,
                CHAR_UNDERSCORE: 95,
                CHAR_VERTICAL_LINE: 124,
                CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
                extglobChars (t) {
                    return {
                        "!": {
                            type: "negate",
                            open: "(?:(?!(?:",
                            close: `))${t.STAR})`
                        },
                        "?": {
                            type: "qmark",
                            open: "(?:",
                            close: ")?"
                        },
                        "+": {
                            type: "plus",
                            open: "(?:",
                            close: ")+"
                        },
                        "*": {
                            type: "star",
                            open: "(?:",
                            close: ")*"
                        },
                        "@": {
                            type: "at",
                            open: "(?:",
                            close: ")"
                        }
                    };
                },
                globChars (t) {
                    return t === true ? C : b;
                }
            };
        },
        697: (t, e, u)=>{
            const n = u(154);
            const o = u(96);
            const { MAX_LENGTH: s, POSIX_REGEX_SOURCE: r, REGEX_NON_SPECIAL_CHARS: a, REGEX_SPECIAL_CHARS_BACKREF: i, REPLACEMENTS: c } = n;
            const expandRange = (t, e)=>{
                if (typeof e.expandRange === "function") {
                    return e.expandRange(...t, e);
                }
                t.sort();
                const u = `[${t.join("-")}]`;
                try {
                    new RegExp(u);
                } catch (e) {
                    return t.map((t)=>o.escapeRegex(t)).join("..");
                }
                return u;
            };
            const syntaxError = (t, e)=>`Missing ${t}: "${e}" - use "\\\\${e}" to match literal characters`;
            const parse = (t, e)=>{
                if (typeof t !== "string") {
                    throw new TypeError("Expected a string");
                }
                t = c[t] || t;
                const u = {
                    ...e
                };
                const p = typeof u.maxLength === "number" ? Math.min(s, u.maxLength) : s;
                let l = t.length;
                if (l > p) {
                    throw new SyntaxError(`Input length: ${l}, exceeds maximum allowed length: ${p}`);
                }
                const f = {
                    type: "bos",
                    value: "",
                    output: u.prepend || ""
                };
                const A = [
                    f
                ];
                const _ = u.capture ? "" : "?:";
                const R = n.globChars(u.windows);
                const E = n.extglobChars(R);
                const { DOT_LITERAL: h, PLUS_LITERAL: g, SLASH_LITERAL: b, ONE_CHAR: C, DOTS_SLASH: y, NO_DOT: $, NO_DOT_SLASH: x, NO_DOTS_SLASH: S, QMARK: H, QMARK_NO_DOT: v, STAR: d, START_ANCHOR: L } = R;
                const globstar = (t)=>`(${_}(?:(?!${L}${t.dot ? y : h}).)*?)`;
                const T = u.dot ? "" : $;
                const O = u.dot ? H : v;
                let k = u.bash === true ? globstar(u) : d;
                if (u.capture) {
                    k = `(${k})`;
                }
                if (typeof u.noext === "boolean") {
                    u.noextglob = u.noext;
                }
                const m = {
                    input: t,
                    index: -1,
                    start: 0,
                    dot: u.dot === true,
                    consumed: "",
                    output: "",
                    prefix: "",
                    backtrack: false,
                    negated: false,
                    brackets: 0,
                    braces: 0,
                    parens: 0,
                    quotes: 0,
                    globstar: false,
                    tokens: A
                };
                t = o.removePrefix(t, m);
                l = t.length;
                const w = [];
                const N = [];
                const I = [];
                let B = f;
                let G;
                const eos = ()=>m.index === l - 1;
                const D = m.peek = (e = 1)=>t[m.index + e];
                const M = m.advance = ()=>t[++m.index] || "";
                const remaining = ()=>t.slice(m.index + 1);
                const consume = (t = "", e = 0)=>{
                    m.consumed += t;
                    m.index += e;
                };
                const append = (t)=>{
                    m.output += t.output != null ? t.output : t.value;
                    consume(t.value);
                };
                const negate = ()=>{
                    let t = 1;
                    while(D() === "!" && (D(2) !== "(" || D(3) === "?")){
                        M();
                        m.start++;
                        t++;
                    }
                    if (t % 2 === 0) {
                        return false;
                    }
                    m.negated = true;
                    m.start++;
                    return true;
                };
                const increment = (t)=>{
                    m[t]++;
                    I.push(t);
                };
                const decrement = (t)=>{
                    m[t]--;
                    I.pop();
                };
                const push = (t)=>{
                    if (B.type === "globstar") {
                        const e = m.braces > 0 && (t.type === "comma" || t.type === "brace");
                        const u = t.extglob === true || w.length && (t.type === "pipe" || t.type === "paren");
                        if (t.type !== "slash" && t.type !== "paren" && !e && !u) {
                            m.output = m.output.slice(0, -B.output.length);
                            B.type = "star";
                            B.value = "*";
                            B.output = k;
                            m.output += B.output;
                        }
                    }
                    if (w.length && t.type !== "paren") {
                        w[w.length - 1].inner += t.value;
                    }
                    if (t.value || t.output) append(t);
                    if (B && B.type === "text" && t.type === "text") {
                        B.output = (B.output || B.value) + t.value;
                        B.value += t.value;
                        return;
                    }
                    t.prev = B;
                    A.push(t);
                    B = t;
                };
                const extglobOpen = (t, e)=>{
                    const n = {
                        ...E[e],
                        conditions: 1,
                        inner: ""
                    };
                    n.prev = B;
                    n.parens = m.parens;
                    n.output = m.output;
                    const o = (u.capture ? "(" : "") + n.open;
                    increment("parens");
                    push({
                        type: t,
                        value: e,
                        output: m.output ? "" : C
                    });
                    push({
                        type: "paren",
                        extglob: true,
                        value: M(),
                        output: o
                    });
                    w.push(n);
                };
                const extglobClose = (t)=>{
                    let n = t.close + (u.capture ? ")" : "");
                    let o;
                    if (t.type === "negate") {
                        let s = k;
                        if (t.inner && t.inner.length > 1 && t.inner.includes("/")) {
                            s = globstar(u);
                        }
                        if (s !== k || eos() || /^\)+$/.test(remaining())) {
                            n = t.close = `)$))${s}`;
                        }
                        if (t.inner.includes("*") && (o = remaining()) && /^\.[^\\/.]+$/.test(o)) {
                            const u = parse(o, {
                                ...e,
                                fastpaths: false
                            }).output;
                            n = t.close = `)${u})${s})`;
                        }
                        if (t.prev.type === "bos") {
                            m.negatedExtglob = true;
                        }
                    }
                    push({
                        type: "paren",
                        extglob: true,
                        value: G,
                        output: n
                    });
                    decrement("parens");
                };
                if (u.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(t)) {
                    let n = false;
                    let s = t.replace(i, (t, e, u, o, s, r)=>{
                        if (o === "\\") {
                            n = true;
                            return t;
                        }
                        if (o === "?") {
                            if (e) {
                                return e + o + (s ? H.repeat(s.length) : "");
                            }
                            if (r === 0) {
                                return O + (s ? H.repeat(s.length) : "");
                            }
                            return H.repeat(u.length);
                        }
                        if (o === ".") {
                            return h.repeat(u.length);
                        }
                        if (o === "*") {
                            if (e) {
                                return e + o + (s ? k : "");
                            }
                            return k;
                        }
                        return e ? t : `\\${t}`;
                    });
                    if (n === true) {
                        if (u.unescape === true) {
                            s = s.replace(/\\/g, "");
                        } else {
                            s = s.replace(/\\+/g, (t)=>t.length % 2 === 0 ? "\\\\" : t ? "\\" : "");
                        }
                    }
                    if (s === t && u.contains === true) {
                        m.output = t;
                        return m;
                    }
                    m.output = o.wrapOutput(s, m, e);
                    return m;
                }
                while(!eos()){
                    G = M();
                    if (G === "\0") {
                        continue;
                    }
                    if (G === "\\") {
                        const t = D();
                        if (t === "/" && u.bash !== true) {
                            continue;
                        }
                        if (t === "." || t === ";") {
                            continue;
                        }
                        if (!t) {
                            G += "\\";
                            push({
                                type: "text",
                                value: G
                            });
                            continue;
                        }
                        const e = /^\\+/.exec(remaining());
                        let n = 0;
                        if (e && e[0].length > 2) {
                            n = e[0].length;
                            m.index += n;
                            if (n % 2 !== 0) {
                                G += "\\";
                            }
                        }
                        if (u.unescape === true) {
                            G = M();
                        } else {
                            G += M();
                        }
                        if (m.brackets === 0) {
                            push({
                                type: "text",
                                value: G
                            });
                            continue;
                        }
                    }
                    if (m.brackets > 0 && (G !== "]" || B.value === "[" || B.value === "[^")) {
                        if (u.posix !== false && G === ":") {
                            const t = B.value.slice(1);
                            if (t.includes("[")) {
                                B.posix = true;
                                if (t.includes(":")) {
                                    const t = B.value.lastIndexOf("[");
                                    const e = B.value.slice(0, t);
                                    const u = B.value.slice(t + 2);
                                    const n = r[u];
                                    if (n) {
                                        B.value = e + n;
                                        m.backtrack = true;
                                        M();
                                        if (!f.output && A.indexOf(B) === 1) {
                                            f.output = C;
                                        }
                                        continue;
                                    }
                                }
                            }
                        }
                        if (G === "[" && D() !== ":" || G === "-" && D() === "]") {
                            G = `\\${G}`;
                        }
                        if (G === "]" && (B.value === "[" || B.value === "[^")) {
                            G = `\\${G}`;
                        }
                        if (u.posix === true && G === "!" && B.value === "[") {
                            G = "^";
                        }
                        B.value += G;
                        append({
                            value: G
                        });
                        continue;
                    }
                    if (m.quotes === 1 && G !== '"') {
                        G = o.escapeRegex(G);
                        B.value += G;
                        append({
                            value: G
                        });
                        continue;
                    }
                    if (G === '"') {
                        m.quotes = m.quotes === 1 ? 0 : 1;
                        if (u.keepQuotes === true) {
                            push({
                                type: "text",
                                value: G
                            });
                        }
                        continue;
                    }
                    if (G === "(") {
                        increment("parens");
                        push({
                            type: "paren",
                            value: G
                        });
                        continue;
                    }
                    if (G === ")") {
                        if (m.parens === 0 && u.strictBrackets === true) {
                            throw new SyntaxError(syntaxError("opening", "("));
                        }
                        const t = w[w.length - 1];
                        if (t && m.parens === t.parens + 1) {
                            extglobClose(w.pop());
                            continue;
                        }
                        push({
                            type: "paren",
                            value: G,
                            output: m.parens ? ")" : "\\)"
                        });
                        decrement("parens");
                        continue;
                    }
                    if (G === "[") {
                        if (u.nobracket === true || !remaining().includes("]")) {
                            if (u.nobracket !== true && u.strictBrackets === true) {
                                throw new SyntaxError(syntaxError("closing", "]"));
                            }
                            G = `\\${G}`;
                        } else {
                            increment("brackets");
                        }
                        push({
                            type: "bracket",
                            value: G
                        });
                        continue;
                    }
                    if (G === "]") {
                        if (u.nobracket === true || B && B.type === "bracket" && B.value.length === 1) {
                            push({
                                type: "text",
                                value: G,
                                output: `\\${G}`
                            });
                            continue;
                        }
                        if (m.brackets === 0) {
                            if (u.strictBrackets === true) {
                                throw new SyntaxError(syntaxError("opening", "["));
                            }
                            push({
                                type: "text",
                                value: G,
                                output: `\\${G}`
                            });
                            continue;
                        }
                        decrement("brackets");
                        const t = B.value.slice(1);
                        if (B.posix !== true && t[0] === "^" && !t.includes("/")) {
                            G = `/${G}`;
                        }
                        B.value += G;
                        append({
                            value: G
                        });
                        if (u.literalBrackets === false || o.hasRegexChars(t)) {
                            continue;
                        }
                        const e = o.escapeRegex(B.value);
                        m.output = m.output.slice(0, -B.value.length);
                        if (u.literalBrackets === true) {
                            m.output += e;
                            B.value = e;
                            continue;
                        }
                        B.value = `(${_}${e}|${B.value})`;
                        m.output += B.value;
                        continue;
                    }
                    if (G === "{" && u.nobrace !== true) {
                        increment("braces");
                        const t = {
                            type: "brace",
                            value: G,
                            output: "(",
                            outputIndex: m.output.length,
                            tokensIndex: m.tokens.length
                        };
                        N.push(t);
                        push(t);
                        continue;
                    }
                    if (G === "}") {
                        const t = N[N.length - 1];
                        if (u.nobrace === true || !t) {
                            push({
                                type: "text",
                                value: G,
                                output: G
                            });
                            continue;
                        }
                        let e = ")";
                        if (t.dots === true) {
                            const t = A.slice();
                            const n = [];
                            for(let e = t.length - 1; e >= 0; e--){
                                A.pop();
                                if (t[e].type === "brace") {
                                    break;
                                }
                                if (t[e].type !== "dots") {
                                    n.unshift(t[e].value);
                                }
                            }
                            e = expandRange(n, u);
                            m.backtrack = true;
                        }
                        if (t.comma !== true && t.dots !== true) {
                            const u = m.output.slice(0, t.outputIndex);
                            const n = m.tokens.slice(t.tokensIndex);
                            t.value = t.output = "\\{";
                            G = e = "\\}";
                            m.output = u;
                            for (const t of n){
                                m.output += t.output || t.value;
                            }
                        }
                        push({
                            type: "brace",
                            value: G,
                            output: e
                        });
                        decrement("braces");
                        N.pop();
                        continue;
                    }
                    if (G === "|") {
                        if (w.length > 0) {
                            w[w.length - 1].conditions++;
                        }
                        push({
                            type: "text",
                            value: G
                        });
                        continue;
                    }
                    if (G === ",") {
                        let t = G;
                        const e = N[N.length - 1];
                        if (e && I[I.length - 1] === "braces") {
                            e.comma = true;
                            t = "|";
                        }
                        push({
                            type: "comma",
                            value: G,
                            output: t
                        });
                        continue;
                    }
                    if (G === "/") {
                        if (B.type === "dot" && m.index === m.start + 1) {
                            m.start = m.index + 1;
                            m.consumed = "";
                            m.output = "";
                            A.pop();
                            B = f;
                            continue;
                        }
                        push({
                            type: "slash",
                            value: G,
                            output: b
                        });
                        continue;
                    }
                    if (G === ".") {
                        if (m.braces > 0 && B.type === "dot") {
                            if (B.value === ".") B.output = h;
                            const t = N[N.length - 1];
                            B.type = "dots";
                            B.output += G;
                            B.value += G;
                            t.dots = true;
                            continue;
                        }
                        if (m.braces + m.parens === 0 && B.type !== "bos" && B.type !== "slash") {
                            push({
                                type: "text",
                                value: G,
                                output: h
                            });
                            continue;
                        }
                        push({
                            type: "dot",
                            value: G,
                            output: h
                        });
                        continue;
                    }
                    if (G === "?") {
                        const t = B && B.value === "(";
                        if (!t && u.noextglob !== true && D() === "(" && D(2) !== "?") {
                            extglobOpen("qmark", G);
                            continue;
                        }
                        if (B && B.type === "paren") {
                            const t = D();
                            let e = G;
                            if (B.value === "(" && !/[!=<:]/.test(t) || t === "<" && !/<([!=]|\w+>)/.test(remaining())) {
                                e = `\\${G}`;
                            }
                            push({
                                type: "text",
                                value: G,
                                output: e
                            });
                            continue;
                        }
                        if (u.dot !== true && (B.type === "slash" || B.type === "bos")) {
                            push({
                                type: "qmark",
                                value: G,
                                output: v
                            });
                            continue;
                        }
                        push({
                            type: "qmark",
                            value: G,
                            output: H
                        });
                        continue;
                    }
                    if (G === "!") {
                        if (u.noextglob !== true && D() === "(") {
                            if (D(2) !== "?" || !/[!=<:]/.test(D(3))) {
                                extglobOpen("negate", G);
                                continue;
                            }
                        }
                        if (u.nonegate !== true && m.index === 0) {
                            negate();
                            continue;
                        }
                    }
                    if (G === "+") {
                        if (u.noextglob !== true && D() === "(" && D(2) !== "?") {
                            extglobOpen("plus", G);
                            continue;
                        }
                        if (B && B.value === "(" || u.regex === false) {
                            push({
                                type: "plus",
                                value: G,
                                output: g
                            });
                            continue;
                        }
                        if (B && (B.type === "bracket" || B.type === "paren" || B.type === "brace") || m.parens > 0) {
                            push({
                                type: "plus",
                                value: G
                            });
                            continue;
                        }
                        push({
                            type: "plus",
                            value: g
                        });
                        continue;
                    }
                    if (G === "@") {
                        if (u.noextglob !== true && D() === "(" && D(2) !== "?") {
                            push({
                                type: "at",
                                extglob: true,
                                value: G,
                                output: ""
                            });
                            continue;
                        }
                        push({
                            type: "text",
                            value: G
                        });
                        continue;
                    }
                    if (G !== "*") {
                        if (G === "$" || G === "^") {
                            G = `\\${G}`;
                        }
                        const t = a.exec(remaining());
                        if (t) {
                            G += t[0];
                            m.index += t[0].length;
                        }
                        push({
                            type: "text",
                            value: G
                        });
                        continue;
                    }
                    if (B && (B.type === "globstar" || B.star === true)) {
                        B.type = "star";
                        B.star = true;
                        B.value += G;
                        B.output = k;
                        m.backtrack = true;
                        m.globstar = true;
                        consume(G);
                        continue;
                    }
                    let e = remaining();
                    if (u.noextglob !== true && /^\([^?]/.test(e)) {
                        extglobOpen("star", G);
                        continue;
                    }
                    if (B.type === "star") {
                        if (u.noglobstar === true) {
                            consume(G);
                            continue;
                        }
                        const n = B.prev;
                        const o = n.prev;
                        const s = n.type === "slash" || n.type === "bos";
                        const r = o && (o.type === "star" || o.type === "globstar");
                        if (u.bash === true && (!s || e[0] && e[0] !== "/")) {
                            push({
                                type: "star",
                                value: G,
                                output: ""
                            });
                            continue;
                        }
                        const a = m.braces > 0 && (n.type === "comma" || n.type === "brace");
                        const i = w.length && (n.type === "pipe" || n.type === "paren");
                        if (!s && n.type !== "paren" && !a && !i) {
                            push({
                                type: "star",
                                value: G,
                                output: ""
                            });
                            continue;
                        }
                        while(e.slice(0, 3) === "/**"){
                            const u = t[m.index + 4];
                            if (u && u !== "/") {
                                break;
                            }
                            e = e.slice(3);
                            consume("/**", 3);
                        }
                        if (n.type === "bos" && eos()) {
                            B.type = "globstar";
                            B.value += G;
                            B.output = globstar(u);
                            m.output = B.output;
                            m.globstar = true;
                            consume(G);
                            continue;
                        }
                        if (n.type === "slash" && n.prev.type !== "bos" && !r && eos()) {
                            m.output = m.output.slice(0, -(n.output + B.output).length);
                            n.output = `(?:${n.output}`;
                            B.type = "globstar";
                            B.output = globstar(u) + (u.strictSlashes ? ")" : "|$)");
                            B.value += G;
                            m.globstar = true;
                            m.output += n.output + B.output;
                            consume(G);
                            continue;
                        }
                        if (n.type === "slash" && n.prev.type !== "bos" && e[0] === "/") {
                            const t = e[1] !== void 0 ? "|$" : "";
                            m.output = m.output.slice(0, -(n.output + B.output).length);
                            n.output = `(?:${n.output}`;
                            B.type = "globstar";
                            B.output = `${globstar(u)}${b}|${b}${t})`;
                            B.value += G;
                            m.output += n.output + B.output;
                            m.globstar = true;
                            consume(G + M());
                            push({
                                type: "slash",
                                value: "/",
                                output: ""
                            });
                            continue;
                        }
                        if (n.type === "bos" && e[0] === "/") {
                            B.type = "globstar";
                            B.value += G;
                            B.output = `(?:^|${b}|${globstar(u)}${b})`;
                            m.output = B.output;
                            m.globstar = true;
                            consume(G + M());
                            push({
                                type: "slash",
                                value: "/",
                                output: ""
                            });
                            continue;
                        }
                        m.output = m.output.slice(0, -B.output.length);
                        B.type = "globstar";
                        B.output = globstar(u);
                        B.value += G;
                        m.output += B.output;
                        m.globstar = true;
                        consume(G);
                        continue;
                    }
                    const n = {
                        type: "star",
                        value: G,
                        output: k
                    };
                    if (u.bash === true) {
                        n.output = ".*?";
                        if (B.type === "bos" || B.type === "slash") {
                            n.output = T + n.output;
                        }
                        push(n);
                        continue;
                    }
                    if (B && (B.type === "bracket" || B.type === "paren") && u.regex === true) {
                        n.output = G;
                        push(n);
                        continue;
                    }
                    if (m.index === m.start || B.type === "slash" || B.type === "dot") {
                        if (B.type === "dot") {
                            m.output += x;
                            B.output += x;
                        } else if (u.dot === true) {
                            m.output += S;
                            B.output += S;
                        } else {
                            m.output += T;
                            B.output += T;
                        }
                        if (D() !== "*") {
                            m.output += C;
                            B.output += C;
                        }
                    }
                    push(n);
                }
                while(m.brackets > 0){
                    if (u.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "]"));
                    m.output = o.escapeLast(m.output, "[");
                    decrement("brackets");
                }
                while(m.parens > 0){
                    if (u.strictBrackets === true) throw new SyntaxError(syntaxError("closing", ")"));
                    m.output = o.escapeLast(m.output, "(");
                    decrement("parens");
                }
                while(m.braces > 0){
                    if (u.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "}"));
                    m.output = o.escapeLast(m.output, "{");
                    decrement("braces");
                }
                if (u.strictSlashes !== true && (B.type === "star" || B.type === "bracket")) {
                    push({
                        type: "maybe_slash",
                        value: "",
                        output: `${b}?`
                    });
                }
                if (m.backtrack === true) {
                    m.output = "";
                    for (const t of m.tokens){
                        m.output += t.output != null ? t.output : t.value;
                        if (t.suffix) {
                            m.output += t.suffix;
                        }
                    }
                }
                return m;
            };
            parse.fastpaths = (t, e)=>{
                const u = {
                    ...e
                };
                const r = typeof u.maxLength === "number" ? Math.min(s, u.maxLength) : s;
                const a = t.length;
                if (a > r) {
                    throw new SyntaxError(`Input length: ${a}, exceeds maximum allowed length: ${r}`);
                }
                t = c[t] || t;
                const { DOT_LITERAL: i, SLASH_LITERAL: p, ONE_CHAR: l, DOTS_SLASH: f, NO_DOT: A, NO_DOTS: _, NO_DOTS_SLASH: R, STAR: E, START_ANCHOR: h } = n.globChars(u.windows);
                const g = u.dot ? _ : A;
                const b = u.dot ? R : A;
                const C = u.capture ? "" : "?:";
                const y = {
                    negated: false,
                    prefix: ""
                };
                let $ = u.bash === true ? ".*?" : E;
                if (u.capture) {
                    $ = `(${$})`;
                }
                const globstar = (t)=>{
                    if (t.noglobstar === true) return $;
                    return `(${C}(?:(?!${h}${t.dot ? f : i}).)*?)`;
                };
                const create = (t)=>{
                    switch(t){
                        case "*":
                            return `${g}${l}${$}`;
                        case ".*":
                            return `${i}${l}${$}`;
                        case "*.*":
                            return `${g}${$}${i}${l}${$}`;
                        case "*/*":
                            return `${g}${$}${p}${l}${b}${$}`;
                        case "**":
                            return g + globstar(u);
                        case "**/*":
                            return `(?:${g}${globstar(u)}${p})?${b}${l}${$}`;
                        case "**/*.*":
                            return `(?:${g}${globstar(u)}${p})?${b}${$}${i}${l}${$}`;
                        case "**/.*":
                            return `(?:${g}${globstar(u)}${p})?${i}${l}${$}`;
                        default:
                            {
                                const e = /^(.*?)\.(\w+)$/.exec(t);
                                if (!e) return;
                                const u = create(e[1]);
                                if (!u) return;
                                return u + i + e[2];
                            }
                    }
                };
                const x = o.removePrefix(t, y);
                let S = create(x);
                if (S && u.strictSlashes !== true) {
                    S += `${p}?`;
                }
                return S;
            };
            t.exports = parse;
        },
        510: (t, e, u)=>{
            const n = u(716);
            const o = u(697);
            const s = u(96);
            const r = u(154);
            const isObject = (t)=>t && typeof t === "object" && !Array.isArray(t);
            const picomatch = (t, e, u = false)=>{
                if (Array.isArray(t)) {
                    const n = t.map((t)=>picomatch(t, e, u));
                    const arrayMatcher = (t)=>{
                        for (const e of n){
                            const u = e(t);
                            if (u) return u;
                        }
                        return false;
                    };
                    return arrayMatcher;
                }
                const n = isObject(t) && t.tokens && t.input;
                if (t === "" || typeof t !== "string" && !n) {
                    throw new TypeError("Expected pattern to be a non-empty string");
                }
                const o = e || {};
                const s = o.windows;
                const r = n ? picomatch.compileRe(t, e) : picomatch.makeRe(t, e, false, true);
                const a = r.state;
                delete r.state;
                let isIgnored = ()=>false;
                if (o.ignore) {
                    const t = {
                        ...e,
                        ignore: null,
                        onMatch: null,
                        onResult: null
                    };
                    isIgnored = picomatch(o.ignore, t, u);
                }
                const matcher = (u, n = false)=>{
                    const { isMatch: i, match: c, output: p } = picomatch.test(u, r, e, {
                        glob: t,
                        posix: s
                    });
                    const l = {
                        glob: t,
                        state: a,
                        regex: r,
                        posix: s,
                        input: u,
                        output: p,
                        match: c,
                        isMatch: i
                    };
                    if (typeof o.onResult === "function") {
                        o.onResult(l);
                    }
                    if (i === false) {
                        l.isMatch = false;
                        return n ? l : false;
                    }
                    if (isIgnored(u)) {
                        if (typeof o.onIgnore === "function") {
                            o.onIgnore(l);
                        }
                        l.isMatch = false;
                        return n ? l : false;
                    }
                    if (typeof o.onMatch === "function") {
                        o.onMatch(l);
                    }
                    return n ? l : true;
                };
                if (u) {
                    matcher.state = a;
                }
                return matcher;
            };
            picomatch.test = (t, e, u, { glob: n, posix: o } = {})=>{
                if (typeof t !== "string") {
                    throw new TypeError("Expected input to be a string");
                }
                if (t === "") {
                    return {
                        isMatch: false,
                        output: ""
                    };
                }
                const r = u || {};
                const a = r.format || (o ? s.toPosixSlashes : null);
                let i = t === n;
                let c = i && a ? a(t) : t;
                if (i === false) {
                    c = a ? a(t) : t;
                    i = c === n;
                }
                if (i === false || r.capture === true) {
                    if (r.matchBase === true || r.basename === true) {
                        i = picomatch.matchBase(t, e, u, o);
                    } else {
                        i = e.exec(c);
                    }
                }
                return {
                    isMatch: Boolean(i),
                    match: i,
                    output: c
                };
            };
            picomatch.matchBase = (t, e, u)=>{
                const n = e instanceof RegExp ? e : picomatch.makeRe(e, u);
                return n.test(s.basename(t));
            };
            picomatch.isMatch = (t, e, u)=>picomatch(e, u)(t);
            picomatch.parse = (t, e)=>{
                if (Array.isArray(t)) return t.map((t)=>picomatch.parse(t, e));
                return o(t, {
                    ...e,
                    fastpaths: false
                });
            };
            picomatch.scan = (t, e)=>n(t, e);
            picomatch.compileRe = (t, e, u = false, n = false)=>{
                if (u === true) {
                    return t.output;
                }
                const o = e || {};
                const s = o.contains ? "" : "^";
                const r = o.contains ? "" : "$";
                let a = `${s}(?:${t.output})${r}`;
                if (t && t.negated === true) {
                    a = `^(?!${a}).*$`;
                }
                const i = picomatch.toRegex(a, e);
                if (n === true) {
                    i.state = t;
                }
                return i;
            };
            picomatch.makeRe = (t, e = {}, u = false, n = false)=>{
                if (!t || typeof t !== "string") {
                    throw new TypeError("Expected a non-empty string");
                }
                let s = {
                    negated: false,
                    fastpaths: true
                };
                if (e.fastpaths !== false && (t[0] === "." || t[0] === "*")) {
                    s.output = o.fastpaths(t, e);
                }
                if (!s.output) {
                    s = o(t, e);
                }
                return picomatch.compileRe(s, e, u, n);
            };
            picomatch.toRegex = (t, e)=>{
                try {
                    const u = e || {};
                    return new RegExp(t, u.flags || (u.nocase ? "i" : ""));
                } catch (t) {
                    if (e && e.debug === true) throw t;
                    return /$^/;
                }
            };
            picomatch.constants = r;
            t.exports = picomatch;
        },
        716: (t, e, u)=>{
            const n = u(96);
            const { CHAR_ASTERISK: o, CHAR_AT: s, CHAR_BACKWARD_SLASH: r, CHAR_COMMA: a, CHAR_DOT: i, CHAR_EXCLAMATION_MARK: c, CHAR_FORWARD_SLASH: p, CHAR_LEFT_CURLY_BRACE: l, CHAR_LEFT_PARENTHESES: f, CHAR_LEFT_SQUARE_BRACKET: A, CHAR_PLUS: _, CHAR_QUESTION_MARK: R, CHAR_RIGHT_CURLY_BRACE: E, CHAR_RIGHT_PARENTHESES: h, CHAR_RIGHT_SQUARE_BRACKET: g } = u(154);
            const isPathSeparator = (t)=>t === p || t === r;
            const depth = (t)=>{
                if (t.isPrefix !== true) {
                    t.depth = t.isGlobstar ? Infinity : 1;
                }
            };
            const scan = (t, e)=>{
                const u = e || {};
                const b = t.length - 1;
                const C = u.parts === true || u.scanToEnd === true;
                const y = [];
                const $ = [];
                const x = [];
                let S = t;
                let H = -1;
                let v = 0;
                let d = 0;
                let L = false;
                let T = false;
                let O = false;
                let k = false;
                let m = false;
                let w = false;
                let N = false;
                let I = false;
                let B = false;
                let G = false;
                let D = 0;
                let M;
                let P;
                let K = {
                    value: "",
                    depth: 0,
                    isGlob: false
                };
                const eos = ()=>H >= b;
                const peek = ()=>S.charCodeAt(H + 1);
                const advance = ()=>{
                    M = P;
                    return S.charCodeAt(++H);
                };
                while(H < b){
                    P = advance();
                    let t;
                    if (P === r) {
                        N = K.backslashes = true;
                        P = advance();
                        if (P === l) {
                            w = true;
                        }
                        continue;
                    }
                    if (w === true || P === l) {
                        D++;
                        while(eos() !== true && (P = advance())){
                            if (P === r) {
                                N = K.backslashes = true;
                                advance();
                                continue;
                            }
                            if (P === l) {
                                D++;
                                continue;
                            }
                            if (w !== true && P === i && (P = advance()) === i) {
                                L = K.isBrace = true;
                                O = K.isGlob = true;
                                G = true;
                                if (C === true) {
                                    continue;
                                }
                                break;
                            }
                            if (w !== true && P === a) {
                                L = K.isBrace = true;
                                O = K.isGlob = true;
                                G = true;
                                if (C === true) {
                                    continue;
                                }
                                break;
                            }
                            if (P === E) {
                                D--;
                                if (D === 0) {
                                    w = false;
                                    L = K.isBrace = true;
                                    G = true;
                                    break;
                                }
                            }
                        }
                        if (C === true) {
                            continue;
                        }
                        break;
                    }
                    if (P === p) {
                        y.push(H);
                        $.push(K);
                        K = {
                            value: "",
                            depth: 0,
                            isGlob: false
                        };
                        if (G === true) continue;
                        if (M === i && H === v + 1) {
                            v += 2;
                            continue;
                        }
                        d = H + 1;
                        continue;
                    }
                    if (u.noext !== true) {
                        const t = P === _ || P === s || P === o || P === R || P === c;
                        if (t === true && peek() === f) {
                            O = K.isGlob = true;
                            k = K.isExtglob = true;
                            G = true;
                            if (P === c && H === v) {
                                B = true;
                            }
                            if (C === true) {
                                while(eos() !== true && (P = advance())){
                                    if (P === r) {
                                        N = K.backslashes = true;
                                        P = advance();
                                        continue;
                                    }
                                    if (P === h) {
                                        O = K.isGlob = true;
                                        G = true;
                                        break;
                                    }
                                }
                                continue;
                            }
                            break;
                        }
                    }
                    if (P === o) {
                        if (M === o) m = K.isGlobstar = true;
                        O = K.isGlob = true;
                        G = true;
                        if (C === true) {
                            continue;
                        }
                        break;
                    }
                    if (P === R) {
                        O = K.isGlob = true;
                        G = true;
                        if (C === true) {
                            continue;
                        }
                        break;
                    }
                    if (P === A) {
                        while(eos() !== true && (t = advance())){
                            if (t === r) {
                                N = K.backslashes = true;
                                advance();
                                continue;
                            }
                            if (t === g) {
                                T = K.isBracket = true;
                                O = K.isGlob = true;
                                G = true;
                                break;
                            }
                        }
                        if (C === true) {
                            continue;
                        }
                        break;
                    }
                    if (u.nonegate !== true && P === c && H === v) {
                        I = K.negated = true;
                        v++;
                        continue;
                    }
                    if (u.noparen !== true && P === f) {
                        O = K.isGlob = true;
                        if (C === true) {
                            while(eos() !== true && (P = advance())){
                                if (P === f) {
                                    N = K.backslashes = true;
                                    P = advance();
                                    continue;
                                }
                                if (P === h) {
                                    G = true;
                                    break;
                                }
                            }
                            continue;
                        }
                        break;
                    }
                    if (O === true) {
                        G = true;
                        if (C === true) {
                            continue;
                        }
                        break;
                    }
                }
                if (u.noext === true) {
                    k = false;
                    O = false;
                }
                let U = S;
                let X = "";
                let F = "";
                if (v > 0) {
                    X = S.slice(0, v);
                    S = S.slice(v);
                    d -= v;
                }
                if (U && O === true && d > 0) {
                    U = S.slice(0, d);
                    F = S.slice(d);
                } else if (O === true) {
                    U = "";
                    F = S;
                } else {
                    U = S;
                }
                if (U && U !== "" && U !== "/" && U !== S) {
                    if (isPathSeparator(U.charCodeAt(U.length - 1))) {
                        U = U.slice(0, -1);
                    }
                }
                if (u.unescape === true) {
                    if (F) F = n.removeBackslashes(F);
                    if (U && N === true) {
                        U = n.removeBackslashes(U);
                    }
                }
                const Q = {
                    prefix: X,
                    input: t,
                    start: v,
                    base: U,
                    glob: F,
                    isBrace: L,
                    isBracket: T,
                    isGlob: O,
                    isExtglob: k,
                    isGlobstar: m,
                    negated: I,
                    negatedExtglob: B
                };
                if (u.tokens === true) {
                    Q.maxDepth = 0;
                    if (!isPathSeparator(P)) {
                        $.push(K);
                    }
                    Q.tokens = $;
                }
                if (u.parts === true || u.tokens === true) {
                    let e;
                    for(let n = 0; n < y.length; n++){
                        const o = e ? e + 1 : v;
                        const s = y[n];
                        const r = t.slice(o, s);
                        if (u.tokens) {
                            if (n === 0 && v !== 0) {
                                $[n].isPrefix = true;
                                $[n].value = X;
                            } else {
                                $[n].value = r;
                            }
                            depth($[n]);
                            Q.maxDepth += $[n].depth;
                        }
                        if (n !== 0 || r !== "") {
                            x.push(r);
                        }
                        e = s;
                    }
                    if (e && e + 1 < t.length) {
                        const n = t.slice(e + 1);
                        x.push(n);
                        if (u.tokens) {
                            $[$.length - 1].value = n;
                            depth($[$.length - 1]);
                            Q.maxDepth += $[$.length - 1].depth;
                        }
                    }
                    Q.slashes = y;
                    Q.parts = x;
                }
                return Q;
            };
            t.exports = scan;
        },
        96: (t, e, u)=>{
            const { REGEX_BACKSLASH: n, REGEX_REMOVE_BACKSLASH: o, REGEX_SPECIAL_CHARS: s, REGEX_SPECIAL_CHARS_GLOBAL: r } = u(154);
            e.isObject = (t)=>t !== null && typeof t === "object" && !Array.isArray(t);
            e.hasRegexChars = (t)=>s.test(t);
            e.isRegexChar = (t)=>t.length === 1 && e.hasRegexChars(t);
            e.escapeRegex = (t)=>t.replace(r, "\\$1");
            e.toPosixSlashes = (t)=>t.replace(n, "/");
            e.removeBackslashes = (t)=>t.replace(o, (t)=>t === "\\" ? "" : t);
            e.escapeLast = (t, u, n)=>{
                const o = t.lastIndexOf(u, n);
                if (o === -1) return t;
                if (t[o - 1] === "\\") return e.escapeLast(t, u, o - 1);
                return `${t.slice(0, o)}\\${t.slice(o)}`;
            };
            e.removePrefix = (t, e = {})=>{
                let u = t;
                if (u.startsWith("./")) {
                    u = u.slice(2);
                    e.prefix = "./";
                }
                return u;
            };
            e.wrapOutput = (t, e = {}, u = {})=>{
                const n = u.contains ? "" : "^";
                const o = u.contains ? "" : "$";
                let s = `${n}(?:${t})${o}`;
                if (e.negated === true) {
                    s = `(?:^(?!${s}).*$)`;
                }
                return s;
            };
            e.basename = (t, { windows: e } = {})=>{
                const u = t.split(e ? /[\\/]/ : "/");
                const n = u[u.length - 1];
                if (n === "") {
                    return u[u.length - 2];
                }
                return n;
            };
        }
    };
    var e = {};
    function __nccwpck_require__(u) {
        var n = e[u];
        if (n !== undefined) {
            return n.exports;
        }
        var o = e[u] = {
            exports: {}
        };
        var s = true;
        try {
            t[u](o, o.exports, __nccwpck_require__);
            s = false;
        } finally{
            if (s) delete e[u];
        }
        return o.exports;
    }
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = ("TURBOPACK compile-time value", "/ROOT/Desktop/project/ui-react/node_modules/next/dist/compiled/picomatch") + "/";
    var u = __nccwpck_require__(170);
    module.exports = u;
})();
}),
"[project]/Desktop/project/ui-react/node_modules/next/dist/shared/lib/match-local-pattern.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    hasLocalMatch: null,
    matchLocalPattern: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    hasLocalMatch: function() {
        return hasLocalMatch;
    },
    matchLocalPattern: function() {
        return matchLocalPattern;
    }
});
const _picomatch = __turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/next/dist/compiled/picomatch/index.js [app-client] (ecmascript)");
function matchLocalPattern(pattern, url) {
    if (pattern.search !== undefined) {
        if (pattern.search !== url.search) {
            return false;
        }
    }
    if (!(0, _picomatch.makeRe)(pattern.pathname ?? '**', {
        dot: true
    }).test(url.pathname)) {
        return false;
    }
    return true;
}
function hasLocalMatch(localPatterns, urlPathAndQuery) {
    if (!localPatterns) {
        // if the user didn't define "localPatterns", we allow all local images
        return true;
    }
    const url = new URL(urlPathAndQuery, 'http://n');
    return localPatterns.some((p)=>matchLocalPattern(p, url));
} //# sourceMappingURL=match-local-pattern.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/next/dist/shared/lib/match-remote-pattern.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    hasRemoteMatch: null,
    matchRemotePattern: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    hasRemoteMatch: function() {
        return hasRemoteMatch;
    },
    matchRemotePattern: function() {
        return matchRemotePattern;
    }
});
const _picomatch = __turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/next/dist/compiled/picomatch/index.js [app-client] (ecmascript)");
function matchRemotePattern(pattern, url) {
    if (pattern.protocol !== undefined) {
        if (pattern.protocol.replace(/:$/, '') !== url.protocol.replace(/:$/, '')) {
            return false;
        }
    }
    if (pattern.port !== undefined) {
        if (pattern.port !== url.port) {
            return false;
        }
    }
    if (pattern.hostname === undefined) {
        throw Object.defineProperty(new Error(`Pattern should define hostname but found\n${JSON.stringify(pattern)}`), "__NEXT_ERROR_CODE", {
            value: "E410",
            enumerable: false,
            configurable: true
        });
    } else {
        if (!(0, _picomatch.makeRe)(pattern.hostname).test(url.hostname)) {
            return false;
        }
    }
    if (pattern.search !== undefined) {
        if (pattern.search !== url.search) {
            return false;
        }
    }
    // Should be the same as writeImagesManifest()
    if (!(0, _picomatch.makeRe)(pattern.pathname ?? '**', {
        dot: true
    }).test(url.pathname)) {
        return false;
    }
    return true;
}
function hasRemoteMatch(domains, remotePatterns, url) {
    return domains.some((domain)=>url.hostname === domain) || remotePatterns.some((p)=>matchRemotePattern(p, url));
} //# sourceMappingURL=match-remote-pattern.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/next/dist/shared/lib/image-loader.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _findclosestquality = __turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/next/dist/shared/lib/find-closest-quality.js [app-client] (ecmascript)");
function defaultLoader({ config, src, width, quality }) {
    if (src.startsWith('/') && src.includes('?') && config.localPatterns?.length === 1 && config.localPatterns[0].pathname === '**' && config.localPatterns[0].search === '') {
        throw Object.defineProperty(new Error(`Image with src "${src}" is using a query string which is not configured in images.localPatterns.` + `\nRead more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`), "__NEXT_ERROR_CODE", {
            value: "E871",
            enumerable: false,
            configurable: true
        });
    }
    if ("TURBOPACK compile-time truthy", 1) {
        const missingValues = [];
        // these should always be provided but make sure they are
        if (!src) missingValues.push('src');
        if (!width) missingValues.push('width');
        if (missingValues.length > 0) {
            throw Object.defineProperty(new Error(`Next Image Optimization requires ${missingValues.join(', ')} to be provided. Make sure you pass them as props to the \`next/image\` component. Received: ${JSON.stringify({
                src,
                width,
                quality
            })}`), "__NEXT_ERROR_CODE", {
                value: "E188",
                enumerable: false,
                configurable: true
            });
        }
        if (src.startsWith('//')) {
            throw Object.defineProperty(new Error(`Failed to parse src "${src}" on \`next/image\`, protocol-relative URL (//) must be changed to an absolute URL (http:// or https://)`), "__NEXT_ERROR_CODE", {
                value: "E360",
                enumerable: false,
                configurable: true
            });
        }
        if (src.startsWith('/') && config.localPatterns) {
            if ("TURBOPACK compile-time truthy", 1) {
                // We use dynamic require because this should only error in development
                const { hasLocalMatch } = __turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/next/dist/shared/lib/match-local-pattern.js [app-client] (ecmascript)");
                if (!hasLocalMatch(config.localPatterns, src)) {
                    throw Object.defineProperty(new Error(`Invalid src prop (${src}) on \`next/image\` does not match \`images.localPatterns\` configured in your \`next.config.js\`\n` + `See more info: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`), "__NEXT_ERROR_CODE", {
                        value: "E426",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
        }
        if (!src.startsWith('/') && (config.domains || config.remotePatterns)) {
            let parsedSrc;
            try {
                parsedSrc = new URL(src);
            } catch (err) {
                console.error(err);
                throw Object.defineProperty(new Error(`Failed to parse src "${src}" on \`next/image\`, if using relative image it must start with a leading slash "/" or be an absolute URL (http:// or https://)`), "__NEXT_ERROR_CODE", {
                    value: "E63",
                    enumerable: false,
                    configurable: true
                });
            }
            if ("TURBOPACK compile-time truthy", 1) {
                // We use dynamic require because this should only error in development
                const { hasRemoteMatch } = __turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/next/dist/shared/lib/match-remote-pattern.js [app-client] (ecmascript)");
                if (!hasRemoteMatch(config.domains, config.remotePatterns, parsedSrc)) {
                    throw Object.defineProperty(new Error(`Invalid src prop (${src}) on \`next/image\`, hostname "${parsedSrc.hostname}" is not configured under images in your \`next.config.js\`\n` + `See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host`), "__NEXT_ERROR_CODE", {
                        value: "E231",
                        enumerable: false,
                        configurable: true
                    });
                }
            }
        }
    }
    const q = (0, _findclosestquality.findClosestQuality)(quality, config);
    return `${config.path}?url=${encodeURIComponent(src)}&w=${width}&q=${q}${src.startsWith('/_next/static/media/') && ("TURBOPACK compile-time value", false) ? "TURBOPACK unreachable" : ''}`;
}
// We use this to determine if the import is the default loader
// or a custom loader defined by the user in next.config.js
defaultLoader.__next_img_default = true;
const _default = defaultLoader; //# sourceMappingURL=image-loader.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/next/dist/client/use-merged-ref.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useMergedRef", {
    enumerable: true,
    get: function() {
        return useMergedRef;
    }
});
const _react = __turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
function useMergedRef(refA, refB) {
    const cleanupA = (0, _react.useRef)(null);
    const cleanupB = (0, _react.useRef)(null);
    // NOTE: In theory, we could skip the wrapping if only one of the refs is non-null.
    // (this happens often if the user doesn't pass a ref to Link/Form/Image)
    // But this can cause us to leak a cleanup-ref into user code (previously via `<Link legacyBehavior>`),
    // and the user might pass that ref into ref-merging library that doesn't support cleanup refs
    // (because it hasn't been updated for React 19)
    // which can then cause things to blow up, because a cleanup-returning ref gets called with `null`.
    // So in practice, it's safer to be defensive and always wrap the ref, even on React 19.
    return (0, _react.useCallback)((current)=>{
        if (current === null) {
            const cleanupFnA = cleanupA.current;
            if (cleanupFnA) {
                cleanupA.current = null;
                cleanupFnA();
            }
            const cleanupFnB = cleanupB.current;
            if (cleanupFnB) {
                cleanupB.current = null;
                cleanupFnB();
            }
        } else {
            if (refA) {
                cleanupA.current = applyRef(refA, current);
            }
            if (refB) {
                cleanupB.current = applyRef(refB, current);
            }
        }
    }, [
        refA,
        refB
    ]);
}
function applyRef(refA, current) {
    if (typeof refA === 'function') {
        const cleanup = refA(current);
        if (typeof cleanup === 'function') {
            return cleanup;
        } else {
            return ()=>refA(null);
        }
    } else {
        refA.current = current;
        return ()=>{
            refA.current = null;
        };
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=use-merged-ref.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/next/dist/client/image-component.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Image", {
    enumerable: true,
    get: function() {
        return Image;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _interop_require_wildcard = __turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-client] (ecmascript)");
const _jsxruntime = __turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/next/dist/compiled/react/jsx-runtime.js [app-client] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"));
const _reactdom = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)"));
const _head = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/next/dist/shared/lib/head.js [app-client] (ecmascript)"));
const _getimgprops = __turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/next/dist/shared/lib/get-img-props.js [app-client] (ecmascript)");
const _imageconfig = __turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/next/dist/shared/lib/image-config.js [app-client] (ecmascript)");
const _imageconfigcontextsharedruntime = __turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/next/dist/shared/lib/image-config-context.shared-runtime.js [app-client] (ecmascript)");
const _warnonce = __turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/next/dist/shared/lib/utils/warn-once.js [app-client] (ecmascript)");
const _routercontextsharedruntime = __turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/next/dist/shared/lib/router-context.shared-runtime.js [app-client] (ecmascript)");
const _imageloader = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/next/dist/shared/lib/image-loader.js [app-client] (ecmascript)"));
const _usemergedref = __turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/next/dist/client/use-merged-ref.js [app-client] (ecmascript)");
// This is replaced by webpack define plugin
const configEnv = ("TURBOPACK compile-time value", {
    "deviceSizes": ("TURBOPACK compile-time value", [
        ("TURBOPACK compile-time value", 640),
        ("TURBOPACK compile-time value", 750),
        ("TURBOPACK compile-time value", 828),
        ("TURBOPACK compile-time value", 1080),
        ("TURBOPACK compile-time value", 1200),
        ("TURBOPACK compile-time value", 1920),
        ("TURBOPACK compile-time value", 2048),
        ("TURBOPACK compile-time value", 3840)
    ]),
    "imageSizes": ("TURBOPACK compile-time value", [
        ("TURBOPACK compile-time value", 32),
        ("TURBOPACK compile-time value", 48),
        ("TURBOPACK compile-time value", 64),
        ("TURBOPACK compile-time value", 96),
        ("TURBOPACK compile-time value", 128),
        ("TURBOPACK compile-time value", 256),
        ("TURBOPACK compile-time value", 384)
    ]),
    "qualities": ("TURBOPACK compile-time value", [
        ("TURBOPACK compile-time value", 75)
    ]),
    "path": ("TURBOPACK compile-time value", "/_next/image"),
    "loader": ("TURBOPACK compile-time value", "default"),
    "dangerouslyAllowSVG": ("TURBOPACK compile-time value", false),
    "unoptimized": ("TURBOPACK compile-time value", true),
    "domains": ("TURBOPACK compile-time value", []),
    "remotePatterns": ("TURBOPACK compile-time value", []),
    "localPatterns": ("TURBOPACK compile-time value", [
        ("TURBOPACK compile-time value", {
            "pathname": ("TURBOPACK compile-time value", "**"),
            "search": ("TURBOPACK compile-time value", "")
        })
    ])
});
if (typeof window === 'undefined') {
    ;
    globalThis.__NEXT_IMAGE_IMPORTED = true;
}
// See https://stackoverflow.com/q/39777833/266535 for why we use this ref
// handler instead of the img's onLoad attribute.
function handleLoading(img, placeholder, onLoadRef, onLoadingCompleteRef, setBlurComplete, unoptimized, sizesInput) {
    const src = img?.src;
    if (!img || img['data-loaded-src'] === src) {
        return;
    }
    img['data-loaded-src'] = src;
    const p = 'decode' in img ? img.decode() : Promise.resolve();
    p.catch(()=>{}).then(()=>{
        if (!img.parentElement || !img.isConnected) {
            // Exit early in case of race condition:
            // - onload() is called
            // - decode() is called but incomplete
            // - unmount is called
            // - decode() completes
            return;
        }
        if (placeholder !== 'empty') {
            setBlurComplete(true);
        }
        if (onLoadRef?.current) {
            // Since we don't have the SyntheticEvent here,
            // we must create one with the same shape.
            // See https://reactjs.org/docs/events.html
            const event = new Event('load');
            Object.defineProperty(event, 'target', {
                writable: false,
                value: img
            });
            let prevented = false;
            let stopped = false;
            onLoadRef.current({
                ...event,
                nativeEvent: event,
                currentTarget: img,
                target: img,
                isDefaultPrevented: ()=>prevented,
                isPropagationStopped: ()=>stopped,
                persist: ()=>{},
                preventDefault: ()=>{
                    prevented = true;
                    event.preventDefault();
                },
                stopPropagation: ()=>{
                    stopped = true;
                    event.stopPropagation();
                }
            });
        }
        if (onLoadingCompleteRef?.current) {
            onLoadingCompleteRef.current(img);
        }
        if ("TURBOPACK compile-time truthy", 1) {
            const origSrc = new URL(src, 'http://n').searchParams.get('url') || src;
            if (img.getAttribute('data-nimg') === 'fill') {
                if (!unoptimized && (!sizesInput || sizesInput === '100vw')) {
                    let widthViewportRatio = img.getBoundingClientRect().width / window.innerWidth;
                    if (widthViewportRatio < 0.6) {
                        if (sizesInput === '100vw') {
                            (0, _warnonce.warnOnce)(`Image with src "${origSrc}" has "fill" prop and "sizes" prop of "100vw", but image is not rendered at full viewport width. Please adjust "sizes" to improve page performance. Read more: https://nextjs.org/docs/api-reference/next/image#sizes`);
                        } else {
                            (0, _warnonce.warnOnce)(`Image with src "${origSrc}" has "fill" but is missing "sizes" prop. Please add it to improve page performance. Read more: https://nextjs.org/docs/api-reference/next/image#sizes`);
                        }
                    }
                }
                if (img.parentElement) {
                    const { position } = window.getComputedStyle(img.parentElement);
                    const valid = [
                        'absolute',
                        'fixed',
                        'relative'
                    ];
                    if (!valid.includes(position)) {
                        (0, _warnonce.warnOnce)(`Image with src "${origSrc}" has "fill" and parent element with invalid "position". Provided "${position}" should be one of ${valid.map(String).join(',')}.`);
                    }
                }
                if (img.height === 0) {
                    (0, _warnonce.warnOnce)(`Image with src "${origSrc}" has "fill" and a height value of 0. This is likely because the parent element of the image has not been styled to have a set height.`);
                }
            }
            const heightModified = img.height.toString() !== img.getAttribute('height');
            const widthModified = img.width.toString() !== img.getAttribute('width');
            if (heightModified && !widthModified || !heightModified && widthModified) {
                (0, _warnonce.warnOnce)(`Image with src "${origSrc}" has either width or height modified, but not the other. If you use CSS to change the size of your image, also include the styles 'width: "auto"' or 'height: "auto"' to maintain the aspect ratio.`);
            }
        }
    });
}
function getDynamicProps(fetchPriority) {
    if (Boolean(_react.use)) {
        // In React 19.0.0 or newer, we must use camelCase
        // prop to avoid "Warning: Invalid DOM property".
        // See https://github.com/facebook/react/pull/25927
        return {
            fetchPriority
        };
    }
    // In React 18.2.0 or older, we must use lowercase prop
    // to avoid "Warning: Invalid DOM property".
    return {
        fetchpriority: fetchPriority
    };
}
const ImageElement = /*#__PURE__*/ (0, _react.forwardRef)(({ src, srcSet, sizes, height, width, decoding, className, style, fetchPriority, placeholder, loading, unoptimized, fill, onLoadRef, onLoadingCompleteRef, setBlurComplete, setShowAltText, sizesInput, onLoad, onError, ...rest }, forwardedRef)=>{
    const ownRef = (0, _react.useCallback)((img)=>{
        if (!img) {
            return;
        }
        if (onError) {
            // If the image has an error before react hydrates, then the error is lost.
            // The workaround is to wait until the image is mounted which is after hydration,
            // then we set the src again to trigger the error handler (if there was an error).
            // eslint-disable-next-line no-self-assign
            img.src = img.src;
        }
        if ("TURBOPACK compile-time truthy", 1) {
            if (!src) {
                console.error(`Image is missing required "src" property:`, img);
            }
            if (img.getAttribute('alt') === null) {
                console.error(`Image is missing required "alt" property. Please add Alternative Text to describe the image for screen readers and search engines.`);
            }
        }
        if (img.complete) {
            handleLoading(img, placeholder, onLoadRef, onLoadingCompleteRef, setBlurComplete, unoptimized, sizesInput);
        }
    }, [
        src,
        placeholder,
        onLoadRef,
        onLoadingCompleteRef,
        setBlurComplete,
        onError,
        unoptimized,
        sizesInput
    ]);
    const ref = (0, _usemergedref.useMergedRef)(forwardedRef, ownRef);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)("img", {
        ...rest,
        ...getDynamicProps(fetchPriority),
        // It's intended to keep `loading` before `src` because React updates
        // props in order which causes Safari/Firefox to not lazy load properly.
        // See https://github.com/facebook/react/issues/25883
        loading: loading,
        width: width,
        height: height,
        decoding: decoding,
        "data-nimg": fill ? 'fill' : '1',
        className: className,
        style: style,
        // It's intended to keep `src` the last attribute because React updates
        // attributes in order. If we keep `src` the first one, Safari will
        // immediately start to fetch `src`, before `sizes` and `srcSet` are even
        // updated by React. That causes multiple unnecessary requests if `srcSet`
        // and `sizes` are defined.
        // This bug cannot be reproduced in Chrome or Firefox.
        sizes: sizes,
        srcSet: srcSet,
        src: src,
        ref: ref,
        onLoad: (event)=>{
            const img = event.currentTarget;
            handleLoading(img, placeholder, onLoadRef, onLoadingCompleteRef, setBlurComplete, unoptimized, sizesInput);
        },
        onError: (event)=>{
            // if the real image fails to load, this will ensure "alt" is visible
            setShowAltText(true);
            if (placeholder !== 'empty') {
                // If the real image fails to load, this will still remove the placeholder.
                setBlurComplete(true);
            }
            if (onError) {
                onError(event);
            }
        }
    });
});
function ImagePreload({ isAppRouter, imgAttributes }) {
    const opts = {
        as: 'image',
        imageSrcSet: imgAttributes.srcSet,
        imageSizes: imgAttributes.sizes,
        crossOrigin: imgAttributes.crossOrigin,
        referrerPolicy: imgAttributes.referrerPolicy,
        ...getDynamicProps(imgAttributes.fetchPriority)
    };
    if (isAppRouter && _reactdom.default.preload) {
        _reactdom.default.preload(imgAttributes.src, opts);
        return null;
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_head.default, {
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)("link", {
            rel: "preload",
            // Note how we omit the `href` attribute, as it would only be relevant
            // for browsers that do not support `imagesrcset`, and in those cases
            // it would cause the incorrect image to be preloaded.
            //
            // https://html.spec.whatwg.org/multipage/semantics.html#attr-link-imagesrcset
            href: imgAttributes.srcSet ? undefined : imgAttributes.src,
            ...opts
        }, '__nimg-' + imgAttributes.src + imgAttributes.srcSet + imgAttributes.sizes)
    });
}
const Image = /*#__PURE__*/ (0, _react.forwardRef)((props, forwardedRef)=>{
    const pagesRouter = (0, _react.useContext)(_routercontextsharedruntime.RouterContext);
    // We're in the app directory if there is no pages router.
    const isAppRouter = !pagesRouter;
    const configContext = (0, _react.useContext)(_imageconfigcontextsharedruntime.ImageConfigContext);
    const config = (0, _react.useMemo)(()=>{
        const c = configEnv || configContext || _imageconfig.imageConfigDefault;
        const allSizes = [
            ...c.deviceSizes,
            ...c.imageSizes
        ].sort((a, b)=>a - b);
        const deviceSizes = c.deviceSizes.sort((a, b)=>a - b);
        const qualities = c.qualities?.sort((a, b)=>a - b);
        return {
            ...c,
            allSizes,
            deviceSizes,
            qualities,
            // During the SSR, configEnv (__NEXT_IMAGE_OPTS) does not include
            // security sensitive configs like `localPatterns`, which is needed
            // during the server render to ensure it's validated. Therefore use
            // configContext, which holds the config from the server for validation.
            localPatterns: typeof window === 'undefined' ? configContext?.localPatterns : c.localPatterns
        };
    }, [
        configContext
    ]);
    const { onLoad, onLoadingComplete } = props;
    const onLoadRef = (0, _react.useRef)(onLoad);
    (0, _react.useEffect)(()=>{
        onLoadRef.current = onLoad;
    }, [
        onLoad
    ]);
    const onLoadingCompleteRef = (0, _react.useRef)(onLoadingComplete);
    (0, _react.useEffect)(()=>{
        onLoadingCompleteRef.current = onLoadingComplete;
    }, [
        onLoadingComplete
    ]);
    const [blurComplete, setBlurComplete] = (0, _react.useState)(false);
    const [showAltText, setShowAltText] = (0, _react.useState)(false);
    const { props: imgAttributes, meta: imgMeta } = (0, _getimgprops.getImgProps)(props, {
        defaultLoader: _imageloader.default,
        imgConf: config,
        blurComplete,
        showAltText
    });
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(ImageElement, {
                ...imgAttributes,
                unoptimized: imgMeta.unoptimized,
                placeholder: imgMeta.placeholder,
                fill: imgMeta.fill,
                onLoadRef: onLoadRef,
                onLoadingCompleteRef: onLoadingCompleteRef,
                setBlurComplete: setBlurComplete,
                setShowAltText: setShowAltText,
                sizesInput: props.sizes,
                ref: forwardedRef
            }),
            imgMeta.preload ? /*#__PURE__*/ (0, _jsxruntime.jsx)(ImagePreload, {
                isAppRouter: isAppRouter,
                imgAttributes: imgAttributes
            }) : null
        ]
    });
});
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=image-component.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/next/dist/shared/lib/image-external.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    default: null,
    getImageProps: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    default: function() {
        return _default;
    },
    getImageProps: function() {
        return getImageProps;
    }
});
const _interop_require_default = __turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-client] (ecmascript)");
const _getimgprops = __turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/next/dist/shared/lib/get-img-props.js [app-client] (ecmascript)");
const _imagecomponent = __turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/next/dist/client/image-component.js [app-client] (ecmascript)");
const _imageloader = /*#__PURE__*/ _interop_require_default._(__turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/next/dist/shared/lib/image-loader.js [app-client] (ecmascript)"));
function getImageProps(imgProps) {
    const { props } = (0, _getimgprops.getImgProps)(imgProps, {
        defaultLoader: _imageloader.default,
        // This is replaced by webpack define plugin
        imgConf: ("TURBOPACK compile-time value", {
            "deviceSizes": ("TURBOPACK compile-time value", [
                ("TURBOPACK compile-time value", 640),
                ("TURBOPACK compile-time value", 750),
                ("TURBOPACK compile-time value", 828),
                ("TURBOPACK compile-time value", 1080),
                ("TURBOPACK compile-time value", 1200),
                ("TURBOPACK compile-time value", 1920),
                ("TURBOPACK compile-time value", 2048),
                ("TURBOPACK compile-time value", 3840)
            ]),
            "imageSizes": ("TURBOPACK compile-time value", [
                ("TURBOPACK compile-time value", 32),
                ("TURBOPACK compile-time value", 48),
                ("TURBOPACK compile-time value", 64),
                ("TURBOPACK compile-time value", 96),
                ("TURBOPACK compile-time value", 128),
                ("TURBOPACK compile-time value", 256),
                ("TURBOPACK compile-time value", 384)
            ]),
            "qualities": ("TURBOPACK compile-time value", [
                ("TURBOPACK compile-time value", 75)
            ]),
            "path": ("TURBOPACK compile-time value", "/_next/image"),
            "loader": ("TURBOPACK compile-time value", "default"),
            "dangerouslyAllowSVG": ("TURBOPACK compile-time value", false),
            "unoptimized": ("TURBOPACK compile-time value", true),
            "domains": ("TURBOPACK compile-time value", []),
            "remotePatterns": ("TURBOPACK compile-time value", []),
            "localPatterns": ("TURBOPACK compile-time value", [
                ("TURBOPACK compile-time value", {
                    "pathname": ("TURBOPACK compile-time value", "**"),
                    "search": ("TURBOPACK compile-time value", "")
                })
            ])
        })
    });
    // Normally we don't care about undefined props because we pass to JSX,
    // but this exported function could be used by the end user for anything
    // so we delete undefined props to clean it up a little.
    for (const [key, value] of Object.entries(props)){
        if (value === undefined) {
            delete props[key];
        }
    }
    return {
        props
    };
}
const _default = _imagecomponent.Image; //# sourceMappingURL=image-external.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/next/image.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/Desktop/project/ui-react/node_modules/next/dist/shared/lib/image-external.js [app-client] (ecmascript)");
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Eye
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Eye = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Eye", [
    [
        "path",
        {
            d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
            key: "1nclc0"
        }
    ],
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "3",
            key: "1v7zrd"
        }
    ]
]);
;
 //# sourceMappingURL=eye.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Eye",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript)");
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/eye-off.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>EyeOff
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const EyeOff = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("EyeOff", [
    [
        "path",
        {
            d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
            key: "ct8e1f"
        }
    ],
    [
        "path",
        {
            d: "M14.084 14.158a3 3 0 0 1-4.242-4.242",
            key: "151rxh"
        }
    ],
    [
        "path",
        {
            d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
            key: "13bj9a"
        }
    ],
    [
        "path",
        {
            d: "m2 2 20 20",
            key: "1ooewy"
        }
    ]
]);
;
 //# sourceMappingURL=eye-off.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/eye-off.js [app-client] (ecmascript) <export default as EyeOff>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EyeOff",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/eye-off.js [app-client] (ecmascript)");
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>ArrowLeft
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const ArrowLeft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("ArrowLeft", [
    [
        "path",
        {
            d: "m12 19-7-7 7-7",
            key: "1l729n"
        }
    ],
    [
        "path",
        {
            d: "M19 12H5",
            key: "x3x0zl"
        }
    ]
]);
;
 //# sourceMappingURL=arrow-left.js.map
}),
"[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArrowLeft",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$project$2f$ui$2d$react$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/project/ui-react/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=727c3_53713ccf._.js.map