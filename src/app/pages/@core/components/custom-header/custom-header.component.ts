import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-custom-header',
    templateUrl: './custom-header.component.html',
    styleUrls: ['./custom-header.component.scss']
})
export class CustomHeaderComponent implements OnInit {
    @Input() isFiltre: boolean = false;
    @Input() isBtnAdd: boolean = false;
    @Input() currentPage:string;
    @Input() btnAdd:string;
@Output() showFiltreEvent:EventEmitter<any> = new EventEmitter();
@Output() addBtnSaveEvent:EventEmitter<any> = new EventEmitter();
    constructor() {
    }
    showFiltre(){
        this.showFiltreEvent.emit();
    }
    addBtnSave(){
        this.addBtnSaveEvent.emit();
    }

    ngOnInit(): void {
    }

}
