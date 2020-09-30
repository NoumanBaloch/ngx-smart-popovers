var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * This is a continuation of ngx-popover
 * @Reference {github} https://github.com/pleerock/ngx-popover
 */
define("ngx-smart-popover/popover-content.component", ["require", "exports", "@angular/core", "ngx-smart-popover/popover.directive"], function (require, exports, core_1, popover_directive_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
        PopoverContentComponent.prototype.ngAfterViewInit = function () {
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
        PopoverContentComponent.prototype.updatePosition = function () {
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
        PopoverContentComponent.prototype.positionElements = function (hostEl, targetEl, positionStr, appendToBody) {
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
        PopoverContentComponent.prototype.getEffectivePlacement = function (placement, hostElement, targetElement) {
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
        __decorate([
            core_1.Input(),
            __metadata("design:type", String)
        ], PopoverContentComponent.prototype, "content", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", popover_directive_1.PopoverPlacement)
        ], PopoverContentComponent.prototype, "placement", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", String)
        ], PopoverContentComponent.prototype, "title", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", String)
        ], PopoverContentComponent.prototype, "parentClass", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", Object)
        ], PopoverContentComponent.prototype, "animation", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", Object)
        ], PopoverContentComponent.prototype, "closeOnClickOutside", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", Object)
        ], PopoverContentComponent.prototype, "closeOnMouseOutside", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", String)
        ], PopoverContentComponent.prototype, "size", void 0);
        __decorate([
            core_1.ViewChild('popoverDiv'),
            __metadata("design:type", core_1.ElementRef)
        ], PopoverContentComponent.prototype, "popoverDiv", void 0);
        PopoverContentComponent = __decorate([
            core_1.Component({
                selector: 'popover-content',
                template: "\n    <div #popoverDiv\n        class=\"bs-popover-{{this.effectivePlacement}} lsq-popover-content popover\"\n        [ngClass]=\"{\n            'sm': 'small',\n            'md-sm': 'medium-small',\n            'md': 'medium',\n            'lg': 'large'\n        }\"\n        [style.top.px]=\"top\"\n        [style.left.px]=\"left\"\n        [style.transition]=\"(transitionEnabled ? '0.15s opacity' : '')\"\n        [style.opacity]=\"opacity\"\n        [style.display]=\"'block'\"\n        [class.in]=\"isIn\"\n        role=\"popover\">\n            <div [hidden]=\"!closeOnMouseOutside\" class=\"virtual-area\"></div>\n            <div class=\"arrow\"></div> \n            <div class=\"popover-header\" [hidden]=\"!title\">{{ title }}</div>\n            <div class=\"popover-body\">\n                <ng-content></ng-content>\n                {{ content }}\n            </div> \n    </div>\n",
                styles: [".popover .virtual-area { height: 11px; width: 100%; position: absolute; } .popover.bs-popover-top .virtual-area { bottom: -11px; } .popover.bs-popover-bottom .virtual-area { top: -11px; } .popover.bs-popover-left .virtual-area { right: -11px; } .popover.bs-popover-right .virtual-area { left: -11px; } .popover { background-color: #757575; box-shadow: 0 0.2rem 0.4rem 0 rgba(0, 0, 0, 0.15); border: none; padding: 1.2rem; font-family: Helvetica, Arial, sans-serif; z-index: 1060; max-width: none; } .popover.sm { width: 20rem; } .popover.md-sm { width: 26rem; } .popover.md { width: 34rem; } .popover.lg { width: 40rem; } .popover .popover-header { color: white; font-size: 1.6rem; font-weight: bold; line-height: 2.1rem; } .popover .popover-body { color: white; font-size: 1rem; line-height: 1.3rem; } .popover.bs-popover-left { margin-left: -15px; } .popover.bs-popover-left .arrow::before, .popover.bs-popover-left .arrow::after { border-left-color: #757575; } .popover.bs-popover-right { margin-left: 15px; } .popover.bs-popover-right .arrow::before, .popover.bs-popover-right .arrow::after { border-right-color: #757575; } .popover.bs-popover-top, .popover.bs-popover-topRight, .popover.bs-popover-topLeft { margin-top: -15px; } .popover.bs-popover-bottom, .popover.bs-popover-bottomRight, .popover.bs-popover-bottomLeft { margin-top: 15px; } .popover.bs-popover-right .arrow, .popover.bs-popover-left .arrow { top: 50%; transform: translateY(-50%); } .popover.bs-popover-top .arrow, .popover.bs-popover-bottom .arrow { left: 50%; transform: translateX(-50%); } .popover.bs-popover-topRight, .popover.bs-popover-topLeft, .popover.bs-popover-top { margin-bottom: 10px; } .popover.bs-popover-topRight .arrow, .popover.bs-popover-topLeft .arrow, .popover.bs-popover-top .arrow { bottom: 0; } .popover.bs-popover-topRight .arrow::before, .popover.bs-popover-topRight .arrow::after, .popover.bs-popover-topLeft .arrow::before, .popover.bs-popover-topLeft .arrow::after, .popover.bs-popover-top .arrow::before, .popover.bs-popover-top .arrow::after { border-bottom-width: 0; } .popover.bs-popover-topRight .arrow::before, .popover.bs-popover-topLeft .arrow::before, .popover.bs-popover-top .arrow::before { bottom: -11px; margin-left: -6px; border-top-color: #757575; } .popover.bs-popover-topRight .arrow::after, .popover.bs-popover-topLeft .arrow::after, .popover.bs-popover-top .arrow::after { bottom: -10px; margin-left: -6px; border-top-color: #757575; } .popover.bs-popover-bottomRight, .popover.bs-popover-bottomLeft, .popover.bs-popover-bottom { margin-top: 10px; } .popover.bs-popover-bottomRight .arrow, .popover.bs-popover-bottomLeft .arrow, .popover.bs-popover-bottom .arrow { top: 0; } .popover.bs-popover-bottomRight .arrow::before, .popover.bs-popover-bottomRight .arrow::after, .popover.bs-popover-bottomLeft .arrow::before, .popover.bs-popover-bottomLeft .arrow::after, .popover.bs-popover-bottom .arrow::before, .popover.bs-popover-bottom .arrow::after { margin-left: -7px; border-top-width: 0; } .popover.bs-popover-bottomRight .arrow::before, .popover.bs-popover-bottomLeft .arrow::before, .popover.bs-popover-bottom .arrow::before { top: -11px; border-bottom-color: #757575; } .popover.bs-popover-bottomRight .arrow::after, .popover.bs-popover-bottomLeft .arrow::after, .popover.bs-popover-bottom .arrow::after { top: -10px; border-bottom-color: #757575; } .popover.bs-popover-bottomRight .popover-header::before, .popover.bs-popover-bottomLeft .popover-header::before, .popover.bs-popover-bottom .popover-header::before { position: absolute; top: 0; left: 50%; display: block; width: 2rem; margin-left: -1rem; content: \"\"; border-bottom: 0.1rem solid #6d6d6d; } .popover.bs-popover-topRight, .popover.bs-popover-bottomRight { transform: translateX(-2rem); } .popover.bs-popover-topRight .arrow, .popover.bs-popover-bottomRight .arrow { left: 1.5rem; } .popover.bs-popover-topLeft, .popover.bs-popover-bottomLeft { transform: translateX(2rem); } .popover.bs-popover-topLeft .arrow, .popover.bs-popover-bottomLeft .arrow { right: 1.5rem; } "]
            }),
            __metadata("design:paramtypes", [core_1.ElementRef,
                core_1.ChangeDetectorRef,
                core_1.Renderer2])
        ], PopoverContentComponent);
        return PopoverContentComponent;
    }());
    exports.PopoverContentComponent = PopoverContentComponent;
});
/**
 * This is a continuation of ngx-popover
 * @Reference {github} https://github.com/pleerock/ngx-popover
 */
define("ngx-smart-popover/popover.directive", ["require", "exports", "@angular/core", "ngx-smart-popover/popover-content.component"], function (require, exports, core_2, popover_content_component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
            this.onShown = new core_2.EventEmitter();
            this.onHidden = new core_2.EventEmitter();
        }
        // -------------------------------------------------------------------------
        // Event listeners
        // -------------------------------------------------------------------------
        PopoverDirective.prototype.showOrHideOnClick = function (evt) {
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
        PopoverDirective.prototype.toggle = function () {
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
        __decorate([
            core_2.Input('popover'),
            __metadata("design:type", Object)
        ], PopoverDirective.prototype, "content", void 0);
        __decorate([
            core_2.Input(),
            __metadata("design:type", Boolean)
        ], PopoverDirective.prototype, "popoverDisabled", void 0);
        __decorate([
            core_2.Input(),
            __metadata("design:type", Boolean)
        ], PopoverDirective.prototype, "popoverAnimation", void 0);
        __decorate([
            core_2.Input(),
            __metadata("design:type", PopoverPlacement)
        ], PopoverDirective.prototype, "popoverPlacement", void 0);
        __decorate([
            core_2.Input(),
            __metadata("design:type", String)
        ], PopoverDirective.prototype, "popoverTitle", void 0);
        __decorate([
            core_2.Input(),
            __metadata("design:type", Object)
        ], PopoverDirective.prototype, "popoverOnHover", void 0);
        __decorate([
            core_2.Input(),
            __metadata("design:type", Boolean)
        ], PopoverDirective.prototype, "popoverCloseOnClickOutside", void 0);
        __decorate([
            core_2.Input(),
            __metadata("design:type", Boolean)
        ], PopoverDirective.prototype, "popoverCloseOnMouseOutside", void 0);
        __decorate([
            core_2.Input(),
            __metadata("design:type", Object)
        ], PopoverDirective.prototype, "popoverDismissTimeout", void 0);
        __decorate([
            core_2.Output(),
            __metadata("design:type", Object)
        ], PopoverDirective.prototype, "onShown", void 0);
        __decorate([
            core_2.Output(),
            __metadata("design:type", Object)
        ], PopoverDirective.prototype, "onHidden", void 0);
        __decorate([
            core_2.HostListener('click', ['$event']),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Event]),
            __metadata("design:returntype", void 0)
        ], PopoverDirective.prototype, "showOrHideOnClick", null);
        __decorate([
            core_2.HostListener('touchend', ['$event']),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [Event]),
            __metadata("design:returntype", void 0)
        ], PopoverDirective.prototype, "showOrHideOnTouch", null);
        __decorate([
            core_2.HostListener('focusin'),
            core_2.HostListener('mouseenter'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], PopoverDirective.prototype, "showOnHover", null);
        __decorate([
            core_2.HostListener('focusout'),
            core_2.HostListener('mouseleave'),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", []),
            __metadata("design:returntype", void 0)
        ], PopoverDirective.prototype, "hideOnHover", null);
        PopoverDirective = __decorate([
            core_2.Directive({
                selector: '[popover]',
                exportAs: 'popover'
            }),
            __metadata("design:paramtypes", [core_2.ViewContainerRef,
                core_2.ComponentFactoryResolver])
        ], PopoverDirective);
        return PopoverDirective;
    }());
    exports.PopoverDirective = PopoverDirective;
});
define("ngx-smart-popover/index", ["require", "exports", "@angular/common", "ngx-smart-popover/popover.directive", "ngx-smart-popover/popover-content.component", "@angular/core", "ngx-smart-popover/popover.directive", "ngx-smart-popover/popover-content.component"], function (require, exports, common_1, popover_directive_2, popover_content_component_2, core_3, popover_directive_3, popover_content_component_3) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(popover_directive_3);
    __export(popover_content_component_3);
    var PopoverModule = /** @class */ (function () {
        function PopoverModule() {
        }
        PopoverModule = __decorate([
            core_3.NgModule({
                imports: [
                    common_1.CommonModule
                ],
                declarations: [
                    popover_content_component_2.PopoverContentComponent,
                    popover_directive_2.PopoverDirective,
                ],
                exports: [
                    popover_content_component_2.PopoverContentComponent,
                    popover_directive_2.PopoverDirective,
                ],
                entryComponents: [
                    popover_content_component_2.PopoverContentComponent
                ]
            })
        ], PopoverModule);
        return PopoverModule;
    }());
    exports.PopoverModule = PopoverModule;
});
define("ngx-smart-popover", ["require", "exports", "ngx-smart-popover/index"], function (require, exports, index_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(index_1);
});
