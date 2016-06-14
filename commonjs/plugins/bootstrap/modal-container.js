"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var angular2_modal_1 = require('../../angular2-modal');
var modal_1 = require('./modal');
var utils_1 = require('../../framework/utils');
/**
 * A component that acts as a top level container for an open modal window.
 */
var BSModalContainer = (function () {
    function BSModalContainer(dialog, _compileConfig, _modal, _cr) {
        this.dialog = dialog;
        this._compileConfig = _compileConfig;
        this._modal = _modal;
        this._cr = _cr;
        if (!dialog.inElement) {
            this.position = null;
        }
        else {
            this.position = 'absolute';
        }
    }
    BSModalContainer.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._cr.resolveComponent(this._compileConfig.component)
            .then(function (cmpFactory) {
            var vcr = _this._viewContainer, bindings = _this._compileConfig.bindings, ctxInjector = vcr.parentInjector;
            var childInjector = Array.isArray(bindings) && bindings.length > 0 ?
                core_1.ReflectiveInjector.fromResolvedProviders(bindings, ctxInjector) : ctxInjector;
            return _this.dialog.contentRef =
                vcr.createComponent(cmpFactory, vcr.length, childInjector);
        });
    };
    BSModalContainer.prototype.onClickOutside = function () {
        return this._modal.isTopMost(this.dialog) &&
            !this.dialog.context.isBlocking &&
            this.dialog.dismiss();
    };
    BSModalContainer.prototype.documentKeypress = function (event) {
        // check that this modal is the last in the stack.
        if (!this._modal.isTopMost(this.dialog))
            return;
        if (utils_1.supportsKey(event.keyCode, this.dialog.context.keyboard)) {
            this.dialog.dismiss();
        }
    };
    __decorate([
        core_1.ViewChild('modalDialog', { read: core_1.ViewContainerRef }), 
        __metadata('design:type', core_1.ViewContainerRef)
    ], BSModalContainer.prototype, "_viewContainer", void 0);
    BSModalContainer = __decorate([
        core_1.Component({
            selector: 'modal-container',
            host: {
                'tabindex': '-1',
                'role': 'dialog',
                'class': 'in modal',
                'style': 'display: block',
                '[style.position]': 'position',
                '(body:keydown)': 'documentKeypress($event)'
            },
            encapsulation: core_1.ViewEncapsulation.None,
            /* tslint:disable */
            template: "<div [ngClass]=\"dialog.context.dialogClass\"\n          [class.modal-lg]=\"dialog.context.size == 'lg'\"\n          [class.modal-sm]=\"dialog.context.size == 'sm'\">\n         <div class=\"modal-content\"              \n              style=\"display:block\"              \n              role=\"document\"\n              (clickOutside)=\"onClickOutside()\">\n            <div style=\"display: none\" #modalDialog></div>\n         </div>\n    </div>"
        }), 
        __metadata('design:paramtypes', [angular2_modal_1.DialogRef, angular2_modal_1.ModalCompileConfig, modal_1.Modal, core_1.ComponentResolver])
    ], BSModalContainer);
    return BSModalContainer;
}());
exports.BSModalContainer = BSModalContainer;
//# sourceMappingURL=modal-container.js.map