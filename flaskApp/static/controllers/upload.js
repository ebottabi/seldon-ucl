angular.module('dcs.controllers').controller('UploadController', ['$scope', '$state', '$location', 'Upload',
	function($scope, $state, $location, Upload)
	{
		$scope.submit =
			function()
			{
				if($scope.file)
					$scope.sampleSeed = (typeof $scope.sampleSeed === 'undefined') ? '___DoNotUseThisAsSeed___' : $scope.sampleSeed;
					$scope.sampleSize = (typeof $scope.sampleSize === 'undefined') ? 100 : $scope.sampleSize;
					$scope.upload($scope.file);
			};

		$scope.upload =
			function(file)
			{
				Upload.
					upload({
						url: 'upload/',
						data: {
							file: file, 
							'sampleSize': (typeof $scope.sampleSize === 'undefined') ? 100 : $scope.sampleSize,
							'seed': (typeof $scope.sampleSeed === 'undefined') ? '___DoNotUseThisAsSeed___' : $scope.sampleSeed
						}
					}).
					then(function (resp) {
			            if(resp.data["success"])
			            {
			            	$location.path("/" + resp.data["sessionID"]);
			            }
			            else
			            {
			            	$scope.file = null;
			            	$scope.uploadProgress = null;
			            	$scope.error = "Could not parse CSV file";
			            }
			        }, function (resp) {
			            console.log('Error status: ' + resp.status);
			        }, function (evt) {
			            $scope.uploadProgress = parseInt(100.0 * evt.loaded / evt.total);
			        });
			};
	}]);