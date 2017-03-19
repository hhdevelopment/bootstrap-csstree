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

		/**
		 * folder selection 
		 * @param {type} event
		 * @param {type} folder
		 * @returns {undefined}
		 */
		function handlerSelectFolder(event, folder) {
			if(event.target === event.currentTarget) {
				ctrl.selectedFolder = folder;
			}
		}
		/**
		 * init folders list
		 * @returns {undefined}
		 */
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
