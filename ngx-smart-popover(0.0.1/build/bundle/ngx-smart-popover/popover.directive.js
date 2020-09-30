"use strict";
/**
 * This is a continuation of ngx-popover
 * @Reference {github} https://github.com/pleerock/ngx-popover
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var popover_content_component_1 = require("./popover-content.component");
var PopoverPlacement = /** @class */ (function () {
    function PopoverPlacement() {
    }
    PopoverPlacement.Bottom = 'bottom';
    PopoverPlacement.BottomLeft = 'bottomLeft';
    PopoverPlacement.BottomRight = 'bottomRight';
    PopoverPlacement.Left = 'left';
    PopoverPlacement.Right = 'right';
    PopoverPlacement.Top = 'top';
    PopoverPlacement.TopLeft = 'topLeft';
    PopoverPlacement.TopRight = 'topRight';
    return PopoverPlacement;
}());
exports.PopoverPlacement = PopoverPlacement;
/**
 * @group Basic Toolkit
 * @component Popover Directive
 *
 * @export
 * @class PopoverDirective
 */
var PopoverDirective = /** @class */ (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function PopoverDirective(viewContainerRef, resolver) {
        this.viewContainerRef = viewContainerRef;
        this.resolver = resolver;
        // -------------------------------------------------------------------------
        // Properties
        // -------------------------------------------------------------------------
        this.popoverContentComponent = popover_content_component_1.PopoverContentComponent;
        this.popoverOnHover = true;
        this.popoverDismissTimeout = 0;
        this.onShown = new core_1.EventEmitter();
        this.onHidden = new core_1.EventEmitter();
    }
    // -------------------------------------------------------------------------
    // Event listeners
    // -------------------------------------------------------------------------
    PopoverDirective.prototype.showOrHideOnClick = 
    // -------------------------------------------------------------------------
    // Event listeners
    // -------------------------------------------------------------------------
    function (evt) {
        evt.stopImmediatePropagation();
        if (this.popoverOnHover) {
            return;
        }
        if (this.popoverDisabled) {
            return;
        }
        this.toggle();
    };
    PopoverDirective.prototype.showOrHideOnTouch = function (evt) {
        evt.stopImmediatePropagation();
        if (!this.popoverOnHover) {
            return;
        }
        if (this.popoverDisabled) {
            return;
        }
        this.toggle();
    };
    PopoverDirective.prototype.showOnHover = function () {
        if (!this.popoverOnHover) {
            return;
        }
        if (this.popoverDisabled) {
            return;
        }
        this.show();
    };
    PopoverDirective.prototype.hideOnHover = function () {
        if (this.popoverCloseOnMouseOutside) {
            return; // don't do anything since we do not control this
        }
        if (!this.popoverOnHover) {
            return;
        }
        if (this.popoverDisabled) {
            return;
        }
        this.hide();
    };
    PopoverDirective.prototype.ngOnChanges = function (changes) {
        if (changes['popoverDisabled']) {
            if (changes['popoverDisabled'].currentValue) {
                this.hide();
            }
        }
    };
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    PopoverDirective.prototype.toggle = 
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    function () {
        if (!this.visible) {
            this.show();
        }
        else {
            this.hide();
        }
    };
    PopoverDirective.prototype.show = function () {
        var _this = this;
        if (this.visible) {
            return;
        }
        this.visible = true;
        if (typeof this.content === 'string') {
            var factory = this.resolver.resolveComponentFactory(this.popoverContentComponent);
            if (!this.visible) {
                return;
            }
            this.popover = this.viewContainerRef.createComponent(factory);
            var popover = this.popover.instance;
            popover.popover = this;
            popover.content = this.content;
            if (this.popoverPlacement !== undefined) {
                popover.placement = this.popoverPlacement;
            }
            if (this.popoverAnimation !== undefined) {
                popover.animation = this.popoverAnimation;
            }
            if (this.popoverTitle !== undefined) {
                popover.title = this.popoverTitle;
            }
            if (this.popoverCloseOnClickOutside !== undefined) {
                popover.closeOnClickOutside = this.popoverCloseOnClickOutside;
            }
            if (this.popoverCloseOnMouseOutside !== undefined) {
                popover.closeOnMouseOutside = this.popoverCloseOnMouseOutside;
            }
            popover.onCloseFromOutside.subscribe(function () { return _this.hide(); });
            // if dismissTimeout option is set, then this popover will be dismissed in dismissTimeout time
            if (this.popoverDismissTimeout > 0) {
                setTimeout(function () { return _this.hide(); }, this.popoverDismissTimeout);
            }
        }
        else {
            var popover = this.content;
            popover.popover = this;
            if (this.popoverPlacement !== undefined) {
                popover.placement = this.popoverPlacement;
            }
            if (this.popoverAnimation !== undefined) {
                popover.animation = this.popoverAnimation;
            }
            if (this.popoverTitle !== undefined) {
                popover.title = this.popoverTitle;
            }
            if (this.popoverCloseOnClickOutside !== undefined) {
                popover.closeOnClickOutside = this.popoverCloseOnClickOutside;
            }
            if (this.popoverCloseOnMouseOutside !== undefined) {
                popover.closeOnMouseOutside = this.popoverCloseOnMouseOutside;
            }
            popover.onCloseFromOutside.subscribe(function () { return _this.hide(); });
            // if dismissTimeout option is set, then this popover will be dismissed in dismissTimeout time
            if (this.popoverDismissTimeout > 0) {
                setTimeout(function () { return _this.hide(); }, this.popoverDismissTimeout);
            }
            popover.show();
        }
        this.onShown.emit(this);
    };
    PopoverDirective.prototype.hide = function () {
        if (!this.visible) {
            return;
        }
        this.visible = false;
        if (this.popover) {
            this.popover.destroy();
        }
        if (this.content instanceof popover_content_component_1.PopoverContentComponent) {
            this.content.hideFromPopover();
        }
        this.onHidden.emit(this);
    };
    PopoverDirective.prototype.getElement = function () {
        return this.viewContainerRef.element.nativeElement;
    };
    PopoverDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[popover]',
                    exportAs: 'popover'
                },] },
    ];
    /** @nocollapse */
    PopoverDirective.ctorParameters = function () { return [
        { type: core_1.ViewContainerRef, },
        { type: core_1.ComponentFactoryResolver, },
    ]; };
    PopoverDirective.propDecorators = {
        "content": [{ type: core_1.Input, args: ['popover',] },],
        "popoverDisabled": [{ type: core_1.Input },],
        "popoverAnimation": [{ type: core_1.Input },],
        "popoverPlacement": [{ type: core_1.Input },],
        "popoverTitle": [{ type: core_1.Input },],
        "popoverOnHover": [{ type: core_1.Input },],
        "popoverCloseOnClickOutside": [{ type: core_1.Input },],
        "popoverCloseOnMouseOutside": [{ type: core_1.Input },],
        "popoverDismissTimeout": [{ type: core_1.Input },],
        "onShown": [{ type: core_1.Output },],
        "onHidden": [{ type: core_1.Output },],
        "showOrHideOnClick": [{ type: core_1.HostListener, args: ['click', ['$event'],] },],
        "showOrHideOnTouch": [{ type: core_1.HostListener, args: ['touchend', ['$event'],] },],
        "showOnHover": [{ type: core_1.HostListener, args: ['focusin',] }, { type: core_1.HostListener, args: ['mouseenter',] },],
        "hideOnHover": [{ type: core_1.HostListener, args: ['focusout',] }, { type: core_1.HostListener, args: ['mouseleave',] },],
    };
    return PopoverDirective;
}());
exports.PopoverDirective = PopoverDirective;
//# sourceMappingURL=popover.directive.js.map