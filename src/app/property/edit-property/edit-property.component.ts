import {
    Component, OnInit
}
from '@angular/core';
import {
    RouterModule, Routes, ActivatedRoute, Params
}
from '@angular/router';
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
import 'rxjs/add/operator/switchMap';
import {
    BrowserModule
}
from '@angular/platform-browser';

@Component({
    selector: 'app-edit-property',
    templateUrl: './../add-property/add-property.component.html',
    styleUrls: ['./edit-property.component.css']
})
export class EditPropertyComponent implements OnInit {

    PropertyData: any = {};

    property: FormGroup;
    name: FormControl;
    category: FormControl;
    area: FormControl;
    estYear: FormControl;
    price: FormControl;

    constructor(private propertyService: PropertyService, private route: ActivatedRoute) {}
    ngOnInit() {
        this.createFormControls();
        this.createForm();
        this.route.params.switchMap((params: Params) =>
            this.propertyService.getProperty(parseInt(params['id']))).subscribe(property => this.PropertyData = property);

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
        this.propertyService.update(this.PropertyData)
            .then(() => window.location.href = "#/app/property");
    }

}