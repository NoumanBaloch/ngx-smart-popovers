"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var popover_directive_1 = require("./popover.directive");
var popover_content_component_1 = require("./popover-content.component");
var core_1 = require("@angular/core");
__export(require("./popover.directive"));
__export(require("./popover-content.component"));
var PopoverModule = /** @class */ (function () {
    function PopoverModule() {
    }
    PopoverModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule
                    ],
                    declarations: [
                        popover_content_component_1.PopoverContentComponent,
                        popover_directive_1.PopoverDirective,
                    ],
                    exports: [
                        popover_content_component_1.PopoverContentComponent,
                        popover_directive_1.PopoverDirective,
                    ],
                    entryComponents: [
                        popover_content_component_1.PopoverContentComponent
                    ]
                },] },
    ];
    return PopoverModule;
}());
exports.PopoverModule = PopoverModule;
//# sourceMappingURL=index.js.map