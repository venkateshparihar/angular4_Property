
import { AddPropertyComponent } from './add-property/add-property.component';
import { EditPropertyComponent } from './edit-property/edit-property.component';
import { PropertyComponent } from './property-list/property.component';

export  var propertyConfig = [ AddPropertyComponent , EditPropertyComponent ,PropertyComponent];

export var propertyRoute = [
	{
		path:'property',
		component:PropertyComponent
	},
	{
		path:'add-property',
		component:AddPropertyComponent
	},
	{
		path:'edit-property/:id',
		component:EditPropertyComponent
	}
];

