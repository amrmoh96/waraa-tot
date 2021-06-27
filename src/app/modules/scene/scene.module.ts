import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SceneRoutingModule } from './scene-routing.module';
import { SceneComponent } from './scene/scene.component';
import { SceneBehindComponent } from './scene-behind/scene-behind.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [ SceneComponent, SceneBehindComponent ],
	imports: [ CommonModule, SceneRoutingModule, SharedModule ]
})
export class SceneModule {}
