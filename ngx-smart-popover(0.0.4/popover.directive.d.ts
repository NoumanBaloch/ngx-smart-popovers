/**
 * This is a continuation of ngx-popover
 * @Reference {github} https://github.com/pleerock/ngx-popover
 */
import { ComponentFactoryResolver, ComponentRef, EventEmitter, OnChanges, SimpleChange, ViewContainerRef } from '@angular/core';
import { PopoverContentComponent } from './popover-content.component';
export declare class PopoverPlacement {
    static readonly Bottom: string;
    static readonly BottomLeft: string;
    static readonly BottomRight: string;
    static readonly Left: string;
    static readonly Right: string;
    static readonly Top: string;
    static readonly TopLeft: string;
    static readonly TopRight: string;
}
/**
 * @group Basic Toolkit
 * @component Popover Directive
 *
 * @export
 * @class PopoverDirective
 */
export declare class PopoverDirective implements OnChanges {
    protected viewContainerRef: ViewContainerRef;
    protected resolver: ComponentFactoryResolver;
    protected popoverContentComponent: typeof PopoverContentComponent;
    protected popover: ComponentRef<PopoverContentComponent>;
    protected visible: boolean;
    constructor(viewContainerRef: ViewContainerRef, resolver: ComponentFactoryResolver);
    content: string | PopoverContentComponent;
    popoverDisabled: boolean;
    popoverAnimation: boolean;
    popoverPlacement: PopoverPlacement;
    popoverTitle: string;
    popoverOnHover: boolean;
    popoverCloseOnClickOutside: boolean;
    popoverCloseOnMouseOutside: boolean;
    popoverDismissTimeout: number;
    onShown: EventEmitter<PopoverDirective>;
    onHidden: EventEmitter<PopoverDirective>;
    showOrHideOnClick(evt: Event): void;
    showOrHideOnTouch(evt: Event): void;
    showOnHover(): void;
    hideOnHover(): void;
    ngOnChanges(changes: {
        [propertyName: string]: SimpleChange;
    }): void;
    toggle(): void;
    show(): void;
    hide(): void;
    getElement(): HTMLElement;
}
