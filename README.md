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
	<div ng-class="{'active':folder === ctrl.selectedFolder}" class="tree-item" ng-click="ctrl.handlerSelectFolder($event, folder)"> 
		<a href data-toggle="collapse" data-target="#folder{{folder.id}}">
			<span open>
				<i ng-class="{'invisible':!folder.folders || !folder.folders.length}" class="glyphicon glyphicon-minus"></i>
				<i class="glyphicon glyphicon-folder-open"></i>
			</span>
			<span close>
				<i class="glyphicon glyphicon-plus"></i>
				<i class="glyphicon glyphicon-folder-close"></i>
			</span>
		</a>
		&nbsp;{{folder.label}}&nbsp;{{folder.id}}
		<span class="badge" ng-bind="0"></span>
	</div>
	<div ng-if="folder.folders && folder.folders.length" class="tree-children collapse in" id="folder{{folder.id}}">
		<span ng-repeat="folder in folder.folders track by $index" ng-include="'tree-template.html'"></span>
	</div>
</span>
```
```javascript
function handlerSelectFolder(event, folder) {
	if(event.target === event.currentTarget)  // if icons don't select folder
		ctrl.selectedFolder = folder;
	}
}
```