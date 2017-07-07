(function(ng) {
	ng.module('tree-demo', []);
	ng.module('tree-demo').controller('DemoCtrl', DemoCtrl);
	DemoCtrl.$inject  = ['dataservices'];;
	function DemoCtrl(dataservices) {
		/* jshint validthis: true */
		var ctrl = this;
		ctrl.folders = [];
		ctrl.handlerSelectFolder = handlerSelectFolder;
		ctrl.selectedFolderIds = [];
		ctrl.disabled = false;

		/**
		 * folder selection 
		 * @param {type} event
		 * @param {type} folder
		 */
		function handlerSelectFolder(event, folder) {
			if(!ctrl.disabled && !event.target.hasAttribute("notselect") && !folder.disabled) {
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
