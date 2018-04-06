import {
    Component, OnInit
}
from '@angular/core';
import {
    PropertyService
}
from './../../services/property.service';
import {
    ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
}
from '@angular/forms';
import {
    BrowserModule
}
from '@angular/platform-browser';

@Component({
    selector: 'app-add-property',
    templateUrl: './add-property.component.html',
    styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {

    constructor(private propertyService: PropertyService) {}

    PropertyData: any = {};

    property: FormGroup;
    name: FormControl;
    category: FormControl;
    area: FormControl;
    estYear: FormControl;
    price: FormControl;

    ngOnInit() {
        this.createFormControls();
        this.createForm();
    }

    createFormControls() {
        this.name = new FormControl('', [
            Validators.required,
            // Validators.pattern("[^ @]*@[^ @]*")
        ]);
        this.category = new FormControl('', [
            Validators.required,
        ]);
        this.area = new FormControl('', [
            Validators.required, Validators.pattern("[0-9]*")
        ]);
        this.estYear = new FormControl('', [
            Validators.required, Validators.pattern("[0-9]*")
        ]);
        this.price = new FormControl('', [
            Validators.required, Validators.pattern("[0-9]*")
        ]);
    }

    createForm() {
        this.property = new FormGroup({
            name: this.name,
            category: this.category,
            area: this.area,
            estYear: this.estYear,
            price: this.price
        });
    }
    saveProperty() {

        this.propertyService.create(this.PropertyData.name, this.PropertyData.category, this.PropertyData.area, this.PropertyData.estYear, this.PropertyData.price)
            .then(property => {
                window.location.href = "#/app/property";
            });
    }
}