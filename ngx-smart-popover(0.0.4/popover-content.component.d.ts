/**
 * This is a continuation of ngx-popover
 * @Reference {github} https://github.com/pleerock/ngx-popover
 */
import { AfterViewInit, ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy, Renderer2 } from '@angular/core';
import { PopoverDirective, PopoverPlacement } from './popover.directive';
export declare class PopoverContentComponent implements AfterViewInit, OnDestroy {
    protected element: ElementRef;
    protected cdr: ChangeDetectorRef;
    protected renderer: Renderer2;
    content: string;
    placement: PopoverPlacement;
    title: string;
    parentClass: string;
    animation: boolean;
    closeOnClickOutside: boolean;
    closeOnMouseOutside: boolean;
    size: 'small' | 'medium-small' | 'medium' | 'large';
    popoverDiv: ElementRef;
    popover: PopoverDirective;
    onCloseFromOutside: EventEmitter<{}>;
    top: number;
    left: number;
    isIn: boolean;
    displayType: string;
    effectivePlacement: string;
    opacity: number;
    transitionEnabled: boolean;
    windowWidth: number;
    windowHeight: number;
    listenClickFunc: any;
    listenMouseFunc: any;
    listenTouchFunc: any;
    /**
     * Closes dropdown if user clicks outside of this directive.
     */
    onDocumentMouseDown: (event: any) => void;
    constructor(element: ElementRef, cdr: ChangeDetectorRef, renderer: Renderer2);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    updatePosition(): void;
    show(): void;
    hide(): void;
    hideFromPopover(): void;
    protected positionElements(hostEl: HTMLElement, targetEl: HTMLElement, positionStr: PopoverPlacement, appendToBody?: boolean): {
        top: number;
        left: number;
    };
    protected position(nativeEl: HTMLElement): {
        width: number;
        height: number;
        top: number;
        left: number;
    };
    protected offset(nativeEl: any): {
        width: number;
        height: number;
        top: number;
        left: number;
    };
    protected getStyle(nativeEl: HTMLElement, cssProp: string): string;
    protected isStaticPositioned(nativeEl: HTMLElement): boolean;
    protected parentOffsetEl(nativeEl: HTMLElement): any;
    protected getEffectivePlacement(placement: string, hostElement: HTMLElement, targetElement: HTMLElement): string;
}
