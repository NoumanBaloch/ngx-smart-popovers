"use strict";
/**
 * This is a continuation of ngx-popover
 * @Reference {github} https://github.com/pleerock/ngx-popover
 */
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var popover_directive_1 = require("./popover.directive");
var PopoverContentComponent = /** @class */ (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function PopoverContentComponent(element, cdr, renderer) {
        var _this = this;
        this.element = element;
        this.cdr = cdr;
        this.renderer = renderer;
        this.placement = popover_directive_1.PopoverPlacement.Top;
        this.animation = true;
        this.closeOnClickOutside = false;
        this.closeOnMouseOutside = false;
        this.size = 'small';
        this.onCloseFromOutside = new core_1.EventEmitter();
        this.top = -10000;
        this.left = -10000;
        this.isIn = false;
        this.displayType = 'none';
        this.opacity = 0;
        this.transitionEnabled = false;
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        // -------------------------------------------------------------------------
        // Anonymous
        // -------------------------------------------------------------------------
        /**
             * Closes dropdown if user clicks outside of this directive.
             */
        this.onDocumentMouseDown = function (event) {
            var element = _this.element.nativeElement;
            if (!element || !_this.popover) {
                return;
            }
            if (element.contains(event.target) || _this.popover.getElement().contains(event.target)) {
                return;
            }
            _this.onCloseFromOutside.emit(undefined);
        };
    }
    // -------------------------------------------------------------------------
    // Lifecycle callbacks
    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------
    // Lifecycle callbacks
    // -------------------------------------------------------------------------
    PopoverContentComponent.prototype.ngAfterViewInit = 
    // -------------------------------------------------------------------------
    // Lifecycle callbacks
    // -------------------------------------------------------------------------
    function () {
        var _this = this;
        if (this.closeOnClickOutside) {
            this.listenClickFunc = this.renderer.listen('document', 'mousedown', function (event) { return _this.onDocumentMouseDown(event); });
        }
        if (this.closeOnMouseOutside) {
            this.listenMouseFunc = this.renderer.listen('document', 'mouseover', function (event) { return _this.onDocumentMouseDown(event); });
        }
        // Always close on mobile touch event outside.
        this.listenTouchFunc = this.renderer.listen('document', 'touchstart', function (event) { return _this.onDocumentMouseDown(event); });
        this.show();
        this.cdr.detectChanges();
        window.addEventListener('resize', function () {
            _this.windowWidth = window.innerWidth;
            _this.windowHeight = window.innerHeight;
            _this.updatePosition();
        });
        window.addEventListener('scroll', function () {
            if (!!_this.opacity) {
                _this.updatePosition();
            }
        });
    };
    PopoverContentComponent.prototype.ngOnDestroy = function () {
        if (this.closeOnClickOutside) {
            this.listenClickFunc();
        }
        if (this.closeOnMouseOutside) {
            this.listenMouseFunc();
        }
        this.listenTouchFunc();
    };
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    PopoverContentComponent.prototype.updatePosition = 
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    function () {
        // if visible, reposition
        if (this.opacity) {
            var p = this.positionElements(this.popover.getElement(), this.popoverDiv.nativeElement, this.placement);
            this.top = p.top;
            this.left = p.left;
        }
    };
    PopoverContentComponent.prototype.show = function () {
        if (!this.popover || !this.popover.getElement()) {
            return;
        }
        var p = this.positionElements(this.popover.getElement(), this.popoverDiv.nativeElement, this.placement);
        this.displayType = 'block';
        this.top = p.top;
        this.left = p.left;
        this.isIn = true;
        this.transitionEnabled = true;
        this.opacity = 1;
    };
    PopoverContentComponent.prototype.hide = function () {
        this.top = -10000;
        this.left = -10000;
        this.isIn = true;
        this.popover.hide();
    };
    PopoverContentComponent.prototype.hideFromPopover = function () {
        this.top = -10000;
        this.left = -10000;
        this.isIn = true;
        this.transitionEnabled = false;
        this.opacity = 0;
    };
    // -------------------------------------------------------------------------
    // Protected Methods
    // -------------------------------------------------------------------------
    // -------------------------------------------------------------------------
    // Protected Methods
    // -------------------------------------------------------------------------
    PopoverContentComponent.prototype.positionElements = 
    // -------------------------------------------------------------------------
    // Protected Methods
    // -------------------------------------------------------------------------
    function (hostEl, targetEl, positionStr, appendToBody) {
        if (appendToBody === void 0) { appendToBody = false; }
        var positionStrParts = positionStr.split('-');
        var pos0 = positionStrParts[0];
        var pos1 = positionStrParts[1] || 'center';
        var hostElPos = appendToBody ? this.offset(hostEl) : this.position(hostEl);
        var targetElWidth = targetEl.offsetWidth;
        var targetElHeight = targetEl.offsetHeight;
        this.effectivePlacement = pos0 = this.getEffectivePlacement(pos0, hostEl, targetEl);
        var shiftWidth = {
            center: function () {
                return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
            },
            left: function () {
                return hostElPos.left;
            },
            right: function () {
                return hostElPos.left + hostElPos.width;
            },
            topOrBottomRight: function () {
                return hostElPos.left + hostElPos.width / 2;
            },
            topOrBottomLeft: function () {
                return hostElPos.left - targetElWidth + hostElPos.width / 2;
            }
        };
        var shiftHeight = {
            center: function () {
                return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;
            },
            top: function () {
                return hostElPos.top;
            },
            bottom: function () {
                return hostElPos.top + hostElPos.height;
            }
        };
        var targetElPos;
        switch (pos0) {
            case popover_directive_1.PopoverPlacement.Right:
                targetElPos = {
                    top: shiftHeight[pos1](),
                    left: shiftWidth[pos0]()
                };
                break;
            case popover_directive_1.PopoverPlacement.Left:
                targetElPos = {
                    top: shiftHeight[pos1](),
                    left: hostElPos.left - targetElWidth
                };
                break;
            case popover_directive_1.PopoverPlacement.Bottom:
                targetElPos = {
                    top: shiftHeight[pos0](),
                    left: shiftWidth[pos1]()
                };
                break;
            case popover_directive_1.PopoverPlacement.TopLeft:
                targetElPos = {
                    top: hostElPos.top - targetElHeight,
                    left: shiftWidth['topOrBottomLeft']()
                };
                break;
            case popover_directive_1.PopoverPlacement.TopRight:
                targetElPos = {
                    top: hostElPos.top - targetElHeight,
                    left: shiftWidth['topOrBottomRight']()
                };
                break;
            case popover_directive_1.PopoverPlacement.BottomLeft:
                targetElPos = {
                    top: shiftHeight[popover_directive_1.PopoverPlacement.Bottom](),
                    left: shiftWidth['topOrBottomLeft']()
                };
                break;
            case popover_directive_1.PopoverPlacement.BottomRight:
                targetElPos = {
                    top: shiftHeight[popover_directive_1.PopoverPlacement.Bottom](),
                    left: shiftWidth['topOrBottomRight']()
                };
                break;
            default:
                targetElPos = {
                    top: hostElPos.top - targetElHeight,
                    left: shiftWidth[pos1]()
                };
                break;
        }
        return targetElPos;
    };
    PopoverContentComponent.prototype.position = function (nativeEl) {
        var offsetParentBCR = { top: 0, left: 0 };
        var elBCR = this.offset(nativeEl);
        var offsetParentEl = this.parentOffsetEl(nativeEl);
        if (offsetParentEl !== window.document) {
            offsetParentBCR = this.offset(offsetParentEl);
            offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
            offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
        }
        var boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: elBCR.top - offsetParentBCR.top,
            left: elBCR.left - offsetParentBCR.left
        };
    };
    PopoverContentComponent.prototype.offset = function (nativeEl) {
        var boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: boundingClientRect.top + (window.pageYOffset || window.document.documentElement.scrollTop),
            left: boundingClientRect.left + (window.pageXOffset || window.document.documentElement.scrollLeft)
        };
    };
    PopoverContentComponent.prototype.getStyle = function (nativeEl, cssProp) {
        if (nativeEl.currentStyle) { // IE
            // IE
            return nativeEl.currentStyle[cssProp];
        }
        if (window.getComputedStyle) {
            return window.getComputedStyle(nativeEl)[cssProp];
        }
        // finally try and get inline style
        return nativeEl.style[cssProp];
    };
    PopoverContentComponent.prototype.isStaticPositioned = function (nativeEl) {
        return (this.getStyle(nativeEl, 'position') || 'static') === 'static';
    };
    PopoverContentComponent.prototype.parentOffsetEl = function (nativeEl) {
        var offsetParent = nativeEl.offsetParent || window.document;
        while (offsetParent && offsetParent !== window.document && this.isStaticPositioned(offsetParent)) {
            offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || window.document;
    };
    // Check for overflow of the viewport and reflect the position if necessary.
    // Check for overflow of the viewport and reflect the position if necessary.
    PopoverContentComponent.prototype.getEffectivePlacement = 
    // Check for overflow of the viewport and reflect the position if necessary.
    function (placement, hostElement, targetElement) {
        var hostElBoundingRect = hostElement.getBoundingClientRect();
        var desiredPlacement = placement || popover_directive_1.PopoverPlacement.Top;
        // Figure out where the overflows are (if any).
        var isTopOverflow = hostElBoundingRect.top - targetElement.offsetHeight < 0;
        var isRightOverflow = hostElBoundingRect.right + targetElement.offsetWidth / 2 > this.windowWidth;
        var isLeftOverflow = hostElBoundingRect.left - targetElement.offsetWidth / 2 < 0;
        var isBottomOverflow = hostElBoundingRect.bottom + targetElement.offsetHeight > this.windowHeight;
        // Reflect appropriately if overflow.
        if (desiredPlacement === popover_directive_1.PopoverPlacement.Top) {
            if (isTopOverflow) {
                return popover_directive_1.PopoverPlacement.Bottom;
            }
            else if (isRightOverflow) {
                return popover_directive_1.PopoverPlacement.TopLeft;
            }
            else if (isLeftOverflow) {
                return popover_directive_1.PopoverPlacement.TopRight;
            }
        }
        if (desiredPlacement === popover_directive_1.PopoverPlacement.Bottom) {
            if (isBottomOverflow) {
                return popover_directive_1.PopoverPlacement.Top;
            }
            else if (isRightOverflow) {
                return popover_directive_1.PopoverPlacement.BottomLeft;
            }
            else if (isLeftOverflow) {
                return popover_directive_1.PopoverPlacement.BottomRight;
            }
        }
        if (desiredPlacement === popover_directive_1.PopoverPlacement.Left) {
            if (isLeftOverflow) {
                return popover_directive_1.PopoverPlacement.Right;
            }
            else if (isTopOverflow) {
                return popover_directive_1.PopoverPlacement.BottomLeft;
            }
            else if (isBottomOverflow) {
                return popover_directive_1.PopoverPlacement.TopLeft;
            }
        }
        if (desiredPlacement === popover_directive_1.PopoverPlacement.Right) {
            if (isRightOverflow) {
                return popover_directive_1.PopoverPlacement.Left;
            }
            else if (isTopOverflow) {
                return popover_directive_1.PopoverPlacement.BottomRight;
            }
            else if (isBottomOverflow) {
                return popover_directive_1.PopoverPlacement.TopRight;
            }
        }
        if (desiredPlacement === popover_directive_1.PopoverPlacement.TopRight) {
            if (isTopOverflow && isRightOverflow) {
                return popover_directive_1.PopoverPlacement.BottomLeft;
            }
            else if (isTopOverflow) {
                return popover_directive_1.PopoverPlacement.BottomRight;
            }
            else if (isRightOverflow) {
                return popover_directive_1.PopoverPlacement.TopLeft;
            }
        }
        if (desiredPlacement === popover_directive_1.PopoverPlacement.TopLeft) {
            if (isTopOverflow && isLeftOverflow) {
                return popover_directive_1.PopoverPlacement.BottomRight;
            }
            else if (isTopOverflow) {
                return popover_directive_1.PopoverPlacement.BottomLeft;
            }
            else if (isLeftOverflow) {
                return popover_directive_1.PopoverPlacement.TopRight;
            }
        }
        if (desiredPlacement === popover_directive_1.PopoverPlacement.BottomRight) {
            if (isBottomOverflow && isRightOverflow) {
                return popover_directive_1.PopoverPlacement.TopLeft;
            }
            else if (isBottomOverflow) {
                return popover_directive_1.PopoverPlacement.TopRight;
            }
            else if (isRightOverflow) {
                return popover_directive_1.PopoverPlacement.BottomLeft;
            }
        }
        if (desiredPlacement === popover_directive_1.PopoverPlacement.BottomLeft) {
            if (isBottomOverflow && isLeftOverflow) {
                return popover_directive_1.PopoverPlacement.TopRight;
            }
            else if (isBottomOverflow) {
                return popover_directive_1.PopoverPlacement.TopLeft;
            }
            else if (isLeftOverflow) {
                return popover_directive_1.PopoverPlacement.BottomRight;
            }
        }
        return desiredPlacement;
    };
    PopoverContentComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'popover-content',
                    template: "\n    <div #popoverDiv\n        class=\"bs-popover-{{this.effectivePlacement}} lsq-popover-content popover\"\n        [ngClass]=\"{\n            'sm': 'small',\n            'md-sm': 'medium-small',\n            'md': 'medium',\n            'lg': 'large'\n        }\"\n        [style.top.px]=\"top\"\n        [style.left.px]=\"left\"\n        [style.transition]=\"(transitionEnabled ? '0.15s opacity' : '')\"\n        [style.opacity]=\"opacity\"\n        [style.display]=\"'block'\"\n        [class.in]=\"isIn\"\n        role=\"popover\">\n            <div [hidden]=\"!closeOnMouseOutside\" class=\"virtual-area\"></div>\n            <div class=\"arrow\"></div> \n            <div class=\"popover-header\" [hidden]=\"!title\">{{ title }}</div>\n            <div class=\"popover-body\">\n                <ng-content></ng-content>\n                {{ content }}\n            </div> \n    </div>\n",
                    styles: [".popover .virtual-area { height: 11px; width: 100%; position: absolute; } .popover.bs-popover-top .virtual-area { bottom: -11px; } .popover.bs-popover-bottom .virtual-area { top: -11px; } .popover.bs-popover-left .virtual-area { right: -11px; } .popover.bs-popover-right .virtual-area { left: -11px; } .popover { background-color: #757575; box-shadow: 0 0.2rem 0.4rem 0 rgba(0, 0, 0, 0.15); border: none; padding: 1.2rem; font-family: Helvetica, Arial, sans-serif; z-index: 1060; max-width: none; } .popover.sm { width: 20rem; } .popover.md-sm { width: 26rem; } .popover.md { width: 34rem; } .popover.lg { width: 40rem; } .popover .popover-header { color: white; font-size: 1.6rem; font-weight: bold; line-height: 2.1rem; } .popover .popover-body { color: white; font-size: 1rem; line-height: 1.3rem; } .popover.bs-popover-left { margin-left: -15px; } .popover.bs-popover-left .arrow::before, .popover.bs-popover-left .arrow::after { border-left-color: #757575; } .popover.bs-popover-right { margin-left: 15px; } .popover.bs-popover-right .arrow::before, .popover.bs-popover-right .arrow::after { border-right-color: #757575; } .popover.bs-popover-top, .popover.bs-popover-topRight, .popover.bs-popover-topLeft { margin-top: -15px; } .popover.bs-popover-bottom, .popover.bs-popover-bottomRight, .popover.bs-popover-bottomLeft { margin-top: 15px; } .popover.bs-popover-right .arrow, .popover.bs-popover-left .arrow { top: 50%; transform: translateY(-50%); } .popover.bs-popover-top .arrow, .popover.bs-popover-bottom .arrow { left: 50%; transform: translateX(-50%); } .popover.bs-popover-topRight, .popover.bs-popover-topLeft, .popover.bs-popover-top { margin-bottom: 10px; } .popover.bs-popover-topRight .arrow, .popover.bs-popover-topLeft .arrow, .popover.bs-popover-top .arrow { bottom: 0; } .popover.bs-popover-topRight .arrow::before, .popover.bs-popover-topRight .arrow::after, .popover.bs-popover-topLeft .arrow::before, .popover.bs-popover-topLeft .arrow::after, .popover.bs-popover-top .arrow::before, .popover.bs-popover-top .arrow::after { border-bottom-width: 0; } .popover.bs-popover-topRight .arrow::before, .popover.bs-popover-topLeft .arrow::before, .popover.bs-popover-top .arrow::before { bottom: -11px; margin-left: -6px; border-top-color: #757575; } .popover.bs-popover-topRight .arrow::after, .popover.bs-popover-topLeft .arrow::after, .popover.bs-popover-top .arrow::after { bottom: -10px; margin-left: -6px; border-top-color: #757575; } .popover.bs-popover-bottomRight, .popover.bs-popover-bottomLeft, .popover.bs-popover-bottom { margin-top: 10px; } .popover.bs-popover-bottomRight .arrow, .popover.bs-popover-bottomLeft .arrow, .popover.bs-popover-bottom .arrow { top: 0; } .popover.bs-popover-bottomRight .arrow::before, .popover.bs-popover-bottomRight .arrow::after, .popover.bs-popover-bottomLeft .arrow::before, .popover.bs-popover-bottomLeft .arrow::after, .popover.bs-popover-bottom .arrow::before, .popover.bs-popover-bottom .arrow::after { margin-left: -7px; border-top-width: 0; } .popover.bs-popover-bottomRight .arrow::before, .popover.bs-popover-bottomLeft .arrow::before, .popover.bs-popover-bottom .arrow::before { top: -11px; border-bottom-color: #757575; } .popover.bs-popover-bottomRight .arrow::after, .popover.bs-popover-bottomLeft .arrow::after, .popover.bs-popover-bottom .arrow::after { top: -10px; border-bottom-color: #757575; } .popover.bs-popover-bottomRight .popover-header::before, .popover.bs-popover-bottomLeft .popover-header::before, .popover.bs-popover-bottom .popover-header::before { position: absolute; top: 0; left: 50%; display: block; width: 2rem; margin-left: -1rem; content: \"\"; border-bottom: 0.1rem solid #6d6d6d; } .popover.bs-popover-topRight, .popover.bs-popover-bottomRight { transform: translateX(-2rem); } .popover.bs-popover-topRight .arrow, .popover.bs-popover-bottomRight .arrow { left: 1.5rem; } .popover.bs-popover-topLeft, .popover.bs-popover-bottomLeft { transform: translateX(2rem); } .popover.bs-popover-topLeft .arrow, .popover.bs-popover-bottomLeft .arrow { right: 1.5rem; } "]
                },] },
    ];
    /** @nocollapse */
    PopoverContentComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_1.ChangeDetectorRef, },
        { type: core_1.Renderer2, },
    ]; };
    PopoverContentComponent.propDecorators = {
        "content": [{ type: core_1.Input },],
        "placement": [{ type: core_1.Input },],
        "title": [{ type: core_1.Input },],
        "parentClass": [{ type: core_1.Input },],
        "animation": [{ type: core_1.Input },],
        "closeOnClickOutside": [{ type: core_1.Input },],
        "closeOnMouseOutside": [{ type: core_1.Input },],
        "size": [{ type: core_1.Input },],
        "popoverDiv": [{ type: core_1.ViewChild, args: ['popoverDiv',] },],
    };
    return PopoverContentComponent;
}());
exports.PopoverContentComponent = PopoverContentComponent;
//# sourceMappingURL=popover-content.component.js.map