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
			var span = event.currentTarget.firstElementChild;
			if(!folder.folders || !folder.folders.length || event.offsetX < span.offsetLeft || event.offsetX > span.offsetLeft + span.offsetWidth) {
				event.preventDefault();
				event.stopPropagation();
				event.stopImmediatePropagation();
				ctrl.selectedFolder = folder;
			}
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
