import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SceneBehindComponent } from './scene-behind/scene-behind.component';
import { SceneComponent } from './scene/scene.component';

const routes: Routes = [
  {
		path: '',
		component: SceneComponent
	},
	{
		path: 'behind',
		component: SceneBehindComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SceneRoutingModule { }
