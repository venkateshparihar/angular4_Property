import { AppComponent } from './app.component';
import { dashboardConfig, dashboardRoute } from './dashboard/config';
import { propertyConfig, propertyRoute } from './property/config';
export  var appConfig = [AppComponent,dashboardConfig,propertyConfig]

export var appRoute = [
	{
		path : 'app', 
		component:AppComponent,
		children: [...dashboardRoute,...propertyRoute]
	}
]