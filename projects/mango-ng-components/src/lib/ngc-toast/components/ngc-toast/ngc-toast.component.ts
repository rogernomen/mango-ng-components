import { Component, Input, Renderer2, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Toast } from '../../models/Toast.class';
import { trigger, transition, animate, style } from '@angular/animations';
import { Subscription } from 'rxjs';
import { NgcToastService } from '../../services/toast.service';

@Component({
    selector: 'ngc-toast',
    templateUrl: './ngc-toast.component.html',
    styleUrls: ['./ngc-toast.component.scss'],
    animations: [trigger('toastMobileAnimation', [
        transition(':leave', [
            animate('0.2s', style({ opacity: 0, bottom: -20 }))
        ])
    ]),
    trigger('toastDesktopAnimation', [
        transition(':leave', [
            animate('0.2s', style({ opacity: 0, top: -20 }))
        ])
    ]),
]})

export class NgcToastComponent implements OnInit, OnDestroy {

    @Input() isMobile: boolean;
    @Input() miliseconds: number;
    toastList: Array<Toast>;
    toastToRemove: Toast;
    toastList$: Subscription;
    readonly DEFAULT_MILISECONDS = 4000;


    constructor(private renderer: Renderer2,
        private el: ElementRef, private toastService: NgcToastService) { }

    ngOnInit(): void {
        this.toastList$ = this.toastService.getToastList().subscribe((toastList: Array<Toast>) => {
            this.toastList = toastList;
            toastList.forEach((toast: Toast) => {
            setTimeout(() => {
                this.toastService.removeToast(toast);
            }, this.miliseconds || this.DEFAULT_MILISECONDS);
            });
        });
    }

    toastAnimationLeave = (event): void => {
        if (event.fromState !== 'void') {
            this.renderer.addClass(this.el.nativeElement, 'a-to-bottom');
        }
    }

    ngOnDestroy(): void {
        this.toastList$.unsubscribe();
    }
}

