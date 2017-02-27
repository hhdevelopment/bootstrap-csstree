(function(ng) {
	ng.module('tree-demo', []);
	ng.module('tree-demo').controller('DemoCtrl', DemoCtrl);
	DemoCtrl.$inject  = ['dataservices'];;
	function DemoCtrl(dataservices) {
		/* jshint validthis: true */
		var ctrl = this;
		ctrl.folders = [];
		ctrl.handlerSelectFolder = handlerSelectFolder;
		ctrl.selectedFolder = null;
		function handlerSelectFolder(event, folder) {
			if(!isFoldIcon(event) && folder.folders && folder.folders.length) {
				event.preventDefault();
				event.stopPropagation();
				event.stopImmediatePropagation();
				ctrl.selectedFolder = folder;
			}
		}
		function isFoldIcon(event) {
			var children = [].slice.call(event.currentTarget.children);
			var eltOffsetLeft = 5;
			return children.some(function(elt) {
				var isFold = false;
				if(elt.offsetWidth && (elt.attributes.open || elt.attributes.close)) {
					isFold = event.offsetX >= eltOffsetLeft && event.offsetX <= eltOffsetLeft + elt.offsetWidth;
				}
				eltOffsetLeft += elt.offsetWidth;
				return isFold;
			});
		}
		function init() {
			dataservices.getFolders().then(function(res) {
				ctrl.folders = res.data;
			});
		}
		init();
	}
})(angular);
(function(ng) {
	ng.module('tree-demo').factory('dataservices', services);
	services.$inject  = ['$http'];
	function services($http) {
		return {
			getFolders : getFolders
		};
		function getFolders() {
			return $http.get('folders.json');
		}
	}
})(angular);
