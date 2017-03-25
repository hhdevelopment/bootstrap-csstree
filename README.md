# README #

CSS Tree
A full bootstrap and angular css implementation for tree data representation.

### How do I get set up? ###

* Summary of set up
Add only tree.css to your project

* Configuration

```html
<div class="tree">
	<span ng-repeat="folder in ctrl.folders track by $index" ng-include="'tree-template.html'"></span>
</div>
```
* tree-template.html
```html
<span>
	<div ng-class="{'active':ctrl.selectedFolderIds.includes(folder.id) || folder.active, 
							'tree-item-info':folder.info, 
							'tree-item-success':folder.success, 
							'tree-item-warning':folder.warning, 
							'tree-item-danger':folder.danger, 
							'disabled':folder.disabled}" 
			class="tree-item"> 
		<span ng-click="ctrl.handlerSelectFolder($event, folder)">
			<a href data-toggle="collapse" data-target="#folder{{folder.id}}">
				<i open notselect ng-class="{'invisible':!folder.folders || !folder.folders.length}" class="glyphicon glyphicon-minus"></i>
				<i open notselect class="glyphicon glyphicon-folder-open"></i>
				<i close notselect class="glyphicon glyphicon-plus"></i>
				<i close notselect class="glyphicon glyphicon-folder-close"></i>
			</a>
			<span class="badge" ng-bind="0"></span>
			{{folder.label}} {{folder.id}}
 		</span>
	</div>
	<div ng-if="folder.folders && folder.folders.length" class="tree-children collapse in" id="folder{{folder.id}}">
		<span ng-repeat="folder in folder.folders track by $index" ng-include="'tree-template.html'"></span>
	</div>
</span>
```
```js
var ctrl = this;
ctrl.folders = [];
ctrl.handlerSelectFolder = handlerSelectFolder;
ctrl.selectedFolderIds = [];

/**
 * folder selection 
 * @param {type} event
 * @param {type} folder
 */
function handlerSelectFolder(event, folder) {
	if(!event.target.hasAttribute("notselect") && !folder.disabled) {
		if(!event.ctrlKey) {
			ctrl.selectedFolderIds = [folder.id];
		} else {
			var idx = ctrl.selectedFolderIds.indexOf(folder.id);
			if(idx !== -1) {
				ctrl.selectedFolderIds.splice(idx, 1);
			} else {
				ctrl.selectedFolderIds.push(folder.id);
			}
		}
	}
}
```